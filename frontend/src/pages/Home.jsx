import { Link } from "react-router-dom";
import { Hero } from "../components/home/Hero";
import { Marquee } from "../components/Marquee";
import { Comparison } from "../components/home/Comparison";
import { Journey } from "../components/home/Journey";
import { Faq } from "../components/home/Faq";
import { OilGrid } from "../components/home/OilGrid";
import { WhyGhani } from "../components/WhyGhani";
import { LoveWall } from "../components/LoveWall";
import { Motto } from "../components/Motto";
import { MythFacts } from "../components/MythFacts";
import { Reveal, FadeUp } from "../components/Reveal";
import { useLang } from "../i18n";
import { Flame, Leaf, Sparkles } from "lucide-react";

const Values = () => {
  const { t } = useLang();
  const items = [
    [Flame, t("home.val1t"), t("home.val1d")],
    [Leaf, t("home.val2t"), t("home.val2d")],
    [Sparkles, t("home.val3t"), t("home.val3d")],
  ];
  return (
    <section data-testid="values-section" className="border-y border-ink/10 bg-bone py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-3 md:px-10">
        {items.map(([Icon, title, d], i) => (
          <FadeUp key={title} delay={i * 0.12} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand">
              <Icon className="h-5 w-5 text-terra" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-moss">{d}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const CtaBand = () => {
  const { t } = useLang();
  return (
    <section data-testid="cta-band" className="relative overflow-hidden bg-terra py-24 text-bone md:py-28">
      <p className="pointer-events-none absolute -bottom-10 left-0 right-0 select-none text-center font-hindi text-[22vw] leading-none text-bone/10">
        शुद्धता
      </p>
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <h2 className="font-hindi text-4xl leading-tight sm:text-5xl">
          <Reveal immediate>सेहत भरी हर बूँद</Reveal>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-md font-display text-xl italic text-bone/85">
            {t("home.ctaSub")}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            to="/shop"
            data-testid="cta-shop-button"
            className="mt-10 inline-block rounded-full bg-bone px-10 py-4 text-sm font-bold text-ink transition-transform duration-300 hover:scale-95"
          >
            {t("home.ctaBtn")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <OilGrid />
      <LoveWall />
      <Values />
      <WhyGhani dark={false} />
      <Comparison />
      <MythFacts dark={false} />
      <Journey />
      <Motto />
      <Faq />
      <CtaBand />
    </main>
  );
}
