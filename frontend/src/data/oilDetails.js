export const galleries = {
  "groundnut-oil": ["/images/groundnut.png", "/images/oil-1l.png", "/images/oil-5l.png", "/images/peanuts.png", "/images/life-1.png", "/images/life-2.png"],
  "mustard-oil": ["/images/mustard.png", "/images/kitchen.png", "/images/pour.png", "/images/life-3.png"],
  "sesame-oil": ["/images/sesame.png", "/images/pour.png", "/images/kitchen.png", "/images/life-4.png"],
  "coconut-oil": ["/images/coconut.png", "/images/kitchen.png", "/images/life-1.png", "/images/pour.png"],
  "almond-oil": ["/images/almond.png", "/images/pour.png", "/images/kitchen.png", "/images/life-3.png"],
};

export const oilHealth = {
  "groundnut-oil": {
    smokePoint: "Medium-high — great for daily Indian cooking & frying",
    smokePointHi: "मीडियम-हाई — रोज़ की इंडियन कुकिंग और फ्राइंग के लिए बढ़िया",
    bestFor: ["Everyday Cooking", "Deep Frying", "Tadka", "Pickles", "Chutneys"],
    bestForHi: ["रोज़ की कुकिंग", "डीप फ्राइंग", "तड़का", "अचार", "चटनी"],
    nutrients: [
      { name: "Vitamin E", nameHi: "विटामिन E", level: 90 },
      { name: "Resveratrol (heart antioxidant)", nameHi: "रेस्वेराट्रॉल (हृदय)", level: 85 },
      { name: "Healthy Mono-unsaturated Fats", nameHi: "हेल्दी मोनो फैट", level: 88 },
      { name: "Phytosterols", nameHi: "फाइटोस्टेरॉल", level: 80 },
    ],
    benefits: [
      { title: "Heart's best friend", titleHi: "दिल का सच्चा दोस्त", desc: "Rich in monounsaturated fats and resveratrol that help lower bad cholesterol (LDL) while protecting good cholesterol (HDL).", descHi: "मोनो-अनसैचुरेटेड फैट और रेस्वेराट्रॉल खराब कोलेस्ट्रॉल (LDL) घटाते हैं और अच्छे (HDL) को बचाते हैं।" },
      { title: "Skin & hair nourishment", titleHi: "त्वचा और बालों का पोषण", desc: "High Vitamin E content fights free radicals, keeping skin soft and hair strong from the inside out.", descHi: "विटामिन E फ्री रेडिकल्स से लड़ता है — त्वचा कोमल, बाल मजबूत।" },
      { title: "Immunity support", titleHi: "इम्युनिटी का साथी", desc: "Natural antioxidants retained by cold-pressing help the body fight infections and inflammation.", descHi: "कोल्ड-प्रेसिंग से बचे प्राकृतिक एंटीऑक्सीडेंट संक्रमण और सूजन से लड़ने में मदद करते हैं।" },
      { title: "Sustained energy", titleHi: "दिनभर की ऊर्जा", desc: "A balanced fat profile that digests slowly, giving steady energy through the day.", descHi: "संतुलित फैट धीरे पचता है — दिनभर स्थिर ऊर्जा देता है।" },
    ],
  },
  "mustard-oil": {
    smokePoint: "High — the classic choice for frying & pickles",
    smokePointHi: "हाई — फ्राइंग और अचार के लिए क्लासिक चुनाव",
    bestFor: ["Pickles", "Tadka", "Deep Frying", "Winter Massage", "Traditional Recipes"],
    bestForHi: ["अचार", "तड़का", "डीप फ्राइंग", "सर्दी की मालिश", "पारंपरिक रेसिपी"],
    nutrients: [
      { name: "Omega-3 (ALA)", nameHi: "ओमेगा-3 (ALA)", level: 88 },
      { name: "Natural Antibacterial Agents", nameHi: "प्राकृतिक एंटीबैक्टीरियल", level: 95 },
      { name: "Glucosinolates", nameHi: "ग्लूकोसिनोलेट्स", level: 92 },
      { name: "Vitamin E", nameHi: "विटामिन E", level: 70 },
    ],
    benefits: [
      { title: "Fights infections naturally", titleHi: "प्राकृतिक इन्फेक्शन फाइटर", desc: "Mustard oil's allyl isothiocyanate is a powerful natural antibacterial and antifungal — a reason pickles preserved in it last for years.", descHi: "सरसों का अलाइल आइसोथायोसाइनेट दमदार प्राकृतिक एंटीबैक्टीरियल है — इसीलिए अचार सालों तक सुरक्षित रहता है।" },
      { title: "Heart-friendly Omega-3", titleHi: "हृदय के लिए ओमेगा-3", desc: "Alpha-linolenic acid supports heart rhythm and helps reduce inflammation in arteries.", descHi: "अल्फा-लिनोलेनिक एसिड हृदय की धड़कन सुधारता है और धमनियों की सूजन कम करता है।" },
      { title: "Aids digestion", titleHi: "पाचन में मदद", desc: "Stimulates digestive juices and bile flow — traditional kitchens used it for a reason.", descHi: "पाचक रस और पित्त का प्रवाह बढ़ाता है — पारंपरिक रसोई की यही समझदारी।" },
      { title: "Winter warmth & massage", titleHi: "सर्दी की गर्माहट और मालिश", desc: "A warming oil used for generations for body massage, joint comfort and cold relief.", descHi: "पीढ़ियों से शरीर की मालिश, जोड़ों के आराम और सर्दी-जुकाम में इस्तेमाल होता तेल।" },
    ],
  },
  "sesame-oil": {
    smokePoint: "Medium — perfect for flavourful cooking & rituals",
    smokePointHi: "मीडियम — स्वादिष्ट कुकिंग और नुस्खों के लिए",
    bestFor: ["South Indian Cooking", "Oil Pulling", "Abhyanga Massage", "Dressings", "Idli Podi"],
    bestForHi: ["साउथ इंडियन", "ऑइल पुलिंग", "अभ्यंग मालिश", "ड्रेसिंग", "इडली पोडी"],
    nutrients: [
      { name: "Sesamol & Sesamin (antioxidants)", nameHi: "सेसामोल और सेसामिन", level: 92 },
      { name: "Calcium", nameHi: "कैल्शियम", level: 90 },
      { name: "Zinc", nameHi: "जिंक", level: 80 },
      { name: "Iron", nameHi: "आयरन", level: 75 },
    ],
    benefits: [
      { title: "Bone strength", titleHi: "हड्डियों की ताकत", desc: "One of the richest plant sources of calcium and zinc — the minerals your bones and joints crave daily.", descHi: "कैल्शियम और जिंक का सबसे अमीर पौधा-स्रोत — रोज़ की ज़रूरत हड्डियों और जोड़ों के लिए।" },
      { title: "Oral health via oil pulling", titleHi: "ऑइल पुलिंग से मुंह की सेहत", desc: "Ayurveda's favourite oil for pulling — reduces harmful bacteria, strengthens gums and freshens breath.", descHi: "आयुर्वेद का पसंदीदा तेल — हानिकारक बैक्टीरिया कम, मसूड़े मजबूत, सांसें ताज़ा।" },
      { title: "Natural blood pressure support", titleHi: "ब्लड प्रेशर संतुलन", desc: "Sesamin and sesamol antioxidants are studied for supporting healthy blood pressure levels.", descHi: "सेसामिन और सेसामोल एंटीऑक्सीडेंट स्वस्थ ब्लड प्रेशर के लिए जाने जाते हैं।" },
      { title: "Skin that glows", titleHi: "चमकती त्वचा", desc: "Deep-penetrating and rich in Vitamin E — used in abhyanga massage for centuries for supple, youthful skin.", descHi: "गहराई तक पहुंचने वाला विटामिन E युक्त तेल — सदियों से अभ्यंग मालिश में।" },
    ],
  },
  "coconut-oil": {
    smokePoint: "Medium — ideal for coastal cooking & baking",
    smokePointHi: "मीडियम — कोस्टल कुकिंग और बेकिंग के लिए",
    bestFor: ["Coastal Curries", "Dosa & Appam", "Baking", "Hair Care", "Baby Massage"],
    bestForHi: ["कोस्टल करी", "डोसा और अप्पम", "बेकिंग", "हेयर केयर", "बेबी मालिश"],
    nutrients: [
      { name: "MCT (quick energy fats)", nameHi: "MCT (तुरंत ऊर्जा)", level: 95 },
      { name: "Lauric Acid", nameHi: "लॉरिक एसिड", level: 92 },
      { name: "Antimicrobial Power", nameHi: "एंटीमाइक्रोबियल शक्ति", level: 90 },
      { name: "Vitamin E", nameHi: "विटामिन E", level: 65 },
    ],
    benefits: [
      { title: "Instant, clean energy", titleHi: "तुरंत, साफ ऊर्जा", desc: "MCTs go straight to the liver and convert to energy fast — a favourite of athletes and growing kids.", descHi: "MCT सीधे लिवर में जाते हैं और जल्दी ऊर्जा बनते हैं — बच्चों और एक्टिव लोगों के लिए बेहतरीन।" },
      { title: "Nature's hair conditioner", titleHi: "प्रकृति का हेयर कंडीशनर", desc: "Lauric acid penetrates the hair shaft like no other oil, reducing protein loss and strengthening roots.", descHi: "लॉरिक एसिड बालों के अंदर तक जाता है — प्रोटीन की कमी रोकता है, जड़ें मजबूत करता है।" },
      { title: "Gentle antimicrobial shield", titleHi: "प्राकृतिक एंटीमाइक्रोबियल ढाल", desc: "Lauric acid converts to monolaurin in the body, which helps fight harmful bacteria and viruses.", descHi: "लॉरिक एसिड शरीर में मोनोलॉरिन बनता है, जो हानिकारक बैक्टीरिया-वायरस से लड़ता है।" },
      { title: "Safe for baby's skin", titleHi: "बेबी की त्वचा के लिए सुरक्षित", desc: "So pure and gentle it's been the first massage oil for babies in Indian homes for generations.", descHi: "इतना शुद्ध कि पीढ़ियों से नवजात की पहली मालिश का तेल रहा है।" },
    ],
  },
  "almond-oil": {
    smokePoint: "Best consumed raw — drizzle, don't fry",
    smokePointHi: "कच्चा सेवन सबसे बढ़िया — भूनिए नहीं, डालिए",
    bestFor: ["Warm Milk", "Desserts", "Skincare Rituals", "Baby Massage", "Hair Oil"],
    bestForHi: ["गर्म दूध", "मिठाई", "स्किनकेयर", "बेबी मालिश", "हेयर ऑइल"],
    nutrients: [
      { name: "Vitamin E", nameHi: "विटामिन E", level: 98 },
      { name: "Omega-9 (Oleic acid)", nameHi: "ओमेगा-9 (ओलिक एसिड)", level: 85 },
      { name: "Magnesium", nameHi: "मैग्नीशियम", level: 80 },
      { name: "Plant Protein", nameHi: "प्लांट प्रोटीन", level: 70 },
    ],
    benefits: [
      { title: "Brain & memory tonic", titleHi: "दिमाग और याददाश्त का टॉनिक", desc: "Grandma was right — badam in warm milk supports memory, focus and restful sleep thanks to magnesium and healthy fats.", descHi: "दादी माँ सही कहती थीं — गर्म दूध में बादाम; मैग्नीशियम और हेल्दी फैट से याददाश्त और नींद बेहतर।" },
      { title: "The glow oil", titleHi: "चमक का तेल", desc: "The highest Vitamin E of all our oils — deeply nourishes skin, fades dryness and adds a natural glow.", descHi: "हमारे सभी तेलों में सबसे ज़्यादा विटामिन E — त्वचा गहराई से नरम, रूखापन दूर, प्राकृतिक चमक।" },
      { title: "Stronger hair roots", titleHi: "मजबूत बालों की जड़ें", desc: "Oleic acid and Vitamin E together reduce hair breakage and nourish the scalp.", descHi: "ओलिक एसिड और विटामिन E मिलकर बालों का टूटना घटाते हैं और स्कैल्प को पोषण देते हैं।" },
      { title: "Gentle for babies", titleHi: "बच्चों के लिए कोमल", desc: "Traditionally the first oil for newborn massage — soft, hypoallergenic and deeply nourishing.", descHi: "परंपरा से नवजात मालिश का पहला तेल — नरम और गहराई से पोषण देने वाला।" },
    ],
  },
};

