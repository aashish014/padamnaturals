export const galleries = {
  "groundnut-oil": ["/images/groundnut.png", "/images/oil-1l.png", "/images/oil-5l.png", "/images/peanuts.png", "/images/life-1.png", "/images/life-2.png"],
  "mustard-oil": ["/images/mustard.png", "/images/kitchen.png", "/images/pour.png", "/images/life-3.png"],
  "sesame-oil": ["/images/sesame.png", "/images/pour.png", "/images/kitchen.png", "/images/life-4.png"],
  "coconut-oil": ["/images/coconut.png", "/images/kitchen.png", "/images/life-1.png", "/images/pour.png"],
  "sunflower-oil": ["/images/sunflower.png", "/images/kitchen.png", "/images/pour.png", "/images/life-2.png"],
  "almond-oil": ["/images/almond.png", "/images/pour.png", "/images/kitchen.png", "/images/life-3.png"],
};

export const oilHealth = {
  "groundnut-oil": {
    smokePoint: "Medium-high — great for daily Indian cooking & frying",
    bestFor: ["Everyday Cooking", "Deep Frying", "Tadka", "Pickles", "Chutneys"],
    nutrients: [
      { name: "Vitamin E", level: 90 },
      { name: "Resveratrol (heart antioxidant)", level: 85 },
      { name: "Healthy Mono-unsaturated Fats", level: 88 },
      { name: "Phytosterols", level: 80 },
    ],
    benefits: [
      { title: "Heart's best friend", desc: "Rich in monounsaturated fats and resveratrol that help lower bad cholesterol (LDL) while protecting good cholesterol (HDL)." },
      { title: "Skin & hair nourishment", desc: "High Vitamin E content fights free radicals, keeping skin soft and hair strong from the inside out." },
      { title: "Immunity support", desc: "Natural antioxidants retained by cold-pressing help the body fight infections and inflammation." },
      { title: "Sustained energy", desc: "A balanced fat profile that digests slowly, giving steady energy through the day." },
    ],
  },
  "mustard-oil": {
    smokePoint: "High — the classic choice for frying & pickles",
    bestFor: ["Pickles", "Tadka", "Deep Frying", "Winter Massage", "Traditional Recipes"],
    nutrients: [
      { name: "Omega-3 (ALA)", level: 88 },
      { name: "Natural Antibacterial Agents", level: 95 },
      { name: "Glucosinolates", level: 92 },
      { name: "Vitamin E", level: 70 },
    ],
    benefits: [
      { title: "Fights infections naturally", desc: "Mustard oil's allyl isothiocyanate is a powerful natural antibacterial and antifungal — a reason pickles preserved in it last for years." },
      { title: "Heart-friendly Omega-3", desc: "Alpha-linolenic acid supports heart rhythm and helps reduce inflammation in arteries." },
      { title: "Aids digestion", desc: "Stimulates digestive juices and bile flow — traditional kitchens used it for a reason." },
      { title: "Winter warmth & massage", desc: "A warming oil used for generations for body massage, joint comfort and cold relief." },
    ],
  },
  "sesame-oil": {
    smokePoint: "Medium — perfect for flavourful cooking & rituals",
    bestFor: ["South Indian Cooking", "Oil Pulling", "Abhyanga Massage", "Dressings", "Idli Podi"],
    nutrients: [
      { name: "Sesamol & Sesamin (antioxidants)", level: 92 },
      { name: "Calcium", level: 90 },
      { name: "Zinc", level: 80 },
      { name: "Iron", level: 75 },
    ],
    benefits: [
      { title: "Bone strength", desc: "One of the richest plant sources of calcium and zinc — the minerals your bones and joints crave daily." },
      { title: "Oral health via oil pulling", desc: "Ayurveda's favourite oil for pulling — reduces harmful bacteria, strengthens gums and freshens breath." },
      { title: "Natural blood pressure support", desc: "Sesamin and sesamol antioxidants are studied for supporting healthy blood pressure levels." },
      { title: "Skin that glows", desc: "Deep-penetrating and rich in Vitamin E — used in abhyanga massage for centuries for supple, youthful skin." },
    ],
  },
  "coconut-oil": {
    smokePoint: "Medium — ideal for coastal cooking & baking",
    bestFor: ["Coastal Curries", "Dosa & Appam", "Baking", "Hair Care", "Baby Massage"],
    nutrients: [
      { name: "MCT (quick energy fats)", level: 95 },
      { name: "Lauric Acid", level: 92 },
      { name: "Antimicrobial Power", level: 90 },
      { name: "Vitamin E", level: 65 },
    ],
    benefits: [
      { title: "Instant, clean energy", desc: "MCTs go straight to the liver and convert to energy fast — a favourite of athletes and growing kids." },
      { title: "Nature's hair conditioner", desc: "Lauric acid penetrates the hair shaft like no other oil, reducing protein loss and strengthening roots." },
      { title: "Gentle antimicrobial shield", desc: "Lauric acid converts to monolaurin in the body, which helps fight harmful bacteria and viruses." },
      { title: "Safe for baby's skin", desc: "So pure and gentle it's been the first massage oil for babies in Indian homes for generations." },
    ],
  },
  "sunflower-oil": {
    smokePoint: "Medium — light everyday cooking & baking",
    bestFor: ["Light Sautéing", "Baking", "Salads", "Everyday Family Meals"],
    nutrients: [
      { name: "Vitamin E", level: 95 },
      { name: "Omega-6 (Linoleic acid)", level: 80 },
      { name: "Phytosterols", level: 75 },
      { name: "Selenium", level: 60 },
    ],
    benefits: [
      { title: "Vitamin E powerhouse", desc: "Among the richest oils in Vitamin E — one tablespoon covers a big part of your daily need for skin and immunity." },
      { title: "Light on the stomach", desc: "Mild flavour and light texture make it easy to digest — perfect when you want food, not oil, to shine." },
      { title: "Cholesterol balance", desc: "Phytosterols and linoleic acid help manage cholesterol absorption as part of a balanced diet." },
      { title: "Cell protection", desc: "Selenium and Vitamin E together protect cells from everyday oxidative stress." },
    ],
  },
  "almond-oil": {
    smokePoint: "Best consumed raw — drizzle, don't fry",
    bestFor: ["Warm Milk", "Desserts", "Skincare Rituals", "Baby Massage", "Hair Oil"],
    nutrients: [
      { name: "Vitamin E", level: 98 },
      { name: "Omega-9 (Oleic acid)", level: 85 },
      { name: "Magnesium", level: 80 },
      { name: "Plant Protein", level: 70 },
    ],
    benefits: [
      { title: "Brain & memory tonic", desc: "Grandma was right — badam in warm milk supports memory, focus and restful sleep thanks to magnesium and healthy fats." },
      { title: "The glow oil", desc: "The highest Vitamin E of all our oils — deeply nourishes skin, fades dryness and adds a natural glow." },
      { title: "Stronger hair roots", desc: "Oleic acid and Vitamin E together reduce hair breakage and nourish the scalp." },
      { title: "Gentle for babies", desc: "Traditionally the first oil for newborn massage — soft, hypoallergenic and deeply nourishing." },
    ],
  },
};

