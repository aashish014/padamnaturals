import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { galleries, oilHealth, oilFaqs } from "../data/oilDetails";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { Gallery } from "../components/Gallery";
import { WhyGhani } from "../components/WhyGhani";
import { PadamStandard } from "../components/PadamStandard";
import { LoveWall } from "../components/LoveWall";
import { OilTile } from "../components/home/OilGrid";
import { Reveal, FadeUp } from "../components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Minus, Plus, Truck, ShieldCheck, Leaf, Heart, Sparkles, Zap, Flame } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const BENEFIT_ICONS = [Heart, Sparkles, ShieldCheck, Zap];
const RING_C = 2 * Math.PI * 30;

const NutrientRing = ({ name, level, i }) => (
  <FadeUp delay={i * 0.08}>
    <motion.div
      whileTap={{ scale: 0.94 }}
      className="flex flex-col items-center gap-3 rounded-3xl border border-ink/10 bg-bone p-5 text-center"
      data-testid={`nutrient-ring-${i}`}
    >
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle cx="36" cy="36" r="30" fill="none" strokeWidth="7" className="stroke-ink/10" />
          <motion.circle
            cx="36" cy="36" r="30" fill="none" strokeWidth="7" strokeLinecap="round"
            className="stroke-terra"
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: RING_C }}
            whileInView={{ strokeDashoffset: RING_C * (1 - level / 100) }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.3, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-terra">
          {level}%
        </span>
      </div>
      <p className="text-xs font-semibold leading-tight">{name}</p>
    </motion.div>
  </FadeUp>
);

