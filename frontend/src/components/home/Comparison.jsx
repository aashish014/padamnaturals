import { useRef } from "react";
import { comparison } from "../../data/products";
import { Reveal, FadeUp } from "../Reveal";
import { useLang } from "../../i18n";
import { useAutoScrollX } from "../../lib/scroll";
import { Check, X } from "lucide-react";

export const Comparison = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  const tableRef = useRef(null);
  useAutoScrollX(tableRef);
  return (
  <section data-testid="comparison-section" className="bg-forest py-16 text-bone md:py-28">
    <div className="mx-auto max-w-6xl px-5 md:px-10">
      <Reveal>
        <p className="overline-tag !text-gold">{t("home.compOver")}</p>
      </Reveal>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
        <Reveal delay={0.1}>{t("home.compA")}</Reveal>
        <Reveal delay={0.22}>
          <span className="italic text-gold">{t("home.compB")}</span>
        </Reveal>
      </h2>
      <FadeUp delay={0.3} className="mt-4 max-w-lg text-sm leading-relaxed text-bone/60">
        {t("home.compSub")}
      </FadeUp>

      <FadeUp delay={0.2} className="mt-14 overflow-x-auto">
        <div ref={tableRef} className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left" data-testid="comparison-table">
          <thead>
            <tr className="border-b border-gold/30 text-xs uppercase tracking-[0.18em]">
              <th className="py-4 pr-4 font-bold text-bone/50">{hi ? "बात" : "Factor"}</th>
              <th className="px-4 py-4 font-bold text-bone/40">{hi ? "रिफाइंड तेल" : "Refined Oil"}</th>
              <th className="px-4 py-4 font-bold text-bone/40">{hi ? "मामूली तेल" : "Ordinary Oil"}</th>
              <th className="py-4 pl-4 font-bold text-gold">{hi ? "पदम लकड़ी घानी" : "Padam Lakdi Ghani"}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.factor} className="border-b border-bone/10 align-top transition-colors duration-300 hover:bg-bone/5">
                <td className="py-5 pr-4 text-sm font-bold">{hi ? row.factorHi : row.factor}</td>
                <td className="px-4 py-5 text-sm text-bone/40">
                  <span className="flex gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-terra/70" />{hi ? row.refinedHi : row.refined}</span>
                </td>
                <td className="px-4 py-5 text-sm text-bone/40">{hi ? row.ordinaryHi : row.ordinary}</td>
                <td className="py-5 pl-4 text-sm font-semibold text-gold">
                  <span className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" />{hi ? row.padamHi : row.padam}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </FadeUp>
    </div>
  </section>
  );
};
