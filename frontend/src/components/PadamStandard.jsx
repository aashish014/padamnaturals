import { statStrip } from "../data/oilDetails";
import { FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { Thermometer, FlaskConical, Wheat, HeartHandshake } from "lucide-react";

const STAT_ICONS = { Thermometer, FlaskConical, Wheat, HeartHandshake };

export const PadamStandard = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
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
  );
};
