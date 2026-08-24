import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ghaniPillars, heatComparison } from "../data/oilDetails";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { Flame } from "lucide-react";

export const WhyGhani = ({ dark = true }) => {
  const [active, setActive] = useState(ghaniPillars[0]);
  const { t, lang } = useLang();
  const hi = lang === "hi";

  return (
    <section
      data-testid="why-ghani-section"
      className={`py-16 md:py-28 ${dark ? "bg-forest text-bone" : "bg-sand text-ink"}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className={`overline-tag ${dark ? "!text-gold" : ""}`}>{t("home.whyOver")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("home.whyA")}</Reveal>
          <Reveal delay={0.22}>
            <span className={`italic ${dark ? "text-gold" : "text-terra"}`}>{t("home.whyB")}</span>
          </Reveal>
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-3" data-testid="ghani-pillars">
            {ghaniPillars.map((p, i) => (
              <motion.button
                key={p.id}
                data-testid={`pillar-${p.id}`}
                onClick={() => setActive(p)}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-between rounded-2xl border px-6 py-5 text-left transition-colors duration-300 ${
                  active.id === p.id
                    ? dark
                      ? "border-gold bg-gold/10"
                      : "border-terra bg-terra/5"
                    : dark
                      ? "border-bone/15 hover:border-bone/40"
                      : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <span>
                  <span className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${active.id === p.id ? (dark ? "text-gold" : "text-terra") : "opacity-50"}`}>
                    0{i + 1} · {hi ? p.subtitleHi : p.subtitle}
                  </span>
                  <span className="mt-1 block font-display text-xl font-semibold">{hi ? p.hindi : p.title}</span>
                </span>
                <span className={`font-hindi text-lg ${active.id === p.id ? (dark ? "text-gold" : "text-terra") : "opacity-40"}`}>
                  {hi ? p.title : p.hindi}
                </span>
              </motion.button>
            ))}
          </div>

          <div className={`relative min-h-56 overflow-hidden rounded-3xl border p-8 md:p-10 ${dark ? "border-bone/15 bg-bone/5" : "border-ink/10 bg-bone"}`} data-testid="pillar-detail-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + lang}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={`font-hindi text-2xl ${dark ? "text-gold" : "text-terra"}`}>{active.hindi}</p>
                <p className="mt-2 font-display text-3xl font-semibold">{active.title}</p>
                <p className={`mt-4 max-w-lg text-sm leading-relaxed md:text-base ${dark ? "text-bone/70" : "text-moss"}`}>
                  {hi ? active.detailHi : active.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <FadeUp delay={0.15} className="mt-20">
          <div className="flex items-center gap-3">
            <Flame className={`h-5 w-5 ${dark ? "text-gold" : "text-terra"}`} />
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{t("home.heatLabel")}</p>
          </div>
          <div className="mt-8 flex flex-col gap-8" data-testid="heat-bars">
            {heatComparison.map((h, i) => (
              <div key={h.name} data-testid={`heat-bar-${i}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-lg font-semibold">{hi ? h.nameHi : h.name}</p>
                  <p className={`text-xs ${dark ? "text-bone/50" : "text-moss"}`}>{hi ? h.noteHi : h.note}</p>
                </div>
                <div className={`mt-2 h-3.5 w-full overflow-hidden rounded-full ${dark ? "bg-bone/10" : "bg-ink/10"}`}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: h.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(h.temp / 250) * 100}%` }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className={`mt-6 font-display text-lg italic ${dark ? "text-gold" : "text-terra"}`}>
            {t("home.heatNote")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
};
