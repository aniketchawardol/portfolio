/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Preserve important utility classes that might be dynamically used
    "fade-in",
    "fade-out",
    "animate-shimmer",
    "backdrop-blur-md",
    {
      pattern:
        /bg-(white|purple|slate|indigo)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /dark:bg-\[(#[0-9a-fA-F]{6})(\/[0-9]+)?\]/,
    },
    {
      pattern: /from-\[(#[0-9a-fA-F]{6})(\/[0-9]+)?\]/,
    },
    {
      pattern: /to-\[(#[0-9a-fA-F]{6})(\/[0-9]+)?\]/,
    },
    {
      pattern: /via-\[(#[0-9a-fA-F]{6})(\/[0-9]+)?\]/,
    },
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        halfomania: ["halfomania", "sans-serif"],
        moonwalk: ["moonwalk", "sans-serif"],
        exo: ["exo", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
