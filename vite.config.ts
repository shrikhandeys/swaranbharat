import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the built site work from any folder on shared hosting
// (e.g. public_html or a subfolder) without extra configuration.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
});
