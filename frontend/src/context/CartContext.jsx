import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { products } from "../data/products";

const CartContext = createContext(null);
const KEY = "padam_cart_v1";
const META_KEY = "padam_order_meta_v1";
const MY_ORDERS_KEY = "padam_my_orders_v1";

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => readJson(KEY, []));
  const [open, setOpen] = useState(false);
  const [orderMeta, setOrderMeta] = useState(() => readJson(META_KEY, null));
  const [myOrders, setMyOrders] = useState(() => readJson(MY_ORDERS_KEY, []));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (orderMeta) localStorage.setItem(META_KEY, JSON.stringify(orderMeta));
    else localStorage.removeItem(META_KEY);
  }, [orderMeta]);

  useEffect(() => {
    localStorage.setItem(MY_ORDERS_KEY, JSON.stringify(myOrders));
  }, [myOrders]);

  const add = (product, size, qty = 1) => {
    const id = `${product.slug}-${size.label}`;
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found)
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, product, size, qty }];
    });
    toast.success(`${product.name} (${size.label}) added to your order`);
  };

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const clear = () => {
    setItems([]);
    setOrderMeta(null);
  };

  const loadOrder = (orderItems, orderId) => {
    const rebuilt = orderItems
      .map((oi) => {
        const product = products.find((p) => p.slug === oi.slug);
        if (!product) return null;
        const size =
          product.sizes.find((s) => s.label === oi.sizeLabel) || {
            label: oi.sizeLabel,
            price: oi.price,
            ml: 1000,
          };
        return { id: `${product.slug}-${size.label}`, product, size, qty: oi.qty };
      })
      .filter(Boolean);
    setItems(rebuilt);
    setOrderMeta({ orderId });
  };

  const rememberOrder = (orderId) =>
    setMyOrders((prev) => [orderId, ...prev.filter((x) => x !== orderId)].slice(0, 10));

  const { total, count } = useMemo(() => {
    const total = items.reduce((s, i) => s + i.size.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return { total, count };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        setQty,
        clear,
        total,
        count,
        open,
        setOpen,
        orderMeta,
        loadOrder,
        myOrders,
        rememberOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