export default function ProductDetail() {
  const { slug } = useParams();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
  const health = oilHealth[slug];
  const gallery = galleries[slug];
  const faqs = oilFaqs[slug] || [];
  const related = useMemo(() => products.filter((p) => p.slug !== slug).slice(0, 4), [slug]);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const { lang, t } = useLang();
  const hi = lang === "hi";

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bone pt-24" data-testid="product-not-found">
        <p className="font-display text-3xl italic text-moss">This oil has wandered off…</p>
        <Link to="/shop" data-testid="not-found-shop-link" className="rounded-full bg-terra px-7 py-3 text-sm font-bold text-bone">Back to Shop</Link>
      </main>
    );
  }

  const size = product.sizes[sizeIdx];
  const perLitre = Math.round((size.price * 1000) / size.ml);
  const displayName = hi ? product.hindi : product.name.replace("Lakdi Ghani ", "");
  const buyNow = () => {
    add(product, size, qty);
    setOpen(true);
  };

  return (
    <main data-testid="product-detail-page" className="bg-bone pt-24 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:gap-14 md:px-10 md:pb-24">
        <FadeUp className="min-w-0">
          <div className="min-w-0 md:sticky md:top-28">
            <Gallery images={gallery} name={product.name} tint={product.tint} />
          </div>
        </FadeUp>

        <div className="min-w-0">
          <Reveal immediate>
            <p className="overline-tag">{product.hindi}</p>
          </Reveal>
          <h1 className="mt-3 break-words font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl" data-testid="product-detail-name">
            <Reveal immediate delay={0.1}>{product.name}</Reveal>
          </h1>
          <FadeUp delay={0.2}>
            <p className="mt-3 font-display text-xl italic text-moss">{hi ? product.taglineHi : product.tagline}</p>
          </FadeUp>

          <FadeUp delay={0.26} className="mt-7">
            <p className="text-xs font-bold uppercase tracking-widest text-moss">{t("pdp.chooseSize")}</p>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {product.sizes.map((s, i) => (
                <motion.button
                  key={s.label}
                  data-testid={`size-option-${s.label.replace(/\s/g, "")}`}
                  onClick={() => setSizeIdx(i)}
                  whileTap={{ scale: 0.93 }}
                  className={`rounded-2xl border px-4 py-3 text-left transition-colors duration-300 sm:px-5 ${
                    i === sizeIdx ? "border-terra bg-terra/5" : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <span className="block text-sm font-extrabold">{s.label}</span>
                  <span className="mt-0.5 block text-[11px] text-moss sm:text-xs">{inr(s.price)} · {inr(Math.round((s.price * 1000) / s.ml))}/L</span>
                </motion.button>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.32} className="mt-7 flex flex-wrap items-end justify-between gap-4 border-y border-ink/10 py-6">
            <div>
              <span className="font-display text-4xl font-bold" data-testid="product-detail-price">{inr(size.price)}</span>
              <p className="mt-1 text-xs font-semibold text-moss">{inr(perLitre)}/L · {t("pdp.launch")}</p>
            </div>
            <div className="flex items-center gap-4 rounded-full border border-ink/20 px-3 py-2">
              <motion.button whileTap={{ scale: 0.85 }} data-testid="qty-minus-button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="w-6 text-center font-extrabold" data-testid="qty-value">{qty}</span>
              <motion.button whileTap={{ scale: 0.85 }} data-testid="qty-plus-button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
          </FadeUp>

          <FadeUp delay={0.38} className="mt-7 hidden sm:flex">
            <motion.button
              data-testid="buy-now-whatsapp-button"
              onClick={buyNow}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-terra py-4 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra-dark"
            >
              <WhatsAppIcon className="h-5 w-5" /> {t("pdp.buyNow")}
            </motion.button>
          </FadeUp>

          <FadeUp delay={0.44} className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [Truck, t("pdp.free")],
              [ShieldCheck, t("pdp.zero")],
              [Leaf, t("pdp.fresh")],
            ].map(([Icon, label]) => (
              <div key={label} className="flex items-center gap-2.5 rounded-xl bg-sand px-4 py-3 text-xs font-semibold">
                <Icon className="h-4 w-4 shrink-0 text-terra" /> {label}
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      {health && (
        <section data-testid="health-section" className="bg-sand py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Reveal>
              <p className="overline-tag">{t("pdp.healthOver")}</p>
            </Reveal>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              <Reveal delay={0.1}>{t("pdp.healthWhy")} {displayName}</Reveal>
              <Reveal delay={0.22}>
                <span className="italic text-terra">{t("pdp.healthB")}</span>
              </Reveal>
            </h2>

            <FadeUp delay={0.2} className="mt-8">
              <Accordion type="single" collapsible className="w-full" data-testid="benefits-accordion">
                {health.benefits.map((b, i) => {
                  const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                  return (
                    <AccordionItem key={i} value={`benefit-${i}`} className="border-ink/15">
                      <AccordionTrigger data-testid={`benefit-trigger-${i}`} className="py-4 text-left hover:no-underline">
                        <span className="flex items-center gap-3.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bone">
                            <Icon className="h-4 w-4 text-terra" />
                          </span>
                          <span className="font-display text-lg font-semibold">{hi ? b.titleHi : b.title}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pl-[3.25rem] text-sm leading-relaxed text-moss">
                        {hi ? b.descHi : b.desc}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </FadeUp>

            <div className="mt-14">
              <FadeUp>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">{t("pdp.inside")}</p>
              </FadeUp>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4" data-testid="nutrient-rings">
                {health.nutrients.map((n, i) => (
                  <NutrientRing key={n.name} name={hi ? n.nameHi : n.name} level={n.level} i={i} />
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <FadeUp>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">{t("pdp.bestFor")}</p>
                <div className="mt-6 flex flex-wrap gap-2.5" data-testid="best-for-chips">
                  {(hi ? health.bestForHi : health.bestFor).map((chip) => (
                    <motion.span
                      key={chip}
                      whileTap={{ scale: 0.92 }}
                      className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-terra hover:text-terra"
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div className="flex items-start gap-3 rounded-2xl bg-bone p-5">
                  <Flame className="mt-0.5 h-5 w-5 shrink-0 text-terra" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-moss">{t("pdp.smoke")}</p>
                    <p className="mt-1 text-sm font-semibold">{hi ? health.smokePointHi : health.smokePoint}</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      <WhyGhani dark={true} />

      <section data-testid="product-faq-section" className="bg-bone py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <Reveal>
            <p className="overline-tag">{t("pdp.faqOver")}</p>
          </Reveal>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <Reveal delay={0.1}>{t("pdp.faqA")}</Reveal>
            <Reveal delay={0.22}>
              <span className="italic text-terra">{t("pdp.faqB")}</span>
            </Reveal>
          </h2>
          <FadeUp delay={0.2} className="mt-8">
            <Accordion type="single" collapsible data-testid="product-faq-accordion">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-ink/15">
                  <AccordionTrigger data-testid={`product-faq-trigger-${i}`} className="py-4 text-left font-display text-lg font-semibold hover:text-terra hover:no-underline">
                    {hi ? f.qHi : f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-moss">{hi ? f.aHi : f.a}</AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="storage" className="border-ink/15">
                <AccordionTrigger data-testid="product-faq-storage" className="py-4 text-left font-display text-lg font-semibold hover:text-terra hover:no-underline">
                  {t("pdp.storage")}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-moss">{t("pdp.storageText")}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery" className="border-ink/15">
                <AccordionTrigger data-testid="product-faq-delivery" className="py-4 text-left font-display text-lg font-semibold hover:text-terra hover:no-underline">
                  {t("pdp.delivery")}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-moss">{t("pdp.deliveryText")}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </FadeUp>
          <PadamStandard />
        </div>
      </section>

      <LoveWall />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10" data-testid="related-section">
        <Reveal>
          <p className="overline-tag">{t("pdp.related")}</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5" data-testid="related-grid">
          {related.map((p, i) => (
            <OilTile key={p.slug} product={p} i={i} t={t} />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-16 z-40 flex items-center gap-3 border-t border-ink/10 bg-bone/95 px-4 py-3 backdrop-blur-md sm:hidden" data-testid="mobile-sticky-buy-bar">
        <div className="shrink-0">
          <p className="font-display text-lg font-bold leading-none">{inr(size.price * qty)}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-moss">{size.label} · Qty {qty}</p>
        </div>
        <motion.button
          data-testid="mobile-buy-now-button"
          onClick={buyNow}
          whileTap={{ scale: 0.95 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terra py-3.5 text-sm font-bold text-bone"
        >
          <WhatsAppIcon className="h-4 w-4" /> {t("pdp.buyShort")}
        </motion.button>
      </div>
    </main>
  );
}

