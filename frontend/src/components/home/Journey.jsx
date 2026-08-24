import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journey } from "../../data/products";
import { Reveal, FadeUp } from "../Reveal";

const Chapter = ({ step, flip }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={ref} className={`grid items-center gap-10 md:grid-cols-2 ${flip ? "" : ""}`} data-testid={`journey-step-${step.num}`}>
      <div className={flip ? "md:order-2" : ""}>
        <Reveal>
          <span className="font-display text-7xl font-light text-terra/30 md:text-8xl">{step.num}</span>
        </Reveal>
        <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          <Reveal delay={0.1}>{step.title}</Reveal>
        </h3>
        <Reveal delay={0.2}>
          <p className="mt-1 font-hindi text-lg text-terra">{step.hindi}</p>
        </Reveal>
        <FadeUp delay={0.25}>
          <p className="mt-4 max-w-md text-base leading-relaxed text-moss">{step.text}</p>
        </FadeUp>
      </div>
      <motion.div style={{ y }} className={flip ? "md:order-1" : ""}>
        <div className="arch overflow-hidden">
          <img src={step.image} alt={step.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      </motion.div>
    </div>
  );
};

export const Journey = () => (
  <section data-testid="journey-section" className="bg-bone py-24 md:py-32">
    <div className="mx-auto max-w-6xl px-5 md:px-10">
      <Reveal>
        <p className="overline-tag">The Journey</p>
      </Reveal>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl lg:text-6xl">
        <Reveal delay={0.1}>From farm to your kitchen —</Reveal>
        <Reveal delay={0.22}>
          <span className="italic text-terra">pure at every step.</span>
        </Reveal>
      </h2>
      <div className="mt-20 flex flex-col gap-24 md:gap-36">
        {journey.map((s, i) => (
          <Chapter key={s.num} step={s} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);
