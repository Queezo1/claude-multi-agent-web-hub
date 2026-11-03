import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// WebGL-lastige Pakete (Liquidglass, Shadergradient/Three.js) bewusst in
// einen eigenen Chunk getrennt (siehe CLAUDE.md Abschnitt 3).
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          webgl: ["@ybouane/liquidglass", "@shadergradient/react", "three"],
        },
      },
    },
  },
});
