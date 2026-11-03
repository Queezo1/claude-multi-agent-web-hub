# Micro-Interactions Kit — Emil Kowalski Patterns

Referenzkomponenten für physik-basierte Micro-Interactions, wie in `CLAUDE.md`
Abschnitt 1 gefordert. Alle vier Kernpakete sind im Audit **[BESTANDEN]**
(siehe `/security-audits/AUDIT_LOG.md`).

## Enthaltene Pakete
- **motion** (ehem. framer-motion) — Spring-Physics-Engine
- **sonner** — Toast-Stacking/Undo-Pattern
- **vaul** — Drawer mit Rubber-Band-Overscroll
- **cmdk** — ⌘K Command-Menu

## Installation

```bash
npm install
```

## Enthaltene Komponenten
- `src/components/MagneticButton.tsx` — haptischer "Magnetic Button" mit
  Spring-Physics (motion), reagiert auf Cursor-Nähe statt starrem Hover-State.
- `src/components/ToastProvider.tsx` — Sonner-Wrapper mit Hub-Standard-Config
  (Position, Reduced-Motion-Respekt).
- `src/components/DrawerExample.tsx` — Vaul-Drawer-Grundgerüst.
- `src/components/CommandMenu.tsx` — cmdk-basiertes ⌘K-Menü als Alternative zu
  generischen Such-Overlays.

## Prinzipien (aus Emil Kowalskis Arbeit abgeleitet)
1. Animationen sind **interruptible** — ein Nutzer kann jederzeit erneut
   interagieren, ohne dass die Animation "nachzieht" oder abgebrochen wirkt.
2. Spring-Konfiguration statt fixer Dauer: `stiffness`/`damping` statt
   `duration` + `ease`, wo es um direktes Feedback geht (Drag, Hover, Press).
3. Exit-Animationen sind genauso wichtig wie Enter-Animationen (siehe Sonner
   Toast-Removal).
4. Immer `prefers-reduced-motion` respektieren — alle Beispiele hier prüfen
   das via `useReducedMotion`.

## Testing

Dieses Kit hat keinen eigenen Dev-Server (reine Komponenten-Referenz ohne
`App.tsx`-Demo). Sobald die Komponenten in ein echtes Projekt integriert sind,
gilt dieselbe Playwright+axe-core-Pflicht wie überall im Hub — siehe
`skills-and-plugins/PLAYWRIGHT_TESTING_GUIDE.md`, insbesondere Abschnitt 5
(Interaktionstest für Dropdown/Drawer/Modal), der direkt auf `DrawerExample.tsx`
und `CommandMenu.tsx` anwendbar ist.
