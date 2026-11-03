# Web Design Hub — Permanentes Anweisungsheft

> Diese Datei ist die zentrale Design- & Engineering-Verfassung für ALLE zukünftigen
> High-End-Webprojekte, die aus diesem Hub gestartet werden. Sie gilt bei jedem neuen
> Projekt automatisch, sobald `CLAUDE.md` im Projektkontext liegt (z. B. per Copy oder
> Symlink in den Projekt-Root). Ziel: Websites auf dem Niveau von lusion.co, Emil
> Kowalski (Vaul, Sonner, Family, Awu) und preisgekrönten Awwwards-Seiten — niemals
> generischer "AI Slop".

## 0. Grundhaltung

Jede Entscheidung wird gegen eine Frage geprüft: **"Würde das auf Awwwards Site-of-the-Day
auffallen — oder sieht es aus wie das zehntausendste SaaS-Landingpage-Template?"**
Im Zweifel: mutiger, spezifischer, handgefertigter wirken lassen.

## 1. ANTI-AI-SLOP — Verbote & Pflichten

**Verboten:**
- Unveränderte Bootstrap-, generische Tailwind-UI- oder shadcn-Standardkompositionen
  ohne eigene Handschrift (Standardfarben, Standardradien, Standard-Card-Grids).
- Stock-Hero-Layouts: zentrierter Headline + Subheadline + zwei Buttons + Gradient-Blob,
  ohne Variation.
- Generische Emoji-Icons oder Standard-Icon-Sets (Heroicons/Lucide) 1:1 ohne Anpassung
  als tragendes visuelles Element.
- Placeholder-Fade-in-on-scroll als einzige Animation ("AOS.js Standard-Look").
- Standard-Systemschriften oder immer dieselben zwei, drei "sicheren" Google Fonts
  (Inter + Poppins) ohne bewusste typografische Entscheidung.

**Pflicht:**
- Custom Micro-Interactions: Hover-, Press-, Focus- und Drag-States, die auf Physik statt
  auf CSS-`ease`-Timing-Functions basieren (Spring Physics via Motion/Framer Motion,
  react-spring oder eigene Spring-Implementierung).
- Unerwartete Typografie: variable Fonts, Kerning-/Tracking-Feinschliff, ungewöhnliche
  Schnitte, Editorial-Layouts statt Grid-Standardraster.
- Haptisches/taktiles Feedback: Cursor-Follower, Magnetic Buttons, Drag-Resistenz,
  Sound-Design bei Interaktionen (optional, aber bewusst erwägen).
- Fluid Layouts: `clamp()`-basierte Typografie/Spacing statt starrer Breakpoints,
  Container-Queries wo sinnvoll.
- Jede Seite braucht mindestens ein "Signature Moment" — ein Detail, das man sich merkt
  (ein Cursor-Effekt, ein Seitenübergang, eine Scroll-Choreografie, ein WebGL-Element).
- **Sektionsweiser Medienwechsel statt eines durchgehenden Mediums** (direkte
  Lehre aus "Example Project C", Live-Nutzer-Feedback): "Kein harter Schnitt
  zwischen Abschnitten" heißt erzählerische Kontinuität (gleiche Farb-/
  Bewegungssprache, ein gemeinsamer Scroll-Treiber, sauberer Übergabepunkt)
  — NICHT, dass ein einzelnes Trägermedium (z. B. Partikel) über die ganze
  Seite hinweg präsent bleibt und nur seine Form wechselt. Mindestens ein
  echter Medienwechsel pro Startseite ist Pflicht (z. B. Partikel lösen sich
  sichtbar auf → eine andere Technik übernimmt sichtbar, etwa eine
  eigenständig dominante Linie oder ein Content-Box-Reveal-System). Details
  und QA-Prüfpunkte: `/skills-and-plugins/PITCH_CONCEPT_PIPELINE.md`,
  Abschnitt "Sektionsweiser Medienwechsel" / QA-Schritt 13.
- **Handwerks-Niveau projektweit einheitlich**, nicht nur an der
  sichtbarsten Stelle: erreicht ein Karten-/Listenmuster (Hover-Tilt,
  Sheen, Reveal-on-Scroll) hohe Qualität, gilt dasselbe Niveau für JEDES
  vergleichbare Muster auf allen Unterseiten — kein unbegründetes
  Qualitätsgefälle zwischen der aufwendigsten Komponente und den übrigen.

