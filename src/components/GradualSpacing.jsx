import { cn } from "../utils/helpers";
import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

function GradualSpacing({
  text,
  duration = 0.6,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  className,
  scrollStyle = {},
}) {
  const containerRef = useRef(null);
  const rafIdRef = useRef(null);
  const entranceTimerRef = useRef(null);
  const animationCompleteRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (!animationCompleteRef.current || !containerRef.current) return;

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        const element = containerRef.current;
        const scrollProgress = Math.min(
          window.scrollY / (window.innerHeight * 0.6),
          1
        );
        const letterSpacing = scrollProgress * 20;
        const opacity = 1 - scrollProgress * 0.8; // From 1 to 0.2 (100% to 20%)

        element.style.letterSpacing = `${letterSpacing}rem`;
        element.style.opacity = opacity;
        rafIdRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    const entranceTime = text.length * delayMultiple * 1000 + duration * 1000 + 500;
    
    entranceTimerRef.current = setTimeout(() => {
      animationCompleteRef.current = true;
    }, entranceTime);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(entranceTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [text.length, delayMultiple, duration, handleScroll]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayMultiple,
        delayChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: framerProps.hidden,
    visible: {
      ...framerProps.visible,
      transition: {
        duration: duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex justify-center gradual-spacing"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, i) => (
        <motion.h1
          key={i}
          className={cn("drop-shadow-sm", className)}
          style={{
            ...scrollStyle,
            display: "inline-block",
            letterSpacing: i === text.length - 1 ? "0" : "inherit",
          }}
          variants={child}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.h1>
      ))}
    </motion.div>
  );
}

export { GradualSpacing };
