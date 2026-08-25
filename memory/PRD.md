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

## Implemented (2026-08-25 iteration 16) — Mobile optimization pass
- Full-page mobile audit at 390px (all 7 routes): zero horizontal overflow confirmed everywhere.
- Hero tightened on mobile (pt-24, smaller Hindi heading text-[2.55rem], stats mt-9, text col pb-8) so the signature 3D bottle + rotating badge now peeks into the first viewport (bottle top y=616 of 800px) instead of hiding below the fold.
- Tap targets fixed to ≥40px: PDP qty stepper buttons (were 16px icon-only, now 40×40 padded circles), navbar Track icon + language toggle (32px → 40px), footer nav links (20px → 36px rows with 12px gaps).
- Gesture-bar safe areas: bottom nav, PDP sticky buy bar, floating cart bubble, and the bottom content spacer all respect env(safe-area-inset-bottom) so nothing hides under Android/iPhone gesture bars.
- Removed dead h-13 class on track input.
- Verified visually: hero, PDP gallery/sticky bar, stacking of bubble vs sticky bar vs bottom nav all clean at 390px.
- Requires redeploy to reach production (buy-now-connect.emergent.host).

## Implemented (2026-08-25 iteration 15) — Android WhatsApp fix + toast removal
- "Order on WhatsApp" now navigates the SAME tab to wa.me (window.location.href) instead of a pre-opened popup tab — Android Chrome only fires the WhatsApp app intent on direct same-tab navigation; the popup-tab approach dumped users on the wa.me web/download page. Same fix applies to the "Send Updated Order" flow. Verified: same-tab lands on api.whatsapp.com/send with the full message.
- Add-to-cart toast removed entirely (user found it slow/noisy) — adding items is now silent, the floating bubble badge is the feedback.
- NOTE: app was deployed to production (buy-now-connect.emergent.host) BEFORE this fix — requires redeploy to take effect live.

## Implemented (2026-08-25 iteration 14) — UX polish + owner alerts
- Cart icons removed from shop cards and product pages (desktop + sticky bar). Replaced by `src/components/FloatingCart.jsx`: a floating terracotta basket bubble that springs in bottom-right above the bottom nav whenever the basket has items (higher on product pages to clear the sticky buy bar), badge pops on each add, opens the order drawer.
- WhatsApp order message no longer carries "(as per today's rate card on padamnaturals.in)".
- Free-delivery progress in the drawer slimmed from a ~100px ring block to a ~48px single-line strip (text + thin bar + amounts).
- Delivery ETA notes: owner types a note (e.g. "Arriving Tuesday") per order in /admin and saves it standalone or with a status change (PATCH accepts optional `note`, stored as `deliveryNote`, history push skipped when only the note changes); customer tracking page shows it as a green strip under the timeline. Bilingual label.
- WhatsApp handoff polish: the pre-opened tab shows "Taking you to WhatsApp…" instead of a blank page while the order saves.
- Owner order alerts built (`notify_owner` in server.py): background CallMeBot ping to OWNER_WA_NUMBER the moment an order is placed — fire-and-forget, ordering never blocks on it. DORMANT until owner shares the free CallMeBot API key (activation: send "I allow callmebot to send me messages" to +34 644 51 95 23 from owner WhatsApp → get key → set CALLMEBOT_API_KEY in backend env).
- Verified: 18/18 pytest regression, note flow via curl (packed + note → public GET shows it), floating bubble behavior + hidden-when-empty + compact bar (48px) on 390px, UI order lands in backend (PN-VM92MX), no references to removed CartIconButton remain.

