import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Package,
  Truck,
  CheckCheck,
  Search,
  Pencil,
  MessageCircleQuestion,
  Clock,
  MapPin,
} from "lucide-react";
import { useLang } from "../i18n";
import { useCart } from "../context/CartContext";
import { fetchOrder } from "../lib/api";
import { waLink, trackQuestionMessage } from "../lib/whatsapp";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { Reveal, FadeUp } from "../components/Reveal";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

const STEPS = [
  { key: "placed", icon: ClipboardList },
  { key: "packed", icon: Package },
  { key: "shipped", icon: Truck },
  { key: "delivered", icon: CheckCheck },
];

const QUESTIONS = [
  { key: "q1", icon: MessageCircleQuestion },
  { key: "q2", icon: Clock },
  { key: "q3", icon: MapPin },
];

const PILL = {
  placed: "bg-gold/15 text-gold",
  packed: "bg-terra/10 text-terra",
  shipped: "bg-moss/10 text-moss",
  delivered: "bg-moss text-bone",
};

const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

const Timeline = ({ status, t }) => {
  const idx = Math.max(0, STEPS.findIndex((s) => s.key === status));
  return (
    <div className="flex items-start" data-testid="order-timeline">
      {STEPS.map((s, i) => {
        const done = i <= idx;
        const Icon = s.icon;
        return (
          <div key={s.key} className="flex flex-1 flex-col items-center" data-testid={`timeline-step-${s.key}`}>
            <div className="flex w-full items-center">
              <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : done ? "bg-terra" : "bg-ink/15"}`} />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
                  done ? "border-terra bg-terra text-bone" : "border-ink/15 bg-bone text-ink/40"
                }`}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <div
                className={`h-0.5 flex-1 ${i === STEPS.length - 1 ? "opacity-0" : i < idx ? "bg-terra" : "bg-ink/15"}`}
              />
            </div>
            <p className={`mt-2 text-center text-[10px] font-bold sm:text-xs ${done ? "text-terra" : "text-ink/40"}`}>
              {t(`track.status.${s.key}`)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const { loadOrder, myOrders, setOpen } = useCart();
  const [input, setInput] = useState(orderId || "");
  const [order, setOrder] = useState(null);
  const [state, setState] = useState("idle");

  const lookup = useCallback(async (id) => {
    setState("loading");
    setOrder(null);
    try {
      const found = await fetchOrder(id);
      setOrder(found);
      setState("found");
    } catch {
      setState("notfound");
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      setInput(orderId);
      lookup(orderId);
    }
  }, [orderId, lookup]);

  const submit = (e) => {
    e.preventDefault();
    const id = input.trim().toUpperCase();
    if (id) navigate(`/track/${encodeURIComponent(id)}`);
  };

  const editable = order && (order.status === "placed" || order.status === "packed");
  const edit = () => {
    loadOrder(order.items, order.orderId);
    setOpen(true);
  };

  return (
    <main data-testid="track-order-page" className="min-h-screen bg-bone px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <Reveal immediate>
          <p className="overline-tag">{t("track.over")}</p>
        </Reveal>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
          <Reveal immediate delay={0.08}>{t("track.a")}</Reveal>{" "}
          <span className="italic text-terra">
            <Reveal immediate delay={0.16}>{t("track.b")}</Reveal>
          </span>
        </h1>
        <FadeUp delay={0.2}>
          <p className="mt-4 text-sm text-ink/60 md:text-base">{t("track.sub")}</p>
        </FadeUp>

        <FadeUp delay={0.26}>
          <form onSubmit={submit} className="mt-7 flex gap-2.5" data-testid="track-form">
            <input
              data-testid="track-order-id-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("track.placeholder")}
              className="h-13 min-w-0 flex-1 rounded-full border border-ink/20 bg-bone px-5 py-3.5 text-sm font-bold uppercase tracking-widest outline-none transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-ink/35 focus:border-terra"
            />
            <motion.button
              data-testid="track-submit-button"
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="flex shrink-0 items-center gap-2 rounded-full bg-terra px-6 py-3.5 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra-dark"
            >
              <Search className="h-4 w-4" /> {t("track.btn")}
            </motion.button>
          </form>
        </FadeUp>

        {myOrders.length > 0 && (
          <FadeUp delay={0.3}>
            <div className="mt-5" data-testid="track-recent-orders">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-moss">{t("track.recent")}</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {myOrders.map((id) => (
                  <button
                    key={id}
                    data-testid={`track-recent-${id}`}
                    onClick={() => navigate(`/track/${encodeURIComponent(id)}`)}
                    className={`rounded-full border px-4 py-2 text-xs font-extrabold tracking-wider transition-colors duration-300 ${
                      orderId === id
                        ? "border-terra bg-terra text-bone"
                        : "border-ink/15 text-ink hover:border-terra hover:text-terra"
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

        {state === "loading" && (
          <p className="mt-10 text-center text-sm font-semibold text-moss" data-testid="track-loading">
            …
          </p>
        )}

        {state === "notfound" && (
          <FadeUp>
            <div className="mt-10 rounded-3xl border border-terra/25 bg-terra/5 p-6 text-center" data-testid="track-not-found">
              <p className="font-display text-xl italic text-terra">{t("track.notfound")}</p>
            </div>
          </FadeUp>
        )}

        {state === "found" && order && (
          <FadeUp>
            <div className="mt-10 rounded-3xl border border-ink/10 bg-bone p-6 shadow-[0_20px_50px_-30px_rgba(31,41,34,0.3)] md:p-8" data-testid="track-result">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-moss">{t("track.orderId")}</p>
                  <p className="font-display text-3xl font-semibold" data-testid="track-result-id">{order.orderId}</p>
                  <p className="mt-1 text-xs text-ink/50" data-testid="track-result-date">{fmt(order.createdAt)}</p>
                </div>
                <span
                  className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider ${PILL[order.status] || PILL.placed}`}
                  data-testid="track-status-pill"
                >
                  {t(`track.status.${order.status}`)}
                </span>
              </div>

              <div className="mt-8">
                <Timeline status={order.status} t={t} />
              </div>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-moss">{t("track.items")}</p>
                <div className="mt-3 space-y-2.5">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-sm" data-testid={`track-item-${idx}`}>
                      <span className="min-w-0 font-semibold">
                        {i.qty}x {i.name} <span className="text-moss">({i.sizeLabel})</span>
                      </span>
                      <span className="shrink-0 font-bold">{inr(i.price * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between border-t border-dashed border-ink/15 pt-4 text-base font-extrabold">
                  <span>{t("track.total")}</span>
                  <span data-testid="track-result-total">{inr(order.total)}</span>
                </div>
              </div>

              <div className="mt-7">
                {editable ? (
                  <>
                    <motion.button
                      data-testid="track-edit-order-button"
                      onClick={edit}
                      whileTap={{ scale: 0.97 }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-bone transition-colors duration-300 hover:bg-terra"
                    >
                      <Pencil className="h-4 w-4" /> {t("track.edit")}
                    </motion.button>
                    <p className="mt-2.5 text-center text-[11px] text-moss">{t("track.editNote")}</p>
                  </>
                ) : (
                  <p className="rounded-2xl bg-sand px-4 py-3 text-center text-xs font-semibold text-ink/70" data-testid="track-locked-note">
                    {t("track.locked")}
                  </p>
                )}
              </div>

              <div className="mt-7 border-t border-ink/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-moss">{t("track.ask")}</p>
                <div className="mt-3 space-y-2.5">
                  {QUESTIONS.map((q) => {
                    const Icon = q.icon;
                    return (
                      <a
                        key={q.key}
                        data-testid={`track-question-${q.key}`}
                        href={waLink(trackQuestionMessage(order.orderId, t(`track.${q.key}`)))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-ink/15 px-4 py-3 text-sm font-semibold transition-colors duration-300 hover:border-[#1faa53] hover:text-[#1faa53]"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1">{t(`track.${q.key}`)}</span>
                        <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#1faa53]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeUp>
        )}
      </div>
    </main>
  );
}
