import { useEffect, useRef, memo } from "react";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const ORANGE_CONFIG = {
  base: 20,
  variation: 15,
  backdrop: "rgba(26, 26, 26, 0.8)",
  border: "#FF5C00",
  saturation: "100",
  lightness: "50",
  bgSpotOpacity: "0.2",
  borderSpotOpacity: "0.9",
  borderLightOpacity: "0.5",
  beforeSaturation: "100",
  beforeLightness: "45",
  afterLightness: "65",
};

const SIZE_MAP = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard = memo(
  ({
    children,
    className = "",
    size = "md",
    width,
    height,
    customSize = false,
  }) => {
    const cardRef = useRef(null);
    const { isTouchDevice } = useDeviceDetection();
    const rafIdRef = useRef(null);
    const tickingRef = useRef(false);

    useEffect(() => {
      if (isTouchDevice) return;

      const syncPointer = (e) => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          cardRef.current.style.setProperty("--x", x.toFixed(2));
          cardRef.current.style.setProperty(
            "--xp",
            (x / window.innerWidth).toFixed(2),
          );
          cardRef.current.style.setProperty("--y", y.toFixed(2));
          cardRef.current.style.setProperty(
            "--yp",
            (y / window.innerHeight).toFixed(2),
          );
        }
      };

      const throttledSyncPointer = (e) => {
        if (!tickingRef.current) {
          rafIdRef.current = requestAnimationFrame(() => {
            syncPointer(e);
            tickingRef.current = false;
          });
          tickingRef.current = true;
        }
      };

      document.addEventListener("pointermove", throttledSyncPointer, {
        passive: true,
      });
      return () => {
        document.removeEventListener("pointermove", throttledSyncPointer);
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }, [isTouchDevice]);

    const sizeClasses = customSize ? "" : SIZE_MAP[size];

    const getInlineStyles = () => {
      const baseStyles = {
        "--base": ORANGE_CONFIG.base,
        "--spread": ORANGE_CONFIG.variation,
        "--radius": "12",
        "--border": "2",
        "--size": "200",
        "--outer": "1",
        "--border-size": "calc(var(--border, 2) * 1px)",
        "--spotlight-size": "calc(var(--size, 150) * 1px)",
        "--hue": `calc(${ORANGE_CONFIG.base} + (var(--xp, 0) * ${ORANGE_CONFIG.variation}))`,
        "--backdrop": ORANGE_CONFIG.backdrop,
        "--backup-border": ORANGE_CONFIG.border,
        "--saturation": ORANGE_CONFIG.saturation,
        "--lightness": ORANGE_CONFIG.lightness,
        "--bg-spot-opacity": ORANGE_CONFIG.bgSpotOpacity,
        "--border-spot-opacity": ORANGE_CONFIG.borderSpotOpacity,
        "--border-light-opacity": ORANGE_CONFIG.borderLightOpacity,
        "--before-saturation": ORANGE_CONFIG.beforeSaturation,
        "--before-lightness": ORANGE_CONFIG.beforeLightness,
        "--after-lightness": ORANGE_CONFIG.afterLightness,
        backgroundImage: isTouchDevice
          ? "none"
          : `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, ${ORANGE_CONFIG.base}) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / var(--bg-spot-opacity)), transparent)`,
        backgroundColor: "var(--backdrop, transparent)",
        backgroundSize:
          "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
        backgroundPosition: "50% 50%",
        backgroundAttachment: isTouchDevice ? "scroll" : "fixed",
        border: "var(--border-size) solid var(--backup-border)",
        position: "relative",
        touchAction: isTouchDevice ? "auto" : "none",
      };

      if (width !== undefined)
        baseStyles.width = typeof width === "number" ? `${width}px` : width;
      if (height !== undefined)
        baseStyles.height = typeof height === "number" ? `${height}px` : height;
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
      background-image: ${
        isTouchDevice
          ? "none"
          : `radial-gradient(calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(20 calc(var(--before-saturation) * 1%) calc(var(--before-lightness) * 1%) / var(--border-spot-opacity)), transparent 100%)`
      };
      filter: ${isTouchDevice ? "none" : "brightness(1.5)"};
    }
    [data-glow]::after {
      background-image: ${
        isTouchDevice
          ? "none"
          : `radial-gradient(calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(20 20% calc(var(--after-lightness) * 1%) / var(--border-light-opacity)), transparent 100%)`
      };
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
          ${sizeClasses}
          rounded-xl
          relative 
          backdrop-blur-md
          ${className}
        `}
        >
          <div data-glow></div>
          <div className="relative z-10">{children}</div>
        </div>
      </>
    );
  },
);

GlowCard.displayName = "GlowCard";

export default GlowCard;
