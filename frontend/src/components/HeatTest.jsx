import { motion } from "framer-motion";
import { heatComparison } from "../data/oilDetails";
import { FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { Flame } from "lucide-react";

export const HeatTest = ({ dark = true }) => {
  const { t, lang } = useLang();
  const hi = lang === "hi";

  return (
    <section
      data-testid="heat-test-section"
      className={`py-16 md:py-24 ${dark ? "bg-forest text-bone" : "bg-bone text-ink"}`}
    >
      <div className="mx-auto max-w-4xl px-5 md:px-10">
        <FadeUp>
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
                    initial={{ width: "8%" }}
                    animate={{ width: `${Math.max((h.temp / 250) * 100, 8)}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
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
