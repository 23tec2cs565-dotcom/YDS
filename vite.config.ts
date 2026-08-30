// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "es2022",
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("react/")) {
              return "vendor-react";
            }
            if (id.includes("react-router")) {
              return "vendor-router";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (id.includes("react-helmet")) {
              return "vendor-helmet";
            }
            if (id.includes("@sanity") || id.includes("groq")) {
              return "vendor-sanity";
            }
            if (id.includes("@vercel")) {
              return "vendor-analytics";
            }
            return "vendor-utils";
          }
          if (id.includes("/src/data/projects")) {
            return "data-projects";
          }
          if (id.includes("/src/data/services")) {
            return "data-services";
          }
          if (id.includes("/src/data/team")) {
            return "data-team";
          }
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
});