export const ghaniPillars = [
  {
    id: "churn",
    title: "Wooden Churn",
    subtitle: "Low Temperature",
    subtitleHi: "कम तापमान",
    hindi: "लकड़ी का घोटा",
    detail: "Wood is a poor conductor of heat — and that's exactly why our ancestors chose it. The wooden churn keeps the pressing temperature naturally low (30–45℃), so delicate vitamins, enzymes and aroma compounds survive in every drop.",
    detailHi: "लकड़ी गर्मी का कुचालक होती है — और हमारे पूर्वजों ने इसीलिए इसे चुना। लकड़ी का घोटा तापमान 30–45℃ पर रखता है, जिससे विटामिन, एंजाइम और खुशबू हर बूँद में जीवित रहते हैं।",
  },
  {
    id: "stone",
    title: "Stone Grinding",
    subtitle: "Authentic Taste",
    subtitleHi: "असली स्वाद",
    hindi: "पत्थर की चक्की",
    detail: "Seeds are ground slowly on stone, releasing oil gently without shocking the nutrients. This is what gives Lakdi Ghani oil its deep, nutty aroma that refined oils can never imitate.",
    detailHi: "बीज पत्थर पर धीरे-धीरे पिसते हैं, जिससे तेल धीरे निकलता है और पोषण सुरक्षित रहता है। यही वजह है कि लकड़ी घानी की गहरी, असली खुशबू रिफाइंड तेल कभी नहीं ला सकता।",
  },
  {
    id: "slow",
    title: "Slow Pressing",
    subtitle: "Low RPM",
    subtitleHi: "कम RPM",
    hindi: "धीमा दबाव",
    detail: "Our ghani rotates at a fraction of the speed of industrial expellers. No friction heat, no oxidation, no burnt flavour — just oil the way it tasted a hundred years ago.",
    detailHi: "हमारी घानी इंडस्ट्रियल मशीनों से कहीं धीमी घूमती है। न घर्षण की गर्मी, न ऑक्सीडेशन, न जला स्वाद — बस सौ साल पुराना असली स्वाद।",
  },
  {
    id: "pure",
    title: "Pure & Natural",
    subtitle: "0% Chemicals",
    subtitleHi: "0% केमिकल",
    hindi: "शुद्ध और प्राकृतिक",
    detail: "No hexane extraction, no bleaching, no deodorising, no preservatives. What leaves the ghani is what reaches your kitchen — 0% trans fats, 100% honest.",
    detailHi: "न हेक्सेन, न ब्लीचिंग, न प्रिज़र्वेटिव। घानी से जो निकलता है, वही आपकी रसोई तक — 0% ट्रांस फैट, 100% ईमानदारी।",
  },
];

