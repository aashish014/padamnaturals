import { myths, statStrip } from "../data/oilDetails";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import {
  XCircle, CheckCircle2, Thermometer, FlaskConical, Wheat, HeartHandshake,
  Feather, Flame, Droplets, Wallet, Ban, Snowflake,
} from "lucide-react";

const ICONS = { Feather, Flame, Droplets, Wallet, Ban, Snowflake };
const STAT_ICONS = { Thermometer, FlaskConical, Wheat, HeartHandshake };

const MythCard = ({ m, i, hi, t }) => {
  const Icon = ICONS[m.icon] || Feather;
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10"
      data-testid={`myth-card-${i}`}
    >
      <div className="flex flex-1 items-start gap-4 bg-terra/5 p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-terra/15 text-terra">
          <Icon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <span className="flex w-max items-center gap-1.5 rounded-full bg-terra px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-bone">
            <XCircle className="h-3 w-3" /> {t("myths.myth")}
          </span>
          <p className="mt-3 font-display text-lg font-semibold leading-snug">{hi ? m.mythHi : m.myth}</p>
        </div>
        <span className="font-display text-3xl font-light text-terra/20">0{i + 1}</span>
      </div>
      <div className="flex flex-1 items-start gap-4 border-t-2 border-dashed border-ink/10 bg-moss/10 p-6">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-moss text-bone">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <span className="flex w-max items-center gap-1.5 rounded-full bg-moss px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] text-bone">
            {t("myths.fact")}
          </span>
          <p className="mt-3 font-display text-lg font-semibold leading-snug">{hi ? m.factHi : m.fact}</p>
        </div>
      </div>
    </div>
  );
};

export const MythFacts = ({ dark = false }) => {
  const { lang, t } = useLang();
  const hi = lang === "hi";
  return (
    <section
      data-testid="myths-section"
      className={`py-16 md:py-28 ${dark ? "bg-forest text-bone" : "bg-sand text-ink"}`}
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
          <p className={`mt-4 text-sm font-semibold ${dark ? "text-bone/60" : "text-moss"}`}>
            {t("myths.hint2")}
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="myths-grid">
          {myths.map((m, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <MythCard m={m} i={i} hi={hi} t={t} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-16">
          <div className="rounded-3xl bg-[#2F5233] p-6 text-bone md:p-10" data-testid="padam-standard-box">
            <div className="text-center">
              <p className="font-display text-2xl font-semibold text-gold md:text-4xl">{t("myths.standard")}</p>
              <p className="mt-2 font-display text-lg italic text-bone/80 md:text-xl">{t("myths.standardSub")}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4" data-testid="stat-strip">
              {statStrip.map((s, i) => {
                const Icon = STAT_ICONS[s.icon];
                return (
                  <div key={s.label} className="flex flex-col items-center gap-3 rounded-2xl bg-bone/10 px-4 py-7 text-center" data-testid={`stat-tile-${i}`}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-display text-3xl font-bold text-gold md:text-4xl">{s.value}</p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-bone/60">
                      {hi ? s.labelHi : s.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
