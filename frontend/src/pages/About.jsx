import { Link } from "react-router-dom";
import { Reveal, FadeUp } from "../components/Reveal";
import { Marquee } from "../components/Marquee";
import { waLink, generalMessage } from "../lib/whatsapp";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const chapters = [
  {
    num: "01",
    title: "The Promise",
    hindi: "वादा",
    text: "Padam is our family's promise of health and wellness — pure, honest, handcrafted wooden ghani oils, extracted with care to preserve every natural nutrient.",
  },
  {
    num: "02",
    title: "The Method",
    hindi: "तरीका",
    text: "Lakdi Ghani is an ancient method where oil seeds are crushed slowly in a wooden press at low RPM. Wooden churn, stone grinding, slow pressing — no overheating, no oxidation, no shortcuts.",
  },
  {
    num: "03",
    title: "The Family",
    hindi: "परिवार",
    text: "Hi, I'm Aashish from the Padam Family. With years of expertise in branding, design and natural product building, I've learned one thing: purity and trust matter the most.",
  },
];

export default function About() {
  return (
    <main data-testid="about-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">Our Story · हमारी कहानी</p>
        </Reveal>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>Where tradition</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">meets wellness.</span>
          </Reveal>
        </h1>
        <FadeUp delay={0.3}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-moss md:text-base">
            We are dedicated to bringing you pure, honest and handcrafted wooden ghani oils — from our village to your home. Gently extracted, small batches, natural aroma and taste retained.
          </p>
        </FadeUp>

        <div className="mt-24 flex flex-col gap-20 pb-10 md:gap-28">
          {chapters.map((c, i) => (
            <div key={c.num} className={`grid gap-8 md:grid-cols-[auto_1fr] md:gap-16 ${i % 2 === 1 ? "md:pl-24" : ""}`} data-testid={`about-chapter-${c.num}`}>
              <Reveal>
                <span className="font-display text-7xl font-light text-terra/30 md:text-9xl">{c.num}</span>
              </Reveal>
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                  <Reveal delay={0.1}>{c.title}</Reveal>
                </h2>
                <Reveal delay={0.18}>
                  <p className="mt-1 font-hindi text-lg text-terra">{c.hindi}</p>
                </Reveal>
                <FadeUp delay={0.25}>
                  <p className="mt-4 text-base leading-relaxed text-moss">{c.text}</p>
                </FadeUp>
              </div>
            </div>
          ))}
        </div>

        <FadeUp className="my-20 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3" >
          {[["100%", "Pure & Unrefined Oils"], ["100+", "Happy Customers"], ["Trusted+", "By Families Every Day"]].map(([v, l]) => (
            <div key={l} className="bg-sand px-8 py-12 text-center">
              <p className="font-display text-5xl font-bold text-terra">{v}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-moss">{l}</p>
            </div>
          ))}
        </FadeUp>

        <FadeUp className="mb-24 flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest p-10 text-bone md:flex-row md:items-center md:p-14">
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
            <WhatsAppIcon className="h-5 w-5" /> Talk to Us
          </a>
        </FadeUp>
      </div>
      <Marquee />
    </main>
  );
}
