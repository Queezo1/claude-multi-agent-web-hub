---
name: lusion-shader-notes
description: Notizen zu Lusion-Style WebGL/Shader-Techniken (Distortion, Grain, Fluid) für neue 3D-Projekte. Vor Shader-Arbeit im 3d-webgl-starter konsultieren.
---

# Lusion-Style Shader-Techniken — Notizen

Eigenständig verfasste technische Zusammenfassung gängiger, öffentlich
dokumentierter WebGL/GLSL-Techniken, wie sie auf Sites im Stil von lusion.co
beobachtbar sind (kein kopierter Quellcode einer fremden Site).

## Kern-Techniken

1. **Mouse-Velocity-Distortion**: UV-Koordinaten werden basierend auf der
   Cursor-Geschwindigkeit (nicht nur Position) verzerrt. Siehe
   `templates-and-repos/3d-webgl-starter/src/scene/shaders/distortion.frag.glsl`
   für eine Referenzimplementierung.
2. **Chromatic Aberration on Interaction**: RGB-Kanäle leicht versetzt
   sampeln (`texture2D(uTexture, uv + offset * i)` für i in {-1,0,1}),
   Offset an Interaktionsintensität koppeln — nur bei Bewegung/Hover
   aktivieren, nicht dauerhaft (wirkt sonst wie ein Bildfehler).
3. **Film Grain / Noise Overlay**: Prozeduraler Noise (z. B. simplex/value
   noise) additiv über die finale Szene legen, sehr niedrige Opacity
   (~3–6 %), pro Frame leicht verschoben — bricht die "zu perfekte" CGI-Optik.
4. **Fluid-Simulation als Hintergrund-Layer**: siehe `WebGL-Fluid-Simulation`
   (Audit #4) als Referenz-Implementierung; in Produktion meist als
   Low-Res-Offscreen-Textur gerendert und hochskaliert (Performance).
5. **Scroll-gebundene Kamerafahrten**: Kamera-Position/-Rotation als GSAP-
   Timeline-Property animieren, `ScrollTrigger.scrub` für 1:1-Kopplung an
   Scrollfortschritt statt feste Dauer.

## Performance-Leitplanken (siehe auch CLAUDE.md Abschnitt 3)
- Postprocessing-Passes (Bloom, DOF, Chromatic Aberration) nur EINMAL pro
  Frame kombinieren (`EffectComposer` mit gebündelten Passes), nicht mehrere
  einzelne Composer-Durchläufe.
- Texturgrößen auf tatsächlichen Anzeigebereich abstimmen, `KTX2Loader` für
  komprimierte Texturen bei großen Assets erwägen.
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — niemals
  ungecappt, besonders bei Fluid-Simulationen (quadratische Kostensteigerung).
- Bei Tab-Wechsel/Inaktivität `cancelAnimationFrame` statt weiterlaufender
  Render-Loop.
