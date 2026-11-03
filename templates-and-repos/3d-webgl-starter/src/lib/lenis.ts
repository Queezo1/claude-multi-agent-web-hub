import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialisiert Lenis Smooth Scroll und synchronisiert es sauber mit dem GSAP
 * Ticker/ScrollTrigger. Ohne diese Synchronisation driften Lenis- und
 * ScrollTrigger-Scrollpositionen auseinander (häufigste Ursache für Jank auf
 * Lusion-Style-Sites mit Custom Scroll).
 *
 * Aufruf einmalig im App-Root (z. B. in App.tsx via useEffect).
 */
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
