import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { faqs } from "../../data/products";
import { Reveal, FadeUp } from "../Reveal";
import { useLang } from "../../i18n";

export const Faq = () => {
  const { t, lang } = useLang();
  const hi = lang === "hi";
  return (
  <section data-testid="faq-section" className="bg-sand py-16 md:py-24">
    <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.4fr] md:px-10">
      <div>
        <Reveal>
          <p className="overline-tag">{t("home.faqOver")}</p>
        </Reveal>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
          <Reveal delay={0.1}>{t("home.faqA")}</Reveal>
          <Reveal delay={0.22}>
            <span className="italic text-terra">{t("home.faqB")}</span>
          </Reveal>
        </h2>
        <FadeUp delay={0.3}>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-moss">
            {t("home.faqSub")}
          </p>
        </FadeUp>
      </div>
      <FadeUp delay={0.15}>
        <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-ink/15">
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="py-5 text-left font-display text-lg font-semibold hover:text-terra hover:no-underline"
              >
                {hi ? f.qHi : f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-moss">{hi ? f.aHi : f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeUp>
    </div>
  </section>
  );
};
