import { reviews } from "../data/reviews";
import { Reveal, FadeUp } from "./Reveal";
import { useLang } from "../i18n";
import { Star, BadgeCheck } from "lucide-react";

const Card = ({ r }) => (
  <div
    data-testid={`review-card-${r.id}`}
    className="flex w-72 shrink-0 flex-col rounded-3xl border border-ink/10 bg-bone p-6 md:w-80"
  >
    <div className="flex gap-1">
      {Array.from({ length: r.stars }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
      ))}
    </div>
    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/85">"{r.text}"</p>
    <div className="mt-5 flex items-center justify-between gap-2 border-t border-ink/10 pt-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra/10 font-display text-sm font-bold text-terra" data-testid={`review-avatar-${r.id}`}>
          {r.name.split(" ").map((w) => w[0]).join("")}
        </span>
        <div>
          <p className="text-sm font-extrabold">{r.name}</p>
          <p className="text-xs text-moss">{r.city}</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-terra">
        <BadgeCheck className="h-3.5 w-3.5" /> {r.oil}
      </span>
    </div>
  </div>
);

export const LoveWall = () => {
  const { t } = useLang();
  return (
    <section data-testid="love-wall" className="overflow-hidden bg-sand py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="overline-tag">{t("home.loveOver")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
          <Reveal delay={0.1}>{t("home.loveA")}</Reveal>
          <Reveal delay={0.22}>
            <span className="italic text-terra">{t("home.loveB")}</span>
          </Reveal>
        </h2>
      </div>
      <FadeUp delay={0.2} className="group mt-14">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-stretch gap-6 pr-6" aria-hidden={copy === 1}>
              {reviews.map((r) => (
                <Card key={`${copy}-${r.id}`} r={r} />
              ))}
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
};