export const ghaniPillars = [
  {
    id: "churn",
    title: "Wooden Churn",
    subtitle: "Low Temperature",
    hindi: "लकड़ी का घोटा",
    detail: "Wood is a poor conductor of heat — and that's exactly why our ancestors chose it. The wooden churn keeps the pressing temperature naturally low (30–45℃), so delicate vitamins, enzymes and aroma compounds survive in every drop.",
  },
  {
    id: "stone",
    title: "Stone Grinding",
    subtitle: "Authentic Taste",
    hindi: "पत्थर की चक्की",
    detail: "Seeds are ground slowly on stone, releasing oil gently without shocking the nutrients. This is what gives Lakdi Ghani oil its deep, nutty aroma that refined oils can never imitate.",
  },
  {
    id: "slow",
    title: "Slow Pressing",
    subtitle: "Low RPM",
    hindi: "धीमा दबाव",
    detail: "Our ghani rotates at a fraction of the speed of industrial expellers. No friction heat, no oxidation, no burnt flavour — just oil the way it tasted a hundred years ago.",
  },
  {
    id: "pure",
    title: "Pure & Natural",
    subtitle: "0% Chemicals",
    hindi: "शुद्ध और प्राकृतिक",
    detail: "No hexane extraction, no bleaching, no deodorising, no preservatives. What leaves the ghani is what reaches your kitchen — 0% trans fats, 100% honest.",
  },
];

export const heatComparison = [
  { name: "Refined Oil", temp: 225, note: "200–250℃ · nutrients destroyed", color: "#C04A22" },
  { name: "Ordinary Expeller", temp: 115, note: "80–150℃ · partially preserved", color: "#DDA74F" },
  { name: "Padam Lakdi Ghani", temp: 40, note: "30–45℃ · 90–100% nutrition retained", color: "#5C6856" },
];
