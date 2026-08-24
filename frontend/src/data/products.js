export const products = [
  {
    slug: "groundnut-oil",
    name: "Lakdi Ghani Groundnut Oil",
    hindi: "मूंगफली का तेल",
    tagline: "The everyday hero of the Indian kitchen",
    image: "/images/groundnut.png",
    tint: "#EBE4D5",
    sizes: [
      { label: "1L", price: 299, mrp: 399 },
      { label: "5L", price: 1450, mrp: 1933 },
      { label: "15L", price: 4250, mrp: 5667 },
    ],
    benefits: ["Rich in Vitamin E & antioxidants", "Supports heart health", "Boosts immunity", "Free from trans fats"],
    uses: "Perfect for everyday cooking, frying, sautéing, salad dressings, chutneys, pickles and traditional recipes.",
  },
  {
    slug: "mustard-oil",
    name: "Lakdi Ghani Mustard Oil",
    hindi: "सरसों का तेल",
    tagline: "Bold aroma, bolder flavour — the desi punch",
    image: "/images/mustard.png",
    tint: "#F0E3C0",
    sizes: [
      { label: "1L", price: 279, mrp: 372 },
      { label: "5L", price: 1350, mrp: 1800 },
      { label: "15L", price: 3990, mrp: 5320 },
    ],
    benefits: ["Natural antibacterial properties", "High smoke point for frying", "Rich in Omega-3", "Aids digestion"],
    uses: "Ideal for pickles, tadkas, deep frying, traditional North Indian recipes and body massage in winters.",
  },
  {
    slug: "sesame-oil",
    name: "Lakdi Ghani Sesame Oil",
    hindi: "तिल का तेल",
    tagline: "Ancient seed, golden drop of wellness",
    image: "/images/sesame.png",
    tint: "#EFE0CC",
    sizes: [
      { label: "1L", price: 449, mrp: 599 },
      { label: "5L", price: 2190, mrp: 2920 },
      { label: "15L", price: 6450, mrp: 8600 },
    ],
    benefits: ["Packed with calcium & zinc", "Great for skin & hair", "Anti-inflammatory", "Supports bone health"],
    uses: "Wonderful for South Indian cooking, idli podi, oil pulling, abhyanga massage and temple-style recipes.",
  },
  {
    slug: "coconut-oil",
    name: "Lakdi Ghani Coconut Oil",
    hindi: "नारियल का तेल",
    tagline: "Coastal purity in every spoonful",
    image: "/images/coconut.png",
    tint: "#EDE7DC",
    sizes: [
      { label: "1L", price: 399, mrp: 532 },
      { label: "5L", price: 1950, mrp: 2600 },
      { label: "15L", price: 5750, mrp: 7667 },
    ],
    benefits: ["Rich in healthy MCT fats", "Deep nourishment for hair", "Natural moisturiser", "Boosts energy"],
    uses: "Perfect for coastal curries, dosa, baking, hair care rituals and baby massage.",
  },
  {
    slug: "sunflower-oil",
    name: "Lakdi Ghani Sunflower Oil",
    hindi: "सूरजमुखी का तेल",
    tagline: "Light, sunny and gentle on the heart",
    image: "/images/sunflower.png",
    tint: "#F3E9C8",
    sizes: [
      { label: "1L", price: 319, mrp: 425 },
      { label: "5L", price: 1550, mrp: 2067 },
      { label: "15L", price: 4550, mrp: 6067 },
    ],
    benefits: ["High in Vitamin E", "Light & easy to digest", "Heart-friendly profile", "Neutral, clean taste"],
    uses: "Great for light sautéing, baking, salads and everyday family meals where a mild oil is preferred.",
  },
  {
    slug: "almond-oil",
    name: "Lakdi Ghani Almond Oil",
    hindi: "बादाम तेल",
    tagline: "Liquid gold for skin, hair & strength",
    image: "/images/almond.png",
    tint: "#EAD9C2",
    sizes: [
      { label: "1L", price: 749, mrp: 999 },
      { label: "5L", price: 3650, mrp: 4867 },
      { label: "15L", price: 10750, mrp: 14333 },
    ],
    benefits: ["Nourishes brain & memory", "Deep skin glow", "Strengthens hair roots", "Rich in Vitamin E"],
    uses: "Best consumed raw — in warm milk, drizzled on desserts, or used for baby massage and skincare rituals.",
  },
];

