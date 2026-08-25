import { useState } from "react";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";

const PILLARS = [
  {
    video: "/videos/pillar-1.mp4",
    title: "Wooden Churn (Low Temp)",
    titleHi: "लकड़ी का घोटा (कम तापमान)",
    sub: "Maintains cool temperature and preserves nutrition.",
    subHi: "तापमान ठंडा रहता है, पोषण पूरा सुरक्षित रहता है।",
  },
  {
    video: "/videos/pillar-2.mp4",
    title: "Stone Grinding",
    titleHi: "पत्थर की चक्की",
    sub: "Keeps the authentic taste and aroma.",
    subHi: "असली स्वाद और खुशबू बरकरार रहती है।",
  },
  {
    video: "/videos/pillar-3.mp4",
    title: "Slow Pressing (Low RPM)",
    titleHi: "धीमा दबाव (कम RPM)",
    sub: "No overheating, no oxidation.",
    subHi: "न ज़्यादा गर्मी, न ऑक्सीडेशन।",
  },
  {
    video: "/videos/pillar-4.mp4",
    title: "Pure & Natural",
    titleHi: "शुद्ध और प्राकृतिक",
    sub: "0% Chemicals & Trans Fats.",
    subHi: "0% केमिकल और ट्रांस फैट।",
  },
];

const PillarCard = ({ p, i, hi, dark }) => {
  const [failed, setFailed] = useState(false);
  return (
    <FadeUp delay={i * 0.08}>
      <div data-testid={`pillar-video-${i}`}>
        <div
          className={`overflow-hidden rounded-3xl border ${
            dark ? "border-bone/15 bg-bone/5" : "border-ink/10 bg-sand"
          }`}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            src={failed ? "/videos/ghani.mp4" : p.video}
            onError={() => setFailed(true)}
            className="aspect-[3/4] w-full object-cover"
            data-testid={`pillar-video-el-${i}`}
          />
        </div>
        <p className={`mt-4 font-display text-lg font-semibold leading-snug ${dark ? "text-gold" : "text-ink"}`}>
          {hi ? p.titleHi : p.title}
        </p>
        <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-bone/60" : "text-moss"}`}>
          {hi ? p.subHi : p.sub}
        </p>
      </div>
    </FadeUp>
  );
};

export const WhyGhani = ({ dark = true }) => {
  const { t, lang } = useLang();
  const hi = lang === "hi";

  return (
    <section
      data-testid="why-ghani-section"
      className={`py-16 md:py-28 ${dark ? "bg-forest text-bone" : "bg-sand text-ink"}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <p className={`overline-tag ${dark ? "!text-gold" : ""}`}>{t("home.whyOver")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("home.whyA")}</Reveal>{" "}
          <Reveal delay={0.22}>
            <span className={`italic ${dark ? "text-gold" : "text-terra"}`}>{t("home.whyB")}</span>
          </Reveal>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4" data-testid="ghani-pillars">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} p={p} i={i} hi={hi} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
};
