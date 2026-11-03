/**
 * Standalone Lenis Smooth-Scroll-Setup (Audit: bereits BESTANDEN, siehe
 * AUDIT_LOG.md #17/18) — unabhängig vom `3d-webgl-starter` nutzbar, z. B.
 * für reine UI-/Marketing-Projekte ohne WebGL-Canvas.
 *
 * Installation:
 *   npm install lenis gsap
 *
 * Für Projekte MIT R3F/WebGL siehe stattdessen
 * templates-and-repos/3d-webgl-starter/src/lib/lenis.ts (identisches Prinzip,
 * bereits in den Starter integriert).
 */
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface LenisSetupOptions {
  duration?: number;
  smoothWheel?: boolean;
}

/**
 * Initialisiert Lenis und synchronisiert es mit dem GSAP-Ticker, damit
 * ScrollTrigger-Positionen nicht vom tatsächlichen (geglätteten) Scroll
 * abweichen. Einmalig im App-Root aufrufen, z. B. in einem `useEffect`:
 *
 *   useEffect(() => {
 *     const lenis = setupLenis();
 *     return () => lenis.destroy();
 *   }, []);
 */
export function setupLenis(options: LenisSetupOptions = {}) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : options.duration ?? 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: options.smoothWheel ?? !prefersReducedMotion,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
