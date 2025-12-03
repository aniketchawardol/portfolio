import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useDeviceDetection } from "./useDeviceDetection";

export const useLenis = () => {
  const lenisRef = useRef(null);
  const { isMobile } = useDeviceDetection();

  useEffect(() => {
    if (isMobile) return;

    lenisRef.current = new Lenis({
      duration: 3.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.4,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, [isMobile]);

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 3,
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
