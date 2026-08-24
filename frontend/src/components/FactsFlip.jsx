import { useState } from "react";
import { motion } from "framer-motion";
import { facts } from "../data/oilDetails";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { Sparkles, RotateCw } from "lucide-react";

const FlipCard = ({ fact, i, lang, flipLabel, dark }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="h-56 cursor-pointer select-none [perspective:1000px] md:h-64"
      onClick={() => setFlipped(!flipped)}
      data-testid={`fact-card-${i}`}
      role="button"
      aria-label={`Fact ${i + 1}`}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`absolute inset-0 flex flex-col justify-between rounded-3xl border p-6 [backface-visibility:hidden] ${
            dark ? "border-bone/15 bg-bone/5" : "border-ink/10 bg-sand"
          }`}
        >
          <span className={`font-display text-5xl font-light ${dark ? "text-gold/40" : "text-terra/30"}`}>
            0{i + 1}
          </span>
          <div>
            <Sparkles className={`h-6 w-6 ${dark ? "text-gold" : "text-terra"}`} />
            <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] opacity-60">
              <RotateCw className="h-3.5 w-3.5" /> {flipLabel}
            </p>
          </div>
        </div>
        <div
          className={`absolute inset-0 flex items-center rounded-3xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] ${
            dark ? "bg-gold text-forest" : "bg-terra text-bone"
          }`}
        >
          <p className="font-display text-lg font-semibold leading-snug md:text-xl">
            {lang === "hi" ? fact.hi : fact.en}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const FactsFlip = ({ dark = true }) => {
  const { lang, t } = useLang();
  return (
    <section
      data-testid="facts-section"
      className={`py-24 md:py-32 ${dark ? "bg-forest text-bone" : "bg-bone text-ink"}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className={`overline-tag ${dark ? "!text-gold" : ""}`}>{t("facts.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("facts.a")}</Reveal>
          <Reveal delay={0.22}>
            <span className={`italic ${dark ? "text-gold" : "text-terra"}`}>{t("facts.b")}</span>
          </Reveal>
        </h2>
        <FadeUp delay={0.25}>
          <p className={`mt-4 text-sm ${dark ? "text-bone/60" : "text-moss"}`}>{t("facts.flip")} ↓</p>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <FlipCard fact={f} i={i} lang={lang} flipLabel={t("facts.flip")} dark={dark} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
