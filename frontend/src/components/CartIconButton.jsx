import { ShoppingBasket } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export const CartIconButton = ({ testid = "cart-icon-button", className = "" }) => {
  const { count, setOpen } = useCart();
  return (
    <motion.button
      data-testid={testid}
      onClick={() => setOpen(true)}
      whileTap={{ scale: 0.88 }}
      aria-label="View basket"
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-bone text-ink transition-colors duration-300 hover:border-terra hover:text-terra ${className}`}
    >
      <ShoppingBasket className="h-5 w-5" />
      {count > 0 && (
        <span
          data-testid="cart-count-badge"
          className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra px-1 text-[10px] font-extrabold text-bone"
        >
          {count}
        </span>
      )}
    </motion.button>
  );
};
