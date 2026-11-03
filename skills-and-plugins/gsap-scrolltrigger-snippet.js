// Wiederverwendbares GSAP ScrollTrigger Setup für choreografierte
// Scroll-Sequenzen (Lusion-/Awwwards-Stil). Setzt lenis.ts (siehe
// templates-and-repos/3d-webgl-starter/src/lib/lenis.ts) als Scroll-Quelle voraus.
//
// Nutzung: importieren und mit einem Container-Selector + Steps-Array aufrufen.

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Erstellt eine "gescrubbte" Timeline: Fortschritt ist 1:1 an den Scroll
 * gebunden statt zeitbasiert abzuspielen. Ideal für Storytelling-Sequenzen.
 *
 * @param {string} containerSelector - Pinned Container
 * @param {Array<{selector: string, from: object, to: object, position?: string}>} steps
 */
export function createScrubTimeline(containerSelector, steps) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerSelector,
      start: "top top",
      end: "+=300%",
      scrub: 1, // sanfte Verzögerung (in Sekunden) statt hartem 1:1-Scrub
      pin: true,
      anticipatePin: 1,
    },
  });

  steps.forEach(({ selector, from, to, position }) => {
    tl.fromTo(selector, from, to, position ?? ">");
  });

  return tl;
}

// Beispiel:
// createScrubTimeline("#hero", [
//   { selector: "#hero h1", from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
//   { selector: "#hero .visual", from: { scale: 0.8 }, to: { scale: 1 }, position: "<" },
// ]);
