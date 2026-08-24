import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Marquee } from "../components/Marquee";
import { Reveal, FadeUp } from "../components/Reveal";

export default function Shop() {
  return (
    <main data-testid="shop-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">The Shop · दुकान</p>
        </Reveal>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>Pick your</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">liquid gold.</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-moss md:text-base">
            Six varieties of traditionally extracted Lakdi Ghani oils — for taste, health and wellness. Tap Buy Now and your order jumps straight to our WhatsApp.
          </p>
        </FadeUp>
        <div className="mt-16 grid gap-x-8 gap-y-16 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <div key={p.slug} className={i % 3 === 1 ? "lg:mt-14" : i % 3 === 2 ? "lg:mt-28" : ""}>
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
      <Marquee />
    </main>
  );
}
