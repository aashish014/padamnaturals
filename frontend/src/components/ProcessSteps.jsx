import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { useLang } from "../i18n";

const steps = [
  { img: "/images/journey-farms.png", hi: "बीज", en: "A1-grade Seeds", enSub: "Handpicked from trusted farms", hiSub: "भरोसेमंद खेतों से चुने हुए" },
  { img: "/images/peanuts.png", hi: "सफाई", en: "Cleaning", enSub: "Hand-cleaned, no dust", hiSub: "हाथ से साफ, बिना धूल" },
  { img: "/images/journey-ghani.png", hi: "लकड़ी घानी", en: "Wooden Ghani", enSub: "Slow cold press, low RPM", hiSub: "धीमा दबाव, कम RPM" },
  { img: "/images/pour.png", hi: "छानना", en: "Filtering", enSub: "Naturally filtered only", hiSub: "सिर्फ प्राकृतिक छाननी" },
  { img: "/images/oil-1l.png", hi: "बोतल में भरना", en: "Bottling", enSub: "Carefully packed for you", hiSub: "सावधानी से पैक" },
];

const TINTS = ["#EBE4D5", "#F0E3C0", "#EFE0CC", "#EDE7DC", "#EAD9C2"];

export const ProcessSteps = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
    <section data-testid="process-section" className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Reveal>
          <p className="overline-tag">{t("proc.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("proc.a")}</Reveal>
          <Reveal delay={0.22}>
            <span className="italic text-terra">{t("proc.b")}</span>
          </Reveal>
        </h2>

        <div className="mt-12 flex flex-col gap-6 pb-8" data-testid="process-steps">
          {steps.map((s, i) => (
            <div key={s.en} className="sticky" style={{ top: `${88 + i * 20}px`, zIndex: i + 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 rounded-3xl border border-ink/10 p-5 shadow-xl shadow-ink/10 md:p-7"
                style={{ backgroundColor: TINTS[i % TINTS.length] }}
                data-testid={`process-step-${i}`}
              >
                <img src={s.img} alt={s.en} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover md:h-32 md:w-32" />
                <div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terra text-xs font-extrabold text-bone">
                    {i + 1}
                  </span>
                  <p className="mt-2.5 font-hindi text-2xl leading-tight md:text-3xl">{s.hi}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-moss">{s.en}</p>
                  <p className="mt-2 text-sm leading-snug text-ink/70">{hi ? s.hiSub : s.enSub}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
