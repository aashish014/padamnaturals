import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { Reveal, FadeUp } from "../components/Reveal";
import { waLink, seedServiceMessage } from "../lib/whatsapp";
import { Wheat, Cog, Droplet, Eye, ShieldCheck, HandCoins } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Wheat,
    title: "Bring Your Seeds",
    titleHi: "अपने बीज लाइए",
    desc: "Groundnut, mustard, sesame or coconut — bring seeds from your farm or your trusted source.",
    descHi: "मूंगफली, सरसों, तिल या नारियल — अपने खेत या भरोसेमंद स्रोत से बीज लाइए।",
  },
  {
    num: "02",
    icon: Cog,
    title: "We Churn in Lakdi Ghani",
    titleHi: "हम लकड़ी घानी में निचोड़ते हैं",
    desc: "Your seeds are slowly cold-pressed in our wooden ghani, right in front of you — no heat, no chemicals.",
    descHi: "आपके बीज आपके सामने लकड़ी की घानी में धीरे-धीरे निचोड़े जाते हैं — न गर्मी, न केमिकल।",
  },
  {
    num: "03",
    icon: Droplet,
    title: "Take Your Oil Home",
    titleHi: "अपना तेल घर ले जाइए",
    desc: "100% your seeds, 100% your oil. You pay only the churning charge — nothing else.",
    descHi: "100% आपके बीज, 100% आपका तेल। आप सिर्फ घोटाई का शुल्क दें — बस।",
  },
];

const points = [
  { icon: Eye, en: "Watch the entire process yourself", hi: "पूरी प्रक्रिया खुद देखिए" },
  { icon: ShieldCheck, en: "Zero mixing — 100% your own seeds", hi: "ज़ीरो मिलावट — 100% आपके अपने बीज" },
  { icon: HandCoins, en: "Pay only for churning, not for oil", hi: "तेल के नहीं, सिर्फ घोटाई के पैसे" },
];

export default function SeedService() {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
    <main data-testid="seed-service-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">{t("seed.over")}</p>
        </Reveal>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>{t("seed.a")}</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">{t("seed.b")}</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-moss md:text-base">{t("seed.sub")}</p>
        </FadeUp>

        <div className="mt-20 grid gap-4 md:grid-cols-3" data-testid="seed-steps">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.1}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="flex h-full flex-col rounded-3xl border border-ink/10 bg-sand p-7"
                data-testid={`seed-step-${s.num}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terra/10 text-terra">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-5xl font-light text-terra/25">{s.num}</span>
                </div>
                <p className="mt-6 font-display text-2xl font-semibold">{hi ? s.titleHi : s.title}</p>
                <p className="mt-1 font-hindi text-base text-terra">{hi ? s.title : s.titleHi}</p>
                <p className="mt-3 text-sm leading-relaxed text-moss">{hi ? s.descHi : s.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15} className="mt-14">
          <div className="grid gap-3 sm:grid-cols-3" data-testid="seed-points">
            {points.map((p) => (
              <div key={p.en} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-bone px-5 py-4 text-sm font-semibold">
                <p.icon className="h-5 w-5 shrink-0 text-terra" />
                {hi ? p.hi : p.en}
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2} className="my-20">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest p-10 text-bone md:flex-row md:items-center md:p-14">
            <div>
              <p className="font-hindi text-3xl text-gold md:text-4xl">आपका बीज, आपका तेल।</p>
              <p className="mt-3 max-w-md font-display text-xl italic text-bone/80">{t("seed.note")}</p>
            </div>
            <motion.a
              href={waLink(seedServiceMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="seed-whatsapp-button"
              whileTap={{ scale: 0.95 }}
              className="flex shrink-0 items-center gap-2.5 rounded-full bg-terra px-8 py-4 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra-dark"
            >
              <WhatsAppIcon className="h-5 w-5" /> {t("seed.cta")}
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}
