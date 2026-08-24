import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { waLink, buyNowMessage } from "../lib/whatsapp";
import { Reveal, FadeUp } from "../components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck, Leaf } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export default function ProductDetail() {
  const { slug } = useParams();
  const product = useMemo(() => products.find((p) => p.slug === slug), [slug]);
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
    <main data-testid="product-detail-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 md:grid-cols-2 md:px-10">
        <FadeUp>
          <div className="arch sticky top-28 flex aspect-[3/4] items-center justify-center overflow-hidden" style={{ backgroundColor: product.tint }}>
            <div className="absolute h-2/3 w-2/3 rounded-full bg-gold/30 blur-3xl" />
            <img
              src={product.image}
              alt={product.name}
              data-testid="product-detail-image"
              className="relative z-10 h-[80%] w-auto object-contain drop-shadow-2xl"
            />
            <span className="absolute left-5 top-8 rounded-full bg-ink/85 px-3.5 py-1.5 text-[10px] font-bold tracking-widest text-bone">
              SAVE {Math.round((1 - size.price / size.mrp) * 100)}%
            </span>
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

          <FadeUp delay={0.28} className="mt-8">
            <p className="text-xs font-bold uppercase tracking-widest text-moss">Choose Size</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes.map((s, i) => (
                <button
                  key={s.label}
                  data-testid={`size-option-${s.label}`}
                  onClick={() => setSizeIdx(i)}
                  className={`rounded-2xl border px-5 py-3 text-left transition-colors duration-300 ${
                    i === sizeIdx ? "border-terra bg-terra/5" : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <span className="block text-sm font-extrabold">{s.label}</span>
                  <span className="mt-0.5 block text-xs text-moss">{inr(s.price)} · {inr(Math.round(s.price / parseInt(s.label)))}/L</span>
                </button>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.34} className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-ink/10 py-6">
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

          <FadeUp delay={0.4} className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          <FadeUp delay={0.46} className="mt-8 grid gap-3 sm:grid-cols-3">
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

          <FadeUp delay={0.5} className="mt-10">
            <Accordion type="single" collapsible defaultValue="benefits" data-testid="product-info-accordion">
              <AccordionItem value="benefits" className="border-ink/15">
                <AccordionTrigger data-testid="accordion-benefits" className="font-display text-lg font-semibold hover:no-underline">Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-1.5 pl-5 text-sm text-moss">
                    {product.benefits.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
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
            </Accordion>
          </FadeUp>
        </div>
      </div>
    </main>
  );
}
