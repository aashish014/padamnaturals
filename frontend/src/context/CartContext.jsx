import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);
const KEY = "padam_cart_v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

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

  const clear = () => setItems([]);

  const { total, mrpTotal, count } = useMemo(() => {
    const total = items.reduce((s, i) => s + i.size.price * i.qty, 0);
    const mrpTotal = items.reduce((s, i) => s + i.size.mrp * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return { total, mrpTotal, count };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, add, setQty, clear, total, mrpTotal, count, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
