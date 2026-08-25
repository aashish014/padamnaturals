"""Brute-force lockout test (uses a throwaway email so the real admin is never locked)."""
import os
import requests
from dotenv import dotenv_values

BASE = (os.environ.get("REACT_APP_BACKEND_URL") or dotenv_values("/app/frontend/.env")["REACT_APP_BACKEND_URL"]).rstrip("/")
API = f"{BASE}/api"


def test_lockout_after_five_failures():
    email = "bruteforce_probe_qa@example.test"
    codes = []
    for _ in range(7):
        r = requests.post(f"{API}/auth/login", json={"email": email, "password": "wrong-pass"})
        codes.append(r.status_code)
    assert codes[:5] == [401] * 5, codes
    assert 429 in codes[5:], f"No lockout after 5 failures: {codes}"
