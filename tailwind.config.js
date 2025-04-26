export default {
  content: false,
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
  // Add safelist to prevent purging
  safelist: [
    {
      pattern: /.*/, 
    },
  ],
  plugins: [],
};