## 2. DESIGN-REFERENZEN & PATTERN-BIBLIOTHEK

- **Emil Kowalski Interaction Patterns**: Vaul (Drawer-Physik, Rubber-Band-Overscroll),
  Sonner (Toast-Stacking, Exit-Animationen, Undo-Pattern), "Smooth Motion"-Prinzipien
  (Timing, Easing-Kurven, `prefers-reduced-motion`-Respekt). Referenz-Snippets liegen in
  `/skills-and-plugins`.
- **'Taste'-Skill-Standards**: Farbharmonie, Kontrastverhältnisse, Whitespace-Rhythmus,
  Komponentenkonsistenz — vor jedem Screen-Export gegenprüfen.
- **Lusion-Style 3D/WebGL**: React Three Fiber + drei.js als Standard-Stack für 3D;
  GLSL-Shader für Grain, Distortion, Fluid-Simulationen, Chromatic Aberration; GSAP
  (ScrollTrigger) für choreografierte Scroll-Sequenzen; Postprocessing (Bloom, DOF,
  Noise) sparsam und zielgerichtet einsetzen.
- Bei jedem neuen Projekt: zuerst `RESOURCE_INDEX.md` in `/templates-and-repos`
  konsultieren, bevor neue Libraries gesucht werden.
- **Native Plattform-Techniken als Ergänzung**: View Transitions API
  (Seitenübergänge) und CSS Scroll-Driven Animations (`animation-timeline`)
  für einfache Fälle in Betracht ziehen, bevor automatisch zu GSAP/Framer
  Motion gegriffen wird — spart Bundle-Gewicht. Details, Codebeispiele und
  wann welche Technik sinnvoll ist: `/skills-and-plugins/MODERN_PLATFORM_FEATURES.md`.

## 2a. TECH STACK MATRIX

Verbindliche Werkzeugauswahl für High-End-Websites aus diesem Hub. Jedes Paket
hier hat einen Audit-Eintrag in `/security-audits/AUDIT_LOG.md` und eine
ausführliche Beschreibung inkl. Setup-Snippet in
`/templates-and-repos/RESOURCE_INDEX.md`. Nichts außerhalb dieser Matrix
einsetzen, ohne vorher einen neuen Audit-Durchlauf zu machen (siehe
Abschnitt 4).

| Kategorie | Tool | Einsatzzweck |
|---|---|---|
| 3D & Canvas | **React Three Fiber (R3F) + Three.js** | Deklarative 3D-Szenen, Fundament jedes WebGL-Projekts |
| 3D & Canvas | **@react-three/postprocessing** (pmndrs) | Bloom, DOF, Chromatic Aberration, Noise — gebündelt über einen `EffectComposer` |
| 3D & Canvas | **Shadergradient** (`@shadergradient/react`) | Animierte WebGL-Mesh-Gradients als Hero-/Section-Hintergrund, wenn KEIN vollständiges 3D-Objekt gebraucht wird |
| 3D & Canvas | **Liquidglass.js** (`@ybouane/liquidglass`) | Echte WebGL-Glasbrechung/Chromatic Aberration auf HTML-Elementen (Navbars, Cards, Modals) — Apple-„Liquid Glass“-Ästhetik |
| Motion & Scroll | **GSAP + ScrollTrigger** | Choreografierte, gescrubbte Scroll-Sequenzen |
| Motion & Scroll | **Lenis** | Physikalisch korrektes Smooth Scrolling, synchronisiert mit GSAP-Ticker |
| Motion & Scroll | **Motion (ehem. Framer Motion)** | Spring-Physics für React-Komponenten, Layout-Animationen, Gesten |
| UI-Frameworks | **shadcn/ui** | Unstyled, zugängliche Basis-Primitives (Dialog, Popover, Command) als Fundament — NIE ungestylt im Endprodukt belassen |
| UI-Frameworks | **Skiper UI** (Free-Tier) | Un-common, animierte shadcn-Registry-Komponenten für Sections/Hero-Blöcke |
| UI-Frameworks | **Vengeance UI** | Copy-Paste-Landingpage-Komponenten mit Framer-Motion-Animationen (Vercel OSS Program) |
| Testing & QA | **Playwright** (Microsoft) | E2E-Tests, visuelle Regression (Screenshot-Diffing) |
| Testing & QA | **@axe-core/playwright** (Deque) | Automatisierte WCAG-2.1-AA-Scans |
| Native Plattform (ergänzend, kein Ersatz) | **View Transitions API** | Native Seitenübergänge zwischen Routen, cross-document seit 2026 breit unterstützt |
| Native Plattform (ergänzend, kein Ersatz) | **CSS Scroll-Driven Animations** (`animation-timeline`) | GPU-beschleunigte, JS-freie Fade/Slide-Reveals als Alternative zu `whileInView` bei einfachen Fällen — GSAP/ScrollTrigger bleibt Standard für gepinnte Kamerafahrten/komplexe Choreografien |

