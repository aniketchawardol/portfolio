// Global reference for Lenis scroll function
let globalScrollTo = null;

export function setGlobalScrollTo(scrollToFn) {
  globalScrollTo = scrollToFn;
}

export function useScrollSnap() {
  const scrollToElement = (target) => {
    if (globalScrollTo) {
      // Use Lenis if available
      if (typeof target === "string") {
        globalScrollTo(`#${target}`);
      } else {
        globalScrollTo(target);
      }
    } else {
      // Fallback to native smooth scroll
      const element =
        typeof target === "string" ? document.getElementById(target) : target;

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return { scrollToElement };
}
