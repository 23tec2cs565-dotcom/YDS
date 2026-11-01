// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "next/link": path.resolve(__dirname, "./src/lib/vite-compat/link.tsx"),
      "next/navigation": path.resolve(__dirname, "./src/lib/vite-compat/navigation.ts"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    "process.env.__NEXT_ROUTER_BASEPATH": '""',
  },
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
