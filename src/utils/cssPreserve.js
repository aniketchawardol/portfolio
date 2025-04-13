/**
 * This utility ensures dynamic class names are preserved during production builds.
 *
 * How to use:
 * 1. Import this file in your main entrypoint (main.jsx)
 * 2. The classes defined here won't be purged by TailwindCSS during build
 */

// This function is never called - it's only purpose is to reference classes
// that might be generated dynamically so Tailwind doesn't purge them
export const preserveClasses = () => {
  // This code is never executed, just ensures classes are preserved
  const dynamicClasses = [
    // Navigation dynamic classes
    "dark:bg-[#2e1065]/30",
    "dark:border-[#4c1d95]/30",
    "bg-white/20",
    "border-white/20",

    // Color gradients from HeroSection, AboutSection, etc.
    "dark:from-[#0f0a29]",
    "dark:via-[#191036]",
    "dark:to-[#1e0438]",
    "dark:from-[#1e0438]",
    "dark:via-[#1d0c3a]",
    "dark:to-[#1a103c]",
    "dark:from-[#1a103c]",
    "dark:via-[#18103a]",
    "dark:to-[#150d37]",
    "dark:from-[#150d37]",
    "dark:via-[#100a2c]",
    "dark:to-[#0a0621]",
    "from-[#6c5ca7]",
    "via-[#8771b8]",
    "to-[#a28cd1]",
    "from-[#cbb4f0]",
    "via-[#b6a6e3]",
    "to-[#a28cd1]",

    // Other dynamically used classes
    "dark:text-slate-200",
    "dark:text-slate-300",
    "dark:bg-[#3b0764]/50",
    "dark:text-slate-300",
    "bg-white/30",
    "text-slate-700",
    "bg-white/20",
    "shadow-lg",

    // ProjectTile classes
    "bg-[#2d2545]",
    "hover:bg-[#221c34]",
    "bg-[#5c4a99]",
    "hover:bg-[#473677]",
  ].join(" ");

  return dynamicClasses;
};

export default preserveClasses;
