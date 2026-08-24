import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, Truck } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, cartMessage } from "../lib/whatsapp";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export const CartDrawer = () => {
  const { items, setQty, clear, total, mrpTotal, open, setOpen } = useCart();
  const freeDelivery = total >= 599;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        data-testid="cart-drawer"
        className="flex w-full flex-col border-l border-ink/10 bg-bone p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-ink/10 px-6 py-5">
          <SheetTitle className="font-display text-2xl font-semibold text-ink">
            Your Order <span className="font-hindi text-lg text-terra">आपका ऑर्डर</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6" data-testid="cart-empty-state">
            <p className="font-display text-2xl italic text-moss">Your basket is empty…</p>
            <p className="text-sm text-ink/60">Add some pure oils and order straight on WhatsApp.</p>
            <button
              data-testid="cart-continue-shopping-button"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-ink px-6 py-2.5 text-sm font-semibold transition-colors duration-300 hover:bg-ink hover:text-bone"
            >
              Continue Shopping
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
                Clear basket
              </button>
            </div>

            <div className="border-t border-ink/10 px-6 py-5">
              <div className={`mb-4 flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-semibold ${freeDelivery ? "bg-gold/20 text-ink" : "bg-sand text-moss"}`}>
                <Truck className="h-4 w-4 shrink-0" />
                {freeDelivery ? "You've unlocked FREE delivery!" : `Add ${inr(599 - total)} more for free delivery`}
              </div>
              <div className="flex justify-between text-sm text-moss">
                <span>MRP Total</span>
                <span className="line-through">{inr(mrpTotal)}</span>
              </div>
              <div className="mt-1 flex justify-between text-sm font-semibold text-terra">
                <span>You Save</span>
                <span data-testid="cart-savings">{inr(mrpTotal - total)}</span>
              </div>
              <div className="mt-2 flex justify-between text-lg font-extrabold">
                <span>Order Total</span>
                <span data-testid="cart-total">{inr(total)}</span>
              </div>
              <a
                href={waLink(cartMessage(items))}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cart-order-whatsapp-button"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-terra py-4 text-sm font-bold text-bone transition-all duration-300 hover:scale-[0.98] hover:bg-terra-dark"
              >
                <WhatsAppIcon className="h-5 w-5" /> Order on WhatsApp
              </a>
              <p className="mt-3 text-center text-[11px] text-moss">No payment needed now — confirm on WhatsApp, pay on delivery.</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
