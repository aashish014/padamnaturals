import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink, generalMessage } from "../lib/whatsapp";

export const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  const onPdp = pathname.startsWith("/product");
  return (
    <motion.a
      href={waLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-button"
      aria-label="Chat with Padam Naturals on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileTap={{ scale: 0.88 }}
      className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/25 md:right-6 ${
        onPdp ? "bottom-24 md:bottom-6" : "bottom-5 md:bottom-6"
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
};
