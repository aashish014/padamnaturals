const API = process.env.REACT_APP_BACKEND_URL;

const req = async (path, opts = {}) => {
  const res = await fetch(`${API}/api${path}`, { credentials: "include", ...opts });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(typeof data.detail === "string" ? data.detail : res.statusText);
    err.status = res.status;
    throw err;
  }
  return res.json();
};

const json = (body) => ({
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const cartToOrderItems = (items) =>
  items.map((i) => ({
    slug: i.product.slug,
    name: i.product.name,
    sizeLabel: i.size.label,
    qty: i.qty,
    price: i.size.price,
  }));

export const createOrder = (items, total) =>
  req("/orders", { method: "POST", ...json({ items, total }) });

export const fetchOrder = (orderId) =>
  req(`/orders/${encodeURIComponent(orderId.trim().toUpperCase())}`);

export const updateOrder = (orderId, items, total) =>
  req(`/orders/${encodeURIComponent(orderId.trim().toUpperCase())}`, {
    method: "PUT",
    ...json({ items, total }),
  });

export const adminLogin = (email, password) =>
  req("/auth/login", { method: "POST", ...json({ email, password }) });

export const adminMe = () => req("/auth/me");

export const adminLogout = () => req("/auth/logout", { method: "POST" });

export const adminOrders = () => req("/admin/orders");

export const adminSetStatus = (orderId, status, note = null) =>
  req(`/admin/orders/${encodeURIComponent(orderId)}/status`, {
    method: "PATCH",
    ...json({ status, note }),
  });