export const journey = [
  {
    num: "01",
    title: "From the Farms",
    hindi: "खेतों से",
    text: "Fresh A1-grade seeds are handpicked directly from trusted farmers to ensure the best quality, every single batch.",
    image: "/images/journey-farms.png",
  },
  {
    num: "02",
    title: "Churned in Lakdi Ghani",
    hindi: "लकड़ी की घानी में",
    text: "Using the traditional Kachi Ghani method, seeds are cold-pressed slowly in a wooden churn at low RPM — keeping every nutrient intact.",
    image: "/images/journey-ghani.png",
  },
  {
    num: "03",
    title: "Pure & Untouched",
    hindi: "शुद्ध और अछूता",
    text: "No chemicals. No preservatives. Just 100% natural oil, rich in taste, aroma and health — exactly as nature made it.",
    image: "/images/journey-pure.png",
  },
  {
    num: "04",
    title: "Village to Your Home",
    hindi: "गांव से आपके घर तक",
    text: "Packed with love and care, Padam Naturals brings purity from our village straight to your kitchen shelf.",
    image: "/images/journey-village.png",
  },
];

export const comparison = [
  { factor: "Processing Temperature", refined: "200–250℃ · very high heat", ordinary: "80–150℃ · medium heat", padam: "30–45℃ · very low heat" },
  { factor: "Chemicals Used", refined: "Hexane, bleaching, preservatives", ordinary: "Sometimes added for shelf life", padam: "None — 100% pure, 0% chemical" },
  { factor: "Trans Fats / LDL", refined: "High — main cause of heart disease", ordinary: "Moderate — long-term risk", padam: "0% trans fat — safe for heart" },
  { factor: "Nutrition Retained", refined: "Less than 10% — almost destroyed", ordinary: "40–58% — partially preserved", padam: "90–100% — fully preserved" },
  { factor: "Taste & Aroma", refined: "Artificial, processed taste", ordinary: "Slightly better, still altered", padam: "Natural & authentic — original aroma" },
  { factor: "Health Impact", refined: "High risk — cholesterol imbalance", ordinary: "Moderate risk — digestion issues", padam: "Health promoting — natural benefits" },
];

export const faqs = [
  { q: "Why is cold-pressed oil more expensive?", a: "Because it's made in small batches using wooden presses, with the best quality seeds and no chemicals. The oil yield is less, but you get 100% purity and nutrition in every drop." },
  { q: "Is Kachi Ghani oil safe for cooking at high heat?", a: "Yes, it's safe for daily use and medium-heat cooking. For deep frying or very high heat, we recommend oils with a higher smoke point like mustard or groundnut." },
  { q: "How can I trust it's real?", a: "Our oils are made fresh in Lakdi Ghani with natural aroma, taste and colour you can experience yourself. No mixing, no refining — just pure oil. You're always welcome to visit us and see the process." },
  { q: "Is the oil filtered?", a: "Yes, the oil is naturally filtered without using chemicals or artificial agents, retaining its natural flavour and nutrients." },
  { q: "What about delivery?", a: "Free delivery is available on orders above ₹599. For orders below this amount, standard shipping charges apply. Confirm your order on WhatsApp and we handle the rest." },
  { q: "What is the shelf life?", a: "Best before 12 months from the date of pressing when stored in a cool, dry place away from direct sunlight. Use within 6 months of opening for the best taste and aroma." },
];

export const heroBottle = "/images/hero-bottle.png";
export const logo = "/images/logo.png";
