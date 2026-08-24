import { motion } from "framer-motion";
import { combos } from "../data/combos";
import { useLang } from "../i18n";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { Reveal, FadeUp } from "../components/Reveal";
import { waLink, comboBuyMessage, customComboMessage } from "../lib/whatsapp";
import { Check, BadgePercent, PackageOpen } from "lucide-react";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

const ComboCard = ({ c, i, t }) => (
  <FadeUp delay={i * 0.08}>
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-bone"
      data-testid={`combo-card-${c.slug}`}
    >
      <div className="relative flex h-48 items-center justify-center md:h-56" style={{ backgroundColor: c.tint }}>
        <div className="absolute h-2/3 w-2/3 rounded-full bg-gold/25 blur-2xl" />
        <img src={c.image} alt={c.name} loading="lazy" className="relative z-10 h-[80%] w-auto object-contain drop-shadow-xl" />
        <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-terra px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-bone">
          <BadgePercent className="h-3.5 w-3.5" /> SAVE {inr(c.worth - c.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-hindi text-sm text-terra">{c.hindi}</p>
        <p className="mt-1 font-display text-2xl font-semibold">{c.name}</p>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-moss">{t("combo.inside")}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {c.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-semibold">
              <Check className="h-4 w-4 shrink-0 text-moss" /> {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold">{inr(c.price)}</span>
          <span className="text-sm text-moss line-through">{t("combo.worth")} {inr(c.worth)}</span>
        </div>
        <motion.a
          href={waLink(comboBuyMessage(c))}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`combo-buy-${c.slug}`}
          whileTap={{ scale: 0.97 }}
          className="mt-5 flex items-center justify-center gap-2.5 rounded-full bg-terra py-3.5 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra-dark"
        >
          <WhatsAppIcon className="h-4 w-4" /> {t("combo.buy")}
        </motion.a>
      </div>
    </motion.div>
  </FadeUp>
);

export default function Combo() {
  const { t } = useLang();
  return (
    <main data-testid="combo-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">{t("combo.over")}</p>
        </Reveal>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>{t("combo.a")}</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">{t("combo.b")}</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-moss md:text-base">{t("combo.sub")}</p>
        </FadeUp>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-testid="combo-grid">
          {combos.map((c, i) => (
            <ComboCard key={c.slug} c={c} i={i} t={t} />
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-14">
          <a
            href={waLink(customComboMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="custom-combo-button"
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-dashed border-terra/40 bg-terra/5 p-7 transition-colors duration-300 hover:border-terra md:p-8"
          >
            <span className="flex items-center gap-4">
              <PackageOpen className="h-8 w-8 shrink-0 text-terra" />
              <span className="max-w-md font-display text-xl font-semibold leading-snug">{t("combo.custom")}</span>
            </span>
            <span className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-bone">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </span>
          </a>
        </FadeUp>
      </div>
    </main>
  );
}