## Implemented (2026-08-25 iteration 13) — Order Tracking + Admin
- Backend is now live (FastAPI + MongoDB): orders save automatically when the customer taps "Order on WhatsApp". Order IDs are unguessable unambiguous 6-char codes (PN-XXXXXX, no 0/O/1/I/L).
- WhatsApp order message: `Order ID: PN-XXXXXX` first line, item lines, Order Total, and last line `Track my order: <site>/track/PN-XXXXXX` — customer taps straight into their order without re-entering the ID.
- Track Order page `/track` + `/track/:orderId`: Order ID input, recent-order chips (localStorage), live status timeline (Placed → Packed → Shipped → Delivered), items + total, Edit Order (until shipped — reloads items into the cart drawer, "Send Updated Order" CTA sends an UPDATE WhatsApp message with the same ID and PUTs the backend), and 3 WhatsApp question buttons (status? / when delivered? / where is my order?) pre-filled with the Order ID. Bilingual EN/HI.
- Owner admin at `/admin`: seeded single admin (env ADMIN_EMAIL/ADMIN_PASSWORD), bcrypt + JWT httpOnly cookie (7d), brute-force lockout 5 fails/15 min keyed on X-Forwarded-For+email, orders list with one-tap status buttons.
- Cart icon with red count badge next to every Buy Now (shop cards, PDP desktop, PDP mobile sticky bar) opens the order drawer; top navbar has a Track icon instead of a cart icon.
- Security/robustness fixes from test report: popup-safe WhatsApp handoff (tab pre-opened in click gesture), no fake fallback order IDs (failure surfaces as error toast), explicit CORS origin, lifespan handlers, admin load errors surfaced.
- Verified: 18/18 pytest backend tests, full frontend e2e (order flow, tracking, edit-lock after shipped 409, admin status updates reflect on customer timeline, Hindi toggle, no 390px overflow).

## Implemented (2026-08-25 iteration 12)
- Anti-tamper order messages: every WhatsApp order now carries a unique Order ID (PN-XXXX) + "as per today's rate card on padamnaturals.in" line, so edited prices are obvious; seller always confirms price on chat before accepting.
- Single Buy Now everywhere: removed "Add to Order" buttons (PDP desktop + mobile, card "+" icon) — Buy Now adds the item and opens the order drawer. Cart icon removed from the top navbar.
- Order drawer has an "Add more products (+)" button that closes the drawer and returns the shopper to /shop; basket persists.
- Verified: top cart icon gone, drawer opens on Buy Now, add-more navigates to shop, cart survives navigation, order message carries Order ID.

## Implemented (2026-08-25 iteration 11)
- Buy Now no longer jumps to WhatsApp directly: it adds the item and opens the order drawer — customer sees free-delivery progress ring, an "Add more — unlock free delivery" suggestion rail (one-tap add of other oils), then "Order on WhatsApp" sends one combined message. Cart persists (localStorage) if they go back to add more.
- Mobile overflow bug fixed on product pages (min-w-0 grid columns + break-words title): page no longer flows outside the screen (verified docWidth = window width).
- Shop page: 2-up product grid on mobile with compact cards.
- "You May Also Love" now uses home-style OilTile cards (2-col mobile / 4-col desktop).
- Fixed a duplicated ProductDetail.jsx (sed truncation after a bad replace).
- Verified mobile: drawer opens on Buy Now, suggestions add, progress ring updates, cart badge persists after close, order message combines items.

## Implemented (2026-08-24 iteration 10)
- PDP restructured per user spec: Health benefits now one-line expandable accordion rows → nutrition rings → Best-for chips + smoke point → Why Lakdi Ghani → per-oil FAQ accordion (3 oil-specific Q&As each, EN/HI, + storage + delivery entries) → The Padam Standard (extracted to `src/components/PadamStandard.jsx`, shared) → reviews → related. Myth section removed from PDP (stays on Home).
- ProcessSteps rebuilt as sticky stacking cards — each step card slides over the previous while scrolling (sticky top offsets, tinted cards, photos).
- Verified mobile: benefit accordion opens, PDP has FAQ + standard box (myths gone), stacking overlap confirmed, sticky buy bar intact.

