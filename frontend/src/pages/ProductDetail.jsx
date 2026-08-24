import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";
import { galleries, oilHealth } from "../data/oilDetails";
import { useCart } from "../context/CartContext";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { Gallery } from "../components/Gallery";
import { WhyGhani } from "../components/WhyGhani";
import { ProductCard } from "../components/ProductCard";
import { waLink, buyNowMessage } from "../lib/whatsapp";
import { Reveal, FadeUp } from "../components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Leaf, Heart, Sparkles, Zap, Flame } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const BENEFIT_ICONS = [Heart, Sparkles, ShieldCheck, Zap];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
  const health = oilHealth[slug];
  const gallery = galleries[slug];
  const related = useMemo(() => products.filter((p) => p.slug !== slug).slice(0, 3), [slug]);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bone pt-24" data-testid="product-not-found">
        <p className="font-display text-3xl italic text-moss">This oil has wandered off…</p>
        <Link to="/shop" data-testid="not-found-shop-link" className="rounded-full bg-terra px-7 py-3 text-sm font-bold text-bone">Back to Shop</Link>
      </main>
    );
  }

  const size = product.sizes[sizeIdx];
  const perLitre = Math.round(size.price / parseInt(size.label));

  return (
    <main data-testid="product-detail-page" className="bg-bone pt-24 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-2 md:gap-14 md:px-10 md:pb-24">
        <FadeUp>
          <div className="md:sticky md:top-28">
            <Gallery images={gallery} name={product.name} tint={product.tint} />
          </div>
        </FadeUp>

        <div>
          <Reveal immediate>
            <p className="overline-tag">{product.hindi}</p>
          </Reveal>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl" data-testid="product-detail-name">
            <Reveal immediate delay={0.1}>{product.name}</Reveal>
          </h1>
          <FadeUp delay={0.2}>
            <p className="mt-3 font-display text-xl italic text-moss">{product.tagline}</p>
          </FadeUp>

          <FadeUp delay={0.26} className="mt-7">
            <p className="text-xs font-bold uppercase tracking-widest text-moss">Choose Size</p>
            <div className="mt-3 grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  data-testid={`size-option-${s.label}`}
                  onClick={() => setSizeIdx(i)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-colors duration-300 sm:px-5 ${
                    i === sizeIdx ? "border-terra bg-terra/5" : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <span className="block text-sm font-extrabold">{s.label}</span>
                  <span className="mt-0.5 block text-[11px] text-moss sm:text-xs">{inr(s.price)} · {inr(Math.round(s.price / parseInt(s.label)))}/L</span>
                </button>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.32} className="mt-7 flex flex-wrap items-end justify-between gap-4 border-y border-ink/10 py-6">
            <div>
              <span className="font-display text-4xl font-bold" data-testid="product-detail-price">{inr(size.price)}</span>
              <span className="ml-3 text-lg text-moss line-through">{inr(size.mrp)}</span>
              <p className="mt-1 text-xs font-semibold text-moss">{inr(perLitre)}/L · Launch offer applied</p>
            </div>
            <div className="flex items-center gap-4 rounded-full border border-ink/20 px-3 py-2">
              <button data-testid="qty-minus-button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-extrabold" data-testid="qty-value">{qty}</span>
              <button data-testid="qty-plus-button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={0.38} className="mt-7 hidden gap-3 sm:flex">
            <a
              href={waLink(buyNowMessage(product, size, qty))}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="buy-now-whatsapp-button"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-terra py-4 text-sm font-bold text-bone transition-all duration-300 hover:scale-[0.98] hover:bg-terra-dark"
            >
              <WhatsAppIcon className="h-5 w-5" /> Buy Now on WhatsApp
            </a>
            <button
              data-testid="add-to-order-button"
              onClick={() => add(product, size, qty)}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full border border-ink py-4 text-sm font-bold transition-colors duration-300 hover:bg-ink hover:text-bone"
            >
              <ShoppingBag className="h-5 w-5" /> Add to Order
            </button>
          </FadeUp>

          <FadeUp delay={0.44} className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              [Truck, "Free delivery over ₹599"],
              [ShieldCheck, "0% chemicals, 0% trans fat"],
              [Leaf, "Fresh small batches"],
            ].map(([Icon, t]) => (
              <div key={t} className="flex items-center gap-2.5 rounded-xl bg-sand px-4 py-3 text-xs font-semibold">
                <Icon className="h-4 w-4 shrink-0 text-terra" /> {t}
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      {health && (
        <section data-testid="health-section" className="bg-sand py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-10">
            <Reveal>
              <p className="overline-tag">Health Benefits · सेहत के फायदे</p>
            </Reveal>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
              <Reveal delay={0.1}>Why {product.name.replace("Lakdi Ghani ", "")}</Reveal>
              <Reveal delay={0.22}>
                <span className="italic text-terra">loves your body.</span>
              </Reveal>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {health.benefits.map((b, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                return (
                  <FadeUp key={b.title} delay={i * 0.08}>
                    <div
                      data-testid={`benefit-card-${i}`}
                      className="group h-full rounded-3xl border border-ink/10 bg-bone p-6 transition-colors duration-300 hover:border-terra/40 md:p-8"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand transition-colors duration-300 group-hover:bg-terra group-hover:text-bone">
                        <Icon className="h-5 w-5 text-terra transition-colors duration-300 group-hover:text-bone" />
                      </div>
                      <p className="mt-4 font-display text-xl font-semibold">{b.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-moss">{b.desc}</p>
                    </div>
                  </FadeUp>
                );
              })}
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-2">
              <FadeUp>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">What's inside — nutrition retained</p>
                <div className="mt-6 flex flex-col gap-5" data-testid="nutrient-bars">
                  {health.nutrients.map((n, i) => (
                    <div key={n.name} data-testid={`nutrient-${i}`}>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{n.name}</span>
                        <span className="font-extrabold text-terra">{n.level}%</span>
                      </div>
                      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-ink/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold to-terra"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${n.level}%` }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{ duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-moss">Best for</p>
                <div className="mt-6 flex flex-wrap gap-2.5" data-testid="best-for-chips">
                  {health.bestFor.map((t) => (
                    <span key={t} className="rounded-full border border-ink/15 bg-bone px-5 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-terra hover:text-terra">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex items-start gap-3 rounded-2xl bg-bone p-5">
                  <Flame className="mt-0.5 h-5 w-5 shrink-0 text-terra" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-moss">Smoke Point</p>
                    <p className="mt-1 text-sm font-semibold">{health.smokePoint}</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      <WhyGhani dark={true} />

      <div className="mx-auto max-w-3xl px-5 py-16 md:px-10">
        <Accordion type="single" collapsible defaultValue="uses" data-testid="product-info-accordion">
          <AccordionItem value="uses" className="border-ink/15">
            <AccordionTrigger data-testid="accordion-uses" className="font-display text-lg font-semibold hover:no-underline">Uses</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-moss">{product.uses}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="storage" className="border-ink/15">
            <AccordionTrigger data-testid="accordion-storage" className="font-display text-lg font-semibold hover:no-underline">Storage & Shelf Life</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-moss">
              Store in a cool, dry place away from direct sunlight with the lid tightly closed. Best before 12 months from pressing; use within 6 months of opening for peak aroma.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="delivery" className="border-ink/15">
            <AccordionTrigger data-testid="accordion-delivery" className="font-display text-lg font-semibold hover:no-underline">Delivery</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-moss">
              Free delivery on orders above ₹599. Confirm your order on WhatsApp and pay on delivery — no advance payment needed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10" data-testid="related-section">
        <Reveal>
          <p className="overline-tag">You May Also Love</p>
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-ink/10 bg-bone/95 px-4 py-3 backdrop-blur-md sm:hidden" data-testid="mobile-sticky-buy-bar">
        <div className="shrink-0">
          <p className="font-display text-lg font-bold leading-none">{inr(size.price * qty)}</p>
          <p className="mt-0.5 text-[10px] font-semibold text-moss">{size.label} · Qty {qty}</p>
        </div>
        <a
          href={waLink(buyNowMessage(product, size, qty))}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-buy-now-button"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-terra py-3.5 text-sm font-bold text-bone active:scale-95"
        >
          <WhatsAppIcon className="h-4 w-4" /> Buy Now
        </a>
        <button
          data-testid="mobile-add-button"
          onClick={() => add(product, size, qty)}
          aria-label="Add to order"
          className="shrink-0 rounded-full border border-ink p-3.5 active:bg-ink active:text-bone"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}
