import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { myths, statStrip } from "../data/oilDetails";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import {
  XCircle, CheckCircle2, Thermometer, FlaskConical, Wheat, HeartHandshake,
  Feather, Flame, Droplets, Wallet, Ban, Snowflake, MousePointerClick,
} from "lucide-react";

const ICONS = { Feather, Flame, Droplets, Wallet, Ban, Snowflake };
const STAT_ICONS = { Thermometer, FlaskConical, Wheat, HeartHandshake };

const MythCard = ({ m, i, hi, t }) => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const Icon = ICONS[m.icon] || Feather;

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setRevealed(true), 700 + i * 380);
    return () => clearTimeout(id);
  }, [inView, i]);

  return (
    <motion.button
      ref={ref}
      onClick={() => setRevealed(!revealed)}
      whileTap={{ scale: 0.96 }}
      data-testid={`myth-card-${i}`}
      aria-label={`Myth ${i + 1}`}
      className={`relative flex min-h-44 w-full flex-col justify-between overflow-hidden rounded-3xl border p-6 text-left transition-colors duration-500 ${
        revealed ? "border-moss/40 bg-moss/10" : "border-terra/25 bg-terra/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.2em] ${
          revealed ? "bg-moss text-bone" : "bg-terra text-bone"
        }`}>
          {revealed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
          {revealed ? t("myths.fact") : t("myths.myth")}
        </span>
        <span className={`font-display text-4xl font-light ${revealed ? "text-moss/30" : "text-terra/25"}`}>
          0{i + 1}
        </span>
      </div>
      <div className="mt-5 flex items-end gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
          revealed ? "bg-moss text-bone" : "bg-terra/15 text-terra"
        }`}>
          <Icon className="h-6 w-6" />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={String(revealed) + (hi ? "hi" : "en")}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="font-display text-lg font-semibold leading-snug md:text-xl"
          >
            {revealed ? (hi ? m.factHi : m.fact) : (hi ? m.mythHi : m.myth)}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export const MythFacts = ({ dark = false }) => {
  const { lang, t } = useLang();
  const hi = lang === "hi";
  return (
    <section
      data-testid="myths-section"
      className={`py-24 md:py-32 ${dark ? "bg-forest text-bone" : "bg-sand text-ink"}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className={`overline-tag ${dark ? "!text-gold" : ""}`}>{t("myths.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("myths.a")}</Reveal>
          <Reveal delay={0.22}>
            <span className={`italic ${dark ? "text-gold" : "text-terra"}`}>{t("myths.b")}</span>
          </Reveal>
        </h2>
        <FadeUp delay={0.25}>
          <p className={`mt-4 flex items-center gap-2 text-sm font-semibold ${dark ? "text-bone/60" : "text-moss"}`}>
            <MousePointerClick className="h-4 w-4" /> {t("myths.hint")}
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="myths-grid">
          {myths.map((m, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <MythCard m={m} i={i} hi={hi} t={t} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-16 text-center">
          <p className={`overline-tag ${dark ? "!text-gold" : ""}`}>{t("myths.standard")}</p>
          <p className={`mt-2 font-display text-xl italic ${dark ? "text-bone/70" : "text-moss"}`}>{t("myths.standardSub")}</p>
        </FadeUp>
        <div className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border md:grid-cols-4 ${dark ? "border-bone/10 bg-bone/10" : "border-ink/10 bg-ink/10"}`} data-testid="stat-strip">
          {statStrip.map((s, i) => {
            const Icon = STAT_ICONS[s.icon];
            return (
              <FadeUp key={s.label} delay={i * 0.08}>
                <div className={`flex h-full flex-col items-center gap-3 px-4 py-8 text-center ${dark ? "bg-forest" : "bg-bone"}`} data-testid={`stat-tile-${i}`}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${dark ? "bg-gold/15 text-gold" : "bg-terra/10 text-terra"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className={`font-display text-3xl font-bold md:text-4xl ${dark ? "text-gold" : "text-terra"}`}>{s.value}</p>
                  <p className={`text-[11px] font-bold uppercase tracking-widest ${dark ? "text-bone/50" : "text-moss"}`}>
                    {hi ? s.labelHi : s.label}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};
