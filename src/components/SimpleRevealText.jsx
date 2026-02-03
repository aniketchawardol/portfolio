import { useEffect, useRef, useState, useCallback } from "react";

const SimpleRevealText = ({ text, className }) => {
  const textRef = useRef(null);
  // Store clips in state and drive updates via an animation loop. This
  // makes the reveal work with custom smooth scrollers (e.g. Lenis)
  // that don't always emit native scroll events.
  const [clips, setClips] = useState({
    clearClip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    blurredClip: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  });
  const rafIdRef = useRef(null);

  const updateRevealClip = useCallback(() => {
    if (!textRef.current) return null;

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
      Math.min(100, (revealDistance / textHeight) * 100),
    );

    return {
      clearClip: `polygon(0 0, 100% 0, 100% ${revealPercentage}%, 0 ${revealPercentage}%)`,
      blurredClip: `polygon(0 ${revealPercentage}%, 100% ${revealPercentage}%, 100% 100%, 0 100%)`,
    };
  }, []);

  // Update clips only when they actually change to avoid extra renders
  const updateClips = useCallback(() => {
    const newClips = updateRevealClip();
    if (!newClips) return;

    setClips((prev) => {
      if (
        prev.clearClip === newClips.clearClip &&
        prev.blurredClip === newClips.blurredClip
      ) {
        return prev;
      }
      return newClips;
    });
  }, [updateRevealClip]);

  useEffect(() => {
    // Animation loop that updates clips every frame. This is reliable even
    // when a custom smooth-scroller (like Lenis) is used.
    function tick() {
      updateClips();
      rafIdRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [updateClips]);

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
          clipPath: clips.clearClip,
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
          clipPath: clips.blurredClip,
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
