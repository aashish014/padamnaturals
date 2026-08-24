import { FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { BadgeCheck, FlaskConical, Sparkles, Package } from "lucide-react";

const items = [
  { icon: BadgeCheck, en: "100% Pure & Unrefined", hi: "100% शुद्ध, बिना रिफाइंड" },
  { icon: FlaskConical, en: "No Added Chemicals", hi: "कोई केमिकल नहीं" },
  { icon: Sparkles, en: "Freshly Pressed", hi: "ताज़ा निचोड़ा हुआ" },
  { icon: Package, en: "Carefully Packed", hi: "सावधानी से पैक" },
];

export const QualityPromise = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
    <section data-testid="quality-promise" className="border-y border-ink/10 bg-bone py-10">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <FadeUp>
          <p className="overline-tag text-center">{t("qp.over")}</p>
        </FadeUp>
        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((item, i) => (
            <FadeUp key={item.en} delay={i * 0.08}>
              <div className="flex items-center justify-center gap-3 rounded-2xl bg-sand px-4 py-4" data-testid={`promise-${i}`}>
                <item.icon className="h-5 w-5 shrink-0 text-terra" />
                <p className="text-xs font-bold leading-snug md:text-sm">{hi ? item.hi : item.en}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
