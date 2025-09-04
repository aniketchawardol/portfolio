import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { isTouchDevice, isMobileDevice } from "../utils/helpers";

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Don't initialize Lenis on mobile/touch devices for better native scrolling
    if (isMobileDevice() || isTouchDevice()) {
      return;
    }

    // Initialize Lenis only for desktop
    lenisRef.current = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.6,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Animation loop
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  // Method to scroll to a specific element
  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
  };
};
