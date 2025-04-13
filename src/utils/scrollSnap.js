import { useEffect } from "react";

/**
 * A simple smooth scroll hook that doesn't include snap functionality
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Animation duration in ms
 */
export function useSmoothScroll() {
  // No automatic scrolling or wheel event capturing

  /**
   * Scrolls smoothly to the specified element
   * @param {string|HTMLElement} target - Element or ID to scroll to
   */
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

/**
 * Export useScrollSnap as an alias to useSmoothScroll for backward compatibility
 */
export function useScrollSnap() {
  return useSmoothScroll();
}

/**
 * Scrolls smoothly to an element
 * @param {string|HTMLElement} target - Element or ID to scroll to
 */
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
