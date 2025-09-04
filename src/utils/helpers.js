/**
 * Utility function to join class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Get responsive animation sizes for different viewports
 */
export function getAnimationSize() {
  if (typeof window === "undefined") return { width: 400, height: 400 };

  // These breakpoints align with Tailwind's defaults
  if (window.innerWidth < 640) return { width: 280, height: 280 }; // Small screens
  if (window.innerWidth < 1024) return { width: 350, height: 350 }; // Medium screens
  return { width: 400, height: 400 }; // Large screens
}

/**
 * Parse hex color to RGB values
 */
export function parseHexColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

/**
 * Get interaction classes based on device type
 */
export function getInteractionClasses(baseClasses, hoverClasses, activeClasses, isTouchDevice) {
  return `${baseClasses} ${
    !isTouchDevice ? hoverClasses : activeClasses
  }`;
}

/**
 * Debounce function for performance optimization
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format date for Indian timezone
 */
export function getIndianDateTime() {
  const now = new Date();
  const indianTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const indianDate = now.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return { indianTime, indianDate };
}

/**
 * Check if device is touch-enabled
 */
export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Check if device is mobile
 */
export function isMobileDevice() {
  return (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
}
