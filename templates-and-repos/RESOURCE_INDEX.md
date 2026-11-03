# Resource Index — Web Design Hub

Kuratierte, sicherheitsgeprüfte Ressourcen für High-End-Webprojekte (Lusion/Awwwards/
Emil-Kowalski-Niveau). Jeder Eintrag hat einen korrespondierenden Audit-Eintrag in
`/security-audits/AUDIT_LOG.md`. **Nur Einträge mit `[BESTANDEN]` sind lokal in
diesem Ordner abgelegt** (siehe Unterordner). Recherchestand: 2026-09-03.

---

## A. 3D / WebGL / Shader-Stack (Lusion-Style)

### 1. React Three Fiber — `pmndrs/react-three-fiber`
- Link: https://github.com/pmndrs/react-three-fiber
- Zweck: React-Renderer für three.js — Fundament für jedes 3D/WebGL-Projekt im Hub.
- Besonderheit: 31,9k Stars, MIT-Lizenz, Teil des etablierten Poimandres (pmndrs)
  Ökosystems. Deklarative Szenen-Komposition, riesiges Ökosystem an Beispielen.
- Audit: BESTANDEN

### 2. Drei — `pmndrs/drei`
- Link: https://github.com/pmndrs/drei
- Zweck: Fertige Helper/Abstraktionen für R3F (Kameras, Controls, Postprocessing-
  Hooks, Text-3D, Environment-Maps).
- Besonderheit: 9,8k Stars, MIT, offizielles pmndrs-Repo — spart massiv Boilerplate
  bei 3D-Szenen.
- Audit: BESTANDEN

### 3. OGL — `oframe/ogl`
- Link: https://github.com/oframe/ogl
- Zweck: Minimalistische, low-level WebGL-Library (Alternative zu three.js) für
  Custom-Shader-lastige Lusion-Style-Effekte ohne Overhead.
- Besonderheit: 4,5k Stars, Unlicense (Public Domain), 100% JavaScript. Wird u. a.
  von vielen Codrops-Demos als Basis genutzt.
- Audit: BESTANDEN

### 4. WebGL Fluid Simulation — `PavelDoGreat/WebGL-Fluid-Simulation`
- Link: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
- Zweck: Interaktive Fluid-/Distortion-Hintergründe (Signature-Moment-Kandidat für
  Hero-Sections im Lusion-Stil).
- Besonderheit: 16,6k Stars, MIT-Lizenz, browserfähig inkl. Mobile.
- Audit: BESTANDEN

### 5. curtains.js — `martinlaxenaire/curtainsjs`
- Link: https://github.com/martinlaxenaire/curtainsjs
- Zweck: Verwandelt DOM-Elemente in texturierte WebGL-Planes — ideal für
  Image-Distortion/Hover-Shader auf Bildern (klassisches Awwwards-Pattern).
- Besonderheit: 1,8k Stars, MIT, aktiv von Einzelautor mit klarer Historie
  gepflegt (318 Commits).
- Audit: BESTANDEN

### 6. GSAP (inkl. ScrollTrigger) — `greensock/GSAP`
- Link: https://github.com/greensock/GSAP
- Zweck: Standard für choreografierte Scroll-Sequenzen, Timeline-Animationen,
  Cross-Browser-Tweening — Kern jeder Awwwards-tauglichen Scroll-Erzählung.
- Besonderheit: 26,8k Stars, seit der GreenSock-Übernahme durch Webflow 100%
  kostenlos inkl. aller Plugins (GreenSock Standard License, kein MIT — Nutzung
  gemäß Lizenztext beachten, siehe Audit).
- Audit: BESTANDEN (mit Lizenzhinweis)

---

## B. Emil Kowalski Interaction Patterns & Micro-Interactions

### 7. Sonner — `emilkowalski/sonner`
- Link: https://github.com/emilkowalski/sonner
- Zweck: Referenzimplementierung für Toast-Stacking, Exit-Animationen, Undo-Pattern
  — Blaupause für alle Notification-/Feedback-Micro-Interactions im Hub.
- Besonderheit: 12,8k Stars, MIT, Original-Autor Emil Kowalski selbst.
- Audit: BESTANDEN

