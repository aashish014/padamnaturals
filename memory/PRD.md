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
