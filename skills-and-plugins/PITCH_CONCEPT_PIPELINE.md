---
name: pitch-concept-pipeline
description: Multi-Agenten-Orchestrierungs-Prompt (Agent 2 Build → Agent 3 QA-Subagent → Deployment) für ein Lusion-Style-Redesign mit verpflichtendem 3D-Fundament, echtem Geometrie-Handoff via GPGPU_MOTIF_PARTICLES_EXAMPLE.tsx, einem Fidelity-Gate gegen stillschweigend entfernte ODER nie richtig gebaute 3D/WebGL/Glass-Technik, einer Sichtbarkeits-Pflichtprüfung (Proof of Life) gegen unsichtbare/leere Motiv-Instanzen, PFLICHT-Liquid-Glass-Navbar, PFLICHT-3D-Micro-Interactions und einem Referenz-Abgleich gegen Lusion.co. Vor jedem neuen Pitch-Case konsultieren und Platzhalter befüllen.
---

# Pitch-Konzept-Pipeline — Orchestrierungs-Prompt

Kopierfertiger Master-Prompt für einen Pitch-Case. Platzhalter in `[...]`
befüllen, dann als Auftrag verwenden. Ersetzt keine Regel aus `CLAUDE.md` —
konkretisiert nur den Ablauf.

**Hintergrund dieser Fassung:** Der erste echte Durchlauf (Schloss
Example Project B) zeigte einen realen, im QA_AUDIT_REPORT.md dokumentierten
Fehlerpfad: Agent 2 stieß auf einen WebGL-Rendering-Bug, entfernte über 3
QA-Iterationen schrittweise JEDE 3D-/WebGL-Technik statt sie zu fixen, und
Agent 3 genehmigte das Ergebnis als "architektonisch bewusste
Design-Entscheidung" — obwohl CONCEPT.md ursprünglich Shadergradient +
Liquidglass vorsah. Das alte QA-Protokoll prüfte nur "keine Bugs", nie "ist
das noch da, was zugesagt wurde". Diese Fassung schließt genau das.

**Runde 3 (Example Project B, Fortsetzung — direktes Nutzer-Feedback nach
Live-Ansicht):** Auch nach den Runde-1/2-Fixes oben zeigte derselbe Case vier
weitere, ANDERSARTIGE Lücken — keine Regression (etwas war da und wurde
entfernt), sondern Dinge, die nie richtig ankamen:

1. Das Motiv war zeitweise komplett unsichtbar bzw. ohne Partikel — mal weil
   der erste Render vor Abschluss der Layout-Messung leer blieb, mal weil die
   Kollisionsmessung (`getBoundingClientRect()` zählt keine CSS-Margins) das
   Motiv über eine falsch berechnete freie Fläche in eine falsche, sichtbar
   danebenliegende Position geschoben hat, mal weil auf den Unterseiten die
   Sichtbarkeits-Bedingung praktisch nie erfüllt war. Das alte Fidelity-Gate
   prüfte nur "existiert ein `<canvas>`/WebGL-Kontext" — nie "zeigt er
   tatsächlich etwas".
2. Die Navbar blieb von der allerersten Iteration an ein reiner
   CSS-`backdrop-filter`-Blur ohne jede echte Glasbrechung — kein Fall von
   "wurde entfernt", sondern von "wurde nie gebaut". Das alte Fidelity-Gate
   (das nur gegen SETUP_LOG.md/Git-Historie auf Regression prüft) hätte das
   nicht gefangen, weil nie eine bessere Fassung existierte, die hätte
   fehlen können.
