export const WA_NUMBER = "918269169904";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const trackUrl = (orderId) =>
  `${window.location.origin}/track/${orderId}`;

export const buyNowMessage = (product, size, qty) => {
  const lineTotal = size.price * qty;
  return [
    "Hello Padam Naturals! I want to buy:",
    "",
    `• ${qty}x ${product.name} (${size.label}) — ${inr(lineTotal)}`,
    "",
    `Total: ${inr(lineTotal)}`,
    "Please confirm my order. Dhanyavaad!",
  ].join("\n");
};

const orderLines = (items) =>
  items.map(
    (i) =>
      `• ${i.qty}x ${i.product.name} (${i.size.label}) — ${inr(i.size.price * i.qty)}`
  );

export const cartMessage = (items, orderId) => {
  const total = items.reduce((s, i) => s + i.size.price * i.qty, 0);
  return [
    `Order ID: ${orderId}`,
    "",
    "Hello Padam Naturals! I would like to order:",
    "",
    ...orderLines(items),
    "",
    `Order Total: ${inr(total)}`,
    "Please confirm availability and delivery details. Dhanyavaad!",
    "",
    `Track my order: ${trackUrl(orderId)}`,
  ].join("\n");
};

export const orderUpdateMessage = (items, orderId) => {
  const total = items.reduce((s, i) => s + i.size.price * i.qty, 0);
  return [
    `Order ID: ${orderId}`,
    "",
    "Hello Padam Naturals! I would like to UPDATE my order:",
    "",
    ...orderLines(items),
    "",
    `Updated Order Total: ${inr(total)}`,
    "Please confirm my updated order. Dhanyavaad!",
    "",
    `Track my order: ${trackUrl(orderId)}`,
  ].join("\n");
};

export const trackQuestionMessage = (orderId, question) =>
  [`Order ID: ${orderId}`, "", question].join("\n");

export const generalMessage =
  "Hello Padam Naturals! I have a question about your cold-pressed oils.";

export const comboMessage =
  "Hello Padam Naturals! I'm interested in a family combo pack of your cold-pressed oils. Please share the options and prices.";

export const comboBuyMessage = (combo) =>
  [
    "Hello Padam Naturals! I want to order a combo pack:",
    "",
    `${combo.name}`,
    ...combo.items.map((i) => `• ${i}`),
    "",
    `Combo Price: ₹${combo.price.toLocaleString("en-IN")} (worth ₹${combo.worth.toLocaleString("en-IN")})`,
    "Please confirm my order. Dhanyavaad!",
  ].join("\n");

export const customComboMessage =
  "Hello Padam Naturals! I want to build my own custom combo pack. Please help me choose.";

export const seedServiceMessage =
  "Hello Padam Naturals! I'm interested in 'Your Seed, Your Oil' — I want to get my own seeds churned in your Lakdi Ghani. Please share the churning charges and details.";
