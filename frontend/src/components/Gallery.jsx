import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";

export const Gallery = ({ images, name, tint }) => {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (mainApi) setSelected(mainApi.selectedScrollSnap());
  }, [mainApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    onSelect();
  }, [mainApi, onSelect]);

  return (
    <div data-testid="product-gallery">
      <div
        ref={mainRef}
        className="arch overflow-hidden"
        style={{ backgroundColor: tint }}
        data-testid="gallery-main"
      >
        <div className="flex touch-pan-y">
          {images.map((src, i) => (
            <div key={i} className="relative flex min-w-0 flex-[0_0_100%] items-center justify-center">
              <div className="absolute h-2/3 w-2/3 rounded-full bg-gold/25 blur-3xl" />
              <img
                src={src}
                alt={`${name} — photo ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="relative z-10 aspect-square w-full object-contain p-6 drop-shadow-2xl md:aspect-[4/5]"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-1" data-testid="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            data-testid={`gallery-thumb-${i}`}
            onClick={() => mainApi && mainApi.scrollTo(i)}
            aria-label={`View photo ${i + 1}`}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-[border-color,transform] duration-300 ${
              i === selected ? "scale-105 border-terra" : "border-transparent opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: tint }}
          >
            <img src={src} alt="" className="h-full w-full object-contain p-1.5" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        <motion.p key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs font-semibold text-moss">
          {selected + 1} / {images.length} — swipe or tap thumbnails
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
