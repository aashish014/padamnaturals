export const lenisStore = { current: null };

export const scrollTop = () => {
  if (lenisStore.current) {
    lenisStore.current.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};
