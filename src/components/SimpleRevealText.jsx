import { useEffect, useRef, useState } from "react";

const SimpleRevealText = ({ text, className }) => {
  const textRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getRevealClip = () => {
    if (!textRef.current)
      return {
        clearClip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        blurredClip: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      };

    const rect = textRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // The reveal line is at 4/5th from top (80% down from top)
    const revealLineY = windowHeight * (4 / 5);

    // Calculate how much of the text should be revealed
    const textTop = rect.top;
    const textHeight = rect.height;

    // Distance from text top to reveal line
    const revealDistance = revealLineY - textTop;

    // Calculate percentage revealed (0 to 100)
    const revealPercentage = Math.max(
      0,
      Math.min(100, (revealDistance / textHeight) * 100)
    );

    return {
      clearClip: `polygon(0 0, 100% 0, 100% ${revealPercentage}%, 0 ${revealPercentage}%)`,
      blurredClip: `polygon(0 ${revealPercentage}%, 100% ${revealPercentage}%, 100% 100%, 0 100%)`,
    };
  };

  const { clearClip, blurredClip } = getRevealClip();

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        wordSpacing: "0.3rem",
        position: "relative",
      }}
    >
      {/* Clear revealed text (above the line) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          clipPath: clearClip,
          zIndex: 2,
        }}
      >
        {text}
      </div>

      {/* Blurred unrevealed text (below the line) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          filter: "blur(4px)",
          opacity: 0.6,
          clipPath: blurredClip,
          zIndex: 1,
        }}
      >
        {text}
      </div>

      {/* Invisible base text for proper spacing */}
      <div style={{ opacity: 0 }}>{text}</div>
    </div>
  );
};

export default SimpleRevealText;
