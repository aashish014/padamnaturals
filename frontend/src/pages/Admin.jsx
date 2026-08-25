import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { adminLogin, adminLogout, adminMe, adminOrders, adminSetStatus } from "../lib/api";

const STATUSES = ["placed", "packed", "shipped", "delivered"];
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

const PILL = {
  placed: "bg-gold/15 text-gold",
  packed: "bg-terra/10 text-terra",
  shipped: "bg-moss/10 text-moss",
  delivered: "bg-moss text-bone",
};

export default function Admin() {
  const [auth, setAuth] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminMe().then(setAuth).catch(() => setAuth(false));
  }, []);

  const load = useCallback(async () => {
    try {
      setOrders(await adminOrders());
    } catch (err) {
      if (err.status === 401) setAuth(false);
      else toast.error("Could not load orders — pull to refresh or try again");
    }
  }, []);

  useEffect(() => {
    if (auth) load();
  }, [auth, load]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      setAuth(await adminLogin(email, password));
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch {
      /* ignore */
    }
    setAuth(false);
  };

  const setStatus = async (orderId, status) => {
    try {
      const updated = await adminSetStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.orderId === orderId ? updated : o)));
      toast.success(`${orderId} marked as ${status}`);
    } catch (err) {
      toast.error(err.message || "Could not update status");
    }
  };

  if (auth === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bone pt-24" data-testid="admin-loading">
        <p className="text-sm font-semibold text-moss">…</p>
      </main>
    );
  }

  if (!auth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bone px-5 pt-24" data-testid="admin-login-page">
        <div className="w-full max-w-sm rounded-3xl border border-ink/10 bg-bone p-8 shadow-[0_20px_50px_-30px_rgba(31,41,34,0.35)]">
          <p className="overline-tag">Padam Naturals</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Owner Login</h1>
          <form onSubmit={submit} className="mt-6 space-y-3.5" data-testid="admin-login-form">
            <input
              data-testid="admin-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-2xl border border-ink/20 bg-bone px-4 py-3 text-sm font-semibold outline-none focus:border-terra"
            />
            <input
              data-testid="admin-password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-2xl border border-ink/20 bg-bone px-4 py-3 text-sm font-semibold outline-none focus:border-terra"
            />
            {error && (
              <p className="text-xs font-bold text-terra" data-testid="admin-login-error">
                {error}
              </p>
            )}
            <motion.button
              data-testid="admin-login-button"
              type="submit"
              disabled={busy}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-full bg-terra py-3.5 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra-dark disabled:opacity-60"
            >
              {busy ? "…" : "Login"}
            </motion.button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bone px-5 pb-24 pt-28 md:px-10" data-testid="admin-dashboard">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="overline-tag">Padam Naturals</p>
            <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">Orders</h1>
          </div>
          <div className="flex gap-2">
            <button
              data-testid="admin-refresh-button"
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-xs font-bold transition-colors hover:border-terra hover:text-terra"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              data-testid="admin-logout-button"
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-xs font-bold transition-colors hover:border-terra hover:text-terra"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <p className="mt-14 text-center font-display text-xl italic text-moss" data-testid="admin-empty">
            No orders yet — they will appear here the moment a customer taps "Order on WhatsApp".
          </p>
        ) : (
          <div className="mt-8 space-y-4" data-testid="admin-orders-list">
            {orders.map((o) => (
              <div key={o.orderId} className="rounded-3xl border border-ink/10 bg-bone p-5 md:p-6" data-testid={`admin-order-${o.orderId}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-xl font-semibold">{o.orderId}</p>
                    <p className="mt-0.5 text-xs text-ink/50">{fmt(o.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold">{inr(o.total)}</p>
                    <span className={`mt-1 inline-block rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${PILL[o.status] || PILL.placed}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-sm text-ink/75">
                  {o.items.map((i, idx) => (
                    <p key={idx}>
                      {i.qty}x {i.name} ({i.sizeLabel})
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      data-testid={`admin-status-${o.orderId}-${s}`}
                      onClick={() => setStatus(o.orderId, s)}
                      disabled={o.status === s}
                      className={`rounded-full px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                        o.status === s
                          ? "bg-ink text-bone"
                          : "border border-ink/20 text-ink hover:border-terra hover:text-terra"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
