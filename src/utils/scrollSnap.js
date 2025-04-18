
export function useSmoothScroll() {
  const scrollToElement = (target) => {
    const element =
      typeof target === "string" ? document.getElementById(target) : target;

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return { scrollToElement };
}

export function useScrollSnap() {
  return useSmoothScroll();
}

export function scrollToElement(target) {
  const element =
    typeof target === "string" ? document.getElementById(target) : target;

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