### 8. Vaul — `emilkowalski/vaul`
- Link: https://github.com/emilkowalski/vaul
- Zweck: Drawer-Komponente mit physikbasiertem Rubber-Band-Overscroll — Referenz
  für Spring-Physics-Drag-Interaktionen.
- Besonderheit: 8,4k Stars, MIT, letztes Release v1.1.2, Original-Autor Emil
  Kowalski.
- Audit: BESTANDEN

### 9. Motion (ehem. Framer Motion) — `motiondivision/motion`
- Link: https://github.com/motiondivision/motion
- Zweck: Spring-Physics-Animationsengine für React/JS/Vue — Basis für alle
  Custom Micro-Interactions gemäß `CLAUDE.md` Abschnitt 1.
- Besonderheit: 33,3k Stars, MIT, GPU-beschleunigt, unterstützt Layout-Animationen
  und gestengesteuerte Interaktionen.
- Audit: BESTANDEN

### 10. cmdk — `pacocoursey/cmdk`
- Link: https://github.com/pacocoursey/cmdk
- Zweck: Unstyled Command-Menu (⌘K-Pattern) — hochwertiges Interaktionsmuster für
  Power-User-Navigation abseits generischer Such-Overlays.
- Besonderheit: 12,9k Stars, MIT, Autor Paco Coursey (Vercel-Design-Engineering-
  Umfeld, gleiche Design-Sprache wie Kowalski/shadcn).
- Audit: BESTANDEN

---

## C. UI-Komponenten mit echtem Design-Gefühl ("Taste")

### 11. Magic UI — `magicuidesign/magicui`
- Link: https://github.com/magicuidesign/magicui
- Zweck: Copy-paste Animated-Component-Library "für Design Engineers" — nicht
  generisch, sondern bewusst auf Marketing-/Landing-Page-Wirkung getrimmt.
- Besonderheit: 22,1k Stars, MIT, aktiv weiterentwickelt.
- Audit: BESTANDEN

### 12. React Bits — `DavidHDev/react-bits`
- Link: https://github.com/DavidHDev/react-bits
- Zweck: 165+ animierte, individuell anpassbare Komponenten (Text-Animationen,
  Backgrounds, UI-Elemente) als Inspirations- und Bausteinquelle.
- Besonderheit: 45,4k Stars. **Lizenz: MIT + Commons Clause** — freie Nutzung in
  eigenen (auch kommerziellen) Websites erlaubt, **Weiterverkauf der Library
  selbst als konkurrierendes Produkt/Service ist untersagt**. Für unsere Zwecke
  (Verwendung in Kundenprojekten) unkritisch, aber im Audit dokumentiert.
- Audit: BESTANDEN (mit Lizenzhinweis)

### 13. Theatre.js — `theatre-js/theatre`
- Link: https://github.com/theatre-js/theatre
- Zweck: Visueller Motion-Design-Editor für hochpräzise, keyframe-basierte
  Animationen (3D-Objekte, DOM, SVG) — für Signature-Moments, die über simple
  Scroll-Trigger hinausgehen.
- Besonderheit: 12,6k Stars. Core-Bibliothek Apache-2.0 (frei nutzbar), der
  optionale visuelle Editor "Studio" steht unter AGPL-3.0 (bei Einsatz des
  Editors im eigenen Produkt Copyleft-Pflichten beachten, siehe Audit).
- Audit: BESTANDEN (mit Lizenzhinweis)

---

## D. Referenz / Nur zu Lernzwecken (nicht zur direkten Wiederverwendung)

### 14. "Award-Winning Website" Tutorial-Repo — `adrianhajdin/award-winning-website`
- Link: https://github.com/adrianhajdin/award-winning-website
- Zweck: Begleitrepo eines Tutorials, das eine Awwwards-Site-of-the-Month-Ästhetik
  (Zentry-Clone) mit React, GSAP und Tailwind nachbaut — nützlich als Lern- und
  Struktur-Referenz für Scroll-Choreografien.
