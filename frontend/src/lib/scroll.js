import { useEffect } from "react";

export const lenisStore = { current: null };

export const scrollTop = () => {
  if (lenisStore.current) {
    lenisStore.current.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};

export const useAutoScrollX = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
      const max = el.scrollWidth - el.clientWidth;
      if (max > 0) el.scrollLeft = progress * max;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
};
