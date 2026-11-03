---
name: emil-kowalski-patterns
description: Interaction-Pattern-Referenz basierend auf Vaul, Sonner und Emil Kowalskis "Smooth Motion"-Prinzipien. Vor jeder Micro-Interaction-Implementierung konsultieren.
---

# Emil Kowalski Interaction Patterns

Quelle der Prinzipien: öffentliche Arbeit/Blog von Emil Kowalski (emilkowal.ski)
sowie Code der Bibliotheken `sonner` und `vaul` (siehe Audit #7/#8). Dies ist
eine eigenständig verfasste Zusammenfassung der beobachtbaren Patterns —
kein kopierter Quellcode.

## 1. Spring statt Duration

Für alles, was sich wie **direktes physisches Feedback** anfühlen soll (Drag,
Press, Hover-Follow): Spring-Konfiguration verwenden, keine feste `duration`.

```ts
// motion/react
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```

Faustregel für Startwerte:
- **Schnell/knackig** (Buttons, Toggles): `stiffness: 500, damping: 30`
- **Weich/gewichtig** (Drawer, große Panels): `stiffness: 200, damping: 25`
- **Sehr sanft** (Hintergrund-Elemente): `stiffness: 100, damping: 20`

Immer am echten Interface iterativ testen — Spring-Werte sind kein Rezept,
sondern ein Ausgangspunkt.

## 2. Interruptibility

Jede Animation muss unterbrechbar sein. Ein Nutzer, der während einer
Exit-Animation erneut klickt, darf keine "hängende" oder doppelte Animation
auslösen. Spring-basierte Animationen lösen das naturgemäß (sie interpolieren
vom aktuellen Wert, nicht von 0), CSS-Keyframes/`ease`-Transitions tun das
in der Regel NICHT — deshalb Spring-Libraries bevorzugen.

## 3. Stacking & Undo (Sonner-Pattern)

Bei Listen von transienten UI-Elementen (Toasts, Benachrichtigungen):
- Neue Elemente stapeln sich, ältere weichen sanft zurück (leichte
  Skalierungs-/Y-Verschiebung pro Stack-Ebene).
- Destruktive Aktionen bekommen ein **Undo** statt eines Bestätigungsdialogs,
  wo sinnvoll (reduziert Friktion, respektiert den Nutzerfluss).
- Exit-Animation ≠ einfaches Fade-out — meist Kombination aus Opacity + Scale
  + Y-Offset, synchron zur Stack-Neuordnung.

## 4. Rubber-Band-Overscroll (Vaul-Pattern)

Bei Drag-to-dismiss-Elementen (Drawer, Sheets): Widerstand nimmt nicht linear,
sondern progressiv zu, je weiter über den natürlichen Rand hinausgezogen wird
(gedämpfte Kurve, z. B. `damped = range * (1 - 1 / (dragDistance / range + 1))`).
Das erzeugt das "gummiartige" Gefühl nativer iOS-Sheets.

## 5. Reduced Motion ist Pflicht, nicht Kür

Jede hier beschriebene Animation braucht einen Fallback:

```ts
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

Bei `true`: Dauer auf ~0 setzen oder auf einfaches Opacity-Fade reduzieren,
niemals die Funktionalität einschränken.
