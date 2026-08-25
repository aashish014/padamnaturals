"""Padam Naturals backend API tests — orders (public), auth, admin orders."""
import os
import re
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing from env and /app/frontend/.env")
BASE_URL = base_url.rstrip("/")
API = f"{BASE_URL}/api"

ORDER_ID_RE = re.compile(r"^PN-[A-HJ-NP-Z2-9]{6}$")


def _creds():
    path = Path("/app/memory/test_credentials.md")
    content = path.read_text(encoding="utf-8")
    email = re.search(r"(?im)^\s*(?:[-*]\s*)?(?:\*\*)?email(?:\*\*)?\s*:\s*`?([^`\s]+)", content)
    password = re.search(r"(?im)^\s*(?:[-*]\s*)?(?:\*\*)?password(?:\*\*)?\s*:\s*`?([^`\s]+)", content)
    if not email or not password:
        pytest.skip("No credentials in /app/memory/test_credentials.md")
    return {"email": email.group(1), "password": password.group(1)}


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def test_credentials():
    return _creds()


ITEMS = [
    {"slug": "groundnut-oil", "name": "TEST_Lakdi Ghani Groundnut Oil", "sizeLabel": "1L", "qty": 2, "price": 520},
    {"slug": "coconut-oil", "name": "TEST_Lakdi Ghani Coconut Oil", "sizeLabel": "1L", "qty": 1, "price": 950},
]
TOTAL = 520 * 2 + 950


# ---------- health ----------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# ---------- public orders CRUD ----------
class TestOrders:
    def test_create_order_and_persistence(self, api_client):
        r = api_client.post(f"{API}/orders", json={"items": ITEMS, "total": TOTAL})
        assert r.status_code == 200, r.text
        data = r.json()
        assert "_id" not in data
        assert ORDER_ID_RE.match(data["orderId"]), data["orderId"]
        assert data["status"] == "placed"
        assert data["total"] == TOTAL
        assert len(data["items"]) == 2
        assert data["statusHistory"][0]["status"] == "placed"

        oid = data["orderId"]
        g = api_client.get(f"{API}/orders/{oid}")
        assert g.status_code == 200
        got = g.json()
        assert got["orderId"] == oid
        assert got["total"] == TOTAL
        assert got["items"][0]["slug"] == "groundnut-oil"
        assert got["items"][0]["qty"] == 2

    def test_get_order_case_insensitive(self, api_client):
        oid = api_client.post(f"{API}/orders", json={"items": ITEMS, "total": TOTAL}).json()["orderId"]
        r = api_client.get(f"{API}/orders/{oid.lower()}")
        assert r.status_code == 200
        assert r.json()["orderId"] == oid

    def test_get_order_not_found(self, api_client):
        r = api_client.get(f"{API}/orders/PN-0000")
        assert r.status_code == 404
        assert "detail" in r.json()

    def test_update_order_and_persistence(self, api_client):
        oid = api_client.post(f"{API}/orders", json={"items": ITEMS, "total": TOTAL}).json()["orderId"]
        new_items = [dict(ITEMS[0], qty=5)]
        new_total = 520 * 5
        u = api_client.put(f"{API}/orders/{oid}", json={"items": new_items, "total": new_total})
        assert u.status_code == 200, u.text
        assert u.json()["total"] == new_total
        assert u.json()["items"][0]["qty"] == 5

        g = api_client.get(f"{API}/orders/{oid}").json()
        assert g["total"] == new_total
        assert len(g["items"]) == 1
        assert g["items"][0]["qty"] == 5
        assert g["status"] == "placed"

    def test_create_order_empty_items_rejected(self, api_client):
        r = api_client.post(f"{API}/orders", json={"items": [], "total": 0})
        assert r.status_code == 422

    def test_create_order_invalid_qty_rejected(self, api_client):
        bad = [dict(ITEMS[0], qty=0)]
        r = api_client.post(f"{API}/orders", json={"items": bad, "total": 0})
        assert r.status_code == 422

    def test_update_nonexistent_order(self, api_client):
        r = api_client.put(f"{API}/orders/PN-0000", json={"items": ITEMS, "total": TOTAL})
        assert r.status_code == 404


