# 3D / WebGL Starter — Lusion-Style Stack

Einsatzbereites Grundgerüst für 3D-/Shader-lastige Awwwards-Projekte. Basiert
ausschließlich auf im Audit **[BESTANDEN]**-geprüften Paketen (siehe
`/security-audits/AUDIT_LOG.md`).

## Stack
- **Vite + React + TypeScript** — schnelles Dev-Setup
- **@react-three/fiber** + **@react-three/drei** — deklarative 3D-Szene
- **GSAP + ScrollTrigger** — Scroll-Choreografie
- **Lenis** — physikalisch korrektes Smooth Scrolling, synchronisiert mit GSAP
- Custom GLSL-Shader (`src/scene/shaders`) — eigene Distortion-Plane als
  Ausgangspunkt für Lusion-artige Hover-/Mouse-Effekte

## Installation

```bash
npm install
npm run dev
```

## Enthaltene Pattern
- `src/scene/DistortionPlane.tsx` — texturierte Plane mit Custom-Shader
  (Mouse-Velocity-getriebene Verzerrung, RawShaderMaterial via R3F).
- `src/lib/lenis.ts` — Lenis-Setup inkl. GSAP-Ticker-Sync (verhindert
  Scroll-Jank zwischen Lenis und ScrollTrigger — häufigste Fehlerquelle bei
  Lusion-Style-Sites).

## Performance-Hinweise (siehe auch `CLAUDE.md` Abschnitt 3)
- `dpr={[1, 2]}` auf `<Canvas>` setzen, niemals ungecapped.
- Shader-Bundle per `React.lazy` / `dynamic import` von der Hauptroute trennen.
- `prefers-reduced-motion` prüfen und auf statisches Poster-Bild zurückfallen.

## Testing (Pflicht, siehe CLAUDE.md Abschnitt 2e)
`playwright.config.ts` + `tests/smoke.spec.ts` sind bereits enthalten
(a11y-Scan, WebGL-Kontext-Zähler, visueller Snapshot). Nach `npm install`:
```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

## Nächste Schritte für ein neues Projekt
1. Diesen Ordner kopieren / als Template klonen.
2. Eigene GLSL-Shader in `src/scene/shaders` ergänzen.
3. `CLAUDE.md` aus dem Hub-Root in den Projekt-Root kopieren.
4. `ci.yml`, `dependabot.yml`, `.coderabbit.yaml` aus
   `../ci-cd-templates/` in den Projekt-Root kopieren (siehe dortige README).
