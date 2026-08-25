# Auth & Orders Testing Playbook — Padam Naturals

## Stack
- FastAPI + MongoDB (motor), bcrypt password hashing, JWT (HS256) in httpOnly cookie `access_token` (7 days, samesite=lax, secure).
- Single seeded admin from env: ADMIN_EMAIL / ADMIN_PASSWORD in /app/backend/.env.
- Seeding runs on backend startup (creates admin if missing, updates hash if env password changed).

## Endpoints
- POST /api/auth/login {email, password} — sets cookie; brute-force lockout: 5 fails per ip:email → 15 min (login_attempts collection).
- POST /api/auth/logout — clears cookie.
- GET /api/auth/me — 200 {email, role} or 401.
- POST /api/orders {items:[{slug,name,sizeLabel,qty,price}], total} — creates order, server generates PN-XXXX id, status "placed".
- GET /api/orders/{orderId} — public status lookup (404 if missing; case-insensitive).
- PUT /api/orders/{orderId} — edit items/total; 409 once status is shipped/delivered.
- GET /api/admin/orders — admin only.
- PATCH /api/admin/orders/{orderId}/status {status} — one of placed|packed|shipped|delivered.

## MongoDB verification
```
mongosh
use test_database
db.users.find({role:"admin"})
db.orders.find().sort({createdAt:-1}).limit(3)
```
password_hash must start with $2b$.

## curl flow
```
curl -c /root/cookies.txt -X POST $API/api/auth/login -H "Content-Type: application/json" -d '{"email":"owner@padamnaturals.in","password":"Padam@82691"}'
curl -b /root/cookies.txt $API/api/auth/me
curl -b /root/cookies.txt $API/api/admin/orders
curl -b /root/cookies.txt -X PATCH $API/api/admin/orders/PN-XXXX/status -H "Content-Type: application/json" -d '{"status":"packed"}'
```

## Frontend
- /admin — login form → orders dashboard with status buttons.
- /track and /track/:orderId — public order tracking.
- CartDrawer "Order on WhatsApp" → POST /api/orders → opens wa.me link (Order ID at top, tracking link at bottom). If orderMeta set (edit mode), PUT updates and sends "UPDATE my order" message.