# ---------- auth ----------
class TestAuth:
    def test_me_unauthenticated(self, api_client):
        r = requests.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_admin_orders_unauthenticated(self):
        r = requests.get(f"{API}/admin/orders")
        assert r.status_code == 401

    def test_login_invalid_password(self, test_credentials):
        r = requests.post(
            f"{API}/auth/login",
            json={"email": test_credentials["email"], "password": "definitelyWrong123"},
        )
        assert r.status_code in (401, 429), r.text

    def test_login_success_sets_httponly_cookie(self, test_credentials):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json=test_credentials)
        if r.status_code != 200:
            pytest.fail(f"Admin login failed: {r.status_code} {r.text[:300]}")
        body = r.json()
        assert body["email"] == test_credentials["email"].lower()
        assert body["role"] == "admin"
        cookie_hdr = r.headers.get("set-cookie", "")
        assert "access_token=" in cookie_hdr
        assert "HttpOnly" in cookie_hdr
        assert "Secure" in cookie_hdr
        # NOTE: server sets SameSite=Lax; the preview ingress rewrites it to
        # SameSite=None; Partitioned. Accept either.
        assert "samesite=" in cookie_hdr.lower()

        me = s.get(f"{API}/auth/me")
        assert me.status_code == 200
        assert me.json()["role"] == "admin"

        out = s.post(f"{API}/auth/logout")
        assert out.status_code == 200
        assert s.get(f"{API}/auth/me").status_code == 401

    def test_cors_credentials_config(self):
        r = requests.options(
            f"{API}/auth/login",
            headers={
                "Origin": "https://evil.example.com",
                "Access-Control-Request-Method": "POST",
            },
        )
        allow_origin = r.headers.get("access-control-allow-origin")
        allow_creds = r.headers.get("access-control-allow-credentials")
        # Wildcard origin + credentials is an insecure combination
        assert not (allow_origin == "*" and allow_creds == "true"), (
            f"CORS wildcard with credentials: origin={allow_origin} creds={allow_creds}"
        )


# ---------- admin orders + edit locking ----------
class TestAdminOrders:
    @pytest.fixture(scope="class")
    def admin_session(self):
        creds = _creds()
        s = requests.Session()
        s.headers.update({"Content-Type": "application/json"})
        r = s.post(f"{API}/auth/login", json=creds)
        if r.status_code != 200:
            pytest.fail(f"Admin login failed: {r.status_code} {r.text[:300]}")
        return s

    def test_list_orders(self, admin_session):
        r = admin_session.get(f"{API}/admin/orders")
        assert r.status_code == 200
        orders = r.json()
        assert isinstance(orders, list)
        assert len(orders) > 0
        assert all("_id" not in o for o in orders)
        assert all({"orderId", "items", "total", "status"} <= set(o) for o in orders)

    def test_status_transitions_and_edit_lock(self, admin_session):
        oid = admin_session.post(f"{API}/orders", json={"items": ITEMS, "total": TOTAL}).json()["orderId"]

        for status in ("packed",):
            r = admin_session.patch(f"{API}/admin/orders/{oid}/status", json={"status": status})
            assert r.status_code == 200, r.text
            assert r.json()["status"] == status
            assert requests.get(f"{API}/orders/{oid}").json()["status"] == status

        # editable while packed
        e = requests.put(
            f"{API}/orders/{oid}",
            json={"items": [dict(ITEMS[0], qty=3)], "total": 1560},
            headers={"Content-Type": "application/json"},
        )
        assert e.status_code == 200, e.text

        # ship it -> edit must be blocked with 409
        r = admin_session.patch(f"{API}/admin/orders/{oid}/status", json={"status": "shipped"})
        assert r.status_code == 200
        blocked = requests.put(
            f"{API}/orders/{oid}",
            json={"items": [dict(ITEMS[0], qty=4)], "total": 2080},
            headers={"Content-Type": "application/json"},
        )
        assert blocked.status_code == 409, blocked.text

        # delivered also blocked
        admin_session.patch(f"{API}/admin/orders/{oid}/status", json={"status": "delivered"})
        blocked2 = requests.put(
            f"{API}/orders/{oid}",
            json={"items": [dict(ITEMS[0], qty=4)], "total": 2080},
            headers={"Content-Type": "application/json"},
        )
        assert blocked2.status_code == 409

        hist = requests.get(f"{API}/orders/{oid}").json()["statusHistory"]
        assert [h["status"] for h in hist] == ["placed", "packed", "shipped", "delivered"]

    def test_invalid_status_rejected(self, admin_session):
        oid = admin_session.post(f"{API}/orders", json={"items": ITEMS, "total": TOTAL}).json()["orderId"]
        r = admin_session.patch(f"{API}/admin/orders/{oid}/status", json={"status": "lost"})
        assert r.status_code == 422

    def test_status_nonexistent_order(self, admin_session):
        r = admin_session.patch(f"{API}/admin/orders/PN-0000/status", json={"status": "packed"})
        assert r.status_code == 404
