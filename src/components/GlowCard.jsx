import { useEffect, useRef, memo } from "react";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

const PURPLE_CONFIG = {
  base: 280,
  variation: 15,
  backdrop: "rgba(46, 16, 101, 0.3)",
  border: "rgba(76, 29, 149, 0.3)",
  saturation: "70",
  lightness: "65",
  bgSpotOpacity: "0.2",
  borderSpotOpacity: "0.9",
  borderLightOpacity: "0.5",
  beforeSaturation: "70",
  beforeLightness: "55",
  afterLightness: "80",
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
            (x / window.innerWidth).toFixed(2)
          );
          cardRef.current.style.setProperty("--y", y.toFixed(2));
          cardRef.current.style.setProperty(
            "--yp",
            (y / window.innerHeight).toFixed(2)
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
        "--base": PURPLE_CONFIG.base,
        "--spread": PURPLE_CONFIG.variation,
        "--radius": "12",
        "--border": "2",
        "--size": "200",
        "--outer": "1",
        "--border-size": "calc(var(--border, 2) * 1px)",
        "--spotlight-size": "calc(var(--size, 150) * 1px)",
        "--hue": `calc(${PURPLE_CONFIG.base} + (var(--xp, 0) * ${PURPLE_CONFIG.variation}))`,
        "--backdrop": PURPLE_CONFIG.backdrop,
        "--backup-border": PURPLE_CONFIG.border,
        "--saturation": PURPLE_CONFIG.saturation,
        "--lightness": PURPLE_CONFIG.lightness,
        "--bg-spot-opacity": PURPLE_CONFIG.bgSpotOpacity,
        "--border-spot-opacity": PURPLE_CONFIG.borderSpotOpacity,
        "--border-light-opacity": PURPLE_CONFIG.borderLightOpacity,
        "--before-saturation": PURPLE_CONFIG.beforeSaturation,
        "--before-lightness": PURPLE_CONFIG.beforeLightness,
        "--after-lightness": PURPLE_CONFIG.afterLightness,
        backgroundImage: isTouchDevice
          ? "none"
          : `radial-gradient(var(--spotlight-size) var(--spotlight-size) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(var(--hue, ${PURPLE_CONFIG.base}) calc(var(--saturation) * 1%) calc(var(--lightness) * 1%) / var(--bg-spot-opacity)), transparent)`,
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
          : `radial-gradient(calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(280 calc(var(--before-saturation) * 1%) calc(var(--before-lightness) * 1%) / var(--border-spot-opacity)), transparent 100%)`
      };
      filter: ${isTouchDevice ? "none" : "brightness(1.5)"};
    }
    [data-glow]::after {
      background-image: ${
        isTouchDevice
          ? "none"
          : `radial-gradient(calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px), hsl(280 20% calc(var(--after-lightness) * 1%) / var(--border-light-opacity)), transparent 100%)`
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
          shadow-lg
          backdrop-blur-md
          ${className}
        `}
        >
          <div data-glow></div>
          <div className="relative z-10">{children}</div>
        </div>
      </>
    );
  }
);

GlowCard.displayName = "GlowCard";

export default GlowCard;
