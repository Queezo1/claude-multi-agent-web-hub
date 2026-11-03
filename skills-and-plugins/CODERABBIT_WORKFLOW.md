---
name: coderabbit-workflow
description: CodeRabbit-Setup und .coderabbit.yaml-Vorlage für WebGL/React/Next.js-Projekte aus dem Web Design Hub — Pflichtprüfung für Memory Leaks, 120-FPS-Performance, a11y und Security vor jedem Merge.
---

# CodeRabbit Workflow für WebGL/React/Next.js

CodeRabbit ist die verpflichtende Code-Quality-Pipeline für alle neuen Module,
WebGL-Hooks und importierten Komponenten (siehe `CLAUDE.md` Abschnitt 2c).
Vollständiger Audit-Eintrag inkl. Sicherheitshistorie:
`/security-audits/AUDIT_LOG.md` #24.

## 1. Setup

1. GitHub App unter https://github.com/apps/coderabbitai installieren.
2. **Least Privilege beachten**: bei der Installation "Only select
   repositories" wählen, NICHT "All repositories" — siehe Sicherheitshinweis
   im Audit-Log (CodeRabbit hatte 2025 eine inzwischen gepatchte RCE-
   Schwachstelle in der Analyse-Pipeline; Zugriff auf tatsächlich benötigte
   Repos zu beschränken reduziert den Blast-Radius bei zukünftigen
   Vorfällen dieser Art).
3. `.coderabbit.yaml` (siehe Abschnitt 2 unten) in den Projekt-Root legen —
   muss im Feature-Branch vorhanden sein, damit sie für den jeweiligen PR
   greift.
4. Vor dem ersten produktiven Einsatz: Feldnamen der YAML-Datei gegen die
   aktuelle CodeRabbit-Konfigurationsreferenz gegenprüfen
   (https://docs.coderabbit.ai/reference/configuration) — das Schema
   entwickelt sich weiter, diese Vorlage ist Stand 2026-09-03.

## 2. `.coderabbit.yaml`-Vorlage

```yaml
# .coderabbit.yaml — Web Design Hub Standard-Profil für WebGL/React/Next.js
language: "de-DE"

reviews:
  profile: assertive
  request_changes_workflow: true
  high_level_summary: true
  review_status: true
  collapse_walkthrough: true
  changed_files_summary: true
  sequence_diagrams: true
  estimate_code_review_effort: true
  poem: false
  enable_prompt_for_ai_agents: true

  auto_review:
    enabled: true
    auto_incremental_review: true
    drafts: false

  # Projektspezifische Prüfanweisungen je Pfad — Kern der WebGL/Performance/
  # a11y-Regeln aus CLAUDE.md Abschnitt 2c & 3.
  path_instructions:
    - path: "**/*.glsl"
      instructions: >
        Prüfe GLSL-Shader auf unnötige Berechnungen im Fragment-Shader
        (in den Vertex-Shader oder als Uniform vorverlagern, wo möglich),
        harte Codierung von Werten, die als Uniform konfigurierbar sein
        sollten, sowie fehlende Precision-Qualifier.

    - path: "**/hooks/**/*.{ts,tsx}"
      instructions: >
        Strikte Prüfung auf WebGL-/Canvas-Memory-Leaks: jeder Hook, der einen
        WebGL2-Context, ein Three.js-Objekt (Geometry/Material/Texture/
        RenderTarget) oder einen requestAnimationFrame-Loop erzeugt, MUSS in
        der useEffect-Cleanup-Funktion dispose()/cancelAnimationFrame()
        aufrufen. Fehlt die Cleanup-Funktion vollständig, ist das ein
        Blocker, kein Hinweis. Kein `any` in Uniform-/Prop-Typen.

    - path: "**/scene/**/*.{ts,tsx}"
      instructions: >
        Prüfe react-three-fiber-Komponenten auf: DPR-Cap (max. 2, siehe
        CLAUDE.md Abschnitt 3), unnötige Re-Renders in useFrame (keine
        Objekt-Allokationen pro Frame), fehlenden prefers-reduced-motion-
        Fallback, und ob Postprocessing-Passes gebündelt statt einzeln
        instanziiert werden.

    - path: "**/components/**/*.{ts,tsx}"
      instructions: >
        Barrierefreiheit strikt prüfen (jsx-a11y-Niveau): fehlende ARIA-
        Labels auf interaktiven Elementen, Tastaturbedienbarkeit von
        Custom-Buttons/Drag-Interaktionen, Farbkontrast-Annahmen im
        Kommentar dokumentieren. Bei aus 21st.dev übernommenen Komponenten
        zusätzlich prüfen: wurden Radius/Farbe/Timing projektspezifisch
        angepasst (siehe 21ST_DEV_INTEGRATION.md) oder 1:1 übernommen?

    - path: "**/*.{test,spec}.{ts,tsx}"
      instructions: "Kein Review-Fokus auf Stil, nur auf Testabdeckung fehlender Edge-Cases (Reduced-Motion-Pfad, WebGL-nicht-verfügbar-Pfad)."

  path_filters:
    - "!**/node_modules/**"
    - "!**/dist/**"
    - "!**/.next/**"
    - "!**/*.min.js"
    - "!**/public/vendor/**"

tools:
  eslint:
    enabled: true
  gitleaks:
    enabled: true
  semgrep:
    enabled: true
  shellcheck:
    enabled: true
```

## 3. Nicht verhandelbare Prüfregeln (Zusammenfassung)

| Kategorie | Regel | Blocker? |
|---|---|---|
| Memory Leaks | Jeder WebGL-/Canvas-Hook hat eine `useEffect`-Cleanup-Funktion (`dispose()`, `cancelAnimationFrame`, Listener-Removal) | Ja |
| Unmounting | Lenis-/ScrollTrigger-Instanzen werden explizit zerstört (`lenis.destroy()`, `ScrollTrigger.kill()`) | Ja |
| Typisierung | Kein `any` in neuem Code, Uniforms/Shader-Props vollständig typisiert | Ja |
| Performance (120 FPS) | DPR-Cap max. 2, keine Objekt-Allokationen pro `useFrame`-Tick, Postprocessing gebündelt | Ja |
| a11y | ARIA-Labels, Tastaturbedienbarkeit, Kontrast dokumentiert — insbesondere bei 21st.dev-Importen | Ja |
| Security | `gitleaks` (Secrets), `semgrep` (Injection/XSS-Muster) müssen grün sein vor Merge | Ja |

## 4. Merge-Kriterium

Ein PR wird erst gemergt, wenn CodeRabbit **keine offenen Blocker-Findings**
aus der obigen Tabelle mehr hat. Nicht-blockierende Stil-Hinweise können nach
Ermessen zurückgestellt werden, sofern sie in einem Follow-up-Ticket
dokumentiert sind.
