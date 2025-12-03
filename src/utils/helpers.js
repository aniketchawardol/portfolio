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
  if (window.innerWidth < 640) return { width: 280, height: 280 };
  if (window.innerWidth < 1024) return { width: 350, height: 350 };
  return { width: 400, height: 400 };
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
