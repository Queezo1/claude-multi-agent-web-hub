---
name: taste-skill-checklist
description: 'Taste'-Standard zur Bewertung von Design-Entscheidungen und übernommenen UI-Komponenten. Vor jedem Component-Einsatz und vor jedem finalen Screen-Export konsultieren.
---

# 'Taste'-Skill-Standard

Eigenständig formulierter Bewertungsrahmen (kein Fremdinhalt), abgeleitet aus
den in `CLAUDE.md` Abschnitt 1–2 festgelegten Prinzipien.

## Farbharmonie
- Maximal 1 Akzentfarbe + neutrale Skala (statt beliebig vieler Brand-Farben
  gleichzeitig).
- Kontrastverhältnis Text/Hintergrund mindestens 4.5:1 (WCAG AA), auch bei
  dekorativen Overlays über Bildern prüfen.
- Farbverläufe bewusst und selten einsetzen — nicht als Standard-Hero-Deko.

## Whitespace-Rhythmus
- Spacing-Werte aus einer konsistenten Skala (z. B. 4/8/12/16/24/32/48/64/96px
  oder `clamp()`-Äquivalente), keine willkürlichen Zwischenwerte.
- Editorial-Layouts bevorzugen asymmetrische Raumaufteilung gegenüber
  perfekt zentrierten Standard-Grids.

## Komponentenkonsistenz
- Radien, Schattentiefen und Border-Stärken folgen jeweils einer einzigen
  Skala projektweit.
- Interaktions-Timing (Spring-Werte, Easing) ist über verwandte Komponenten
  hinweg konsistent (ein Drawer und ein Modal fühlen sich "verwandt" an).

## Vor jedem finalen Export prüfen
1. Wirkt der Screen wie eine bewusste Entscheidung oder wie ein
   Component-Library-Demo mit ausgetauschten Texten?
2. Gibt es mindestens ein Detail, das ein Nutzer beschreiben würde, wenn er
   die Seite jemandem zeigt (Signature Moment, siehe CLAUDE.md Abschnitt 1)?
3. Würde diese Seite unter den generischen "hier ist noch ein SaaS-Template"
   Screenshots aus einer KI-generierten Landingpage-Sammlung auffallen?
