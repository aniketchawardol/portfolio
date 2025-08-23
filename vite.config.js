import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Minimize but preserve important class names
    cssMinify: "lightningcss",
    // Increase chunk size limit to avoid over-splitting
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Ensure CSS order is preserved
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  // Ensure correct asset handling
  assetsInclude: [
    "**/*.ttf",
    "**/*.otf",
    "**/*.woff",
    "**/*.woff2",
    "**/*.eot",
    "**/*.xml",
    "**/*.txt",
  ],
  // Ensure SEO files are copied to build
  publicDir: "public",
});
