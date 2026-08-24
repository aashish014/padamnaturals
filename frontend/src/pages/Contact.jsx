import { Reveal, FadeUp } from "../components/Reveal";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { waLink, generalMessage } from "../lib/whatsapp";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main data-testid="contact-page" className="bg-bone pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-10">
        <Reveal immediate>
          <p className="overline-tag">Contact · संपर्क</p>
        </Reveal>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
          <Reveal immediate delay={0.1}>We'd love to</Reveal>
          <Reveal immediate delay={0.22}>
            <span className="italic text-terra">hear from you.</span>
          </Reveal>
        </h1>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <FadeUp>
            <a
              href={waLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-cta"
              className="group flex flex-col justify-between rounded-3xl bg-terra p-10 text-bone transition-transform duration-300 hover:scale-[0.99] md:min-h-72"
            >
              <WhatsAppIcon className="h-10 w-10" />
              <div>
                <p className="font-display text-3xl font-semibold">Chat with us directly</p>
                <p className="mt-2 text-sm text-bone/80">Fastest way to order or ask anything — we reply like family.</p>
                <span className="mt-6 inline-block rounded-full bg-bone px-7 py-3 text-sm font-bold text-ink transition-transform duration-300 group-hover:scale-95">
                  Open WhatsApp
                </span>
              </div>
            </a>
          </FadeUp>

          <div className="flex flex-col gap-5">
            {[
              { icon: Phone, label: "Call / WhatsApp", value: "+91 82691 69904", href: "tel:+918269169904", testid: "contact-phone" },
              { icon: Mail, label: "Email", value: "padamnaturals@gmail.com", href: "mailto:padamnaturals@gmail.com", testid: "contact-email" },
            ].map(({ icon: Icon, label, value, href, testid }, i) => (
              <FadeUp key={label} delay={0.1 + i * 0.08}>
                <a href={href} data-testid={testid} className="flex items-center gap-5 rounded-3xl border border-ink/10 bg-sand p-7 transition-colors duration-300 hover:border-terra/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone">
                    <Icon className="h-5 w-5 text-terra" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-moss">{label}</span>
                    <span className="mt-1 block font-display text-xl font-semibold">{value}</span>
                  </span>
                </a>
              </FadeUp>
            ))}
            <FadeUp delay={0.26}>
              <div className="flex items-start gap-5 rounded-3xl border border-ink/10 bg-sand p-7" data-testid="contact-address">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bone">
                  <MapPin className="h-5 w-5 text-terra" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-widest text-moss">Visit Us</span>
                  <span className="mt-1 block font-display text-xl font-semibold leading-snug">
                    Aashish Rathod — Dhanasuta Road, Village Shivpur, Dist. Ratlam, Madhya Pradesh, India
                  </span>
                </span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </main>
  );
}