## Implemented (2026-08-24 iteration 9)
- Mobile bottom bar trimmed to 4 tabs (Home, Shop Oils, Seed to Oil, Chat) — Contact removed.
- Section titles now always visible: Reveal switched from scroll-triggered to on-mount masked reveal (fixes headings not appearing on some mobiles).
- Hindi display font changed Rozha One → Tiro Devanagari Hindi for readability.
- Scroll-linked horizontal strips: ProcessSteps cards and the Comparison table auto-scroll sideways as the user scrolls vertically (`useAutoScrollX` in lib/scroll.js).
- The Padam Standard box: richer leaf green (#2F5233), bigger gold title.
- Seed banner copy changed to "तेल निकलता हुआ सामने देखें — watch your oil extracted in front of you".
- Mobile spacing tightened (py-16) across OilGrid, LoveWall, WhyGhani, Comparison, MythFacts, FAQ, Motto.
- Verified on 390px: 4 tabs, grid title opacity 1 with new font, banner text, process strip scrollLeft 297→594 on vertical scroll, green box renders. testing_agent not available in this environment — verified via screenshot tool.

## Implemented (2026-08-24 iteration 8)
- Trust-first homepage refinement (user-directed, minimal changes):
  - Video section reframed as "देखिए, तेल कैसे निकलता है / Come see how your oil is pressed" + visit invitation (Village Shivpur, Ratlam — watch extraction live).
  - Long 4-chapter Journey replaced by compact 5-step process strip (बीज → सफाई → लकड़ी घानी → छानना → बोतल में भरना) with circular photos, numbered badges, swipeable on mobile (`src/components/ProcessSteps.jsx`). NOTE: सफाई/cleaning photo is a placeholder — owner to supply real cleaning photo.
  - Values strip replaced with exact Quality Promise (100% Pure & Unrefined · No Added Chemicals · Freshly Pressed · Carefully Packed) — `src/components/QualityPromise.jsx`.
  - The Padam Standard now sits inside a separate moss-green box with gold stat tiles.
  - Oil-grid heading reduced on mobile (text-3xl).
  - Review cards now show initials avatars (real photos/names pending from owner).
- Bottom tab bar: Order tab removed (duplicated top navbar), replaced with Contact. Tabs: Home, Shop, Seed to Oil, Contact, Chat.
- Verified mobile: promise strip, process strip, trust video copy, green standard box, tab bar all render; no console errors.

## Implemented (2026-08-24 iteration 7)
- Ghani video section (`src/components/GhaniVideo.jsx`): full-bleed autoplay muted looping video (slow-motion golden oil pour, placeholder stock clip at /videos/ghani.mp4 — REPLACE with owner's real wooden ghani footage) with dark overlay heading "Watch every drop, being born slow." on Home.
- Combo idea dropped: /combo page + data removed; home grid 6th tile is now "Your Seed Your Oil" (Wheat icon, dark forest tile → /your-seed-your-oil). Footer combo link removed.
- Myth/Fact cards now STATIC: one card shows both — terracotta MYTH block on top, moss FACT block below with dashed divider. No interaction needed.
- App-style bottom tab bar on mobile (`src/components/BottomNav.jsx`): Home / Shop / Seed to Oil / Order (cart, live badge) / Chat (WhatsApp). Product-page sticky buy bar now sits above it. Floating WhatsApp bubble removed (Chat tab replaces it).
- Mobile title clipping fix: hero/motto line-heights increased + Reveal inner padding for Devanagari matras.
- 3D interactive hero: bottle arch tilts in 3D following pointer (spring rotateX/rotateY, perspective 1200px, badge at translateZ 60px).
- Verified on 390px mobile: hero title fully visible, tab bar present, static myth cards, video section (poster shown; video file serves HTTP 206 — headless test browser doesn't buffer video, real devices will autoplay), PDP sticky bar clears tab bar exactly.
- NOTE: testing_agent subagent was requested by system but is not available in this environment — verification done via screenshot tool instead.

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
- P0: Replace placeholder stock Ghani video (/videos/ghani.mp4) with owner's real wooden ghani footage; confirm final prices for non-groundnut oils (currently estimated 25%-off pricing).
- P1: Real process photos (seed cleaning is placeholder); owner's churning charges per kg on Seed to Oil page; real customer photos/quotes on Love Wall; coupon code field appended to WhatsApp message.
- P2: Online payment checkout (user chose WhatsApp-only for now); blog/recipes; Google Maps embed on Contact.

## Next Tasks
- Owner supplies real ghani video + process photos + churning rates.
- Optional: delivery-area note or ETA field on admin status updates.
