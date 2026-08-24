import { Link } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/Marquee";
import { Comparison } from "../components/home/Comparison";
import { Journey } from "../components/home/Journey";
import { Faq } from "../components/home/Faq";
import { ProductCard } from "../components/ProductCard";
import { Reveal, FadeUp } from "../components/Reveal";
import { products } from "../data/products";
import { Flame, Leaf, Sparkles } from "lucide-react";

const Range = () => (
  <section data-testid="range-section" className="bg-bone py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="overline-tag">Our Range</p>
          </Reveal>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
            <Reveal delay={0.1}>Six pure oils,</Reveal>
            <Reveal delay={0.22}>
              <span className="italic text-terra">one honest promise.</span>
            </Reveal>
          </h2>
        </div>
        <FadeUp delay={0.3}>
          <Link to="/shop" data-testid="range-view-all-link" className="rounded-full border border-ink px-7 py-3.5 text-sm font-bold transition-colors duration-300 hover:bg-ink hover:text-bone">
            View All Oils
          </Link>
        </FadeUp>
      </div>
      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((p, i) => (
          <div key={p.slug} className={i % 3 === 1 ? "lg:mt-14" : ""}>
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Values = () => (
  <section data-testid="values-section" className="border-y border-ink/10 bg-bone py-16">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3 md:px-10">
      {[
        [Flame, "No heat, no chemicals", "Slow-pressed below 45℃ so nothing good burns away."],
        [Leaf, "100% natural & unrefined", "No hexane, no bleaching, no preservatives. Ever."],
        [Sparkles, "Rich in nutrients & flavour", "Vitamins E, K and Omega-3 retained, drop after drop."],
      ].map(([Icon, t, d], i) => (
        <FadeUp key={t} delay={i * 0.12} className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand">
            <Icon className="h-5 w-5 text-terra" />
          </div>
          <div>
            <p className="font-display text-xl font-semibold">{t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-moss">{d}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </section>
);

const CtaBand = () => (
  <section data-testid="cta-band" className="relative overflow-hidden bg-terra py-24 text-bone md:py-28">
    <p className="pointer-events-none absolute -bottom-10 left-0 right-0 select-none text-center font-hindi text-[22vw] leading-none text-bone/10">
      शुद्धता
    </p>
    <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
      <h2 className="font-hindi text-4xl leading-tight sm:text-5xl">
        <Reveal>सेहत भरी हर बूँद</Reveal>
      </h2>
      <Reveal delay={0.15}>
        <p className="mx-auto mt-5 max-w-md font-display text-xl italic text-bone/85">
          Health in every drop — order in one tap on WhatsApp.
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <Link
          to="/shop"
          data-testid="cta-shop-button"
          className="mt-10 inline-block rounded-full bg-bone px-10 py-4 text-sm font-bold text-ink transition-transform duration-300 hover:scale-95"
        >
          Start Your Order
        </Link>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <Range />
      <Values />
      <Comparison />
      <Journey />
      <Faq />
      <CtaBand />
    </main>
  );
}