### Design-Regeln zur Tech Stack Matrix

- **Keine Standard-Tailwind-Blöcke**: shadcn/Skiper/Vengeance-Komponenten sind
  IMMER Ausgangspunkt, nie Endprodukt — mindestens Farbwerte, Radien, Timing
  oder Typografie projektbezogen anpassen (siehe `taste-skill-checklist.md`).
- **Glasbrechung (Liquidglass)** gezielt für 1–2 Signature-UI-Elemente pro
  Projekt einsetzen (z. B. Sticky-Navbar, zentrale Karte) — nicht flächendeckend,
  da jede Glass-Instanz eine eigene WebGL-Renderpass kostet.
- **Liquide Canvas-Logos**: Logo/Wortmarke als Shader-getriebenes Canvas-Element
  (Distortion- oder Metaball-Shader statt statischem SVG) für Marken mit
  3D-/Awwwards-Anspruch — siehe `liquidglass-navbar-snippet.tsx` in
  `/skills-and-plugins`.
- **Flüssige Framerates (60/120 FPS)**: siehe Performance-Budget, Abschnitt 3 —
  gilt uneingeschränkt auch für Liquidglass- und Shadergradient-Instanzen
  (DPR-Cap, Lazy-Mount außerhalb des Viewports via `IntersectionObserver`).
- **Custom Micro-Interactions**: Skiper-/Vengeance-Komponenten nur mit
  Motion-Spring-Overrides einsetzen, niemals mit deren Standard-`duration`-
  Timing unverändert übernehmen (siehe Abschnitt 1, „Pflicht“).

## 2b. UI COMPONENT PIPELINE (21st.dev)

Wenn ein Projekt vorgefertigte UI-/Interaction-Komponenten braucht (Buttons,
Cards, Hero-Blöcke, Formulare, Navigation), wird **primär 21st.dev**
konsultiert, bevor eine Komponente von Grund auf neu gebaut wird — spart Zeit
und sichert durchgängig hohe Design-Qualität (shadcn/ui- + Framer-Motion-
Ökosystem, 12.000+ community-kuratierte Komponenten).

**Vorgehen:**
1. Auf https://21st.dev nach dem passenden Komponenten-Muster suchen
   (Kategorie/Stichwort, z. B. "pricing card", "magnetic button").
2. Bevorzugt Komponenten mit hoher Autoren-Reputation/vielen "Copies" wählen
   — 21st.dev ist ein **Community-Marketplace mit ~700 verschiedenen
   Autoren**, Qualität und Code-Stil schwanken deshalb pro Komponente
   stärker als bei einem einzelnen, kuratierten Repo.
3. Komponente per shadcn-CLI oder AI-Ready-Prompt in den Projekt-Code
   kopieren (NICHT als laufende Dependency einbinden — 21st.dev-Code wird
   Teil der eigenen Codebase: "You own it and can change it").
4. **Niemals unverändert übernehmen** — siehe Abschnitt 1 (Anti-AI-Slop) und
   die Taste-Checkliste. Details zum genauen Workflow inkl.
   Kombination mit Emil-Kowalski-Patterns und WebGL-Layern:
   `/skills-and-plugins/21ST_DEV_INTEGRATION.md`.
5. Jede übernommene Komponente durchläuft anschließend die Code-Quality-
   Pipeline aus Abschnitt 2c, bevor sie gemergt wird.

