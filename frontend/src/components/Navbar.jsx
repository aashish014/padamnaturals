import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Languages, PackageSearch } from "lucide-react";
import { useLang } from "../i18n";
import { logo } from "../data/products";
import { scrollTop } from "../lib/scroll";

export const Navbar = () => {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  const LINKS = [
    { to: "/", label: t("nav.home") },
    { to: "/shop", label: t("nav.shop") },
    { to: "/your-seed-your-oil", label: t("nav.seed") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenu(false);
    scrollTop();
  }, [location.pathname]);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled ? "bg-bone/85 backdrop-blur-md shadow-[0_1px_0_rgba(31,41,34,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link to="/" data-testid="nav-logo-link" className="flex items-center gap-3">
          <img src={logo} alt="Padam Naturals" className="h-10 w-auto" />
          <span className="hidden font-hindi text-lg text-ink/70 sm:block">पदम नैचुरल्स</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" data-testid="nav-links-desktop">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to.replace("/", "") || "home"}`}
              className={({ isActive }) =>
                `group relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive ? "text-terra" : "text-ink hover:text-terra"
                }`
              }
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-terra transition-[width] duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/track"
            data-testid="nav-track-order-button"
            aria-label={t("nav.track")}
            className="flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-3 text-xs font-bold transition-colors duration-300 hover:border-terra hover:text-terra"
          >
            <PackageSearch className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("nav.track")}</span>
          </Link>
          <button
            data-testid="lang-toggle-button"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-3 text-xs font-bold transition-colors duration-300 hover:border-terra hover:text-terra"
            aria-label="Switch language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "हिंदी" : "EN"}
          </button>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setMenu(!menu)}
            className="rounded-full border border-ink/20 p-2.5 md:hidden"
            aria-label="Menu"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="border-t border-ink/10 bg-bone px-6 py-6 md:hidden" data-testid="nav-links-mobile">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-mobile-link-${l.to.replace("/", "") || "home"}`}
              className="block py-3 font-display text-2xl text-ink"
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/track"
            data-testid="nav-mobile-link-track"
            className="block py-3 font-display text-2xl text-terra"
          >
            {t("nav.track")}
          </NavLink>
        </nav>
      )}
    </header>
  );
};
