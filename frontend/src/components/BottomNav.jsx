import { NavLink } from "react-router-dom";
import { Home, Droplets, Wheat, ShoppingBag } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n";
import { waLink, generalMessage } from "../lib/whatsapp";

const Tab = ({ to, icon: Icon, label, testid, end = false }) => (
  <NavLink
    to={to}
    end={end}
    data-testid={testid}
    className={({ isActive }) =>
      `flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold transition-colors duration-300 ${
        isActive ? "text-terra" : "text-ink/60"
      }`
    }
  >
    <Icon className="h-5 w-5" />
    {label}
  </NavLink>
);

export const BottomNav = () => {
  const { count, setOpen } = useCart();
  const { t } = useLang();
  return (
    <nav
      data-testid="bottom-nav"
      className="fixed inset-x-0 bottom-0 z-50 flex h-16 items-stretch border-t border-ink/10 bg-bone/95 backdrop-blur-md md:hidden"
    >
      <Tab to="/" icon={Home} label={t("nav.home")} testid="tab-home" end />
      <Tab to="/shop" icon={Droplets} label={t("nav.shop")} testid="tab-shop" />
      <Tab to="/your-seed-your-oil" icon={Wheat} label={t("nav.seed")} testid="tab-seed" />
      <button
        data-testid="tab-order"
        onClick={() => setOpen(true)}
        className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold text-ink/60"
      >
        <ShoppingBag className="h-5 w-5" />
        {t("nav.order")}
        {count > 0 && (
          <span data-testid="tab-order-badge" className="absolute right-[22%] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-terra text-[9px] font-bold text-bone">
            {count}
          </span>
        )}
      </button>
      <a
        href={waLink(generalMessage)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="tab-chat"
        className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold text-[#1faa53]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {t("tab.chat")}
      </a>
    </nav>
  );
};
