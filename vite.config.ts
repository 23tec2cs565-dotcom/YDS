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
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          motion: ["framer-motion"],
          lucide: ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 650,
  },
});
