import React, { useEffect, useRef } from "react";
import { useDeviceDetection } from "../../../hooks/useDeviceDetection";

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 50 }, // Reduced spread to keep it purple-focused
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard = ({
  children,
  className = "",
  glowColor = "purple",
  size = "md",
  width,
  height,
  customSize = false,
  spotlightColor, // For backward compatibility with SpotlightCard
  isDarkMode = false, // For theme-aware colors
}) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const { isTouchDevice } = useDeviceDetection();

  useEffect(() => {
    // Don't add pointer tracking on touch devices to avoid performance issues
    if (isTouchDevice) return;

    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2)
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2)
        );
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, [isTouchDevice]);

  // Update theme-dependent CSS custom properties when isDarkMode changes
  useEffect(() => {
    if (cardRef.current) {
      const currentIsDarkMode =
        isDarkMode || document.documentElement.classList.contains("dark");

      // Update theme-dependent CSS custom properties
      cardRef.current.style.setProperty(
        "--backdrop",
        currentIsDarkMode
          ? "rgba(46, 16, 101, 0.3)"
          : "rgba(255, 255, 255, 0.2)"
      );
      cardRef.current.style.setProperty(
        "--backup-border",
        currentIsDarkMode
          ? "rgba(76, 29, 149, 0.3)"
          : "rgba(255, 255, 255, 0.2)"
      );
      cardRef.current.style.setProperty(
        "--saturation",
        currentIsDarkMode ? "70" : "50"
      );
      cardRef.current.style.setProperty(
        "--lightness",
        currentIsDarkMode ? "65" : "45"
      );
      cardRef.current.style.setProperty(
        "--bg-spot-opacity",
        currentIsDarkMode ? "0.2" : "0.15"
      );
      cardRef.current.style.setProperty(
        "--border-spot-opacity",
        currentIsDarkMode ? "0.9" : "0.7"
      );
      cardRef.current.style.setProperty(
        "--border-light-opacity",
        currentIsDarkMode ? "0.5" : "0.4"
      );
      cardRef.current.style.setProperty(
        "--before-saturation",
        currentIsDarkMode ? "70" : "50"
      );
      cardRef.current.style.setProperty(
        "--before-lightness",
        currentIsDarkMode ? "55" : "40"
      );
      cardRef.current.style.setProperty(
        "--after-lightness",
        currentIsDarkMode ? "80" : "90"
      );
    }
  }, [isDarkMode]);

  // Listen for theme changes from the document
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (cardRef.current) {
        const currentIsDarkMode =
          document.documentElement.classList.contains("dark");

        // Update theme-dependent CSS custom properties
        cardRef.current.style.setProperty(
          "--backdrop",
          currentIsDarkMode
            ? "rgba(46, 16, 101, 0.3)"
            : "rgba(255, 255, 255, 0.2)"
        );
        cardRef.current.style.setProperty(
          "--backup-border",
          currentIsDarkMode
            ? "rgba(76, 29, 149, 0.3)"
            : "rgba(255, 255, 255, 0.2)"
        );
        cardRef.current.style.setProperty(
          "--saturation",
          currentIsDarkMode ? "70" : "50"
        );
        cardRef.current.style.setProperty(
          "--lightness",
          currentIsDarkMode ? "65" : "45"
        );
        cardRef.current.style.setProperty(
          "--bg-spot-opacity",
          currentIsDarkMode ? "0.2" : "0.15"
        );
        cardRef.current.style.setProperty(
          "--border-spot-opacity",
          currentIsDarkMode ? "0.9" : "0.7"
        );
        cardRef.current.style.setProperty(
          "--border-light-opacity",
          currentIsDarkMode ? "0.5" : "0.4"
        );
        cardRef.current.style.setProperty(
          "--before-saturation",
          currentIsDarkMode ? "70" : "50"
        );
        cardRef.current.style.setProperty(
          "--before-lightness",
          currentIsDarkMode ? "55" : "40"
        );
        cardRef.current.style.setProperty(
          "--after-lightness",
          currentIsDarkMode ? "80" : "90"
        );
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Auto-detect theme-appropriate glow color if not specified
  const getThemeAwareGlowColor = () => {
    // Always use purple for consistent theming
    return "purple";
  };

  // We're focusing only on purple, so we can simplify this
  const purpleConfig = glowColorMap.purple;

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ""; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    // Purple-focused theme colors
    const purpleBase = 280; // Fixed purple hue
    const currentIsDarkMode =
      isDarkMode || document.documentElement.classList.contains("dark");
    const purpleVariation = currentIsDarkMode ? 15 : 10; // Small variation for depth

    const baseStyles = {
      "--base": purpleBase,
      "--spread": purpleVariation,
      "--radius": "12",
      "--border": "2",
      "--size": "200",
      "--outer": "1",
      "--border-size": "calc(var(--border, 2) * 1px)",
      "--spotlight-size": "calc(var(--size, 150) * 1px)",
      "--hue": `calc(${purpleBase} + (var(--xp, 0) * ${purpleVariation}))`,
      // Theme-dependent properties will be set by useEffect
      "--backdrop": currentIsDarkMode
        ? "rgba(46, 16, 101, 0.3)"
        : "rgba(255, 255, 255, 0.2)",
      "--backup-border": currentIsDarkMode
        ? "rgba(76, 29, 149, 0.3)"
        : "rgba(255, 255, 255, 0.2)",
      "--saturation": currentIsDarkMode ? "70" : "50",
      "--lightness": currentIsDarkMode ? "65" : "45",
      "--bg-spot-opacity": currentIsDarkMode ? "0.2" : "0.15",
      "--border-spot-opacity": currentIsDarkMode ? "0.9" : "0.7",
      "--border-light-opacity": currentIsDarkMode ? "0.5" : "0.4",
      "--before-saturation": currentIsDarkMode ? "70" : "50",
      "--before-lightness": currentIsDarkMode ? "55" : "40",
      "--after-lightness": currentIsDarkMode ? "80" : "90",
      backgroundImage: isTouchDevice 
        ? "none" // Disable resource-intensive background effects on touch devices
        : `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, ${purpleBase}) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / var(--bg-spot-opacity)), transparent
      )`,
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: isTouchDevice ? "scroll" : "fixed", // Use scroll attachment on touch for better performance
      border: "var(--border-size) solid var(--backup-border)",
      position: "relative",
      touchAction: isTouchDevice ? "auto" : "none", // Allow scrolling on touch devices
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: ${isTouchDevice ? "scroll" : "fixed"};
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    
    [data-glow]::before {
      background-image: ${isTouchDevice 
        ? "none" 
        : `radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(280 calc(var(--before-saturation) * 1%) calc(var(--before-lightness) * 1%) / var(--border-spot-opacity)), transparent 100%
      )`};
      filter: ${isTouchDevice ? "none" : "brightness(1.5)"};
    }
    
    [data-glow]::after {
      background-image: ${isTouchDevice 
        ? "none" 
        : `radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(280 20% calc(var(--after-lightness) * 1%) / var(--border-light-opacity)), transparent 100%
      )`};
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "" : ""}
          rounded-xl
          relative 
          shadow-lg
          backdrop-blur-md
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
};

export default GlowCard;
