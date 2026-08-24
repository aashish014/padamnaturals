const ITEMS = [
  "Khaane Ka Swaad, Sehat Ke Saath",
  "No Heat, No Chemicals",
  "100% Natural & Unrefined",
  "गांव की घानी से सीधा आपके घर तक",
  "Lakdi Ghani · Slow Pressed · Small Batches",
];

export const Marquee = ({ dark = false }) => (
  <div
    data-testid="editorial-marquee"
    className={`overflow-hidden border-y border-ink/10 py-5 ${
      dark ? "bg-forest text-bone border-bone/10" : "bg-sand text-ink"
    }`}
  >
    <div className="flex w-max animate-marquee whitespace-nowrap">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {ITEMS.map((t, i) => (
            <span key={i} className="flex items-center">
              <span className={`mx-8 font-display text-2xl italic md:text-3xl ${t.match(/[\u0900-\u097F]/) ? "font-hindi not-italic" : ""}`}>
                {t}
              </span>
              <span className="text-terra text-lg">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
