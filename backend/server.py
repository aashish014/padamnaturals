from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import random
import asyncio
import urllib.parse
import requests
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

import bcrypt
import jwt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"
ORDER_STATUSES = ["placed", "packed", "shipped", "delivered"]
EDITABLE_STATUSES = ["placed", "packed"]
# Unambiguous chars only (no 0/O, 1/I/L) so customers can read IDs aloud safely
ORDER_ID_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

logger = logging.getLogger(__name__)


# ---------- Auth helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def create_access_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def get_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    return {"email": payload["sub"], "role": "admin"}


def client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class OrderItem(BaseModel):
    model_config = ConfigDict(extra="ignore")

    slug: str
    name: str
    sizeLabel: str
    qty: int = Field(ge=1)
    price: int = Field(ge=0)


class OrderUpsert(BaseModel):
    items: List[OrderItem]
    total: int = Field(ge=0)


class StatusUpdate(BaseModel):
    status: str
    note: Optional[str] = None


class LoginIn(BaseModel):
    email: str
    password: str


def pub(order: dict) -> dict:
    order = dict(order)
    order.pop("_id", None)
    return order


async def notify_owner(order: dict):
    """Ping the owner's WhatsApp via CallMeBot when a new order is placed.
    No-ops silently until CALLMEBOT_API_KEY is set — ordering never depends on it."""
    api_key = os.environ.get("CALLMEBOT_API_KEY")
    phone = os.environ.get("OWNER_WA_NUMBER")
    if not api_key or not phone:
        return
    items = "\n".join(
        f"• {i['qty']}x {i['name']} ({i['sizeLabel']})" for i in order["items"]
    )
    text = (
        f"New order {order['orderId']}!\n\n"
        f"{items}\n\n"
        f"Total: ₹{order['total']:,}\n\n"
        f"Open your /admin page to mark it packed/shipped."
    )
    url = (
        "https://api.callmebot.com/whatsapp.php"
        f"?phone={phone}&text={urllib.parse.quote(text)}&apikey={api_key}"
    )
    try:
        await asyncio.to_thread(requests.get, url, timeout=10)
    except Exception:
        logger.warning("CallMeBot owner notification failed", exc_info=True)


api_router = APIRouter(prefix="/api")


# ---------- Root / status checks ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------- Orders (public) ----------
@api_router.post("/orders")
async def create_order(body: OrderUpsert):
    if not body.items:
        raise HTTPException(status_code=422, detail="Order must have at least one item")
    order_id = None
    for _ in range(25):
        candidate = "PN-" + "".join(random.choice(ORDER_ID_CHARS) for _ in range(6))
        if not await db.orders.find_one({"orderId": candidate}):
            order_id = candidate
            break
    if not order_id:
        raise HTTPException(status_code=500, detail="Could not allocate order id")
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "orderId": order_id,
        "items": [i.model_dump() for i in body.items],
        "total": body.total,
        "status": "placed",
        "createdAt": now,
        "updatedAt": now,
        "statusHistory": [{"status": "placed", "at": now}],
    }
    await db.orders.insert_one(doc)
    asyncio.create_task(notify_owner(doc))
    return pub(doc)


@api_router.get("/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"orderId": order_id.strip().upper()})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return pub(order)


@api_router.put("/orders/{order_id}")
async def update_order(order_id: str, body: OrderUpsert):
    if not body.items:
        raise HTTPException(status_code=422, detail="Order must have at least one item")
    order = await db.orders.find_one({"orderId": order_id.strip().upper()})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order["status"] not in EDITABLE_STATUSES:
        raise HTTPException(status_code=409, detail="Order has shipped and can no longer be edited")
    now = datetime.now(timezone.utc).isoformat()
    items = [i.model_dump() for i in body.items]
    await db.orders.update_one(
        {"orderId": order["orderId"]},
        {"$set": {"items": items, "total": body.total, "updatedAt": now}},
    )
    order.update({"items": items, "total": body.total, "updatedAt": now})
    return pub(order)


# ---------- Auth ----------
@api_router.post("/auth/login")
async def login(body: LoginIn, request: Request, response: Response):
    email = body.email.lower().strip()
    identifier = f"{client_ip(request)}:{email}"
    now = datetime.now(timezone.utc)
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= 5:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.fromisoformat(locked_until) > now:
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")
        # Lockout window has lapsed — reset the counter
        await db.login_attempts.delete_one({"identifier": identifier})
        attempts = None

    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin = await db.users.find_one({"email": admin_email})
    if email != admin_email or not admin or not verify_password(body.password, admin["password_hash"]):
        new_count = (attempts.get("count", 0) if attempts else 0) + 1
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {"count": new_count, "locked_until": (now + timedelta(minutes=15)).isoformat()}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    token = create_access_token(email)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7 * 24 * 3600,
        path="/",
    )
    return {"email": email, "role": "admin"}


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}


@api_router.get("/auth/me")
async def me(admin: dict = Depends(get_admin)):
    return admin


# ---------- Admin orders ----------
@api_router.get("/admin/orders")
async def list_orders(admin: dict = Depends(get_admin)):
    orders = await db.orders.find({}).sort("createdAt", -1).to_list(500)
    return [pub(o) for o in orders]


@api_router.patch("/admin/orders/{order_id}/status")
async def set_order_status(order_id: str, body: StatusUpdate, admin: dict = Depends(get_admin)):
    if body.status not in ORDER_STATUSES:
        raise HTTPException(status_code=422, detail="Invalid status")
    oid = order_id.strip().upper()
    order = await db.orders.find_one({"orderId": oid})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    now = datetime.now(timezone.utc).isoformat()
    updates = {"status": body.status, "updatedAt": now}
    if body.note is not None:
        updates["deliveryNote"] = body.note.strip()[:140]
    query = {"$set": updates}
    if order["status"] != body.status:
        query["$push"] = {"statusHistory": {"status": body.status, "at": now}}
    await db.orders.update_one({"orderId": oid}, query)
    order.update(updates)
    return pub(order)


# ---------- Lifespan ----------
async def seed_admin():
    await db.orders.create_index("orderId", unique=True)
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Owner",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Admin password updated from env")


@asynccontextmanager
async def lifespan(_app: FastAPI):
    await seed_admin()
    yield
    client.close()


# Create the main app without a prefix
app = FastAPI(lifespan=lifespan)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
