import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Marquee } from "../components/Marquee";
import { Reveal, FadeUp } from "../components/Reveal";
import { useLang } from "../i18n";

export default function Shop() {
  const { t } = useLang();
  return (
    <main data-testid="shop-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">{t("shop.over")}</p>
        </Reveal>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>{t("shop.a")}</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">{t("shop.b")}</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-moss md:text-base">
            {t("shop.sub")}
          </p>
        </FadeUp>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 pb-24 md:gap-x-8 md:gap-y-16 lg:grid-cols-3">
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