3. Unterseiten-Motiv-Instanzen renderten unverändert weiter, auch wenn sie
   per Scroll-Position unsichtbar waren — `opacity: 0` stoppt kein
   WebGL-Rendering. Reine Rechenlast ohne jeden visuellen Gegenwert, auf
   schwächerer Hardware spürbar ("sehr rechenintensiv, aber keine Partikel
   sichtbar").
4. Micro-Interactions blieben ausschließlich DOM-Spring-Physics (Buttons,
   Cards) — kein einziges reaktives 3D-Element (Cursor-Reaktion,
   Hover-Verzerrung). Genau das ist aber ein stilprägendes Merkmal der
   Referenz Lusion.co, nicht nur "nice to have".

Diese Fassung schließt diese vier Lücken mit konkreten, automatisiert
prüfbaren Kriterien statt weiterer allgemeiner Ermahnungen — siehe unten
"Initial-Render-Pflicht", den Margin-Gotcha unter der Kollisionsregel,
"Rendering-Pause bei Unsichtbarkeit", "Liquid-Glass-Navbar — PFLICHT",
"3D-/WebGL-Micro-Interactions" sowie die neuen QA-Schritte
"Sichtbarkeits-Pflichtprüfung", "Off-Screen-Rendering-Pflichttest" und
"Referenz-Abgleich-Gate".

---

Du agierst als orchestriertes Multi-Agenten-System zur Erstellung einer
High-End-Website nach dem Web-Design-Hub-Standard (`CLAUDE.md`). Du
wechselst zwischen spezialisierten Agenten-Rollen und hältst dich strikt an
alle Vorgaben aus der `CLAUDE.md` des Hubs.

**KONTEXT:** Agent 1 (Recherche) hat bereits Kandidaten identifiziert,
dokumentiert in `LEADS.md` im Central Hub.

**KUNDENDATEN:**
- Unternehmen: `[NAME DES UNTERNEHMENS — exakt wie in LEADS.md geführt]`
- URL: `[URL DES UNTERNEHMENS]`
- Central Hub Pfad: `[PFAD ZU DEINEM WEB-DESIGN-HUB]`
- Projekt-Zielverzeichnis: `[PFAD, WO DAS PROJEKT LIEGT]`
- Max. QA-Iterationen: 4 (danach: Eskalation an mich statt endlosem Loop)

---

## PHASE 1: AGENT 2 (Lead Frontend & WebGL Architect)

**DEINE ROLLE:** Du überarbeitest Konzept und Codebase für GENAU diesen
einen Kandidaten. Diese Phase führst DU selbst aus, nicht als Subagent.

**SCHRITTE:**

### 1. Grundlagen & Content-Recherche

- Lies `CLAUDE.md` aus dem Central Hub vollständig.
- Lies den Eintrag zu `[NAME DES UNTERNEHMENS]` in `LEADS.md`.
- Lies den bisherigen Stand: `CONCEPT.md`, `PITCH_SUMMARY.md`,
  `QA_AUDIT_REPORT.md`, `TRANSITIONS_STORYBOARD.md` (falls vorhanden) im
  Projekt-Zielverzeichnis.
- PFLICHT, unabhängig von `LEADS.md`: Rufe die tatsächliche
  Original-Website unter `[URL DES UNTERNEHMENS]` auf und
  erstelle/aktualisiere daraus `CONTENT_INVENTORY.md`: vollständige
  Navigationsstruktur (jeden Menüpunkt/jede Unterseite einzeln), alle
  Leistungen/Spezialisierungen, tatsächliche Qualifikationen,
  Standort(e), Kontaktkanäle. Verbindliche inhaltliche Grundlage — nichts
  darf stillschweigend wegfallen.

### 2. CONCEPT.md aktualisieren

- Ziel-Ästhetik in 1–2 Sätzen.
- **Starter-Kit-Basis: `3d-webgl-starter` ist PFLICHT-Fundament für JEDES
  Projekt, ausnahmslos.** Kein "Charakter des Unternehmens" rechtfertigt
  den Verzicht auf ein echtes 3D-/WebGL-Fundament (R3F + Three.js,
  mindestens die GPGPU-Partikel-Motiv-Kette aus Schritt "Konkrete Technik"
  unten) — das ist eine bewusste, explizite Anforderung des Auftraggebers
  und überstimmt die frühere branchenabhängige Kit-Wahl-Logik.
  `glass-gradient-ui-kit` (Liquidglass, Shadergradient) ist ab sofort
  ausschließlich eine ZUSÄTZLICHE, additive Schicht ON TOP des
  3D-Fundaments (z. B. Liquidglass auf der Navbar, Shadergradient als eine
  von mehreren Hero-Techniken) — niemals ein Ersatz dafür. Ein Projekt
  ohne jedes `<canvas>`/WebGL im finalen Code ist per Definition nicht
  hub-konform, unabhängig davon, wie gut die Begründung dafür klingt.
- Branding, Farbpalette, Seitenstruktur (auf Basis von
  `CONTENT_INVENTORY.md`). Farbpalette NICHT frei erfinden, sondern nach
  `taste-skill-checklist.md` ableiten: max. 1 Akzentfarbe + neutrale Skala
  (statt beliebig vieler Brand-Farben gleichzeitig), Kontrast Text/
  Hintergrund ≥ 4.5:1 auch bei dekorativen Overlays, Farbverläufe bewusst
  und selten. Falls die Original-Website eine erkennbare Markenfarbe hat
  (Logo, bestehende Signalfarbe): diese als Ausgangspunkt für die EINE
  Akzentfarbe prüfen statt sie zu ignorieren.

**VISUELLES MOTIV-SYSTEM UND TRANSITIONS-CHOREOGRAFIE** (ersetzt "ein
Signature Moment"):

Definiere EIN wiederkehrendes visuelles Motiv, getragen von echter
3D-/GPGPU-Geometrie (siehe "Konkrete Technik" unten) — nicht ausschließlich
von einer flachen SVG-Linie. Das Motiv taucht in mindestens 3–4 Abschnitten
der Startseite auf (Hero in voller Ausprägung, Leistungsübersicht,
Sektionsübergänge, ein vierter Ort deiner Wahl).

Zusätzlich PFLICHT: Erstelle `TRANSITIONS_STORYBOARD.md` — für JEDEN
Übergang zwischen den Motiv-Auftritten eine explizite Tabelle:
Ausgangszustand (Ende des vorherigen Abschnitts) → Zielzustand (Anfang des
nächsten) → tragende Technik. Anspruch: das Ende einer Animation WIRD der
Anfang der nächsten — kein harter Schnitt zwischen unabhängig aussehenden
Einzeleffekten.

**PFLICHT — Sektionsweiser Medienwechsel statt eines durchgehenden Mediums
(NEU, Runde 4, direkte Lehre aus "Example Project C" — Live-Nutzer-Feedback
nach Fertigstellung):** Der Satz oben ("Ende der einen Animation wird
Anfang der nächsten") wurde im ersten vollständig fertiggestellten
Hub-Projekt zu wörtlich als "ein einziges Trägermedium (Partikel) bleibt
über die GANZE Seite hinweg gemountet und wechselt nur seine Form" gelesen.
Ergebnis: der Auftraggeber empfand das nach Live-Ansicht explizit als
"Partikel über die ganze Seite hinweg", obwohl jede einzelne Form technisch
sauber und layoutbewusst war — Lusion.co selbst wechselt zwischen
Abschnitten erkennbar das TRÄGERMEDIUM (Partikel → eine eigenständige,
dominante Linie/Kurve → Content-Boxen mit eigenem Aufbau-Effekt →
ggf. wieder Partikel), nicht nur die Zielform innerhalb desselben Mediums.
Verbindlich ab sofort:

- Das Motiv-Storyboard (`TRANSITIONS_STORYBOARD.md`) muss für die Startseite
  MINDESTENS EINEN echten Medienwechsel enthalten: ein Abschnitt endet mit
  einem sichtbaren Auflösen/Verschwinden des bisherigen Trägers (Partikel
  streuen/verblassen tatsächlich gegen 0, nicht nur Formwechsel), ein
  ANDERES Mittel aus der Tech Stack Matrix (MorphSVG-Linie als dominanter
  Moment statt Nebenakzent, Content-Box-Reveal-System, Shadergradient-Fläche
  o. Ä.) übernimmt sichtbar, danach kann wieder ein GPGPU-Partikel-Abschnitt
  folgen. Erzählerische Kontinuität (gleiche Farb-/Bewegungssprache, ein
  gemeinsamer `scrollProgress`-Treiber, kein harter Sprung in Timing/Position)
  bleibt Pflicht — aber sie wird über den ÜBERGANG hergestellt, nicht dadurch,
  dass ein Medium dauerhaft präsent bleibt.
- Dass eine Motiv-Instanz aus Performance-/Architekturgründen beim
  Routenwechsel nicht unmontiert wird, sondern nur ausgeblendet und
  pausiert (siehe "Rendering-Pause bei Unsichtbarkeit" unten,
  `MotifHost`-Pattern), ist ein reiner Implementierungsdetail-Grund und
  KEINE Rechtfertigung dafür, dieselbe Formation über inhaltlich
  unterschiedliche Abschnitte hinweg sichtbar zu halten. Sichtbar
  ausgeblendet bedeutet: über den Medienwechselpunkt hinweg tatsächlich
  auf ~0 Deckkraft/Streuung gefahren, nicht nur "irgendwann off-screen".
- Bindend für QA: siehe Phase 2, neuer QA-Schritt 13 (Medien- &
  Interaktions-Varianz-Gate).

**PFLICHT — Kollisionsregel (neu, direkte Lehre aus Example Project B):**
Kein Motiv-/Deko-Element (Linie, Partikelform, Shader-Fläche) darf an
irgendeinem Breakpoint über lesbarem Fließtext oder Headlines liegen —
weder dahinter noch davor. "Text bleibt trotz Überlagerung lesbar" ist
KEINE Ausnahme und darf von Agent 3 nicht als bestanden gewertet werden
(siehe QA-Schritt 11, Taste-/Design-Gate). Motiv-Geometrie muss an den tatsächlichen
Content-Bounding-Boxen vorbeigeführt werden (echte Layout-Koordinaten
messen, z. B. via `getBoundingClientRect()` der Text-Container zur
Build-/Test-Zeit), nicht nur als freischwebende, vom Content unabhängige
Full-Viewport-Deko-Ebene mit abstrakten SVG-Koordinaten platziert werden.

**Pflicht-Gotcha bei der Kollisionsmessung (NEU, Runde 3, direkte Lehre aus
Example Project B):** `getBoundingClientRect()` liefert die Border-Box OHNE
Margins. Jedes Element, dessen Rect als Hindernis oder als Referenzlinie in
die Kollisions-/Positionsmessung eingeht, MUSS seine vertikalen Abstände über
explizite `margin`-Werte (oder Flex-/Grid-`gap`) setzen — NIEMALS über
Browser-Default-Margins (`<p>`, `<h1>`–`<h6>` ohne Reset). Beginnt der eine
Vergleichs-Block mit einer Überschrift (oft `margin: 0` per Reset) und der
andere mit einem `<p>` (Browser-Default ~1em), fluchten beide optisch
gleich hoch wirkenden Blöcke NICHT auf derselben Y-Position — ein für die
Messlogik unsichtbarer Versatz, der ein zentrales Deko-Element sichtbar aus
der Achse zieht (genauer Reproduktionsfall: ein Footer mit vier Spalten,
von denen nur eine mit einer Überschrift statt einem Absatz beginnt, hat
ein darauf zentriertes Ornament spürbar nach unten gezogen). Das
Basis-Stylesheet MUSS deshalb für ALLE Text- und Überschriften-Elemente,
die potenziell als Hindernis/Referenz in eine Motiv-Messung eingehen,
explizite Margins definieren, nicht nur für Überschriften.

**Initial-Render-Pflicht (NEU, Runde 3, direkte Lehre aus Schloss
Example Project B):** Jede Motiv-Instanz muss ab dem allerersten Frame nach ihrem
Mount etwas sichtbar Sinnvolles zeigen — entweder bereits die echte
Partikelformation, oder (während einer asynchronen Layout-Messung) einen
synchron sichtbaren Platzhalter/Fallback in ungefähr der Zielform. Ein
leeres `<canvas>`, eine leere Fläche oder ein Zustand ganz ohne Partikel ist
zu KEINEM Zeitpunkt zulässig, auch nicht für eine kurze Übergangsphase
zwischen Mount und erster gültiger Messung — im Live-Betrieb ist das von
einem Bug nicht zu unterscheiden und wird von echten Nutzern auch nicht so
gelesen ("das 3D-Element war am Anfang einfach leer" war exakt die
Rückmeldung, die diesen Punkt ausgelöst hat).

**Konkrete Technik aus dem bestehenden Hub-Stack (keine neuen Pakete
nötig):**

- **Partikel-zu-Form-Übergänge — Standard-/Pflichttechnik:**
  `skills-and-plugins/GPGPU_MOTIF_PARTICLES_EXAMPLE.tsx` als Basis — NICHT zu
  verwechseln mit dem bereits länger im Hub bestehenden
  `GPGPU_PARTICLES_EXAMPLE.tsx` (mausinteraktions-getriebene Partikel,
  CLAUDE.md Abschnitt 2d, andere API); diese Datei hier ist die
  scroll-/`stages`-getriebene Variante für Motiv-Übergänge. Vor
  Verwendung IMMER mit `ls`/`Read` verifizieren, dass die Datei
  tatsächlich vorhanden und aktuell ist. Die Komponente
  `GPGPUMotifParticles` nimmt eine geordnete `stages`-Liste (Name +
  Zielpositionen je Motiv-Auftritt) und EINEN durchgehenden
  `scrollProgress`-Wert (0..1) entgegen; der Handoff zwischen zwei Stages
  ist eine echte GPU-seitige Feder-Interpolation zwischen den zwei
  Zielpositions-Texturen. Jeder Motiv-Auftritt aus dem
  TRANSITIONS_STORYBOARD wird zu genau einem Eintrag in `stages`; die
  Zielpositionen je Stage aus der jeweiligen Zielform sampeln (SVG-Pfad,
  Grid, oder Punkte auf einer gltfjsx/Draco-komprimierten
  Mesh-Oberfläche) — UND gegen die echten Bounding-Boxen der
  Text-Container geprüft (Kollisionsregel oben).
- Pfad-zu-Pfad-Übergänge (z. B. eine ergänzende Linie/Trennlinie):
  GSAP MorphSVGPlugin — über die bestehende GSAP-Lizenz bereits kostenlos
  nutzbar (siehe `AUDIT_LOG.md`, Eintrag #6). Ergänzt die
  GPGPU-Partikel-Kette, ersetzt sie nicht.
- Fällt WebGL2/Float-Render-Targets auf einem konkreten Endgerät weg
  (`supportsGPGPUParticles(gl)` liefert `false`) oder gilt
  `prefers-reduced-motion`: statisches Poster-Bild statt der Komponente
  rendern (Fallback ist Teil der Komponente selbst dokumentiert). Das ist
  ein PER-DEVICE-Fallback für einzelne Nutzer — keine Rechtfertigung,
  WebGL projektweit aus dem Code zu entfernen (siehe Fidelity-Gate,
  QA-Schritt 5).
- Architektur: EIN durchgehender Scroll-Fortschritts-Treiber (eine
  gemeinsame GSAP-ScrollTrigger-Timeline mit `scrub`) statt unabhängiger
  Einzel-Trigger pro Sektion. Derselbe `scrollProgress`-Wert speist
  `GPGPUMotifParticles`, ergänzende MorphSVGPlugin-Timelines und ggf.
  Kamerafahrten gemeinsam — NICHT mehrere unabhängige Trigger.
- **MorphSVG-Linienmoment — mindestens einmal DOMINANT, nicht nur
  Nebenakzent (NEU, Runde 4, direkte Lehre aus "Example Project C"):** Die
  MorphSVGPlugin-Linie aus dem Punkt oben darf projektweit als dünner,
  unterstützender Akzent laufen (z. B. 1px, niedrige Deckkraft) — aber
  MINDESTENS an der Stelle im Storyboard, an der sie laut "Sektionsweiser
  Medienwechsel" oben den Partikel-Träger tatsächlich ablöst, muss sie
  visuell EIGENSTÄNDIG tragen (deutlich höhere Strichstärke/Deckkraft,
  optional Glow/Farbverlauf, progressiver Aufbau synchron zum Scroll wie
  im Lusion-Referenzbild). Eine Linie, die im gesamten Projekt durchgehend
  nur als schwacher Nebenakzent existiert, erfüllt den Medienwechsel oben
  NICHT, selbst wenn sie technisch vorhanden und korrekt maskiert ist.
- **Content-Box-Reveal-System — eigener Pflicht-Baustein für den
  Content-Box-Abschnitt im Medienwechsel (NEU, Runde 4, direkte Lehre aus
  "Example Project C"):** Für den/die Abschnitte mit Karten/Content-Boxen
  (Leistungen, Portfolio-Einträge, Übersichten) gilt ein eigenes,
  definiertes Muster, nicht die generische Micro-Interactions-Pflicht aus
  Core Development (Schritt 5) allein:
  - Scroll-getriggertes, gestaffeltes Einblenden/Hochfahren pro Box
    (`motion`, `whileInView` + Stagger, projektweiter `SPRING`-Wert aus
    `emil-kowalski-patterns.md`) — kein hartes Erscheinen ohne Bewegung.
  - Mindestens EIN Hover-Mikrodetail pro Box-Typ, das über reinen
    Tilt/Sheen hinausgeht: ein kurzer, bewusst dezenter Blur→Scharf-Puls
    ODER ein kleiner Text-/Meta-Wechsel — NUR dort einsetzen, wo es zum
    Inhalt passt (kein erzwungener Effekt ohne inhaltlichen Anlass).
  - Klick auf eine Box öffnet, wo inhaltlich sinnvoll, die zugehörige
    Unterseite/Detailansicht (bestehende Routing-Infrastruktur, kein neues
    Paket nötig).
  - Bindend für QA: siehe Phase 2, neuer QA-Schritt 13.
- **Rendering-Pause bei Unsichtbarkeit — PFLICHT (NEU, Runde 3, direkte
  Lehre aus Example Project B):** Sobald eine Motiv-Instanz durch
  Scroll-Position/Viewport-Sichtbarkeit ausgeblendet wird (z. B.
  `opacity: 0`), MUSS auch das tatsächliche Rendering pausieren, nicht nur
  die CSS-Deckkraft. `opacity: 0` stoppt kein WebGL-Rendering — die
  GPU-Simulation und ein evtl. Bloom-/Postprocessing-Pass laufen sonst
  unverändert mit vollen Kosten weiter, ohne jeden visuellen Gegenwert.
  Konkrete Technik bei React Three Fiber:
  `<Canvas frameloop={sichtbar ? "always" : "never"}>`, gekoppelt an
  GENAU dieselbe Sichtbarkeits-Berechnung, die auch die Opacity steuert
  (ein Zustand, zwei Konsumenten — kein zweiter, potenziell abweichender
  Schwellwert). Gilt für JEDE Motiv-Instanz, die sich per Scroll aus- und
  wieder einblenden kann — Startseite wie Unterseiten gleichermaßen.

**Liquid-Glass-Navbar — PFLICHT für JEDES Projekt, nicht mehr optional
(REVIDIERT, Runde 3, direkte Lehre aus Example Project B):** Frühere
Fassung stufte Liquidglass als optionale, nur bei entsprechender
Ziel-Ästhetik zusätzliche Schicht ein. Der reale Durchlauf zeigte: eine
Navbar mit reinem CSS-`backdrop-filter`-Blur OHNE jede Glasbrechung wurde
vom Auftraggeber nach Live-Ansicht explizit als inakzeptabel zurückgewiesen
("absolut nicht im Liquid Glass") — für den angestrebten Lusion-Anspruch ist
eine erkennbar echte Glasbrechung auf der Navbar kein optionales Extra,
sondern derselbe Pflichtstandard wie das 3D-Fundament selbst. Konkrete,
prüfbare Abnahmekriterien (bindend für das Fidelity-Gate, Phase 2,
QA-Schritt 5):

- Sichtbare Refraktions-/Verzerrungswirkung auf dem Content, der HINTER der
  Navbar durchscrollt (nicht nur gleichmäßige Unschärfe) — Standardweg:
  `@ybouane/liquidglass` (echter WebGL-Layer).
- Fällt `@ybouane/liquidglass` auf einem konkreten Endgerät/Browser per
  Fallback-Regel aus (siehe "Wenn ein WebGL-Rendering-Bug auftritt" unten):
  der CSS-Fallback MUSS zusätzlich zu `backdrop-filter: blur()` mindestens
  einen `saturate()`-Boost, einen spekularen Hell-Rand (`border`/
  `box-shadow` mit erhöhter Helligkeit an einer Kante) und eine leichte
  Chroma-/Tönungsverschiebung kombinieren. Reiner Blur ohne diese
  Zusatzmerkmale ist KEIN Liquid-Glass, sondern ein einfacher
  Unschärfe-Filter — und damit ein Fidelity-Gate-Fall, kein akzeptierter
  Endzustand (Reihenfolge "gezielt fixen oder gleichwertig ersetzen"
  unten gilt hier genauso; ersatzloser Rückfall auf reinen Blur als
  dauerhafter Zustand ist nicht zulässig).
- Verifikation: Screenshot-Vergleich der Navbar (in Bewegung, über
  unterschiedlich hellem/dunklem Hintergrund) gegen eine Liquidglass-
  Referenz (`glass-gradient-ui-kit`-Demo oder Lusion.co direkt) — "sieht
  bei flüchtigem Blick wie eine normale halbtransparente Bar aus" ist ein
  Fail, unabhängig von der zugrunde liegenden Technik.
- Diese Kriterien gelten unabhängig davon, ob in einer früheren Iteration
  schon einmal eine bessere Fassung existierte: "wurde nie richtig gebaut"
  ist für das Fidelity-Gate genauso ein Fall wie "wurde nachträglich
  entfernt" (siehe Fidelity-Gate-Definition, Phase 2, QA-Schritt 5).

**Zusätzliche Shadergradient-Hero-Fläche (optional, additiv zum
3D-Fundament):** Wenn die Ziel-Ästhetik Vertrauens-/Seriositätsvermittlung
zusätzlich betont, ZUSÄTZLICH zur GPGPU-Partikel-Kette einsetzen, nicht
anstelle:

- Shadergradient als zusätzliche Hero-Fläche HINTER der Partikel-Szene —
  teilt sich mit der Liquid-Glass-Navbar und der Partikel-Kette das
  DPR-Cap (siehe `glass-gradient-ui-kit/README.md`), nie mehr als die im
  Hub dokumentierte Zahl WebGL-Kontexte gleichzeitig ungefiltert laden.
- Derselbe `scrollProgress`-Wert treibt auch diese Schicht mit
  (Shadergradient-Presets) — kein getrennter Trigger.

**Wenn ein WebGL-Rendering-Bug auftritt — PFLICHT-Vorgehen, kein
Ermessensspielraum:**

Ein Rendering-Defekt in EINER Technik (z. B. Liquidglass, Shadergradient,
GPGPU) ist ein Bug in DIESER Technik, kein Argument gegen 3D/WebGL
insgesamt. Reihenfolge, verbindlich:

0. **PFLICHT vor jeder Diagnose (neu, direkte Lehre aus Schloss
   Example Project B):** Feststellen und im `SETUP_LOG.md`/`QA_AUDIT_REPORT.md`
   dokumentieren, ob die Testumgebung echte GPU-Hardwarebeschleunigung hat
   (`chrome://gpu`-Äquivalent bzw. `renderer.getContext().getParameter(...UNMASKED_RENDERER_WEBGL)`
   prüfen — ein Ergebnis wie "SwiftShader"/"llvmpipe"/"Software" bedeutet:
   KEINE echte GPU, nur Software-Rendering) oder nur Software-Rendering
   (z. B. SwiftShader in einer Headless-/Container-Sandbox). Der
   Example Project B-Fall scheiterte genau daran: die abschließende Diagnose
   ("Bibliotheks-Bug vs. Software-Rendering-Artefakt") wurde als
   unmöglich eingestuft, weil keine echte GPU verfügbar war — und diese
   Unsicherheit wurde zum Vorwand für die komplette Streichung der Technik,
   statt die fehlende Hardware selbst als offenen Punkt zu behandeln. Ist
   nur Software-Rendering verfügbar: das explizit als Einschränkung
   vermerken UND, wenn irgend möglich, denselben Test einmal auf einem
   Gerät/einer CI-Umgebung mit echter GPU wiederholen, BEVOR eine Technik
   als "nicht abschließend fixbar" eingestuft wird. Eine auf Software-
   Rendering beobachtete Bildkorruption ist kein hinreichender Beleg dafür,
   dass die Technik auf echter Hardware ebenfalls defekt ist.
1. Den konkreten, isolierten Fehler eingrenzen (welche Technik, welcher
   Pfad, welche Kombination) und gezielt fixen (Config, Version, Reihen-
   folge der Renderpasses, Reduktion NUR der betroffenen Einzeltechnik).
2. Erst wenn Schritt 1 nach mindestens 2 gezielten Fix-Versuchen nicht
   greift: DIESE EINE Technik durch eine gleichwertige WebGL-/3D-Technik
   ersetzen (z. B. Shadergradient → eigener einfacherer Fragment-Shader
   via R3F) — niemals ersatzlos streichen.
3. Ein kompletter Verzicht auf JEDES WebGL/3D im Projekt ist KEIN Fix, den
   Agent 2 oder Agent 3 selbst beschließen dürfen — das ist ein
   Scope-Bruch gegen CONCEPT.md und löst sofortige Eskalation an den
   Auftraggeber aus (siehe EXECUTION PROTOCOL), nicht einen weiteren
   internen Iterationsversuch, und erst recht keine [APPROVED]-Freigabe
   in derselben Iteration, in der der Scope reduziert wurde.

**Unterseiten — konkret gedeckelter Umfang, kein "leichte Ausprägung"
ohne Definition:**

**[REVIDIERT, 2026-09-06 — direkte Lehre aus Example Project B, Runde 2]**
Frühere Fassung dieses Punkts verlangte EINEN gemeinsamen, identischen
Settled State auf allen Unterseiten. Das wurde vom Auftraggeber im echten
Durchlauf ausdrücklich zurückgewiesen: eine einzige, austauschbare Ruheform
auf jeder Unterseite widerspricht dem Lusion-Anspruch, sich konsequent durch
die GANZE Seite zu ziehen — nicht nur durch die Startseite mit einer
uniformen Restseite dahinter.

- Alle Top-Level-Navigationspunkte aus `CONTENT_INVENTORY.md` teilen sich
  weiterhin EINEN Seitenwechsel-Übergangs-MECHANISMUS: dieselbe
  `GPGPUMotifParticles`-Instanz fährt beim Seitenwechsel vom Ausgangs-Stage
  der Startseite in einen Zielzustand. Das ist weiterhin geteilte Technik.
- **NEU, verbindlich:** Der ANKOMMENDE Ruhezustand ("Settled State") ist pro
  Unterseite EIGENSTÄNDIG, aus dem tatsächlichen Seiteninhalt abgeleitet
  (nicht generisch/austauschbar) — z. B. eine Seite über Firmengeschichte
  bekommt ein anderes Motiv als eine Seite über ein Kontaktformular. Zwei
  Unterseiten dürfen dasselbe Ruhemotiv nur teilen, wenn das inhaltlich
  begründet ist (z. B. dieselben Personen/derselbe Bezug), nicht aus
  Bequemlichkeit. Weiterhin KEINE Multi-Stage-Scroll-Choreografie pro
  Unterseite wie auf der Startseite — das bleibt der Startseite vorbehalten,
  variiert wird die Zielform, nicht der Umfang der Bewegung.
- Settled State bleibt in jedem Fall echte 3D-Partikelgeometrie (kann
  performance-seitig reduziert/statisch sein), NIEMALS ersatzlos auf eine
  2D-SVG-Linie heruntergestuft — das war exakt der Punkt, der im
  QA-Audit dieses Durchlaufs zurückgewiesen wurde.
  - Nested/tiefere Seiten (falls `CONTENT_INVENTORY.md` welche listet, die
    nicht im Hauptmenü stehen) bekommen KEINEN GPGPU-Übergang, sondern
    einen reinen CSS-Crossfade — kein WebGL-Zwang unterhalb der obersten
    Navigationsebene.
- **Sticky-Navbar ist PFLICHT (neu, direkte Lehre aus Schloss
  Example Project B):** Die Navbar muss beim Scrollen sichtbar im Viewport
  verbleiben. Bekannte Falle: `overflow-x: hidden` auf `html`/`body`
  bricht `position: sticky` in mehreren Browsern — Overflow-Clipping
  stattdessen auf das konkrete überlaufende Element scopen, nie auf
  `html`/`body`, wenn irgendwo eine `position: sticky`- oder
  `position: fixed`-Navbar existiert. Mit Lenis (transform-basiertes
  Smooth-Scrolling) zusätzlich früh im Browser real testen, nicht nur am
  Code ablesen — siehe QA-Schritt 8.
- Diese Definition ist bindend für den QA-Gate in Phase 2 — Agent 3 prüft
  exakt gegen diese Punkte, nicht gegen ein subjektives "wirkt konsistent
  genug".

**PFLICHT — DOM-Micro-Interaction-Parität über alle Unterseiten hinweg (NEU,
Runde 4, direkte Lehre aus "Example Project C"):** Die obige Definition
deckt das GPGPU-Motiv-System ab. Getrennt davon gilt für JEDEN
wiederkehrenden DOM-Content-Baustein (Karten, Listeneinträge, Editorial-
Blöcke), der auf mehreren Unterseiten in vergleichbarer Form auftritt: alle
Vorkommen erreichen dasselbe Handwerks-Niveau wie das am weitesten
ausgearbeitete vergleichbare Element im Projekt (Spring-Tilt, Hover-Sheen,
Reveal-on-Scroll o. Ä. — je nachdem, was im Projekt bereits als
Referenz-Baustein existiert). Ein Karten-/Listenmuster ohne jede
Micro-Interaction NEBEN einem anderen, aufwendig gestalteten
Karten-/Listenmuster im selben Projekt ist nur bestanden, wenn dafür ein
inhaltlicher oder technischer Grund dokumentiert ist (z. B. bewusst
reduzierte Darstellung für sehr lange Listen aus Performancegründen) —
sonst REJECTED wegen unbegründetem Qualitätsgefälle, analog zur
Unterseiten-Kriterium-Logik oben. Bindend für QA: siehe Phase 2, neuer
QA-Schritt 13.

### 3. Projekt-Setup

- `npm audit` erneut laufen lassen bei neuen Paketen.
- Falls ein postinstall-Skript (z. B. `@ybouane/liquidglass` via
  patch-package) durch eine Install-Allowlist blockiert wird: `.npmrc`
  mit `ignore-scripts=true` ergänzen, im Setup-Log dokumentieren.

### 4. Asset- & Code-Pipeline

- 3D-Importe ausschließlich via `gltfjsx --transform` gemäß
  `GLTF_PIPELINE_GUIDE.md`.
- GPGPU-Partikel (`GPGPUMotifParticles`) sind PFLICHT-Bestandteil des
  Bundles (kein `manualChunks`-Setup, das am Ende gar keinen WebGL-Chunk
  mehr enthält) — lediglich per Lazy-Load/Code-Splitting vom initialen
  Bundle einer Nicht-3D-Unterseite getrennt (siehe Performance-Budget).
  MorphSVG-Timelines ergänzend an den in `TRANSITIONS_STORYBOARD.md`
  definierten Stellen einsetzen, unter Einhaltung DPR-Cap 2.
- 21st.dev-Komponenten nur nach `21ST_DEV_INTEGRATION.md`.

### 5. Core Development

- Modulare Sektionen gemäß `CONTENT_INVENTORY.md` — JEDE gelistete
  Leistung/Unterseite braucht eine erkennbare Entsprechung.
- Texte ausschließlich aus `CONTENT_INVENTORY.md` + `LEADS.md` — keine
  Erfindungen, keine Auslassungen.
- Bildmaterial klar als Platzhalter gekennzeichnet.
- **Micro-Interactions-Layer — PFLICHT, nicht optional (`CLAUDE.md`
  Abschnitt 1):** Das Motiv-System deckt nur die große Sektions-
  Choreografie ab. Zusätzlich JEDES interaktive Element (Buttons, Links,
  Formularfelder, Nav-Items, Cards) mit physik-basiertem statt
  CSS-`ease`-Feedback ausstatten, nach `skills-and-plugins/emil-kowalski-patterns.md`:
  - `micro-interactions-kit` als Bausatz verwenden: Motion für Spring-
    Hover/Press/Focus (Richtwerte aus dem Kit: `stiffness: 500, damping: 30`
    für Buttons/Toggles, `stiffness: 200, damping: 25` für Drawer/große
    Panels), Sonner für Toast-Stacking/Undo-Pattern statt
    Bestätigungsdialogen, Vaul für Drag-to-dismiss-Elemente mit
    Rubber-Band-Overscroll, cmdk falls ein ⌘K-Muster zur Navigation passt.
  - Jede Animation muss interruptible sein (Spring-basiert, nicht
    Keyframe-basiert).
  - `prefers-reduced-motion`-Fallback pro Micro-Interaction, nicht nur pro
    WebGL-Element.
  - Interaktions-Timing über verwandte Komponenten hinweg konsistent
    halten, siehe `taste-skill-checklist.md`, Komponentenkonsistenz.
- **3D-/WebGL-Micro-Interactions — PFLICHT, zusätzlich zum DOM-Spring-Layer
  (NEU, Runde 3, direkte Lehre aus Example Project B):** Der Layer oben
  deckt ausschließlich DOM-Elemente ab. Für den Lusion-Anspruch reicht das
  nicht — mindestens EIN reaktives 3D-Verhalten ist PFLICHT, direkt an der
  Motiv-Partikelinstanz oder einer eigenen kleinen WebGL-Fläche:
  - Cursor-/Pointer-Reaktion der Partikel (Anziehung, Abstoßung, oder
    lokale Verwirbelung um die Mausposition) — die im Hub bereits
    vorhandene, mausinteraktions-getriebene Variante
    `GPGPU_PARTICLES_EXAMPLE.tsx` (Abgrenzung zu
    `GPGPU_MOTIF_PARTICLES_EXAMPLE.tsx` siehe oben) ist genau dafür
    gedacht und bisher in keinem Durchlauf eingesetzt worden.
  - ODER Hover-getriggerte lokale Verzerrung/Distortion eines Elements
    (z. B. Bild-Hover mit Shader-Displacement, Karten-Hover mit leichtem
    3D-Tilt über echte Perspektive, nicht nur `translateY`).
  - Muss `prefers-reduced-motion` respektieren wie jede andere
    Motiv-Technik.
  - Bindend für QA: eigener Prüfpunkt im Micro-Interactions-Audit (Phase 2,
    QA-Schritt 10) — "alle Micro-Interactions sind DOM-Spring-basiert,
    keine einzige ist WebGL-/3D-reaktiv" → REJECTED.
- `PITCH_SUMMARY.md` aktualisieren: bisherige Punkte behalten, neue
  ergänzen.

### 6. Übergabe

Wenn Core Development abgeschlossen ist: gehe zu PHASE 2.

---

## PHASE 2: AGENT 3 (QA, Performance, Taste & DevSecOps Testing Engineer)

**WICHTIG — SUBAGENT-PFLICHT:** Delegiere diese Phase vollständig an einen
Subagenten über das Task-Tool (Subagent-Typ "general-purpose"). Formuliere
den Task-Auftrag komplett eigenständig.

**---BEGINN TASK-AUFTRAG AN SUBAGENT---**

Du bist Agent 3, ein kompromissloser Quality Gatekeeper. Jeder Punkt unten
ist ein Blocker. **Du darfst niemals selbst genehmigen, dass zugesagte
3D-/WebGL-/Glass-Technik aus CONCEPT.md ersatzlos entfernt wurde — das ist
IMMER Eskalation, nie [APPROVED], egal wie gut begründet.**

Lies zuerst vollständig: `[CENTRAL HUB PFAD]/CLAUDE.md`,
`[PROJEKT-ZIELVERZEICHNIS]/CONCEPT.md` (die ALLERERSTE Fassung, Abschnitt
Kit-Wahl/Technik — falls das Dokument überschrieben wurde, aus der
Git-/Versionshistorie oder aus `SETUP_LOG.md` rekonstruieren, was
ursprünglich zugesagt war),
`[PROJEKT-ZIELVERZEICHNIS]/CONTENT_INVENTORY.md`,
`[PROJEKT-ZIELVERZEICHNIS]/TRANSITIONS_STORYBOARD.md`, und den Code in
`[PROJEKT-ZIELVERZEICHNIS]`.

**TEST-PROTOKOLL:**

1. **TypeScript & Build:** `npx tsc --noEmit` und `npm run build`. Fehler →
   REJECTED.
2. **Security:** `npm audit` gegen finalen Dependency-Baum. Offene
   High/Critical → REJECTED, außer begründet.
3. **WebGL & Memory-Leak-Audit:** Cleanup-Funktionen bei jedem
   WebGL/RAF-Hook (inkl. `GPGPUMotifParticles`-Dispose von
   GPUComputationRenderer-Render-Targets, Geometrie, Materialien,
   Texturen). InstancedMesh bei >50 Meshes. Nur ein WebGL-Kontext
   gleichzeitig. Kein `any`.
4. **Sichtbarkeits-Pflichtprüfung / "Proof of Life" — PFLICHT, eigener
   Blocker, VOR dem Fidelity-Gate geprüft (NEU, Runde 3, direkte Lehre aus
   Example Project B):** Das reine Vorhandensein von `<canvas>`/WebGL-Code
   (Schritt 5 unten) beweist NICHT, dass tatsächlich etwas Sichtbares
   gerendert wird — genau das ist im realen Durchlauf mehrfach
   auseinandergefallen (leerer erster Render, falsch positioniertes Motiv,
   Unterseiten-Motiv, das nie in den sichtbaren Bereich kam). Deshalb JEDES
   Mal per Playwright real prüfen, nicht aus dem Code ableiten:
   - Startseite: Screenshot direkt nach dem ersten Paint des Hero-Bereichs
     (vor jedem Scroll/Interaktion) UND je ein Screenshot an jedem in
     `TRANSITIONS_STORYBOARD.md` definierten Stage-Anker (dorthin
     scrollen/die Timeline programmatisch auf den jeweiligen
     `scrollProgress` setzen).
   - JEDE Top-Level-Unterseite: Screenshot direkt nach dem ersten Paint
     (vor jedem Scroll) — deren "Settled State" muss ab Sichtbarkeit im
     Viewport ohne weitere Nutzeraktion sichtbar sein.
   - Auf jedem dieser Screenshots per Pixel-Stichprobe im erwarteten
     Motiv-Bereich verifizieren, dass NICHT einfach nur die
     Hintergrundfarbe vorliegt (z. B. `page.screenshot` + Pixel-Sampling
     im Bereich der erwarteten `data-motif-layer`-Bounding-Box, oder ein
     vom Motiv selbst exponierter Debug-Wert wie eine sichtbare
     Partikel-/Punktzahl > 0 im globalen `window`-Objekt, per
     `page.evaluate` gelesen).
   - Alle Screenshots UND die dazugehörigen Pixel-/Debug-Werte in
     `QA_AUDIT_REPORT.md` ablegen (nicht nur "bestanden" behaupten — der
     Nachweis muss im Report nachvollziehbar liegen).
   - Zeigt auch nur EIN geprüfter Zeitpunkt/EINE Route keine sichtbaren
     Partikel/kein sichtbares Motiv, obwohl laut CONCEPT.md/
     TRANSITIONS_STORYBOARD.md dort eines sein müsste → REJECTED, mit
     genauer Angabe von Route + Zeitpunkt. Das ist ein eigener, vom
     Fidelity-Gate unabhängiger Blocker: Fidelity-Gate (Schritt 5) prüft
     "wurde etwas zugesagtes entfernt/nie gebaut", dieser Schritt prüft
     "funktioniert das, was angeblich existiert, überhaupt sichtbar".
5. **Fidelity-Gate — PFLICHT, eigener Blocker (direkte Lehre aus Schloss
   Example Project B; REVIDIERT Runde 3 — deckt jetzt auch "nie richtig gebaut",
   nicht nur "nachträglich entfernt"):**
   - Vergleiche die ursprünglich in CONCEPT.md zugesagte Technik
     (3D-Fundament via `GPGPUMotifParticles`/R3F, PFLICHT-Liquid-Glass-
     Navbar, ggf. zusätzlich Shadergradient) mit dem tatsächlich
     ausgelieferten Code UND dem tatsächlichen Live-Verhalten (nicht nur
     Code-Grep): `grep -rn "@react-three|GPGPUMotifParticles|three-stdlib|@ybouane/liquidglass" package.json src/`,
     `grep -rn "<canvas" src/`, `HTMLCanvasElement.prototype.getContext`
     per Playwright-`page.addInitScript` instrumentiert über mind. 3
     Live-Läufe.
   - **Fehlt im finalen Code eine zugesagte 3D-/WebGL-/Glass-Technik, die
     in einer früheren Iteration noch vorhanden war (per SETUP_LOG.md/Git-
     Historie nachvollziehbar), ODER wurde sie zwar nie entfernt, aber
     entspricht das Ausgelieferte erkennbar nicht dem, was CONCEPT.md
     zugesagt hat (Beispiel: Liquid-Glass-Navbar bleibt über alle
     Iterationen hinweg ein reiner CSS-Blur ohne jede Refraktion, siehe
     Abnahmekriterien "Liquid-Glass-Navbar — PFLICHT" in Phase 1): das ist
     in BEIDEN Fällen NIEMALS ein bestandener Punkt, unabhängig von der
     Begründung im Code/CONCEPT.md.** Status wird NICHT [APPROVED] oder
     [REJECTED] mit weiterer Agent-2-Iteration, sondern **[ESCALATE] —
     Scope-Reduktion oder Scope-Nichterfüllung erkannt, erfordert
     Entscheidung des Auftraggebers**, mit einer klaren Zusammenfassung:
     was war zugesagt, was wurde geliefert (entfernt ODER nie in
     zugesagter Qualität gebaut), in welcher Iteration, mit welcher
     Begründung.
   - Kein `<canvas>`-Element und kein WebGL-Kontext irgendwo im Live-DOM
     bei einem Projekt, dessen CONCEPT.md ein 3D-Fundament vorsieht (das
     ist nach dieser Fassung IMMER der Fall) → automatisch [ESCALATE],
     nicht [APPROVED].
6. **Performance & Core Web Vitals — Idle UND Scroll, nicht nur Idle:**
   a. Lighthouse: LCP < 2.5s, INP < 200ms, CLS < 0.1 (bei Überschreitung
      durch 3D-Motive: als offenen Punkt vermerken, nicht automatisch
      REJECTED — dies ist die EINZIGE Stelle im gesamten Protokoll, an der
      ein Schwellenwert-Überschritt zu einem offenen Punkt statt REJECTED
      herabgestuft werden darf). DPR-Cap max. 2. `prefers-reduced-motion`-
      und WebGL2-Fallback pro Motiv-Vorkommen einzeln getestet.
   b. **Zusätzlich PFLICHT — realer Scroll-Jank-Test, PRO BROWSER absolut,
      keine Ausnahme:** Lighthouse misst nur Ladezeit/Idle-Zustand, nicht
      die gescrubbte Timeline unter echter Scroll-Last. Per Playwright:
      1. Preview-Build laden.
      2. Per `page.evaluate` einen Frame-Time-Collector auf `window`
         installieren (`requestAnimationFrame`-Loop, sammelt
         `performance.now()`-Deltas in ein Array).
      3. Programmatisch über die volle Scroll-Strecke der Startseite
         scrollen, damit die ScrollTrigger-Timeline tatsächlich
         durchläuft — auf JEDEM getesteten Browser/Engine einzeln.
      4. Frame-Deltas auslesen und auswerten: p95-Frame-Zeit und
         schlechtester Einzelframe.
      5. **REJECTED-Kriterium — gilt pro Browser einzeln, absolut, OHNE
         Ausnahmeregel:** p95-Frame-Zeit > ~20 ms ODER ein Einzelframe
         > 100 ms auf AUCH NUR EINEM getesteten Browser → REJECTED für das
         Gesamtergebnis. Anders als Punkt 5a ist dies NICHT herabstufbar
         zu "offener Punkt, kein Blocker" — auch nicht mit Verweis auf
         "Sandbox-Last", "keine echte Hardware verfügbar" oder eine
         andere Iteration, die dieselbe Überschreitung bereits als offen
         markiert hat. Wiederholtes Vermerken als "unverändert offen"
         über mehrere Iterationen hinweg ist selbst ein Befund: Ursache
         aktiv eingrenzen (GSAP-Scrub-Last, Partikelzahl, Shader-
         Komplexität einzeln testen), nicht nur erneut dokumentieren.
      6. Beide Ergebnisse (Idle-Lighthouse UND Scroll-Jank-Befund inkl.
         p95/Max-Werten je Browser) in `QA_AUDIT_REPORT.md` festhalten.
7. **Off-Screen-Rendering-Pflichttest — PFLICHT, eigener Blocker (NEU,
   Runde 3, direkte Lehre aus Example Project B):** Prüft die
   "Rendering-Pause bei Unsichtbarkeit"-Vorgabe aus Phase 1 tatsächlich am
   Laufenden System, nicht nur am Code:
   1. Per Playwright eine Motiv-Instanz (Startseite ODER eine Unterseite
      mit Settled State) gezielt außerhalb des sichtbaren Bereichs
      scrollen/positionieren, so dass sie laut ihrer eigenen
      Sichtbarkeits-Logik unsichtbar ist.
   2. In diesem Zustand mehrere Sekunden lang GPU-/Frame-Aktivität messen
      (z. B. `performance`-Timeline/CDP-Tracing auf tatsächliche
      Draw-Calls bzw. Frame-Callback-Aufrufe der betroffenen
      `<Canvas>`-Instanz, oder — einfacher, aber ausreichend — per
      `page.evaluate` prüfen, ob der zugehörige `useFrame`/RAF-Loop der
      Komponente in diesem Zeitraum überhaupt noch aufgerufen wird).
   3. **REJECTED-Kriterium:** Laufen GPGPU-Simulation oder
      Postprocessing-Passes einer als unsichtbar erkannten Motiv-Instanz
      spürbar weiter (Frame-Callback-Rate bleibt auf Idle-Niveau statt auf
      ~0 zu fallen) → REJECTED, mit Verweis auf die fehlende
      `frameloop`-Kopplung an die Sichtbarkeits-Berechnung.
   4. Ergebnis (gemessene Frame-Aktivität sichtbar vs. unsichtbar, pro
      getesteter Route) in `QA_AUDIT_REPORT.md` festhalten.
8. **Sticky-Navbar-Funktionstest — PFLICHT, eigener Blocker:** Per
   Playwright tatsächlich scrollen (nicht nur CSS lesen): Navbar-
   `getBoundingClientRect().top` vor und nach 800px Scroll vergleichen —
   muss (bei `position: sticky`/`fixed`) konstant bleiben (Toleranz ±2px).
   Weicht der Wert ab (Navbar scrollt mit dem Content mit): REJECTED, mit
   Hinweis, `overflow-x`/`overflow-y` auf `html`/`body` sowie
   Lenis-Wrapper-Konfiguration als erste Fehlerquelle zu prüfen.
9. **Barrierefreiheit:** ARIA-Labels, Tastaturbedienbarkeit, Kontrast ≥
   4.5:1.
10. **Micro-Interactions-Audit (`CLAUDE.md` Abschnitt 1, Pflicht — eigener
    Blocker, nicht Teil des Taste-Gates):**
    - Stichprobe über Buttons, Nav-Items, Formularfelder, Cards: Feedback
      Spring-basiert (Motion/`micro-interactions-kit`), nicht reines
      CSS-`transition`/`ease`? Kein Nachweis von Spring-Physics bei
      interaktiven Kernelementen → REJECTED.
    - Interruptibility stichprobenartig testen (schnell doppelt klicken/
      hovern) — hängende oder doppelt startende Animation → REJECTED.
    - Falls Toasts/Drawer im Projekt vorkommen: Sonner-Stacking- bzw.
      Vaul-Rubber-Band-Pattern vorhanden, kein Standard-Alert()/hartes
      Ein-/Ausblenden.
    - `prefers-reduced-motion`-Fallback auch für Micro-Interactions
      (nicht nur für WebGL-Elemente) getestet.
    - **3D-/WebGL-Micro-Interactions (NEU, Runde 3, PFLICHT):** Mindestens
      EIN reaktives 3D-Verhalten nachweisen (Cursor-Reaktion der Partikel
      ODER Hover-Distortion, siehe Phase 1, Core Development). "Alle
      Micro-Interactions sind DOM-Spring-basiert, keine einzige ist
      WebGL-/3D-reaktiv" → REJECTED.
11. **Taste-/Design-Gate UND Transitions-Kontinuität:**
    - Screenshots bei Desktop- und Mobile-Breakpoint.
    - Farbpalette gegen `taste-skill-checklist.md` prüfen: max. 1
      Akzentfarbe + neutrale Skala eingehalten? Beliebig viele
      Brand-Farben gleichzeitig oder ungeprüfte Verläufe → REJECTED.
    - **Kollisionsregel (PFLICHT):** Motiv-/Deko-Geometrie (Partikelform,
      Linie, Shader-Fläche) überschneidet an KEINEM getesteten Breakpoint
      einen Text-Container — per `getBoundingClientRect()`-Abgleich
      zwischen Motiv-Layer und Text-Elementen prüfen. Überlappung, auch
      wenn der Text technisch lesbar bleibt ("liegt dahinter"), ist
      REJECTED — "gewagter, aber funktionierender Layering-Effekt" ist
      KEINE gültige Bewertung für diesen Punkt. Beim Nachmessen den
      Margin-Gotcha aus Phase 1 ("Pflicht-Gotcha bei der
      Kollisionsmessung") mitprüfen: fluchten die tatsächlich als
      Hindernis/Referenz genutzten Elemente auch dann noch, wenn man ihre
      CSS-Margins (nicht nur die Border-Box) mitbetrachtet?
    - **Liquid-Glass-Navbar-Gate (NEU, Runde 3, PFLICHT — eigener
      Prüfpunkt, siehe Abnahmekriterien Phase 1):** Screenshot-Vergleich
      der Navbar gegen `glass-gradient-ui-kit`-Referenz bzw. Lusion.co.
      Reiner `backdrop-filter`-Blur ohne Refraktion/Verzerrung, ohne
      `saturate()`-Boost und ohne spekularen Hell-Rand → REJECTED (und bei
      Wiederholung über mehrere Iterationen → [ESCALATE] über das
      Fidelity-Gate, Schritt 5).
    - Lies `TRANSITIONS_STORYBOARD.md` und prüfe JEDEN dort beschriebenen
      Übergang konkret im Code: wird der Endzustand eines Abschnitts
      tatsächlich zum Anfangszustand des nächsten (geteilte
      Geometrie/Pfad/Partikelziel über denselben `scrollProgress`-Wert),
      oder sind es mehrere optisch ähnliche, aber unabhängige
      Einzeleffekte mit hartem Cut? Letzteres → REJECTED, auch bei
      technisch sauberen Einzeleffekten.
    - **Unterseiten-Kriterium (konkret, nicht subjektiv):** Prüfe exakt
      gegen die Definition aus Phase 1, Schritt 2 ("Unterseiten — konkret
      gedeckelter Umfang"): (a) alle Top-Level-Navigationsseiten nutzen
      denselben wiederverwendeten Nav-Transition-MECHANISMUS, nicht je
      einen eigenen; (b) jede dieser Seiten erreicht einen EIGENEN, aus
      ihrem Seiteninhalt begründeten Settled State (echte
      3D-Partikelgeometrie, keine 2D-Linie), UND dieser Settled State ist
      nachweislich (Schritt 4, Sichtbarkeits-Pflichtprüfung) tatsächlich
      sichtbar — zwei Seiten mit identischem Settled State sind nur
      bestanden, wenn dafür ein inhaltlicher Grund dokumentiert ist, sonst
      REJECTED wegen unbegründeter Uniformität; weiterhin keine eigene
      Multi-Stage-Scroll-Choreografie pro Unterseite wie auf der
      Startseite; (c) tiefere, nicht im Hauptmenü gelistete Seiten nutzen
      den dokumentierten CSS-Crossfade-Fallback. Alle drei erfüllt →
      bestanden. Fehlt einer → REJECTED mit genauer Angabe, welcher der
      drei Punkte nicht erfüllt ist (nicht "wirkt inkonsistent").
    - **Referenz-Abgleich-Gate gegen Lusion.co (NEU, Runde 3, PFLICHT):**
      Rufe Lusion.co (und/oder ein weiteres in `CLAUDE.md` Abschnitt 0
      genanntes Referenzbeispiel) tatsächlich per Browser/Screenshot auf
      und stelle Startseite + eine Unterseite des Projekts direkt daneben.
      Bewerte explizit anhand von: (1) Bewegungsqualität (Spring-/Physik-
      basiert vs. sichtbar CSS-`ease`), (2) Glas-/Materialqualität der
      Navbar (siehe Liquid-Glass-Navbar-Gate oben), (3) Partikel-/Motiv-
      Präsenz und -Reaktivität (siehe Sichtbarkeits-Pflichtprüfung und
      3D-Micro-Interactions), (4) Weißraum-/Typografie-Rhythmus gegen
      `taste-skill-checklist.md`. Formuliere das Ergebnis als konkreten
      Vergleichssatz je Kriterium (z. B. "Navbar-Refraktion: vorhanden,
      vergleichbar zur Referenz" / "Partikel-Reaktivität: fehlt komplett
      gegenüber der Referenz"), nicht als pauschales "wirkt hochwertig".
      Mehr als ein Kriterium klar hinter der Referenz zurück → REJECTED
      mit konkreter Angabe, welches Kriterium und warum.
12. **Content-Vollständigkeit:** Lies `CONTENT_INVENTORY.md`. Jeder
    gelistete Menüpunkt/jede Leistung braucht eine erkennbare
    Entsprechung. Fehlt auch nur einer → REJECTED.
13. **Medien- & Interaktions-Varianz-Gate (NEU, Runde 4, direkte Lehre aus
    "Example Project C" — Live-Nutzer-Feedback):**
    - **Medienwechsel-Nachweis:** Anhand von `TRANSITIONS_STORYBOARD.md`
      mindestens einen dokumentierten Medienwechsel identifizieren (siehe
      Phase 1, "Sektionsweiser Medienwechsel") und per Playwright-
      Screenshot-Sequenz entlang des Scrolls belegen: (a) der bisherige
      Träger (i. d. R. Partikel) geht sichtbar gegen ~0 Deckkraft/Streuung,
      nicht nur Formwechsel; (b) ein ANDERES Mittel übernimmt sichtbar
      erkennbar. Bleibt derselbe Partikel-Layer über den gesamten
      geprüften Scroll-Bereich hinweg durchgehend sichtbar präsent, nur mit
      wechselnder Zielform → REJECTED, mit Angabe der betroffenen
      Storyboard-Abschnitte.
    - **Linienmoment-Gewichtung:** An der im Storyboard als Medienwechsel-
      Träger markierten Stelle den MorphSVG-Linienmoment screenshotten und
      gegen die Lusion.co-Referenz (Referenz-Abgleich-Gate unten) stellen —
      wirkt sie dort erkennbar als eigenständiges visuelles Element (nicht
      nur als dünner Nebenakzent wie an anderen Stellen des Projekts) →
      bestanden, sonst REJECTED.
    - **Content-Box-Reveal-Nachweis:** Für jeden Content-Box-/Karten-
      Abschnitt per Playwright prüfen: (1) Boxen erscheinen gestaffelt bei
      Scroll-in-View, nicht schlagartig; (2) mindestens ein Hover-
      Mikrodetail pro Box-Typ ist nachweisbar (DOM-/CSS-Zustandsänderung
      bei `hover`, die über eine reine Farbänderung hinausgeht); (3) falls
      im Konzept vorgesehen, öffnet ein Klick die zugehörige Unterseite.
      Fehlt das Reveal-System komplett, obwohl das Projekt
      Content-Box-/Karten-Abschnitte hat → REJECTED.
    - **DOM-Micro-Interaction-Parität:** Vergleichbare Karten-/Listenmuster
      auf verschiedenen Routen gegenüberstellen (Screenshots + Code-Diff
      der jeweiligen Komponenten). Deutliches, undokumentiertes
      Qualitätsgefälle (ein Muster mit Spring-Tilt/Hover-Sheen/Reveal,
      ein vergleichbares Muster komplett unbewegt) → REJECTED mit
      genauer Angabe der betroffenen Routen/Komponenten (siehe Phase 1,
      "DOM-Micro-Interaction-Parität über alle Unterseiten hinweg").
    - Alle vier Teilbefunde inkl. Screenshots in `QA_AUDIT_REPORT.md`
      festhalten — wie bei Schritt 4 gilt: Nachweis im Report, nicht nur
      Behauptung.

Schreibe das Ergebnis nach `[PROJEKT-ZIELVERZEICHNIS]/QA_AUDIT_REPORT.md`.
Status ist EINER von `[APPROVED]`, `[REJECTED]`, `[ESCALATE]` (Schritt 5,
Fidelity-Gate).
Gib mir Status und wichtigste Findings zurück.

**---ENDE TASK-AUFTRAG AN SUBAGENT---**

---

## PHASE 3: DEPLOYMENT (automatisch, nur nach [APPROVED])

1. Vercel-CLI prüfen/installieren.
2. `vercel deploy --target=preview --token=<Umgebungsvariable> --yes`
   (explizit `--target=preview`, nicht nur `--prod` weglassen).
3. Verifizieren mit `vercel inspect <URL> --target=preview` — Status muss
   "Ready" sein.
4. Erinnerung: Deployment Protection ggf. im Vercel-Dashboard
   deaktivieren, sonst funktioniert der Link nur für dich.
5. URL nach `PREVIEW_URL.txt` schreiben, Token nie im Klartext ausgeben.

---

## EXECUTION PROTOCOL (Schleifen-Steuerung)

- Bei `[APPROVED]`: gehe zu PHASE 3, aktualisiere `PITCH_SUMMARY.md`
  final.
- Bei `[REJECTED]`: zurück in AGENT-2-Rolle, NUR genannte Findings
  beheben (inkl. ggf. `TRANSITIONS_STORYBOARD.md`/`CONCEPT.md`
  nachziehen, falls die Findings konzeptioneller Natur sind), neuer
  Subagenten-Aufruf. **Ein "Fix" darf niemals zugesagte 3D-/WebGL-/Glass-
  Technik ersatzlos entfernen (siehe Phase 1, "Wenn ein WebGL-Rendering-
  Bug auftritt") — das ist kein REJECTED-Fix-Zyklus mehr, sondern löst
  sofort [ESCALATE] aus, auch mitten in einer laufenden Iteration.**
- Bei `[ESCALATE]` (Fidelity-Gate, QA-Schritt 5, oder ein Scope-Bruch
  während einer REJECTED-Iteration): STOPPE den Loop sofort, unabhängig
  von der verbleibenden Iterationszahl. Fasse für mich zusammen: was war
  ursprünglich in CONCEPT.md zugesagt, was wurde tatsächlich geliefert,
  in welcher Iteration und mit welcher Begründung wurde reduziert. Warte
  auf meine Entscheidung (Technik erzwingen / Konzept bewusst anpassen /
  Projekt pausieren), bevor irgendetwas als fertig markiert oder deployt
  wird.
- Maximal 4 Iterationen im REJECTED-Zyklus, danach Eskalation an mich
  statt endlosem Loop.

Beginne JETZT mit Phase 1, Schritt 1.

---

## Nutzungshinweis

Pro `LEADS.md`-Kandidat einmal durchlaufen lassen. Nach dem ersten echten
Durchlauf: Ergebnis kritisch gegen `CLAUDE.md` Abschnitt 0 prüfen ("Würde
das auf Awwwards Site-of-the-Day auffallen — oder sieht es aus wie das
zehntausendste SaaS-Landingpage-Template?") und die Pipeline gezielt anhand
des realen Ergebnisses nachschärfen — genau das hat der Schloss-Example Project B-
Durchlauf geleistet: ohne den echten Code, den echten QA_AUDIT_REPORT.md
und die echten Screenshots wäre der Fidelity-Gate-Fehler unsichtbar
geblieben, egal wie oft der Prompt am Papier durchdacht worden wäre. Nach
jedem weiteren echten Durchlauf denselben Abgleich machen: echten Code und
echten QA-Report lesen, nicht nur den Prompt-Text erneut prüfen.

**Runde 3 hat denselben Mechanismus noch einmal bestätigt:** Erst die
Live-Ansicht durch den Auftraggeber (nicht Code-Review, nicht Lighthouse)
deckte auf, dass ein Deko-Element sichtbar falsch positioniert war, dass
Unterseiten "rechenintensiv, aber ohne Partikel" wirkten und dass die
Navbar bei flüchtigem Blick nicht wie Liquid Glass aussah — alles Dinge,
die ein rein code-/metrik-basiertes QA-Protokoll ohne echten
Screenshot-Abgleich (jetzt: Sichtbarkeits-Pflichtprüfung, Schritt 4, und
Referenz-Abgleich-Gate, Schritt 11) nicht zuverlässig gefangen hätte. Die
Lehre daraus ist strukturell, nicht nur inhaltlich: Agent 3 muss an
mehreren Stellen tatsächlich HINSEHEN (Screenshot, Referenz-Vergleich),
nicht nur automatisierte Kennzahlen und Grep-Treffer auswerten.

**Runde 4 hat den Mechanismus ein drittes Mal bestätigt, diesmal an einem
fertig fertiggestellten UND ausgelieferten Projekt ("Example Project C"):**
Alle automatisierten Prüfpunkte bis Runde 3 waren bestanden — Fidelity-Gate,
Sichtbarkeits-Pflichtprüfung, Kollisionsregel, Liquid-Glass-Navbar-Gate,
Unterseiten-Kriterium. Trotzdem war der erste Live-Eindruck des
Auftraggebers negativ auf genau zwei Punkten, die keiner der bisherigen
Prüfpunkte erfasst hatte: (1) "Partikel über die ganze Seite hinweg" —
technisch korrekt gebaut (Kollisionsregel eingehalten, Rendering-Pause
funktioniert, jede Form layoutbewusst), aber als monoton wahrgenommen, weil
NIE ein anderes Trägermedium übernahm; (2) ein deutliches Handwerks-Gefälle
zwischen dem am aufwendigsten gebauten Karten-Typ und anderen, sichtlich
unbearbeiteten Karten-/Listenmustern auf Unterseiten. Beides war mit den
Runde-1–3-Kriterien nicht prüfbar, weil sie auf "existiert die Technik,
funktioniert sie sichtbar, verletzt sie keine Regel" zielen — nicht auf
"variiert das Projekt hörbar genug zwischen unterschiedlichen Mitteln" oder
"ist das Handwerks-Niveau projektweit einheitlich hoch, nicht nur an der
sichtbarsten Stelle". Daraus QA-Schritt 13 sowie die beiden neuen
Phase-1-Pflichten oben. Nach jedem weiteren fertiggestellten Projekt
denselben Abgleich machen: den ECHTEN Live-Eindruck (nicht nur den
QA-Report) gegen `CLAUDE.md` Abschnitt 0 prüfen, und wenn eine Rückmeldung
durch keinen bestehenden Prüfpunkt erfasst wird, einen neuen ergänzen statt
sie als Einzelfall abzutun.

---

## MODELLWAHL — welches Claude-Modell für welche Rolle

**Hintergrund:** Der Schloss-Example Project B-Fall zeigt, dass die teuersten Fehler
(WebGL-Bug fälschlich als unlösbar bewertet, Scope-Reduktion nicht als
solche erkannt) an Stellen mit mehrdeutigem, mehrstufigem Reasoning
passierten — nicht an mechanischen Stellen. Modellwahl ist deshalb kein
reines Kostenthema, sondern selbst ein Hebel gegen genau diese Fehlerklasse:
ein günstigeres/schwächeres Modell neigt unter Zeit-/Diagnosedruck eher dazu,
den bequemeren Ausweg ("Technik einfach entfernen") als saubere Lösung
misszuinterpretieren.

- **Phase 1 / Agent 2 — WebGL-/GPGPU-Architektur-Entscheidungen** (Starter-
  Kit-Umsetzung, Geometrie-Handoff-Design für die `stages`-Kette, jede
  Diagnose bei einem WebGL-Rendering-Bug, jede Entscheidung zwischen
  "gezielt fixen" vs. "gleichwertig ersetzen"): **Opus.** Das ist exakt die
  Art von komplexem, mehrdeutigem agentischem Reasoning, für die Opus laut
  Anthropic-Doku vorgesehen ist ("complex agentic coding applications that
  need superior reasoning") — und exakt die Stelle, an der der ursprüngliche
  Example Project B-Durchlauf gescheitert ist.
- **Phase 2 / Agent 3 — QA-Subagent, insbesondere Fidelity-Gate (Schritt 5),
  Kollisionsregel- und Taste-/Design-Gate-Bewertung inkl.
  Liquid-Glass-Navbar-Gate und Referenz-Abgleich-Gate gegen Lusion.co
  (Schritt 11):** **Opus.** Diese Punkte verlangen Abgleich über mehrere
  Dokumente hinweg (CONCEPT.md-Historie, TRANSITIONS_STORYBOARD.md,
  Live-Code) UND echtes Geschmacks-/Bild-Urteil (Screenshot-Vergleich gegen
  eine Referenz ist kein Pass/Fail nach starrer Kennzahl) — dieselbe
  Fehlerklasse wie bei Agent 2. Die Sichtbarkeits-Pflichtprüfung (Schritt 4)
  und der Off-Screen-Rendering-Pflichttest (Schritt 7) sind dagegen
  überwiegend mechanisch (Pixel-Stichprobe, Frame-Aktivität messen) und
  können mit Sonnet laufen, SOFERN ein eindeutiges REJECTED-Kriterium
  erfüllt/nicht erfüllt ist — bei Grenzfällen (schwer einzuordnende
  Screenshots, uneindeutige Messwerte) auf Opus wechseln statt selbst zu
  interpretieren.
- **Mechanische Teilschritte** (Content aus `CONTENT_INVENTORY.md`
  einpflegen, Boilerplate-Seiten/-Routen anlegen, TypeScript-Fehler nach
  klarer Fehlermeldung beheben, Texte nach vorgegebenem Muster übersetzen,
  einfache CSS-Wertanpassungen): **Sonnet** reicht, ist schneller und
  günstiger — hier bringt Opus keinen Qualitätsgewinn, der die Mehrkosten
  rechtfertigt.
- **Bei Unsicherheit, welches Modell für einen konkreten Teilschritt
  passt:** mit Opus starten (Anthropic-Empfehlung), nicht mit Sonnet aus
  Kostengründen "erstmal versuchen" — das war strukturell dieselbe Falle wie
  beim WebGL-Bug: eine unsichere Diagnose unter Ressourcendruck zugunsten
  des bequemeren Wegs auflösen.
- **Verbindliche Regel, kein Ermessen:** Die WebGL-Bug-Diagnose (Phase 1,
  "Wenn ein WebGL-Rendering-Bug auftritt"), die Fidelity-Gate-Bewertung
  (Phase 2, QA-Schritt 5) und das Referenz-Abgleich-Gate gegen Lusion.co
  (Phase 2, QA-Schritt 11) dürfen NIEMALS aus Kosten- oder Zeitgründen mit
  einem schwächeren Modell als Opus durchgeführt werden — unabhängig davon,
  ob der Rest des Durchlaufs mit Sonnet läuft.
