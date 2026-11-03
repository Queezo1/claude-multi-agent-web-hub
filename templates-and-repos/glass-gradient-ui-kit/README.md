# Glass & Gradient UI Kit

Einsatzbereites Starter-Kit, das die Erweiterung vom 2026-09-03 kombiniert:
**Liquidglass.js** (Glasbrechung auf UI-Elementen) + **Shadergradient**
(animierter Mesh-Gradient-Hintergrund) + **Lenis** (Smooth Scroll) +
**Motion** (Spring-Micro-Interactions). Alle Pakete: Audit **[BESTANDEN]**
bzw. **[BESTANDEN MIT EINSCHRÄNKUNG/LIZENZHINWEIS]**, siehe
`/security-audits/AUDIT_LOG.md` #15–#21.

## Installation

```bash
npm install
npm run dev
```

## Enthalten
- `src/App.tsx` — verdrahtet `ShaderGradientHero` (Hintergrund) +
  `LiquidGlassNavbar` (Sticky-Nav mit echter Glasbrechung) + `setupLenis`
  (Smooth Scroll) zu einer fertigen Hero-Section.
- Importiert die wiederverwendbaren Bausteine direkt aus
  `/skills-and-plugins` (siehe dortige Dateien für die Einzelkomponenten):
  - `liquidglass-navbar-snippet.tsx`
  - `shadergradient-hero-snippet.tsx`
  - `lenis-setup.ts`
  - `skiper-vengeance-example.tsx` (Taste-konforme Section/Link-Patterns)

## Testing (Pflicht, siehe CLAUDE.md Abschnitt 2e)
`playwright.config.ts` + `tests/smoke.spec.ts` sind bereits enthalten
(a11y-Scan, Tastatur-Erreichbarkeit, visueller Snapshot). Nach `npm install`:
```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

## Nächste Schritte für ein neues Projekt
1. Diesen Ordner kopieren.
2. `CLAUDE.md` aus dem Hub-Root in den Projekt-Root kopieren/verlinken.
3. `npx shadcn@latest init` ausführen, falls zusätzliche shadcn-/Skiper-UI-
   Primitives gebraucht werden (siehe RESOURCE_INDEX.md #19/#20) — oder
   direkt den offiziellen shadcn-MCP-Server einrichten (`pnpm dlx shadcn@latest
   mcp init --client claude`, siehe RESOURCE_INDEX.md #19).
4. `ci.yml`, `dependabot.yml`, `.coderabbit.yaml` aus
   `../ci-cd-templates/` in den Projekt-Root kopieren (siehe dortige README).
5. Vor jedem Screen-Export die `taste-skill-checklist.md` durchgehen.

## Performance-Hinweis
Liquidglass UND Shadergradient sind beide WebGL-Renderpasses. Auf derselben
Seite gemeinsam einsetzen ist bewusst möglich (siehe `App.tsx`), aber:
- Beide Instanzen teilen sich das DPR-Cap (`Math.min(devicePixelRatio, 2)`).
- Bei Low-End-Geräten/`prefers-reduced-motion` fallen beide unabhängig
  voneinander auf statische CSS-Alternativen zurück (siehe die jeweiligen
  Snippets) — nie beide WebGL-Layer gleichzeitig ungefiltert laden.
