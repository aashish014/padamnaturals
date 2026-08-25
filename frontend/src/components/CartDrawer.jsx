import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLang } from "../i18n";
import { products } from "../data/products";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, Check } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, cartMessage } from "../lib/whatsapp";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const FREE_AT = 599;
const RING_C = 2 * Math.PI * 30;

const DeliveryProgress = ({ total, t }) => {
  const pct = Math.min(total / FREE_AT, 1);
  const done = total >= FREE_AT;
  return (
    <div className="mb-4 flex items-center gap-4 rounded-2xl bg-sand px-4 py-4" data-testid="delivery-progress">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle cx="36" cy="36" r="30" fill="none" strokeWidth="7" className="stroke-ink/10" />
          <motion.circle
            cx="36" cy="36" r="30" fill="none" strokeWidth="7" strokeLinecap="round"
            className={done ? "stroke-moss" : "stroke-terra"}
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: RING_C }}
            animate={{ strokeDashoffset: RING_C * (1 - pct) }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          {done ? (
            <Check className="h-6 w-6 text-moss" data-testid="delivery-unlocked-icon" />
          ) : (
            <span className="text-[11px] font-extrabold text-terra" data-testid="delivery-progress-pct">{Math.round(pct * 100)}%</span>
          )}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold" data-testid="delivery-progress-text">
          {done ? t("cart.done") : t("cart.left")(inr(FREE_AT - total))}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className={`h-full rounded-full ${done ? "bg-moss" : "bg-gradient-to-r from-gold to-terra"}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct * 100}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            data-testid="delivery-progress-bar"
          />
        </div>
        <p className="mt-1.5 text-[10px] font-semibold text-moss">{inr(total)} / {inr(FREE_AT)}</p>
      </div>
    </div>
  );
};

export const CartDrawer = () => {
  const { items, setQty, add, clear, total, open, setOpen } = useCart();
  const { t } = useLang();
  const navigate = useNavigate();
  const suggestions = products.filter((p) => !items.some((i) => i.product.slug === p.slug)).slice(0, 4);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        data-testid="cart-drawer"
        className="flex w-full flex-col border-l border-ink/10 bg-bone p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-ink/10 px-6 py-5">
          <SheetTitle className="font-display text-2xl font-semibold text-ink">
            {t("cart.title")} <span className="font-hindi text-lg text-terra">आपका ऑर्डर</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6" data-testid="cart-empty-state">
            <p className="font-display text-2xl italic text-moss">{t("cart.empty1")}</p>
            <p className="text-sm text-ink/60">{t("cart.empty2")}</p>
            <button
              data-testid="cart-continue-shopping-button"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-ink px-6 py-2.5 text-sm font-semibold transition-colors duration-300 hover:bg-ink hover:text-bone"
            >
              {t("cart.continue")}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((i) => (
                <div key={i.id} data-testid={`cart-item-${i.id}`} className="flex gap-4 border-b border-ink/10 py-4">
                  <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl bg-sand p-1.5">
                    <img src={i.product.image} alt={i.product.name} className="h-full w-auto object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-bold leading-snug">{i.product.name}</p>
                    <p className="mt-0.5 text-xs text-moss">{i.size.label} · {inr(i.size.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                        <button data-testid={`cart-qty-minus-${i.id}`} onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">
                          {i.qty === 1 ? <Trash2 className="h-3.5 w-3.5 text-terra" /> : <Minus className="h-3.5 w-3.5" />}
                        </button>
                        <span className="w-4 text-center text-sm font-bold" data-testid={`cart-qty-${i.id}`}>{i.qty}</span>
                        <button data-testid={`cart-qty-plus-${i.id}`} onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">{inr(i.size.price * i.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button data-testid="cart-clear-button" onClick={clear} className="mt-4 text-xs font-semibold text-moss underline-offset-2 hover:text-terra hover:underline">
                {t("cart.clear")}
              </button>

              {suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss">{t("cart.suggest")}</p>
                  <div className="mt-3 flex gap-3 overflow-x-auto pb-1" data-testid="cart-suggestions">
                    {suggestions.map((p) => (
                      <div key={p.slug} className="w-32 shrink-0 rounded-2xl border border-ink/10 bg-bone p-3" data-testid={`suggest-${p.slug}`}>
                        <img src={p.image} alt={p.name} className="mx-auto h-14 w-auto object-contain" />
                        <p className="mt-2 text-[11px] font-bold leading-tight">{p.name.replace("Lakdi Ghani ", "")}</p>
                        <p className="text-[10px] text-moss">{p.sizes[0].label}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs font-extrabold">{inr(p.sizes[0].price)}</span>
                          <motion.button
                            data-testid={`suggest-add-${p.slug}`}
                            onClick={() => add(p, p.sizes[0])}
                            whileTap={{ scale: 0.8 }}
                            aria-label={`Add ${p.name}`}
                            className="rounded-full bg-ink p-1.5 text-bone"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-ink/10 px-6 py-5">
              <DeliveryProgress total={total} t={t} />
              <div className="flex justify-between text-lg font-extrabold">
                <span>{t("cart.total")}</span>
                <span data-testid="cart-total">{inr(total)}</span>
              </div>
              <a
                href={waLink(cartMessage(items))}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cart-order-whatsapp-button"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-terra py-4 text-sm font-bold text-bone transition-all duration-300 hover:scale-[0.98] hover:bg-terra-dark"
              >
                <WhatsAppIcon className="h-5 w-5" /> {t("cart.order")}
              </a>
              <button
                data-testid="cart-add-more-button"
                onClick={() => {
                  setOpen(false);
                  navigate("/shop");
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-ink py-3.5 text-sm font-bold transition-colors duration-300 hover:bg-ink hover:text-bone"
              >
                <Plus className="h-4 w-4" /> {t("cart.addMore")}
              </button>
              <p className="mt-3 text-center text-[11px] text-moss">{t("cart.note")}</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