**Alternative für shadcn-kompatible Registries: shadcn MCP-Server** (offiziell
vom shadcn/ui-Team, `ui.shadcn.com/docs/registry/mcp`) — gibt Claude Code
direkten, strukturierten Zugriff auf Registries (inkl. Skiper UI, das per
`npx shadcn add` installiert wird) statt CLI-Befehle manuell zu orchestrieren.
Setup pro Projekt: `pnpm dlx shadcn@latest mcp init --client claude`, danach
Claude Code neu starten. Ersetzt nicht die Due-Diligence-Kriterien oben,
beschleunigt nur die Installation.

## 2c. CODE QUALITY & AUDITING PIPELINE (CodeRabbit)

Alle neu geschriebenen Module, WebGL-Hooks und aus 21st.dev/anderen Quellen
importierten Komponenten durchlaufen vor dem Merge einen CodeRabbit-Review.
Nicht verhandelbare Prüfpunkte (Details & `.coderabbit.yaml`-Vorlage in
`/skills-and-plugins/CODERABBIT_WORKFLOW.md`):

- **Keine Memory Leaks bei Canvas-/WebGL-Kontexten**: jeder `useEffect`, der
  einen R3F-/Three.js-/WebGL2-Context, Event-Listener oder `requestAnimationFrame`-
  Loop erstellt, MUSS eine Cleanup-Funktion zurückgeben (Dispose von
  Geometrien/Materialien/Texturen, `cancelAnimationFrame`, Listener-Removal).
- **Sauberes Unmounting**: React-Komponenten mit Lenis-/GSAP-ScrollTrigger-
  Instanzen zerstören diese explizit (`lenis.destroy()`,
  `ScrollTrigger.kill()`) beim Unmount — kein "fire and forget".
- **Strikte Typisierung**: kein `any` in neuem Code, WebGL-Uniforms und
  Shader-Props vollständig typisiert.
- **CodeRabbit-Zugriff nach Least-Privilege**: GitHub-App-Berechtigung nur
  auf die tatsächlich benötigten Repos beschränken (siehe Sicherheitshinweis
  in `/security-audits/AUDIT_LOG.md`, Eintrag CodeRabbit), nicht
  standardmäßig "All repositories" wählen.

## 2d. 3D ASSET OPTIMIZATION (Lusion-Level-Pflicht)

Kein `.glb`/`.gltf`-Asset geht ungeprüft in ein Projekt. Ziel: Ladezeiten und
Render-Kosten im Lusion-Bereich (siehe Performance-Budget, Abschnitt 3), nicht
die unkomprimierten Export-Defaults von Blender/Cinema4D.

- **Draco-Komprimierung ist Standard, nicht Ausnahme**: jedes Mesh-Asset vor
  dem ersten Import in ein Projekt mit Draco (Geometrie) bzw. Meshopt
  (Interpolation/Animation, wo Draco ungeeignet ist) komprimieren. Am
  einfachsten über `gltfjsx --transform` (nutzt `@gltf-transform/cli` inkl.
  Draco/Meshopt unter der Haube), Details in `GLTF_PIPELINE_GUIDE.md`.
  Faustregel: 70–90 % Dateigrößenreduktion sind der Normalfall, nicht das
  Optimum — bei größeren Reduktionen die visuelle Qualität stichprobenartig
  gegenprüfen (Kompressionsartefakte an Kanten/Normalen).
- **gltfjsx für JEDES importierte 3D-Modell**: `.glb`-Dateien werden nicht
  händisch mit `useGLTF`/`useLoader` eingebunden, sondern per
  `npx gltfjsx model.glb --types` in eine typisierte, deklarative R3F-
  Komponente konvertiert. Das erzwingt saubere Node-/Material-Referenzen
  und macht die Szene diffbar/reviewbar (CodeRabbit-Pipeline, Abschnitt 2c).
- **InstancedMesh für Partikelsysteme & Wiederholstrukturen**: Sobald mehr
  als ~50 nahezu identische Meshes gleichzeitig gerendert werden (Partikel,
  wiederkehrende Deko-Objekte, Instanzen aus `gltfjsx --instance`), IMMER
  `InstancedMesh` statt Einzel-`<mesh>`-Wiederholung verwenden — reduziert
  Draw-Calls von N auf 1. Für simulationsgetriebene Partikelsysteme
  (Mausinteraktion, Physik) zusätzlich GPGPU-Ansatz erwägen (Simulation auf
  der GPU via Datentextur statt CPU-Update pro Frame) — Referenz-
  implementierung: `skills-and-plugins/GPGPU_PARTICLES_EXAMPLE.tsx`.
