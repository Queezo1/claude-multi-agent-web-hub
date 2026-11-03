---
name: modern-platform-features
description: Native Browser-APIs (View Transitions, CSS Scroll-Driven Animations), die GSAP/Framer Motion in bestimmten Fällen sinnvoll ergänzen. Vor jeder neuen Scroll-Reveal- oder Seitenübergangs-Implementierung als Alternative prüfen.
---

# Moderne native Plattform-Features (Ergänzung, kein Ersatz)

Diese APIs ersetzen NICHT GSAP/ScrollTrigger oder Motion (Abschnitt 2a bleibt
Standard für komplexe Choreografien) — sie sind für die häufigen, einfachen
Fälle oft die leichtere, GPU-native Lösung. Audit: kein npm-Paket, native
Browser-API, daher kein Eintrag in `AUDIT_LOG.md` nötig (siehe `RESOURCE_INDEX.md`
Abschnitt J).

## 1. View Transitions API — Seitenübergänge

Cross-Document View Transitions sind inzwischen in allen großen Browsern
verfügbar. Kandidat für Subpage-Übergänge, die aktuell über eine
selbstgebaute `AnimatePresence`-Lösung laufen — besonders bei Utility-Seiten
(Impressum, Datenschutz, Kontakt), die laut bestehender Projektregel
ausdrücklich KEINEN WebGL-Übergang bekommen sollen, sondern nur einen
einfachen Crossfade.

**Same-Document (SPA-Routenwechsel):**

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

```ts
function navigateWithTransition(to: string, navigate: (to: string) => void) {
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    navigate(to);
    return;
  }
  document.startViewTransition(() => navigate(to));
}
```

**Named Transitions** für einzelne Elemente (z. B. ein Bild, das von der
Übersichts- zur Detailseite "mitfliegt"):

```css
.leistungs-karte-bild {
  view-transition-name: leistung-hero;
}
```

Wichtig für Projekte mit der "nur ein WebGL-Kontext gleichzeitig"-Regel: der
alte Canvas muss vor `document.startViewTransition()` bereits sauber
unmounted/disposed sein — die API animiert nur den DOM-Snapshot, nicht
laufende WebGL-Kontexte.

## 2. CSS Scroll-Driven Animations — einfache Reveals

`animation-timeline: view()` bindet eine CSS-Animation direkt an die
Sichtbarkeit eines Elements im Viewport — ohne JavaScript, ohne
Scroll-Event-Listener, GPU-beschleunigt.

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  animation: fade-in-up linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

**Wann CSS Scroll-Driven Animations statt `whileInView` (Motion)?**
- Einfaches Fade/Slide/Scale beim Eintritt in den Viewport, keine
  Interaktion mit anderen Komponenten nötig → CSS bevorzugen (kein
  JS-Bundle-Gewicht, kein Re-Render).
- Choreografie mit mehreren synchronisierten Elementen, Timeline-Kontrolle,
  Pinning oder exaktem 1:1-Scrub → weiterhin GSAP/ScrollTrigger (Abschnitt 2a).
- Browser-Fallback: Feature-Detection via `CSS.supports("animation-timeline: view()")`,
  sonst auf die bestehende `whileInView`-Lösung zurückfallen (kein Layout-Bruch
  für Browser ohne Unterstützung, da das Element ohne die Regel einfach
  sichtbar bleibt statt bei `opacity: 0` hängen zu bleiben — deshalb `both`
  und expliziten `prefers-reduced-motion`-Fallback nicht vergessen).

## 3. Kombination mit bestehendem Lenis/GSAP-Setup

Beide Techniken laufen parallel zu Lenis (Abschnitt 2a) ohne Konflikt, da sie
nicht auf Scroll-Events lauschen, sondern direkt an die native
Scroll-Position gebunden sind. Kein `data-lenis-prevent` nötig (im Unterschied
zu echten `overflow: auto`-Panels, siehe bekannte Lenis-Falle in
bestehenden Projekten).
