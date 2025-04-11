import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const BlurRevealText = ({ text, className }) => {
  // Normalize text by removing extra spaces and line breaks
  const normalizedText = text.replace(/\s+/g, " ").trim();
  const words = normalizedText.split(" ");

  const containerRef = useRef(null);
  const [revealedWords, setRevealedWords] = useState(0);

  // Update scroll position and calculate word reveal
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = 1 - rect.top / windowHeight;

      if (scrollProgress > 0) {
        const wordsToReveal = Math.min(
          Math.floor(scrollProgress * 2 * words.length),
          words.length
        );
        setRevealedWords(wordsToReveal);
      } else {
        setRevealedWords(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ wordSpacing: "0.3rem" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(4px)" }}
          animate={{
            filter: index < revealedWords ? "blur(0px)" : "blur(4px)",
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="inline"
        >
          {word}
          {index < words.length - 1 && " "}
        </motion.span>
      ))}
    </div>
  );
};

export default BlurRevealText;
