---
name: 21st-dev-integration
description: Workflow für das Kopieren und Anpassen von Komponenten aus 21st.dev sowie deren Kombination mit 'Taste', Emil-Kowalski-Patterns und WebGL-Animationen. Vor jeder Komponentenübernahme aus 21st.dev konsultieren.
---

# 21st.dev Integration Guide

21st.dev ist der primäre Anlaufpunkt für vorgefertigte UI-/Interaction-
Komponenten (siehe `CLAUDE.md` Abschnitt 2b). Betreiber: **21st Labs, Inc.**,
Community-Marketplace mit 12.000+ Komponenten von ~700 Design-Engineers auf
Basis von React + Tailwind + shadcn/ui-Konventionen + Framer Motion.
Vollständiger Audit-Eintrag: `/security-audits/AUDIT_LOG.md` #23.

## 1. Warum 21st.dev primär nutzen

- Spart Zeit gegenüber dem Neubau von Standard-Interaktionsmustern
  (Pricing-Cards, Formulare, Nav-Bars, Hero-Blöcke).
- Hohe Grundqualität durch Community-Kuratierung (Copies/Likes als
  Qualitätssignal), kompatibel mit shadcn/ui — passt nahtlos in die
  bestehende Tech Stack Matrix (`CLAUDE.md` Abschnitt 2a).
- Code wird direkt in die eigene Codebase kopiert, keine laufende
  Fremd-Dependency ("You own it and can change it").

## 2. Auswahl-Kriterien (Due Diligence pro Komponente)

Da 21st.dev ein **Multi-Autoren-Marketplace** ist (anders als z. B. das
einzelne, konsistent gepflegte pmndrs-Ökosystem), schwankt die Codequalität
zwischen Komponenten stärker. Vor der Übernahme prüfen:

1. **Autor-Reputation & Copy-Zahl**: Komponenten mit hoher Nutzung/vielen
   Copies bevorzugen — kein Blindvertrauen in Einzelkomponenten mit wenig
   Historie.
2. **Lizenz pro Komponente**: 21st.dev ist ein Aggregator vieler Autoren —
   Lizenzangabe der jeweiligen Komponente einzeln prüfen, nicht pauschal von
   "die ganze Plattform ist MIT" ausgehen.
3. **Abhängigkeiten der Komponente**: Zieht sie zusätzliche npm-Pakete nach
   sich (z. B. eine unbekannte Icon-Library)? Diese ggf. gegen die
   Sicherheitskriterien aus `CLAUDE.md` Abschnitt 4 separat prüfen.
4. **Code lesen vor dem Einfügen** — Pflicht, kein Nice-to-have. 21st.dev-
   Code landet ungeprüft nie im Projekt.

## 3. Installations-Workflow

**Option A — AI-Ready-Prompt (empfohlen im Hub-Kontext):**
Auf der Komponentenseite den "AI-Ready-Prompt" kopieren und in Claude Code
einfügen. Claude integriert die Komponente automatisch inkl. Dependencies in
die aktuelle Projektstruktur.

**Option B — shadcn-CLI (klassisch):**
```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component-slug>"
```

**Option C — Copy-Paste:**
Quellcode direkt aus der Detailansicht kopieren, wenn kein shadcn-Setup im
Zielprojekt existiert.

## 4. Kombination mit 'Taste', Emil Kowalski & WebGL — Best Practices

21st.dev-Komponenten sind **immer Ausgangspunkt, nie Endprodukt** (siehe
`CLAUDE.md` Abschnitt 1, Anti-AI-Slop). Konkretes Vorgehen:

1. **Taste-Checkliste zuerst** (`taste-skill-checklist.md`): Radius-,
   Farb- und Spacing-Werte der 21st.dev-Komponente durch die projekteigene
   Skala ersetzen, bevor irgendetwas anderes passiert. Eine unveränderte
   21st.dev-Komponente ist per Definition "generische Standardkomposition"
   im Sinne von Abschnitt 1.
2. **Timing/Easing auf Kowalski-Pattern umstellen**
   (`emil-kowalski-patterns.md`): Viele 21st.dev-Komponenten nutzen
   Framer-Motion mit fester `duration`. Wo die Komponente direktes
   Nutzer-Feedback gibt (Hover, Press, Drag), auf Spring-Physics umstellen
   (`transition={{ type: "spring", stiffness, damping }}`), siehe dortiges
   Muster.
3. **WebGL-Layer ergänzen statt ersetzen**: Eine 21st.dev-Hero-Section ist
   ein guter Layout-/Copy-Rahmen — der eigentliche "Signature Moment"
   (Abschnitt 1) kommt aus dem Hub selbst: `ShaderGradientHero` als
   Hintergrund, `LiquidGlassNavbar` für die Navigation, eigene GLSL-Shader
   aus `lusion-shader-notes.md` für Hover-States auf Bildern. Siehe
   `templates-and-repos/glass-gradient-ui-kit/src/App.tsx` als Beispiel,
   wie Hub-eigene WebGL-Komponenten und Copy-Paste-UI kombiniert werden.
4. **Reduced-Motion/Performance nachrüsten**: 21st.dev-Komponenten prüfen
   `prefers-reduced-motion` selten konsequent — beim Einfügen ergänzen
   (siehe `performance-checklist.md`).
5. **CodeRabbit-Review nicht überspringen**: Jede importierte Komponente
   durchläuft die Pipeline aus `CLAUDE.md` Abschnitt 2c /
   `CODERABBIT_WORKFLOW.md`, auch wenn sie "nur kopiert" wurde — gerade
   Multi-Autoren-Code profitiert am meisten von einem zweiten Blick auf
   Typisierung, Cleanup und Accessibility.

## 5. Kurz-Checkliste vor dem Commit

- [ ] Komponente durch Taste-Checkliste geprüft (Farbe/Radius/Spacing
      angepasst)
- [ ] Timing auf Spring-Physics umgestellt, wo direktes Feedback nötig ist
- [ ] `prefers-reduced-motion`-Fallback ergänzt
- [ ] Lizenz der Einzelkomponente dokumentiert (Kommentar im Code oder
      PR-Beschreibung)
- [ ] CodeRabbit-Review durchlaufen und Findings behoben
