# UI Taste Kit — Magic UI & React Bits

Magic UI und React Bits arbeiten nach dem **Copy-Paste-Modell** (kein
npm-Fremdcode-Import, Code wird direkt in dein Repo kopiert und ist damit voll
einsehbar/anpassbar — sicherheitstechnisch der bevorzugte Ansatz, siehe
`/security-audits/AUDIT_LOG.md` Einträge #11/#12). Deshalb liegt hier kein
vorinstalliertes `node_modules`, sondern eine Anleitung + Auswahl-Checkliste.

## Magic UI installieren (CLI, copy-paste)

```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>.json"
```

Komponenten-Übersicht: https://magicui.design/docs/components

## React Bits installieren (CLI, copy-paste)

```bash
npx jsrepo add https://reactbits.dev/default/<Category>/<ComponentName>
```

Komponenten-Übersicht: https://reactbits.dev/

**Lizenzhinweis React Bits:** MIT + Commons Clause — freie Nutzung in eigenen
Projekten (auch kommerziell), aber kein Weiterverkauf der Library selbst als
konkurrierendes Produkt. Für Kundenprojekte unkritisch.

## 'Taste'-Checkliste vor jedem Component-Einsatz

Nicht blind übernehmen — jede kopierte Komponente durchläuft diese Prüfung,
bevor sie in ein Projekt übernommen wird (siehe `CLAUDE.md` Abschnitt 1 & 2):

1. Passt die Animation/Farbgebung zur Ziel-Ästhetik des Projekts, oder wirkt
   sie wie "generisches Library-Demo"?
2. Wurde mindestens EIN Detail bewusst verändert (Timing, Farbe, Radius,
   Easing-Kurve), damit es nicht wie Stock-Ware aussieht?
3. Ist `prefers-reduced-motion` berücksichtigt?
4. Skaliert die Komponente fluid (`clamp()`/`%`) statt an feste Pixelwerte
   gebunden zu sein?
5. Erfüllt sie die Performance-Budgets aus `CLAUDE.md` Abschnitt 3?

Nur wenn alle 5 Punkte erfüllt sind, gilt die Komponente als "hub-tauglich".
