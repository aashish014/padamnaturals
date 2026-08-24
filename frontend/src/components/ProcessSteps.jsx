import { useRef } from "react";
import { motion } from "framer-motion";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { useAutoScrollX } from "../lib/scroll";
import { MoveRight } from "lucide-react";

const steps = [
  { img: "/images/journey-farms.png", hi: "बीज", en: "A1-grade seeds", enSub: "Handpicked from trusted farms", hiSub: "भरोसेमंद खेतों से चुने हुए" },
  { img: "/images/peanuts.png", hi: "सफाई", en: "Cleaning", enSub: "Hand-cleaned, no dust", hiSub: "हाथ से साफ, बिना धूल" },
  { img: "/images/journey-ghani.png", hi: "लकड़ी घानी", en: "Wooden Ghani", enSub: "Slow cold press, low RPM", hiSub: "धीमा दबाव, कम RPM" },
  { img: "/images/pour.png", hi: "छानना", en: "Filtering", enSub: "Naturally filtered only", hiSub: "सिर्फ प्राकृतिक छाननी" },
  { img: "/images/oil-1l.png", hi: "बोतल में भरना", en: "Bottling", enSub: "Carefully packed for you", hiSub: "सावधानी से पैक" },
];

export const ProcessSteps = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  const stripRef = useRef(null);
  useAutoScrollX(stripRef);
  return (
    <section data-testid="process-section" className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className="overline-tag">{t("proc.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("proc.a")}</Reveal>
          <Reveal delay={0.22}>
            <span className="italic text-terra">{t("proc.b")}</span>
          </Reveal>
        </h2>

        <div ref={stripRef} className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0" data-testid="process-steps">
          {steps.map((s, i) => (
            <FadeUp key={s.en} delay={i * 0.08} className="flex min-w-44 snap-center items-center gap-3 md:min-w-0 md:flex-col md:items-stretch md:gap-0">
              <motion.div whileTap={{ scale: 0.95 }} className="flex w-full flex-col items-center rounded-3xl border border-ink/10 bg-sand p-5 text-center" data-testid={`process-step-${i}`}>
                <div className="relative">
                  <img src={s.img} alt={s.en} loading="lazy" className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-terra text-[11px] font-extrabold text-bone">
                    {i + 1}
                  </span>
                </div>
                <p className="mt-4 font-hindi text-lg leading-tight">{s.hi}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-moss">{s.en}</p>
                <p className="mt-2 text-xs leading-snug text-moss">{hi ? s.hiSub : s.enSub}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <MoveRight className="hidden shrink-0 text-terra/50 md:mx-auto md:my-2 md:block md:rotate-0" />
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
