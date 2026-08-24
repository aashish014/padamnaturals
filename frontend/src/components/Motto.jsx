import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";

export const Motto = () => {
  const { t } = useLang();
  return (
    <section data-testid="motto-section" className="relative overflow-hidden bg-bone py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-10">
        <Reveal>
          <p className="overline-tag">{t("motto.over")}</p>
        </Reveal>
        <h2 className="mt-8 font-hindi text-5xl leading-[1.3] sm:text-6xl md:text-8xl" data-testid="motto-heading">
          <Reveal immediate delay={0.15}>कम खाएं,</Reveal>
          <Reveal immediate delay={0.35}>
            <span className="text-terra">पर अच्छा खाएं।</span>
          </Reveal>
        </h2>
        <FadeUp delay={0.5}>
          <p className="mx-auto mt-8 max-w-md font-display text-xl italic leading-snug text-moss md:text-2xl">
            {t("motto.sub")}
          </p>
        </FadeUp>
        <FadeUp delay={0.65}>
          <div className="mx-auto mt-10 flex w-max items-center gap-4">
            <span className="h-px w-16 bg-terra/40" />
            <span className="text-terra">✦</span>
            <span className="h-px w-16 bg-terra/40" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
