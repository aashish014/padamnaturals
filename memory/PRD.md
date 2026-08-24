# Padam Naturals — PRD

## Original Problem Statement
"Analyse my website (https://padamnaturals.in/) and create new website where someone tries to buy any product they just jump to WhatsApp on Buy Now button with details they are buying. Analyse each page and create very creative website."

User choices: business WhatsApp number (found on site: +91 82691 69904), message detail = product name + price AND full-cart combined message, recreate all pages, WhatsApp-only ordering (no online checkout), "very creative rooted and best website".

## Architecture
- Frontend-only React SPA (react-router-dom v7): pages Home `/`, Shop `/shop`, Product `/product/:slug`, About `/about`, Contact `/contact`.
- No backend/DB needed — ordering is 100% WhatsApp deep links (`wa.me/918269169904?text=...`) built in `src/lib/whatsapp.js`.
- Cart: Context API (`src/context/CartContext.jsx`), persisted in localStorage, Shadcn Sheet drawer with combined-order WhatsApp message.
- Motion: framer-motion (masked line reveals, scroll parallax) + lenis smooth scrolling.
- Design system: `design_guidelines.json` — bone/sand/ink/terracotta/gold palette, Cormorant Garamond + Rozha One (Devanagari) + Manrope, grain overlay, arch motifs, dark tension section.
- Product/brand images mirrored locally in `frontend/public/images/` (origin site unreachable from pod network; pulled via images.weserv.nl proxy).

## User Personas
- Health-conscious Indian home cooks buying cold-pressed oil in 1L/5L/15L.
- Mobile-first WhatsApp users who prefer chat ordering over online checkout.

## Core Requirements (static)
- Every Buy Now opens WhatsApp with product name, size, qty, price pre-filled.
- Cart: multiple products → one combined WhatsApp order message with total.
- Recreate all original pages: Home, Shop, Product detail, About, Contact.
- Bilingual Hindi-English heritage brand voice.

## Implemented (2026-08-24 iteration 6)
- Combo Packs page `/combo` (`src/pages/Combo.jsx` + `src/data/combos.js`): 4 bundles (Kitchen Starter ₹549, Family Health ₹629, Royal Wellness ₹549, Full Kitchen ₹2,749 — SUGGESTED pricing, confirm with owner), save badges, contents lists, one-tap WhatsApp order per combo + custom-combo WhatsApp strip. Home grid combo tile now links here.
- "Your Seed, Your Oil" page `/your-seed-your-oil` (`src/pages/SeedService.jsx`): bring-your-seeds churning service — 3 icon steps, trust points, WhatsApp CTA with dedicated enquiry message. Linked in navbar ("Seed to Oil" / "बीज से तेल"), footer, and a dark banner strip on Home.
- Myth cards now AUTO-REVEAL the fact on scroll (staggered, no tapping needed); tapping still toggles. Stat strip reframed as "The Padam Standard — every bottle guarantees".
- Floating WhatsApp bubble on all pages (green, pulsing, offsets above the mobile sticky buy bar on product pages).
- Verified: combo WhatsApp message carries full pack contents + price; seed page CTA message; myth auto-reveal; floating button; nav link.

## Implemented (2026-08-24 iteration 5)
- Replaced tap-to-flip facts with graphical "Myths vs Facts" section (`src/components/MythFacts.jsx`): 6 icon-led myth cards that tap to reveal the truth (animated MYTH→FACT badge + icon swap), plus a 4-tile icon stat strip (45℃ max temp, 0% chemicals, 90–100% nutrition, 100+ families). On Home + every PDP. Fully Hindi/English.
- New home "Choose Your Oil" selector grid (`src/components/home/OilGrid.jsx`): 2-col mobile / 4-col desktop visual tiles with oil image, Hindi name, from-price, arrow — each lands on its product page; 6th terracotta tile = Family Combo via WhatsApp.
- Replaced percentage-based masked reveals with pixel+opacity reveals (fixed headings not appearing on some devices).
- Removed old FactsFlip component.

