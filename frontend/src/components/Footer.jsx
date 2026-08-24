import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, generalMessage } from "../lib/whatsapp";
import { useLang } from "../i18n";
import { logo } from "../data/products";

export const Footer = () => {
  const { t } = useLang();
  return (
  <footer data-testid="site-footer" className="bg-forest text-bone">
    <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={logo} alt="Padam Naturals" className="h-12 w-auto brightness-0 invert" />
          <p className="mt-6 max-w-sm font-hindi text-xl leading-relaxed text-gold">
            गांव की घानी से सीधा आपके घर तक
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/60">
            100% pure, unrefined Lakdi Ghani cold-pressed oils. Every drop inspires trust — tradition, purity and care in every bottle for your family.
          </p>
        </div>
        <div>
          <p className="overline-tag !text-gold">{t("footer.explore")}</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link to="/shop" data-testid="footer-link-shop" className="text-bone/70 transition-colors hover:text-gold">{t("nav.shop")}</Link>
            <Link to="/about" data-testid="footer-link-about" className="text-bone/70 transition-colors hover:text-gold">{t("nav.about")}</Link>
            <Link to="/contact" data-testid="footer-link-contact" className="text-bone/70 transition-colors hover:text-gold">{t("nav.contact")}</Link>
          </div>
        </div>
        <div>
          <p className="overline-tag !text-gold">{t("footer.reach")}</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-bone/70">
            <span className="flex items-start gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> +91 82691 69904</span>
            <span className="flex items-start gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> padamnaturals@gmail.com</span>
            <span className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Dhanasuta Road, Village Shivpur, Dist. Ratlam, Madhya Pradesh</span>
          </div>
          <a
            href={waLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-whatsapp-button"
            className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-terra px-6 py-3 text-sm font-bold text-bone transition-all duration-300 hover:scale-95 hover:bg-terra-dark"
          >
            <WhatsAppIcon className="h-4 w-4" /> {t("footer.chat")}
          </a>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/10 pt-8 text-xs text-bone/40 md:flex-row md:items-center">
        <span>© {new Date().getFullYear()} {t("footer.rights")}</span>
        <span className="font-display italic text-bone/50">Traditional method, modern trust.</span>
      </div>
    </div>
  </footer>
  );
};
