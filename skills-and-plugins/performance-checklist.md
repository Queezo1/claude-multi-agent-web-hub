---
name: performance-checklist
description: Vor jedem Deploy eines Hub-Projekts abzuarbeitende Performance-Checkliste (60/120 FPS, CLS, Bundle-Splitting).
---

# Performance-Checkliste vor Deploy

Direkt aus `CLAUDE.md` Abschnitt 3 abgeleitet — hier als abhakbare Liste.

- [ ] Lighthouse-Lauf: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] `prefers-reduced-motion`-Fallback für jede aufwendige Animation getestet
- [ ] WebGL/Three.js-Bundle per Code-Splitting vom initialen Bundle getrennt
      (Chunk-Analyse via `npm run build -- --report` o. ä. prüfen)
- [ ] `devicePixelRatio` in jedem `<Canvas>`/Renderer auf max. 2 gecappt
- [ ] Alle Bilder/Videos haben feste `width`/`height` bzw. `aspect-ratio`
      (verhindert Layout-Shifts)
- [ ] Web-Fonts: `font-display: swap` oder `optional` + Preload der
      kritischen Schnitte
- [ ] Render-Loop pausiert bei Tab-Inaktivität (`document.hidden` prüfen)
- [ ] Low-End-Device-Test (z. B. Chrome DevTools CPU-Throttling 4–6x)
      durchgeführt — Fallback greift ohne Ruckeln auf UI-Ebene
- [ ] Keine synchronen, blockierenden Skripte im `<head>`
- [ ] Texturen/Assets komprimiert (KTX2/Basis für 3D, AVIF/WebP für Bilder)
- [ ] Playwright-Suite (E2E + `@axe-core/playwright`-a11y-Scan) grün —
      siehe `PLAYWRIGHT_TESTING_GUIDE.md`, Pflicht-Gate laut CLAUDE.md 2e/2f
- [ ] `npm audit --audit-level=high` sauber (lokal UND im CI-Lauf)
- [ ] Web-Fonts self-hosted, kein Google-Fonts-CDN-Link (CLAUDE.md 3a)
- [ ] Keine Drittanbieter-Embeds/-Skripte, die vor Consent laden (CLAUDE.md 3a)
- [ ] Impressum/Datenschutzerklärung mit echten, kundenseitig geprüften Angaben
