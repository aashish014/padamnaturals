import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", immediate = false }) => {
  const motionProps = immediate
    ? { animate: { y: 0, opacity: 1 } }
    : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-8%" } };
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform pb-[0.12em]"
        initial={{ y: 56, opacity: 0 }}
        {...motionProps}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const FadeUp = ({ children, delay = 0, className = "", y = 36 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-8%" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
