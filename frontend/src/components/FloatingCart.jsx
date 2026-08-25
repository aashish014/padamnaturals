import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "../context/CartContext";

export const FloatingCart = () => {
  const { count, open, setOpen } = useCart();
  const { pathname } = useLocation();
  const show = count > 0 && !open;
  // Product pages have a sticky buy bar above the bottom nav — float higher there
  const onPdp = pathname.startsWith("/product/");

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="floating-cart"
          data-testid="floating-cart-button"
          onClick={() => setOpen(true)}
          initial={{ scale: 0, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          whileTap={{ scale: 0.88 }}
          aria-label="View basket"
          className={`fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-terra text-bone shadow-[0_14px_34px_-10px_rgba(184,84,42,0.6)] md:bottom-8 md:right-8 ${
            onPdp ? "bottom-[152px]" : "bottom-[84px]"
          }`}
        >
          <ShoppingBasket className="h-6 w-6" />
          <motion.span
            key={count}
            initial={{ scale: 1.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            data-testid="cart-count-badge"
            className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-1.5 text-[11px] font-extrabold text-bone"
          >
            {count}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