- **Texturen**: KTX2/Basis-komprimiert ausliefern (siehe Abschnitt 3),
  Auflösung auf tatsächliche Bildschirmgröße des Assets abstimmen statt
  pauschal 4K-Texturen zu verwenden.
- **Audit-Pflicht bleibt bestehen**: `gltfjsx` und `three-stdlib` sind als
  Standard-Tools freigegeben (siehe `RESOURCE_INDEX.md` / `AUDIT_LOG.md`
  #25/#26) — jedes zusätzliche 3D-Optimierungstool durchläuft vor Einsatz
  den gleichen Audit-Prozess wie in Abschnitt 4 beschrieben.

## 2e. TESTING & QUALITY AUTOMATION (Playwright + axe-core)

Manuelles Screenshot-Review allein hat in der Praxis bereits mehrfach Bugs erst
nach dem Bauen durchrutschen lassen (z-index-Stacking-Fehler, blockiertes
Dropdown-Scrolling, leere Grid-Restflächen — siehe QA-Iterationen in
laufenden Projekten). Deshalb ist ein automatisierter Testing-Layer ab sofort
Pflicht, nicht optional. Details, Setup und Beispieltests:
`/skills-and-plugins/PLAYWRIGHT_TESTING_GUIDE.md`. Audit: `AUDIT_LOG.md` #29/#30.

- **Playwright** (Microsoft) für E2E- und visuelle Regressionstests
  (eingebautes Screenshot-Diffing via `toHaveScreenshot()`).
- **@axe-core/playwright** (Deque Systems) für automatisierte WCAG-2.1-AA-Scans
  — ergänzt, ersetzt aber NICHT die manuelle a11y-Prüfung aus der
  CodeRabbit-`path_instructions` (Abschnitt 2c).
- Mindestabdeckung pro Projekt: (1) ein a11y-Scan pro Hauptseiten-Route, (2)
  ein visueller Snapshot-Test pro Signature-Moment-Section, (3) ein
  Interaktionstest für jedes Dropdown/Drawer/Modal (genau die Kategorie Bugs,
  die bisher am häufigsten erst manuell auffiel).
- Läuft lokal vor jedem Commit (`npm run test:e2e`) UND als Pflicht-Gate in
  der CI-Pipeline (Abschnitt 2f) — ein PR mit rotem Playwright-Run wird nicht
  gemergt, unabhängig vom CodeRabbit-Status.

## 2f. CI/CD & DEPENDENCY AUTOMATION

`npm audit`, `tsc --noEmit`, `npm run build` und die Playwright-Suite dürfen
nicht mehr davon abhängen, dass ein Prompt sie explizit anfordert — das ist
ein Single Point of Failure. Stattdessen: verbindliches GitHub-Actions-Gate
plus automatisierte Dependency-Überwachung. Vorlagen (fertig zum Kopieren in
jeden neuen Projekt-Root): `/templates-and-repos/ci-cd-templates/`.
Audit: `AUDIT_LOG.md` #31/#32.

- **GitHub Actions** (`ci-cd-templates/ci.yml`): bei jedem PR — `npm ci`,
  `tsc --noEmit`, `npm run build`, `npm audit --audit-level=high`,
  `npx playwright test`. Merge erst bei grünem Lauf.
- **Dependabot** (`ci-cd-templates/dependabot.yml`): wöchentliche automatische
  PRs für veraltete/verwundbare npm-Dependencies — GitHub-natives Feature,
  kein Drittanbieter-Zugriff auf den Code nötig.
- **`.coderabbit.yaml`** liegt jetzt zusätzlich als fertige Datei (nicht nur
  als Markdown-Vorlage) in `ci-cd-templates/`, direkt kopierbar.

## 3. PERFORMANCE-BUDGET (nicht verhandelbar)

- Ziel: 60 FPS auf Standard-Hardware, 120 FPS auf ProMotion-/High-Refresh-Displays,
  wo die Content-Pipeline es zulässt.
- Canvas-Optimierung: `requestAnimationFrame`-Throttling bei Inaktivität, Instancing
  statt Einzel-Meshes, Frustum Culling, Texture-Kompression (KTX2/Basis), DPR-Cap
  (max. 2), Offscreen-Canvas wo möglich.
- Keine Layout-Shifts (CLS ≈ 0): feste Aspect-Ratios für Media, Skeletons statt
  Sprung-Layouts, Web-Fonts mit `font-display: optional`/`swap` + Preload.
- Lighthouse/Core Web Vitals vor jedem Deploy prüfen: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Lazy-Load von WebGL-/3D-Bundles (Code-Splitting, `dynamic import`), niemals Three.js
  im initialen Bundle einer nicht-3D-Seite.
- Reduced-Motion- und Low-End-Device-Fallbacks für jede aufwendige Animation zwingend
  einplanen (statisches Bild/CSS-Fallback statt WebGL bei `prefers-reduced-motion`
  oder fehlender WebGL2-Unterstützung).

## 3a. DATENSCHUTZ & DRITTANBIETER-RESSOURCEN (Pflicht bei Kanzlei-/Arzt-/Hotel-Klientel)

Relevant für die typische Hub-Zielkundschaft (Kanzleien, Fachärzte, Hotellerie
in Österreich/DACH) — Datenschutzverstöße sind bei dieser Klientel ein reales
Abmahn-/Reputationsrisiko, nicht nur ein technisches Detail.

- **Web-Fonts IMMER self-hosten**, niemals per Google-Fonts-CDN-Link
  einbinden (`fonts.googleapis.com`/`fonts.gstatic.com`) — CDN-Einbindung
  überträgt Besucher-IP-Adressen an Google ohne Einwilligung, in AT/DE
  wiederholt abgemahnt. Variable Fonts lokal im Projekt ausliefern (z. B.
  via `@fontsource`-Paketen oder direkt eingebundenen Font-Dateien), inkl.
  `font-display`-Regel aus Abschnitt 3.
- **Keine Drittanbieter-Embeds/-Skripte vor Consent nachladen** (Analytics,
  Karten, Bewertungs-Widgets wie TripAdvisor, Video-Embeds) — erst nach
  aktiver Einwilligung per Consent-Layer laden, sonst DSGVO-/TTDSG-Risiko für
  den Kunden. Gilt auch für alle in Abschnitt 2a gelisteten Tools, sobald sie
  selbst Netzwerk-Calls an Dritte auslösen (aktuell keines davon — bei
  zukünftigen Ergänzungen prüfen).
- Vor Übergabe an den Kunden: kurze Checkliste "Fonts self-hosted? Keine
  ungefragten Dritt-Requests vor Consent? Impressum/Datenschutzerklärung mit
  echten, nicht erfundenen Angaben?" als fester Punkt in
  `performance-checklist.md`.

## 4. SICHERHEITS-PROTOKOLL FÜR EXTERNE RESSOURCEN

Vor jedem Einsatz eines Repos/Pakets aus `/templates-and-repos`:
1. Prüfen, ob ein aktueller Eintrag in `/security-audits/AUDIT_LOG.md` mit Status
   `[BESTANDEN]` existiert.
2. Kein Paket ohne Audit-Eintrag installieren oder als Referenz kopieren.
3. Bei Unklarheit: erneuter Audit-Durchlauf (Autor, Sterne, Maintenance, Lizenz,
   Dependency-Sicherheit) vor Verwendung.

## 5. WORKFLOW FÜR NEUE PROJEKTE AUS DIESEM HUB

1. Ziel-Ästhetik in 1–2 Sätzen festlegen (welche Referenz aus Abschnitt 2 dominiert?).
2. Passenden Starter aus `/templates-and-repos` wählen (siehe `RESOURCE_INDEX.md`).
3. Diese `CLAUDE.md` in den neuen Projekt-Root kopieren/verlinken.
4. `ci-cd-templates/ci.yml`, `dependabot.yml` und `.coderabbit.yaml` aus
   `/templates-and-repos/ci-cd-templates/` in den neuen Projekt-Root kopieren
   und Playwright-Setup aus `PLAYWRIGHT_TESTING_GUIDE.md` einrichten, BEVOR
   der erste Feature-Branch gemergt wird (Abschnitt 2e/2f).
5. Signature Moment definieren, bevor mit Component-Building begonnen wird.
6. Performance-Budget (Abschnitt 3) UND Datenschutz-Checkliste (Abschnitt 3a)
   von Anfang an mitdenken, nicht erst am Ende.
