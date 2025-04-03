import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@images": "/src/assets/images",
      "@pages": "/src/pages",
    },
  },
  server: {
    port: 8000,
    open: true,
  },
  preview: {
    port: 8080,
    open: true,
  },
});
