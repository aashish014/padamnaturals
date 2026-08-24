import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../Reveal";
import { heroBottle } from "../../data/products";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-screen overflow-hidden bg-bone pt-28 md:pt-32">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.25fr_1fr] md:px-10">
        <motion.div style={{ y: yText }} className="relative z-10 flex flex-col justify-center pb-16 pt-8 md:pb-32">
          <Reveal immediate>
            <p className="overline-tag">Lakdi Ghani · Cold-Pressed · Small Batches</p>
          </Reveal>
          <h1 className="mt-6 font-hindi text-5xl leading-[1.12] sm:text-6xl md:text-7xl lg:text-[5.2rem]" data-testid="hero-heading">
            <Reveal immediate delay={0.15}>गांव की घानी से</Reveal>
            <Reveal immediate delay={0.3}>
              <span className="text-terra">सीधा आपके घर तक</span>
            </Reveal>
          </h1>
          <Reveal immediate delay={0.45} className="mt-6">
            <p className="max-w-md font-display text-xl italic leading-snug text-moss md:text-2xl">
              From the village ghani, straight to your home — every drop inspires trust.
            </p>
          </Reveal>
          <Reveal immediate delay={0.6} className="mt-10">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                data-testid="hero-shop-button"
                className="rounded-full bg-terra px-8 py-4 text-sm font-bold text-bone transition-all duration-300 hover:scale-95 hover:bg-terra-dark"
              >
                Shop the Oils
              </Link>
              <Link
                to="/about"
                data-testid="hero-story-button"
                className="rounded-full border border-ink px-8 py-4 text-sm font-bold transition-colors duration-300 hover:bg-ink hover:text-bone"
              >
                Our Story
              </Link>
            </div>
          </Reveal>
          <Reveal immediate delay={0.75} className="mt-14">
            <div className="flex items-center gap-10">
              {[["100%", "Pure Oils"], ["100+", "Happy Customers"], ["0%", "Chemicals"]].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-ink">{v}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-moss">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <div className="relative hidden items-end justify-center md:flex">
          <motion.div style={{ y: yImg }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="arch relative overflow-hidden bg-sand"
            >
              <div className="absolute inset-x-8 top-10 bottom-0 rounded-full bg-gold/30 blur-2xl" />
              <img
                src={heroBottle}
                alt="Padam Naturals cold-pressed oil bottle"
                className="relative z-10 h-[34rem] w-auto object-contain drop-shadow-2xl"
                data-testid="hero-bottle-image"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -left-16 top-8 z-20"
              data-testid="hero-rotating-badge"
            >
              <svg viewBox="0 0 120 120" className="h-28 w-28 animate-spin-slow">
                <defs>
                  <path id="badge-circle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                </defs>
                <circle cx="60" cy="60" r="60" className="fill-ink" />
                <text className="fill-gold" style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 2.5 }}>
                  <textPath href="#badge-circle">100% PURE · UNREFINED · LAKDI GHANI ·</textPath>
                </text>
                <text x="60" y="66" textAnchor="middle" className="fill-bone font-hindi" style={{ fontSize: 20 }}>शुद्ध</text>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <ArrowDown className="h-5 w-5 animate-bounce text-moss" />
      </div>
    </section>
  );
};
