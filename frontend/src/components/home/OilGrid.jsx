import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../../data/products";
import { useLang } from "../../i18n";
import { Reveal, FadeUp } from "../Reveal";
import { ArrowUpRight, Wheat } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

const Tile = ({ product, i, t }) => (
  <FadeUp delay={i * 0.07}>
    <Link to={`/product/${product.slug}`} data-testid={`oil-tile-${product.slug}`}>
      <motion.div
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 p-5 transition-colors duration-500"
        style={{ backgroundColor: product.tint }}
      >
        <div className="flex items-start justify-between">
          <span className="font-hindi text-lg text-terra">{product.hindi}</span>
          <span className="rounded-full bg-ink/85 p-2 text-bone transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="flex flex-1 items-center justify-center py-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-28 w-auto object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 md:h-36"
          />
        </div>
        <div>
          <p className="font-display text-base font-semibold leading-tight md:text-lg">
            {product.name.replace("Lakdi Ghani ", "")}
          </p>
          <p className="mt-1 text-xs font-bold text-moss">
            {t("grid.from")} {inr(product.sizes[0].price)} · {product.sizes[0].label}
          </p>
        </div>
      </motion.div>
    </Link>
  </FadeUp>
);

export const OilGrid = () => {
  const { t } = useLang();
  return (
    <section data-testid="oil-grid-section" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="overline-tag">{t("grid.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("grid.a")}</Reveal>
          <Reveal delay={0.22}>
            <span className="italic text-terra">{t("grid.b")}</span>
          </Reveal>
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5" data-testid="oil-grid">
          {products.map((p, i) => (
            <Tile key={p.slug} product={p} i={i} t={t} />
          ))}
          <FadeUp delay={products.length * 0.07}>
            <Link to="/your-seed-your-oil" data-testid="oil-tile-seed">
              <motion.div
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.96 }}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-forest p-5 text-bone"
              >
                <div className="flex items-start justify-between">
                  <span className="font-hindi text-lg text-gold">आपका बीज, आपका तेल</span>
                  <span className="rounded-full bg-bone/15 p-2 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <Wheat className="mx-auto h-14 w-14 text-gold transition-transform duration-500 group-hover:scale-110 md:h-16" />
                <div>
                  <p className="font-display text-base font-semibold leading-tight md:text-lg">{t("nav.seed")}</p>
                  <p className="mt-1 text-xs font-bold text-bone/70">{t("grid.seedSub")}</p>
                </div>
              </motion.div>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};
