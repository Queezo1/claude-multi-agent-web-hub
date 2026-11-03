import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

// Trennt das WebGL-Bundle bewusst vom Haupt-Chunk (siehe CLAUDE.md, Abschnitt 3:
// "niemals Three.js im initialen Bundle einer nicht-3D-Seite").
export default defineConfig({
  plugins: [react(), glsl()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});