export const heatComparison = [
  { name: "Refined Oil", nameHi: "रिफाइंड तेल", temp: 225, note: "200–250℃ · nutrients destroyed", noteHi: "200–250℃ · पोषण नष्ट", color: "#C04A22" },
  { name: "Ordinary Expeller", nameHi: "मामूली एक्सपेलर", temp: 115, note: "80–150℃ · partially preserved", noteHi: "80–150℃ · आंशिक सुरक्षित", color: "#DDA74F" },
  { name: "Padam Lakdi Ghani", nameHi: "पदम लकड़ी घानी", temp: 40, note: "30–45℃ · 90–100% nutrition retained", noteHi: "30–45℃ · 90–100% पोषण सुरक्षित", color: "#5C6856" },
];

export const facts = [
  {
    en: "Refined oil is heated to 250℃ — hotter than a pizza oven. Nutrients don't stand a chance.",
    hi: "रिफाइंड तेल 250℃ तक गर्म होता है — पिज़्जा ओवन से भी तेज़। पोषण की कोई गुंजाइश नहीं।",
  },
  {
    en: "Hexane — a petrol-derived solvent — is used to extract most refined oils.",
    hi: "ज़्यादातर रिफाइंड तेल निकालने में हेक्सेन — पेट्रोल से बना सॉल्वेंट — इस्तेमाल होता है।",
  },
  {
    en: "Cold-pressed oil keeps up to 100% of its Vitamin E. Refined keeps under 10%.",
    hi: "कोल्ड-प्रेस्ड तेल में 100% तक विटामिन E बचता है। रिफाइंड में 10% से कम।",
  },
  {
    en: "One wooden ghani presses in an hour what a factory does in minutes — and that's the point.",
    hi: "लकड़ी की घानी एक घंटे में वो निचोड़ती है जो फैक्ट्री मिनटों में — और यही असली बात है।",
  },
  {
    en: "Your dadi's pickles lasted years without a fridge — kachi ghani oil was the preservative.",
    hi: "आपकी दादी का अचार बिना फ्रिज के सालों चलता था — कच्ची घानी का तेल ही प्रिज़र्वेटिव था।",
  },
  {
    en: "0% trans fat in Lakdi Ghani oil. Trans fat is your heart's biggest dietary enemy.",
    hi: "लकड़ी घानी तेल में 0% ट्रांस फैट। ट्रांस फैट आपके दिल का सबसे बड़ा आहार-दुश्मन है।",
  },
];
