# CI/CD Templates

Fertige Konfigurationsdateien zum direkten Kopieren in den Root jedes neuen
Projekts aus diesem Hub (siehe `CLAUDE.md` Abschnitt 2f und Workflow-Schritt 4).
Audit: `/security-audits/AUDIT_LOG.md` #29–#32.

## Enthalten

- `ci.yml` → nach `.github/workflows/ci.yml` kopieren. Pflicht-Gate bei jedem
  PR: `npm ci`, `tsc --noEmit`, `npm run build`, `npm audit --audit-level=high`,
  `npx playwright test`.
- `dependabot.yml` → nach `.github/dependabot.yml` kopieren. Wöchentliche
  automatische Dependency-Update-PRs.
- `.coderabbit.yaml` → in den Projekt-Root kopieren (muss im Feature-Branch
  vorhanden sein, damit CodeRabbit sie für den jeweiligen PR nutzt). Identisch
  zur Vorlage in `skills-and-plugins/CODERABBIT_WORKFLOW.md`, hier zusätzlich
  als direkt einsatzbereite Datei statt nur als Markdown-Codeblock.

## Setup-Reihenfolge für ein neues Projekt

1. Playwright-Setup aus `skills-and-plugins/PLAYWRIGHT_TESTING_GUIDE.md`
   durchführen (Pakete installieren, `playwright.config.ts` + `tests/`
   anlegen) — `ci.yml` setzt eine lauffähige Testsuite voraus.
2. Die drei Dateien aus diesem Ordner in den neuen Projekt-Root kopieren
   (Pfade siehe oben).
3. `dependabot.yml` bei Bedarf auf das tatsächliche Ökosystem/Verzeichnis
   anpassen, falls das Projekt nicht im Repo-Root liegt.
4. Nach dem ersten Push: prüfen, dass der Actions-Tab einen laufenden
   `ci`-Workflow zeigt und CodeRabbit die `.coderabbit.yaml` erkennt
   (Kommentar im ersten PR).