- Besonderheit: ~1.000 Stars, Tech-Stack passend (GSAP + React), aber **keine
  explizite Open-Source-Lizenz im Repo erkennbar** und Inhalte sind Nachbau einer
  fremden Marke (Zentry). Nur als Lernmaterial/Code-Referenz geeignet, NICHT als
  Boilerplate für Kundenprojekte kopieren.
- Audit: ABGELEHNT (für Redistribution/Direktnutzung) — siehe AUDIT_LOG.md

---

## E. Glasbrechung, Mesh-Gradients & UI-Frameworks (Erweiterung 2026-09-03)

Ergänzung zur Tech Stack Matrix aus `CLAUDE.md` Abschnitt 2a. Alle Einträge mit
vollständigem Audit in `/security-audits/AUDIT_LOG.md` (#15–#21).

### 15. Liquidglass.js — `ybouane/liquidglass`
- Link: https://github.com/ybouane/liquidglass
- NPM: `@ybouane/liquidglass`
- Zweck: Echte WebGL-Glasbrechung (Refraction, Blur, Chromatic Aberration,
  Multi-Light-Specular) auf beliebigen HTML-Elementen — die technische Basis
  für die "Liquid Glass"-Ästhetik aus der Design-Matrix.
- **Wann Liquidglass statt Shadergradient?** Liquidglass wird auf konkrete
  UI-Elemente angewendet (Navbar, Card, Modal), die den Hintergrund dahinter
  optisch verzerren/brechen sollen. Shadergradient erzeugt selbst den
  Hintergrund/die Fläche. Beide lassen sich kombinieren (Shadergradient als
  Hintergrund, Liquidglass auf der darüberliegenden Navbar).
- Setup:
  ```bash
  npm install @ybouane/liquidglass
  ```
  ```js
  import { LiquidGlass } from '@ybouane/liquidglass';

  const glassEl = document.querySelector('.my-glass');
  glassEl.dataset.config = JSON.stringify({ floating: true, blurAmount: 0.25 });

  const instance = await LiquidGlass.init({
    root: document.querySelector('#root'),
    glassElements: [glassEl],
  });
  ```
- Fertiges React-Beispiel: `skills-and-plugins/liquidglass-navbar-snippet.tsx`
- Audit: BESTANDEN

### 16. Shadergradient — `ruucm/shadergradient`
- Link: https://github.com/ruucm/shadergradient
- NPM: `@shadergradient/react` (+ `@react-three/fiber`, `three`, `three-stdlib`,
  `camera-controls` als Peer-Dependencies)
- Zweck: Animierte WebGL-Mesh-Gradients für Hero-Sections/Backgrounds — deutlich
  günstiger als eine volle R3F-Szene, wenn kein 3D-Objekt, sondern nur eine
  organische Farbfläche gebraucht wird.
- Setup:
  ```bash
  npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
  npm i -D @types/three
  ```
  ```jsx
  import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

  function HeroBackground() {
    return (
      <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1.5} fov={45}>
        <ShaderGradient cDistance={32} cPolarAngle={125} />
      </ShaderGradientCanvas>
    );
  }
  ```
- Fertiges React-Beispiel: `skills-and-plugins/shadergradient-hero-snippet.tsx`
- Audit: BESTANDEN

### 17. React Three Fiber & Drei — bereits im Hub
- Siehe Abschnitt A, Einträge #1/#2 (unverändert BESTANDEN). Für die
  Liquidglass-/Shadergradient-Kombination ist R3F das gemeinsame Rendering-
  Fundament, wenn Shadergradient (das intern R3F nutzt) neben einer eigenen
  3D-Szene läuft.

### 18. Lenis Smooth Scroll — bereits im Hub
- Siehe Abschnitt A (im vorherigen Audit-Durchlauf unter "Motion & Scroll"
  geprüft, BESTANDEN). Dediziertes Standalone-Setup jetzt zusätzlich in
  `skills-and-plugins/lenis-setup.ts`, unabhängig vom `3d-webgl-starter`
  nutzbar (z. B. für reine UI-Projekte ohne WebGL).

### 19. shadcn/ui — `shadcn-ui/ui`
- Link: https://github.com/shadcn-ui/ui
- Zweck: Unstyled/zugängliche Basis-Primitives (Dialog, Popover, Command,
  Select) als Fundament für alle darüberliegenden UI-Frameworks (Skiper UI und
  Vengeance UI bauen beide auf dem shadcn-Registry-Modell auf).
- Setup:
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button dialog command
  ```
- **Schnellerer Weg für Claude Code: offizieller shadcn MCP-Server**
  (`ui.shadcn.com/docs/registry/mcp`, Audit #32) — gibt Claude Code direkten
  Zugriff auf shadcn-kompatible Registries statt CLI-Befehle einzeln
  auszuführen:
  ```bash
  pnpm dlx shadcn@latest mcp init --client claude
  ```
  Danach Claude Code neu starten; Prompts wie "Zeig mir die Button-Varianten
  aus der Skiper-UI-Registry" funktionieren dann direkt im Chat.
- Audit: BESTANDEN

### 20. Skiper UI — `skiper-ui.com` (Registry, Autor: Gxuri)
- Link: https://skiper-ui.com/
- Zweck: "Un-common" animierte shadcn-Registry-Komponenten (Hero-Blöcke,
  Sections) — hochwertiger Ausgangspunkt für Sections, die sich von
  Standard-shadcn abheben sollen.
- **Wann Skiper UI statt Vengeance UI?** Skiper UI ist auf einzelne, in sich
  geschlossene "Un-common"-Sections/Blöcke spezialisiert (per shadcn-CLI
  gezogen); Vengeance UI liefert eher landingpage-typische Bausteine
  (Buttons, Hover-Links, Rays) im reinen Copy-Paste-Modell ohne CLI/Registry.
  Beide lassen sich mischen.
- Setup (NUR Free-Tier-Komponenten, siehe Audit-Einschränkung):
  ```bash
  npx shadcn add @skiper-ui/skiper40
  ```
- Fertiges React-Beispiel: `skills-and-plugins/skiper-vengeance-example.tsx`
- Audit: BESTANDEN MIT EINSCHRÄNKUNG (siehe AUDIT_LOG.md #20)

### 21. Vengeance UI — `Ashutoshx7/VengenceUI`
- Link: https://github.com/Ashutoshx7/VengenceUI
- Website: https://www.vengenceui.com/
- Zweck: Copy-Paste-Landingpage-Komponenten (Buttons, Hover-Links, Rays,
  Animated-Backgrounds) auf Basis von React + TypeScript + Tailwind + Framer
  Motion.
- **Wichtig:** Es kursieren mehrere Fork-/Clone-Repos unter ähnlichem Namen
  (z. B. `Immutablemike/vengenceui`, `dus4w/ui-components-VengenceUI`) —
  ausschließlich das kanonische Repo `Ashutoshx7/VengenceUI` verwenden, siehe
  Audit-Begründung.
- Setup: kein npm-Paket — Komponenten werden aus dem Repo/der Website heraus
  direkt in den eigenen Codebase kopiert (`Copy. Paste. Customize. Ship.`).
- Fertiges React-Beispiel: `skills-and-plugins/skiper-vengeance-example.tsx`
- Audit: BESTANDEN MIT LIZENZHINWEIS (siehe AUDIT_LOG.md #21)

### ABGELEHNT: Animmaster Lib
- Website: https://animmasterlib.dev/
- Zweck (beworben): 300 "PRO"-Animationskomponenten (WebGL + GSAP).
- **Nicht im Hub verfügbar.** Kein Open-Source-Repository, kostenpflichtig
  ($4.99–$8), Auslieferung als Google-Drive-Ordner statt npm/GitHub, Support
  nur per Telegram/E-Mail. Kein öffentlicher Code zur Prüfung vor Kauf,
  keine Versionshistorie, keine Möglichkeit einer Sicherheits-/Lizenzprüfung
  vor dem Download. Siehe AUDIT_LOG.md #22 für die vollständige Begründung.

---

## F. Tooling: UI-Pipeline & Code-Qualität (Erweiterung 2026-09-03)

Kein Code/Design-Repo, sondern zwei Dienste, die fest in den Hub-Workflow
integriert sind (siehe `CLAUDE.md` Abschnitt 2b/2c). Vollständiger Audit:
`/security-audits/AUDIT_LOG.md` #23/#24.

### 23. 21st.dev — UI-Component-Marketplace
- Link: https://21st.dev
- Betreiber: 21st Labs, Inc.
- Hauptfunktion: Community-Registry mit 12.000+ React/Tailwind/shadcn-
  Komponenten von ~700 Design-Engineers, inkl. AI-Ready-Prompts für Claude
  Code/Cursor/v0 und klassischem shadcn-CLI-Install.
- Einsatzszenario: **Primäre erste Anlaufstelle**, wenn ein Projekt
  vorgefertigte UI-/Interaction-Komponenten braucht (Cards, Formulare,
  Nav-Bars, Hero-Blöcke) — spart Zeit gegenüber Neubau, sichert hohe
  Design-Grundqualität. Immer als Ausgangspunkt behandeln, nie als
  Endprodukt (siehe `CLAUDE.md` Abschnitt 1 + `21ST_DEV_INTEGRATION.md`).
- Setup: siehe `skills-and-plugins/21ST_DEV_INTEGRATION.md` für den
  vollständigen Copy/Adapt-Workflow.
- Audit: BESTANDEN MIT EINSCHRÄNKUNG (Multi-Autoren-Marketplace — Lizenz
  und Codequalität pro Komponente einzeln prüfen, siehe AUDIT_LOG.md #23)

### 24. CodeRabbit — AI Code Review & Security Scanning
- Link: https://www.coderabbit.ai
- Hauptfunktion: automatisierter KI-Code-Review auf Pull-Request-Ebene
  (GitHub App), inkl. Security-Scans (gitleaks, semgrep), Linting-Integration
  (eslint) und konfigurierbaren pfadspezifischen Prüfanweisungen.
- Einsatzszenario: **Pflicht-Gate vor jedem Merge** für neue Module,
  WebGL-Hooks und aus 21st.dev übernommene Komponenten — insbesondere zur
  Durchsetzung der Memory-Leak-, Cleanup- und Typisierungsregeln aus
  `CLAUDE.md` Abschnitt 2c.
- Setup: vollständige `.coderabbit.yaml`-Vorlage inkl. WebGL-/a11y-/Security-
  Regeln in `skills-and-plugins/CODERABBIT_WORKFLOW.md`.
- Audit: BESTANDEN MIT SICHERHEITSHINWEIS (siehe AUDIT_LOG.md #24 — 2025
  gepatchte RCE-Schwachstelle, seither SOC 2 Type II; GitHub-App-Zugriff
  zwingend auf "Only select repositories" beschränken)

## G. 3D Asset Optimization (Erweiterung 2026-09-03, Teil 3)

Ergänzung zu Abschnitt A und `CLAUDE.md` Abschnitt 2d. Vollständiger Audit:
`/security-audits/AUDIT_LOG.md` #25/#26.

### 25. gltfjsx — `pmndrs/gltfjsx`
- Link: https://github.com/pmndrs/gltfjsx | NPM: `gltfjsx`
- Zweck: Konvertiert `.glb`/`.gltf`-Dateien in typisierte, deklarative
  R3F-Komponenten; `--transform` komprimiert Assets dabei via Draco/Meshopt
  (70–90 % kleiner). Standard-Werkzeug für JEDEN 3D-Asset-Import im Hub
  (siehe `CLAUDE.md` Abschnitt 2d, vollständiges Cheatsheet in
  `skills-and-plugins/GLTF_PIPELINE_GUIDE.md`).
- Setup:
  ```bash
  npx gltfjsx model.glb --types --transform --instance --shadows
  ```
- Audit: BESTANDEN

### 26. three-stdlib — `pmndrs/three-stdlib`
- Link: https://github.com/pmndrs/three-stdlib | NPM: `three-stdlib`
- Zweck: Tree-shakebare, TypeScript-portierte Sammlung der three.js-
  „examples/jsm“-Module (Loader, Controls, Postprocessing-Hilfsmittel) als
  reguläre npm-Dependency — praktisch für alles, was offiziell nur als
  Beispielcode im three.js-Repo existiert (z. B. `DRACOLoader`-Varianten,
  zusätzliche Controls).
- Setup:
  ```bash
  npm install three-stdlib
  ```
- Audit: BESTANDEN

---

## H. Testing & Quality Automation (Erweiterung 2026-09-04)

Ergänzung zu `CLAUDE.md` Abschnitt 2e. Vollständiger Audit:
`/security-audits/AUDIT_LOG.md` #29/#30.

### 29. Playwright — `microsoft/playwright`
- Link: https://github.com/microsoft/playwright
- Zweck: E2E-Tests + visuelle Regression (Screenshot-Diffing via
  `toHaveScreenshot()`) — schließt die Lücke, dass Bugs wie z-index-Stacking-
  Fehler oder blockiertes Dropdown-Scrolling bisher erst durch manuelles
  Screenshot-Review nach dem Bauen auffielen.
- Setup: siehe `skills-and-plugins/PLAYWRIGHT_TESTING_GUIDE.md`.
- Audit: BESTANDEN

### 30. @axe-core/playwright — `dequelabs/axe-core-npm`
- Link: https://github.com/dequelabs/axe-core-npm
- Zweck: Automatisierter WCAG-2.1-AA-Scan pro Route, direkt in Playwright-Tests
  integrierbar — ergänzt (ersetzt nicht) die manuelle a11y-Prüfregel in der
  CodeRabbit-Config.
- Setup: siehe `skills-and-plugins/PLAYWRIGHT_TESTING_GUIDE.md`.
- Audit: BESTANDEN

## I. CI/CD & Dependency Automation (Erweiterung 2026-09-04)

Ergänzung zu `CLAUDE.md` Abschnitt 2f. Fertige Vorlagen zum direkten Kopieren
in jeden neuen Projekt-Root: `templates-and-repos/ci-cd-templates/`
(`ci.yml`, `dependabot.yml`, `.coderabbit.yaml`). Vollständiger Audit:
`/security-audits/AUDIT_LOG.md` #31.

### 31. Dependabot — natives GitHub-Feature
- Zweck: wöchentliche automatische PRs für veraltete/verwundbare
  npm-Dependencies, inkl. GitHub Security Advisories — macht das in
  Abschnitt 4 geforderte `npm audit` zu einer laufenden statt einer
  einmaligen, leicht vergessenen Prüfung.
- Setup: `dependabot.yml` aus `ci-cd-templates/` nach `.github/` kopieren.
- Audit: BESTANDEN

## J. Native Plattform-Techniken (ergänzend, Erweiterung 2026-09-04)

Kein npm-Paket, sondern native Browser-APIs — hier dokumentiert, weil sie in
bestimmten Fällen GSAP/Framer Motion sinnvoll ergänzen (nicht ersetzen).
Details, Codebeispiele, Entscheidungshilfe: Details, Codebeispiele und
Entscheidungshilfe: `skills-and-plugins/MODERN_PLATFORM_FEATURES.md`.

- **View Transitions API** — native Seitenübergänge, inzwischen cross-document
  in allen großen Browsern verfügbar. Kandidat für Subpage-Übergänge, die
  aktuell über eine selbstgebaute AnimatePresence-Lösung laufen, insbesondere
  bei Utility-Seiten ohne WebGL-Zwang.
- **CSS Scroll-Driven Animations** (`animation-timeline: view()`/`scroll()`)
  — GPU-beschleunigte, JS-freie Alternative zu `whileInView` bei einfachen
  Fade/Slide-Reveals. GSAP/ScrollTrigger bleibt Standard für gepinnte
  Kamerafahrten und komplexe, exakt gescrubbte Choreografien.

## Verwendungshinweis

Jedes Projekt startet mit: (1) Ziel-Ästhetik festlegen, (2) passende Bausteine aus
A–C kombinieren (z. B. R3F + Drei + GSAP für 3D-Hero, Lenis für Scroll-Feel, Motion +
Sonner + Vaul für UI-Micro-Interactions, Magic UI/React Bits als Ausgangspunkt für
individuell weiterveredelte Komponenten), (3) `CLAUDE.md`-Regeln (Anti-AI-Slop,
Performance-Budget) durchgängig anwenden.
