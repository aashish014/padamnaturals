export const WA_NUMBER = "918269169904";

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

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

export const cartMessage = (items) => {
  const lines = items.map(
    (i) =>
      `• ${i.qty}x ${i.product.name} (${i.size.label}) — ${inr(i.size.price * i.qty)}`
  );
  const total = items.reduce((s, i) => s + i.size.price * i.qty, 0);
  return [
    "Hello Padam Naturals! I would like to order:",
    "",
    ...lines,
    "",
    `Order Total: ${inr(total)}`,
    "Please confirm availability and delivery details. Dhanyavaad!",
  ].join("\n");
};

export const generalMessage =
  "Hello Padam Naturals! I have a question about your cold-pressed oils.";
