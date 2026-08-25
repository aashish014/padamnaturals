import { motion } from "framer-motion";
import { Reveal, FadeUp } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { Motto } from "../components/Motto";
import { waLink, generalMessage } from "../lib/whatsapp";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { useLang } from "../i18n";

const chapters = [
  {
    num: "01",
    title: "The Promise",
    hindi: "वादा",
    text: "Padam is our family's promise of health and wellness — pure, honest, handcrafted wooden ghani oils, extracted with care to preserve every natural nutrient.",
    textHi: "पदम हमारे परिवार का सेहत और तंदुरुस्ती का वादा है — शुद्ध, ईमानदार, हाथ से बने लकड़ी घानी के तेल, जो हर प्राकृतिक पोषक तत्व को बचाकर रखते हैं।",
  },
  {
    num: "02",
    title: "The Method",
    hindi: "तरीका",
    text: "Lakdi Ghani is an ancient method where oil seeds are crushed slowly in a wooden press at low RPM. Wooden churn, stone grinding, slow pressing — no overheating, no oxidation, no shortcuts.",
    textHi: "लकड़ी घानी एक प्राचीन विधि है जिसमें बीज लकड़ी के घोटे में कम RPM पर धीरे-धीरे दबाए जाते हैं। लकड़ी का घोटा, पत्थर की चक्की, धीमा दबाव — न ज़्यादा गर्मी, न ऑक्सीडेशन, न शॉर्टकट।",
  },
  {
    num: "03",
    title: "The Family",
    hindi: "परिवार",
    text: "Hi, I'm Aashish from the Padam Family. With years of expertise in branding, design and natural product building, I've learned one thing: purity and trust matter the most.",
    textHi: "नमस्ते, मैं पदम परिवार का आशीष हूँ। ब्रांडिंग, डिज़ाइन और नैचुरल प्रोडक्ट के सालों के अनुभव से एक बात सीखी है: शुद्धता और भरोसा सबसे ज़रूरी है।",
  },
];

const CHAPTER_TINTS = ["#F3E9CB", "#DAEDF7", "#1F2922"];

export default function About() {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
    <main data-testid="about-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">Our Story · हमारी कहानी</p>
        </Reveal>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>{t("about.a")}</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">{t("about.b")}</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-moss md:text-base">
            {t("about.sub")}
          </p>
        </FadeUp>

        <div className="mt-20 flex flex-col gap-6 pb-10" data-testid="about-chapters">
          {chapters.map((c, i) => (
            <div key={c.num} className="sticky" style={{ top: `${96 + i * 26}px` }}>
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`rounded-3xl border p-8 shadow-[0_24px_50px_-30px_rgba(31,41,34,0.35)] md:p-12 ${
                  i === 2 ? "border-bone/10 text-bone" : "border-ink/10 text-ink"
                }`}
                style={{ backgroundColor: CHAPTER_TINTS[i] }}
                data-testid={`about-chapter-${c.num}`}
              >
                <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-14">
                  <motion.span
                    whileHover={{ scale: 1.08, rotate: -3 }}
                    className={`font-display text-7xl font-light md:text-8xl ${i === 2 ? "text-gold" : "text-terra/50"}`}
                  >
                    {c.num}
                  </motion.span>
                  <div className="max-w-xl">
                    <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                      {hi ? c.hindi : c.title}
                    </h2>
                    <p className={`mt-1 font-hindi text-lg ${i === 2 ? "text-gold" : "text-terra"}`}>
                      {hi ? c.title : c.hindi}
                    </p>
                    <p className={`mt-4 text-base leading-relaxed ${i === 2 ? "text-bone/70" : "text-moss"}`}>
                      {hi ? c.textHi : c.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <FadeUp className="my-20 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3" >
          {[["100%", t("about.stat1")], ["100+", t("about.stat2")], ["Trusted+", t("about.stat3")]].map(([v, l]) => (
            <div key={l} className="bg-sand px-8 py-12 text-center">
              <p className="font-display text-5xl font-bold text-terra">{v}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-moss">{l}</p>
            </div>
          ))}
        </FadeUp>
      </div>

      <Motto />

      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <FadeUp className="my-24 flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest p-10 text-bone md:flex-row md:items-center md:p-14">
          <div>
            <p className="font-hindi text-2xl text-gold">परंपरा पर भरोसा</p>
            <p className="mt-2 max-w-md font-display text-2xl italic">Traditional method, modern trust — taste the difference yourself.</p>
          </div>
          <a
            href={waLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="about-whatsapp-button"
            className="flex shrink-0 items-center gap-2.5 rounded-full bg-terra px-8 py-4 text-sm font-bold text-bone transition-all duration-300 hover:scale-95 hover:bg-terra-dark"
          >
            <WhatsAppIcon className="h-5 w-5" /> {t("about.cta")}
          </a>
        </FadeUp>
      </div>
      <Marquee />
    </main>
  );
}
