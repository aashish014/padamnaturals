import { useLang } from "../i18n";
import { Reveal, FadeUp } from "./Reveal";
import { MapPin } from "lucide-react";

export const GhaniVideo = () => {
  const { t } = useLang();
  return (
    <section data-testid="ghani-video-section" className="relative overflow-hidden bg-forest">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[65vh] w-full object-cover md:h-[85vh]"
        data-testid="ghani-video"
      >
        <source src="/videos/ghani.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-forest/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 text-center text-bone md:pb-24">
        <Reveal immediate>
          <p className="overline-tag !text-gold">{t("video.over")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal immediate delay={0.1}>{t("video.a")}</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-gold">{t("video.b")}</span>
          </Reveal>
        </h2>
        <FadeUp delay={0.35}>
          <p className="mt-4 flex max-w-md items-center justify-center gap-2.5 text-sm text-bone/70">
            <MapPin className="h-4 w-4 shrink-0 text-gold" /> {t("video.cap")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
};
