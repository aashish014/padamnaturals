import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FadeUp } from "./Reveal";
import { Plus } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export const ProductCard = ({ product, index = 0 }) => {
  const { add, setOpen } = useCart();
  const { t } = useLang();
  const size = product.sizes[0];
  const buy = () => {
    add(product, size);
    setOpen(true);
  };

  return (
    <FadeUp delay={(index % 3) * 0.12}>
      <div className="group" data-testid={`product-card-${product.slug}`}>
        <Link to={`/product/${product.slug}`} data-testid={`product-link-${product.slug}`}>
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="arch relative flex aspect-[3/4] items-end justify-center overflow-hidden transition-colors duration-700"
            style={{ backgroundColor: product.tint }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="relative z-10 h-[78%] w-auto object-contain drop-shadow-xl transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>
        </Link>
        <div className="mt-4 flex items-start justify-between gap-3 md:mt-5">
          <div className="min-w-0">
            <p className="font-hindi text-xs text-terra md:text-sm">{product.hindi}</p>
            <Link to={`/product/${product.slug}`} className="mt-1 block break-words font-display text-lg font-semibold leading-tight transition-colors hover:text-terra md:text-xl">
              {product.name}
            </Link>
            <p className="mt-1.5 text-xs md:text-sm">
              <span className="font-extrabold">{inr(size.price)}</span>
              <span className="ml-2 text-moss">
                {size.label}{product.sizes.length > 1 ? ` · ${product.sizes.length} sizes` : ""}
              </span>
            </p>
          </div>
          <motion.button
            data-testid={`product-add-${product.slug}`}
            onClick={() => add(product, size)}
            whileTap={{ scale: 0.85 }}
            aria-label={`Add ${product.name} to order`}
            className="mt-1 shrink-0 rounded-full border border-ink/20 p-2.5 transition-colors duration-300 hover:bg-ink hover:text-bone"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
        <motion.button
          onClick={buy}
          data-testid={`product-buy-now-${product.slug}`}
          whileTap={{ scale: 0.97 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-terra py-3 text-xs font-bold text-bone transition-colors duration-300 hover:bg-terra-dark md:text-sm"
        >
          <WhatsAppIcon className="h-4 w-4" /> {t("card.buyNow")}
        </motion.button>
      </div>
    </FadeUp>
  );
};