## Implemented (2026-08-24 iteration 4)
- REAL RATES applied (user-provided): Groundnut 1L ₹300 / 5L ₹1475 / 15L ₹4300 · Mustard 200ml ₹80 / 1L ₹280 / 5L ₹1400 / 15L ₹3999 · Sesame 200ml ₹85 / 1L ₹380 / 5L ₹1850 / 15L ₹5400 · Coconut 200ml ₹200 / 1L ₹950 · Almond 100ml ₹300 / 200ml ₹600. Sunflower oil removed (not in rate list). MRP/strike-through removed (no MRPs given). Sizes now carry ml for correct per-litre pricing.
- Full Hindi long-form: FAQs, journey steps, comparison table (all cells), ghani pillar details, heat test, per-oil benefits/nutrients/bestFor/smoke point, About chapters, motto — all switch with the language toggle.
- New sections: Motto "कम खाएं, पर अच्छा खाएं" (Home, before FAQ); FactsFlip — 6 tap-to-flip 3D fact cards (refined vs cold-pressed education, Home + every PDP).
- Nutrition upgraded from bars to animated circular progress rings (per-oil, % + ring stroke animation).
- Free-delivery progress in cart drawer: animated ring (%) + linear bar + ₹ remaining, "unlocked" check state at ₹599+.
- Playful tap micro-interactions (whileTap scale) on product cards, size pills, qty steppers, benefit cards, chips, CTAs.
- Verified: mustard 200ml ₹80 in PDP + wa.me message; cart ₹80 + ₹1475 = ₹1,555 with FREE delivery unlocked; fact card flip; motto + FAQ in Hindi mode; 5 product cards on shop.

## Implemented (2026-08-24 iteration 3)
- Customer Love Wall (`src/components/LoveWall.jsx` + `src/data/reviews.js`): auto-scrolling marquee of 8 review cards (5★, name, city, oil tag), pause-on-hover, placed on Home after the product range and on every product page before related products. Reviews are SAMPLE content pending real customer quotes.
- Hindi/English toggle (`src/i18n.js`): navbar button switches full UI language (nav, hero, section headings, buttons, cart drawer, PDP labels, contact, footer), persisted in localStorage, Mukta + Tiro Devanagari Hindi fonts for Hindi mode. Long-form content (benefit descriptions, journey text, comparison table, pillar details) remains English.
- Verified: toggle flips nav/hero/stats live; love wall marquee renders and scrolls.

## Implemented (2026-08-24 iteration 2)
- Product photo galleries: swipeable Embla carousel + thumbnails on every product page (6 photos for groundnut, 4 for others) using the brand's real imagery
- Deep health content per oil (`src/data/oilDetails.js`): 4 detailed benefit cards, animated "nutrition retained" bars, best-for chips, smoke-point note
- Interactive "Why Lakdi Ghani Wins" section (Home + every product page): tappable pillars (Wooden Churn / Stone Grinding / Slow Pressing / Pure & Natural) with animated detail panel + animated "Heat Test" comparison bars (Refined 225℃ vs Padam 40℃)
- Mobile-first pass: hero bottle now visible on mobile, swipe gallery, sticky bottom Buy bar on product pages (price + qty + Buy Now + Add), 3-col size grid on mobile
- Related-products row on product pages
- Verified on 390px mobile viewport: gallery thumb switching, sticky bar wa.me link, benefit cards, pillar interaction all working

## Implemented (2026-07/08 build session)
- Kinetic hero: masked line-by-line Hindi reveal, parallax bottle in arch frame, rotating "100% Pure" badge, stats.
- Slow editorial marquee ribbon.
- Shop + Home range: staggered arch product cards, 6 oils (Groundnut ₹299, Mustard ₹279, Sesame ₹449, Coconut ₹399, Sunflower ₹319, Almond ₹749 per 1L, 25% launch-offer MRPs, 1L/5L/15L variants).
- Product detail: size selector, qty stepper, Buy Now on WhatsApp (qty/size aware), Add to Order, benefits/uses/storage accordions.
- Dark comparison table (refined vs ordinary vs Padam), numbered journey manifesto (01–04 with parallax photography), FAQ accordion.
- About (3 numbered chapters + stats + WhatsApp CTA), Contact (WhatsApp card, phone, email, Ratlam address).
- Cart drawer: qty +/-, savings vs MRP, free-delivery-over-₹599 indicator, single WhatsApp order.
- Real brand photography served locally.

## Verified
- wa.me links for single buy (1x Groundnut 1L ₹299) and cart (2 items, ₹578 total) — correct numbers/text.
- PDP: 5L + qty 2 → message "2x … (5L) — ₹2,900". Drawer totals/savings correct.
- Screenshots: home hero, range, cart drawer, PDP, about, contact all render.

## Backlog
- P0: Replace mirrored images with originals once site is directly reachable; confirm final prices for non-groundnut oils (currently estimated 25%-off pricing).
- P1: Coupon code field appended to WhatsApp message; order tracking note; Hindi full-language toggle.
- P2: Online payment checkout (user chose WhatsApp-only for now); testimonials section with real customer quotes; blog/recipes.

## Next Tasks
- Swap in final per-oil pricing from the owner.
- Optional: Google Maps embed on Contact (maps currently blocked by origin).
