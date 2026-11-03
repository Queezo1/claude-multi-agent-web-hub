# Security & Authenticity Audit Log

Prüfmethodik pro Ressource: (1) Autor/Organisation verifizieren (offizielle Org vs.
Fork/Fake), (2) Stern-Anzahl & Community-Vertrauen, (3) Maintenance-Status (aktive
Commits/Releases, keine "abandoned" Repos), (4) Lizenz prüfen (kommerziell nutzbar?
Copyleft-Fallstricke?), (5) Red Flags: keine Install-Scripts mit verdächtigem
Netzwerk-/Obfuscated-Code, keine bekannten CVEs, keine Typosquatting-Namen.
Datenquelle: direkte GitHub-Repo-Abfrage am 2026-09-03. Da dieses Environment keinen
Zugriff auf `npm audit` / GitHub Advisory API gegen das Zielsystem hat, gilt zusätzlich:
**vor dem ersten produktiven `npm install` in einem neuen Projekt ist `npm audit` /
`pnpm audit` gegen den dann aktuellen Dependency-Baum verpflichtend erneut
auszuführen** (siehe `CLAUDE.md` Abschnitt 4).

---

## 1. react-three-fiber (pmndrs)
- Repo: https://github.com/pmndrs/react-three-fiber
- Autor/Org: **pmndrs (Poimandres)** — verifizierte, seit Jahren etablierte
  Open-Source-Organisation (u. a. Autoren von zustand, react-spring, valtio).
- Stars: 31.900 | Forks: 1.900 | Commits: 2.860+
- Lizenz: MIT (unbeschränkt kommerziell nutzbar)
- Maintenance: aktiv, große Contributor-Basis, unterstützt React 18 & 19
- Risikobewertung: **sehr niedrig**. Kern-Infrastruktur-Paket mit riesiger
  Downstream-Nutzerbasis — jede Anomalie würde sofort auffallen.
- **Status: [BESTANDEN]**

## 2. drei (pmndrs)
- Repo: https://github.com/pmndrs/drei
- Autor/Org: pmndrs (identisch zu #1)
- Stars: 9.800
- Lizenz: MIT
- Maintenance: aktiv, offizielles Begleitpaket zu react-three-fiber
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 3. ogl (oframe)
- Repo: https://github.com/oframe/ogl
- Autor/Org: oframe — Community-Org rund um den ursprünglichen Autor; weit
  verbreitet in der Codrops/Creative-Coding-Szene.
- Stars: 4.500 | Commits: 505
- Lizenz: Unlicense (Public Domain — maximale Nutzungsfreiheit)
- Maintenance: aktiv genug für ein Nischenprojekt dieser Größe, keine offenen
  kritischen Issues bei Sichtprüfung.
- Risikobewertung: **niedrig**. Kleinere Contributor-Basis als pmndrs-Pakete,
  aber Public-Domain-Lizenz und reiner Vanilla-JS-Code ohne Build-Skript-Risiken.
- **Status: [BESTANDEN]**

## 4. WebGL-Fluid-Simulation (PavelDoGreat)
- Repo: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
- Autor: Pavel Dobryakov, Einzelentwickler, Repo seit Jahren Referenzprojekt in
  der Creative-Coding-Community (u. a. vielfach in Codrops-Artikeln referenziert).
- Stars: 16.600
- Lizenz: MIT
- Maintenance: stabiler "fertiger" Effekt-Code, kein aktives Feature-Update
  nötig; keine Dependencies (Vanilla JS/WebGL) → minimale Supply-Chain-Fläche.
- Risikobewertung: **niedrig**. Kein Build-Toolchain-Risiko, da Vanilla-JS ohne
  npm-Dependencies.
- **Status: [BESTANDEN]**

## 5. curtainsjs (martinlaxenaire)
- Repo: https://github.com/martinlaxenaire/curtainsjs
- Autor: Martin Laxenaire, Einzelentwickler mit durchgehender Commit-Historie
  (318 Commits) und eigener Dokumentations-Site (curtainsjs.com).
- Stars: 1.800
- Lizenz: MIT
- Maintenance: solide, wenn auch kleineres Projekt — Autor ist in der
  WebGL-Community bekannt und aktiv (auch mit Nachfolgeprojekten).
- Risikobewertung: **niedrig-mittel** (kleinere Nutzerbasis als große
  pmndrs-Pakete, daher vor Produktiveinsatz kurzer Code-Review der Kernklasse
  empfohlen — Standardvorgehen für alle Fremdpakete).
- **Status: [BESTANDEN]**

## 6. GSAP / ScrollTrigger (greensock)
- Repo: https://github.com/greensock/GSAP
- Autor/Org: **GreenSock**, seit 2024/2025 im Besitz von Webflow, offizielle
  Organisation, De-facto-Industriestandard für Web-Animation.
- Stars: 26.800
- Lizenz: **GreenSock Standard License** (kein MIT). Seit der Webflow-Übernahme
  sind alle Plugins (inkl. ehemals kommerzieller wie SplitText, MorphSVG)
  kostenlos nutzbar. Lizenztext vor Einsatz in Kundenprojekten mit
  Weiterverkaufs-/Redistributions-Klauseln (z. B. eigenständiger Verkauf des
  GSAP-Codes als Konkurrenzprodukt) abgleichen — für normale Website-Projekte
  unkritisch.
- Maintenance: aktiv, professionell betreut.
- Risikobewertung: **niedrig**, Lizenz-Sonderfall dokumentiert statt "MIT"
  anzunehmen.
- **Status: [BESTANDEN] (mit Lizenzhinweis)**

## 7. sonner (emilkowalski)
- Repo: https://github.com/emilkowalski/sonner
- Autor: **Emil Kowalski** — verifizierte Identität (emilkowal.ski, Design
  Engineer bei Vercel-nahem Umfeld), explizit vom Nutzer als Referenz gefordert.
- Stars: 12.800
- Lizenz: MIT
- Maintenance: aktiv
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 8. vaul (emilkowalski)
- Repo: https://github.com/emilkowalski/vaul
- Autor: Emil Kowalski (identisch zu #7)
- Stars: 8.400 | Letztes Release: v1.1.2
- Lizenz: MIT
- Maintenance: aktiv
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 9. motion / framer-motion (motiondivision)
- Repo: https://github.com/motiondivision/motion
- Autor/Org: **Motion Division** (vormals Framer-Team, jetzt eigenständige Org),
  offizielle Nachfolge-Organisation von "framer-motion".
- Stars: 33.300
- Lizenz: MIT
- Maintenance: sehr aktiv, Industriestandard für React-Animation.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 10. cmdk (pacocoursey)
- Repo: https://github.com/pacocoursey/cmdk
- Autor: Paco Coursey, bekannter Design-Engineer im selben Ökosystem wie
  Kowalski/shadcn (Vercel-Umfeld).
- Stars: 12.900
- Lizenz: MIT
- Maintenance: aktiv, Basis-Baustein von shadcn/ui's Command-Komponente.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 11. magicui (magicuidesign)
- Repo: https://github.com/magicuidesign/magicui
- Autor/Org: Magic UI Design (eigene GitHub-Org, dediziertes Team/Produkt)
- Stars: 22.100
- Lizenz: MIT
- Maintenance: aktiv, kommerzielles Produkt mit Open-Source-Kernbibliothek.
- Risikobewertung: **niedrig**. Copy-Paste-Komponenten-Modell (kein npm-Install
  von Fremdcode nötig) reduziert Supply-Chain-Risiko zusätzlich — Code wird
  direkt ins eigene Repo kopiert und ist damit vollständig einsehbar.
- **Status: [BESTANDEN]**

## 12. react-bits (DavidHDev)
- Repo: https://github.com/DavidHDev/react-bits
- Autor: David Haz (DavidHDev), aktiver Maintainer mit eigener Produkt-Site
  (reactbits.dev).
- Stars: 45.400 (höchste Stern-Zahl aller geprüften UI-Ressourcen)
- Lizenz: **MIT + Commons Clause** — Nutzung/Modifikation frei, aber der
  **Weiterverkauf der Software selbst** (als eigenständiges konkurrierendes
  Produkt) ist untersagt. Einsatz in Kunden-Websites ist davon nicht betroffen.
- Maintenance: sehr aktiv (165+ Komponenten, laufend erweitert).
- Risikobewertung: **niedrig**, Lizenz-Sonderfall dokumentiert.
- **Status: [BESTANDEN] (mit Lizenzhinweis: keine Weiterveräußerung als
  eigenständiges Produkt)**

## 13. theatre.js (theatre-js)
- Repo: https://github.com/theatre-js/theatre
- Autor/Org: eigene GitHub-Org "theatre-js", etabliertes Projekt in der
  Creative-Coding-/Motion-Design-Szene.
- Stars: 12.600
- Lizenz: **gespalten** — Core-Animations-Bibliothek Apache-2.0 (frei
  kommerziell nutzbar), visueller "Studio"-Editor AGPL-3.0 (Copyleft: bei
  Einbettung des Studio-Editors in ein proprietäres Produkt ggf.
  Offenlegungspflichten prüfen).
- Maintenance: aktiv.
- Risikobewertung: **niedrig**, sofern nur die Core-Library (Apache-2.0) im
  Produktivcode verwendet wird; AGPL-Teil nur für interne Tooling-Zwecke
  einsetzen.
- **Status: [BESTANDEN] (mit Lizenzhinweis: Studio-Editor = AGPL-3.0)**

## 14. award-winning-website (adrianhajdin)
- Repo: https://github.com/adrianhajdin/award-winning-website
- Autor: Adrian Hajdin (JS Mastery) — Tutorial-Begleitrepo.
- Stars: ~1.000
- Lizenz: **keine explizite Lizenzdatei im Repo erkennbar.**
- Zusätzliches Risiko: Der Code ist ein direkter visueller Nachbau der Marke
  "Zentry" (Branding, Assets, Copy) — Redistribution/Wiederverwendung als
  Template für Kundenprojekte wäre ein Marken-/Urheberrechtsrisiko, unabhängig
  von der Code-Lizenz.
- Maintenance: keine laufende Weiterentwicklung zu erwarten (abgeschlossenes
  Tutorial-Projekt).
- Risikobewertung: **mittel-hoch für Direktnutzung**, **niedrig für reine
  Lernzwecke** (Code lesen, Technik verstehen, NICHT kopieren).
- **Status: [ABGELEHNT]** — wird NICHT in `/templates-and-repos` heruntergeladen
  oder als Boilerplate bereitgestellt. Nur als Link zur Referenzlektüre in
  `RESOURCE_INDEX.md` dokumentiert.

---

---

# Erweiterung 2026-09-03 — Glasbrechung, Mesh-Gradients & UI-Frameworks

Gleiche Methodik wie oben. Zusätzlicher Prüfpunkt bei dieser Charge: mehrere
angefragte Namen (Liquidglass.js, Animmaster Lib, Skiper-UI, Vengeance-UI)
sind KEINE etablierten Marken mit eindeutiger Quelle — hier wurde die
Recherche bewusst vertieft, um Verwechslungen mit Fan-Clones/Fake-Repos
auszuschließen (siehe #20 für ein konkret gefundenes Fake-Repo).

## 15. Liquidglass.js (ybouane)
- Repo: https://github.com/ybouane/liquidglass | NPM: `@ybouane/liquidglass`
- Autor: **ybouane**, Einzelentwickler mit konsistenter Commit-Historie
  (68 Commits, 3 Contributors), veröffentlicht 23.04.2026.
- Stars: 287
- Lizenz: MIT
- Maintenance: jung, aber aktiv; kleinere Nutzerbasis als große pmndrs-Pakete.
- Red-Flag-Check: keine Postinstall-Skripte im Paket erkennbar, reiner
  WebGL/Shader-Code, keine Netzwerkzugriffe zur Laufzeit nötig.
- Risikobewertung: **niedrig-mittel** (kleinere Community → vor Produktiv-
  einsatz kurzer Review der Shader-/Init-Kernlogik empfohlen, Standard bei
  jungen Paketen unter ~500 Stars).
- **Status: [BESTANDEN]**
- **Nachtrag 2026-09-25 (Projekt `example-project-a`, Iteration 4):**
  - *Korrektur zum Red-Flag-Check:* Version 1.0.3 deklariert in ihrer
    `package.json` sehr wohl ein Install-Skript (`"postinstall":
    "patch-package"`, Lockfile: `hasInstallScript: true`). Es ist wirkungslos
    (das Paket liefert keinen `patches/`-Ordner und hängt nicht von
    `patch-package` ab) und lief im Projekt nie, weil `.npmrc`
    `ignore-scripts=true` setzt. Empfehlung für jedes Hub-Projekt mit diesem
    Paket: `ignore-scripts=true` beibehalten.
  - *Build-Transform statt Fork:* `example-project-a/vite.config.ts`
    (`glasZeitscheiben`) ändert beim Bauen ausschliesslich die
    Zeitaufteilung der Bibliothek (zeitgescheibtes `html-to-image`-Klonen,
    verzögerte Shader-Statusabfragen, reduzierte Style-Eigenschaftsliste für
    das statische Abbild). Jede Ersetzung ist eine exakte, geprüfte
    Textstelle; bei einer neuen Bibliotheksversion bricht der Build ab. MIT
    erlaubt die Änderung; kein neuer Code aus fremder Quelle.
  - Status unverändert **[BESTANDEN]**.

## 16. Shadergradient (ruucm)
- Repo: https://github.com/ruucm/shadergradient | NPM: `@shadergradient/react`
- Autor/Org: ruucm (+ Mitwirkender "stone-skipper"), seit Jahren etabliertes
  Projekt in der Creative-Coding-Szene, vielfach in Produktion genutzt (u. a.
  Framer/Figma-Plugins).
- Stars: 1.600 | Commits: 1.560+
- Lizenz: MIT
- Maintenance: aktiv, große Versionshistorie.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 17/18. React Three Fiber, Drei, Lenis — Re-Bestätigung
- Bereits im ersten Audit-Durchlauf (Einträge #1, #2, entsprechender Lenis-
  Eintrag unter "Motion & Scroll") geprüft und BESTANDEN. Keine neuen
  Erkenntnisse, die den Status ändern würden. Für diese Erweiterung nur erneut
  gegen die aktuelle GitHub-Seite gegengeprüft (Stand 2026-09-03 unverändert).
- **Status: [BESTANDEN] (Re-Bestätigung, kein neuer Audit-Zyklus nötig)**

## 19. shadcn/ui (shadcn-ui)
- Repo: https://github.com/shadcn-ui/ui
- Autor/Org: **shadcn-ui**, De-facto-Industriestandard für React-Component-
  Distribution (Registry-Modell), Autor shadcn ist öffentlich bekannt und
  professionell aktiv (u. a. bei Vercel).
- Stars: 122.600 — mit Abstand größte geprüfte Ressource im gesamten Hub.
- Lizenz: MIT
- Maintenance: sehr aktiv, professionell betreut.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 20. Skiper UI (skiper-ui.com, Autor: Gxuri)
- Offizielle Quelle: https://skiper-ui.com/ (Installation via
  `npx shadcn add @skiper-ui/skiper40`)
- **Wichtiger Fund:** Der bei einer ersten GitHub-Suche auftauchende Treffer
  `nischayhq/skiper-ui` ist **NICHT** die offizielle Bibliothek, sondern
  explizit als "a modern frontend **clone** of Skiper UI" beschrieben — nur
  2 Stars, keine Lizenz, 3 Commits, Fan-Projekt eines Drittautors. Dieses
  Repo wurde NICHT verwendet und darf in keinem Projekt als Quelle dienen.
- Autor der echten Bibliothek: Gxuri (Designer/Entwickler), Vertrieb über
  eigene Registry + shadcn-CLI, kein öffentliches GitHub-Repo mit
  einsehbarer Commit-Historie verlinkt.
- Lizenz: **nicht dokumentiert** (weder auf der Website noch in einem
  öffentlichen Repo auffindbar).
- Preismodell: Freemium — 24+ Komponenten kostenlos, Premium 129 $, Exclusive
  (inkl. Figma) 549 $.
- Maintenance: aktiv vermarktet (mehrfach auf Drittanbieter-Verzeichnissen
  wie tailkits.com, awesome-shadcn-ui.com gelistet), aber ohne öffentliche
  Versionshistorie nicht unabhängig nachprüfbar.
- Risikobewertung: **mittel**. Da Komponenten einzeln per CLI in den eigenen
  Code gezogen werden (Copy-in-Repo-Modell wie Magic UI), ist der Code nach
  dem Pull vollständig einsehbar — das mindert das Risiko erheblich. Es
  fehlt jedoch eine öffentliche Repo-Historie, die man VOR dem ersten Pull
  prüfen könnte, und keine Lizenzangabe.
- **Status: [BESTANDEN MIT EINSCHRÄNKUNG]**
  - Nur die **kostenlosen (Free-Tier)** Komponenten sind für den Hub freigegeben.
  - Jede per `npx shadcn add` gezogene Komponente ist VOR Verwendung manuell
    zu lesen (Standard-Vorgehen bei jedem Copy-Paste-Kit ohnehin, hier aber
    zwingend statt optional).
  - Premium-/Exclusive-Käufe benötigen eine gesonderte Einzelfallprüfung
    (Rechnungsstellung, Lizenzbedingungen) außerhalb dieses Audits.

## 21. Vengeance UI (Ashutoshx7/VengenceUI)
- Repo: https://github.com/Ashutoshx7/VengenceUI
- Autor: **Ashutoshx7**, Identität über den zugehörigen X/Twitter-Account
  (@Ashutosh_7x7) gegenkontrolliert — konsistent mit den ersten
  Ankündigungs-Posts der Library.
- Stars: 757 | Forks: 46 | Commits: 210
- **Vertrauenssignal**: Repo-Beschreibung nennt explizit Unterstützung durch
  das **Vercel Open Source Program**.
- Lizenz: **keine LICENSE-Datei im Repo gefunden** — README beschreibt das
  Projekt als frei nutzbar ("Copy. Paste. Customize. Ship."), aber ohne
  formale Lizenzdatei ist die genaue Rechtslage für kommerzielle
  Weiterverwendung nicht abschließend geklärt.
- **Wichtiger Fund**: Mehrere Namensvetter-/Fork-Repos im Umlauf
  (`Immutablemike/vengenceui`, `dus4w/ui-components-VengenceUI`) — nur das
  kanonische Repo `Ashutoshx7/VengenceUI` (nicht Fork, `repository_is_fork:
  false`) wurde als Quelle verwendet und dokumentiert.
- Maintenance: aktiv, 210 Commits, laufende Weiterentwicklung.
- Risikobewertung: **niedrig-mittel** (fehlende explizite Lizenzdatei ist der
  einzige offene Punkt, sonst starke Vertrauenssignale).
- **Status: [BESTANDEN MIT LIZENZHINWEIS]** — vor Einsatz in einem
  Kundenprojekt mit strengen Lizenz-Compliance-Anforderungen den Autor direkt
  nach einer expliziten Lizenz fragen bzw. Repo auf zwischenzeitlich
  ergänzte LICENSE-Datei prüfen.

## 22. Animmaster Lib (Animmaster Studio)
- Website: https://animmasterlib.dev/
- Autor/Firma: "Animmaster Studio", Kontakt nur über Instagram
  (@animmaster_studio), Gmail-Adresse und Telegram (@advman4k) — keine
  verifizierbare Firmenidentität, kein GitHub-Profil, kein Impressum
  erkennbar.
- **Kein Open-Source-Repository.** Produkt wird als kostenpflichtiges Bundle
  (PRO 4,99 $, Premium 8 $) über einen **Google-Drive-Ordner** ausgeliefert.
- Sicherheitsproblem: Code kann NICHT vor dem Kauf eingesehen oder geprüft
  werden (kein Repo, kein Preview-Repo, keine Sandbox). Laut FAQ liegt der
  Code "60% HTML/CSS/JS, 30% React, 10% Next.js" vor — ohne Versionskontrolle
  ist weder Herkunft noch Integrität einzelner Dateien nachvollziehbar.
- Keine Lizenzangabe, kein CVE-/Advisory-Tracking möglich (kein Paketname in
  einer öffentlichen Registry), Support ausschließlich über informelle Kanäle
  (Telegram/Instagram) statt professionellem Issue-Tracker.
- Risikobewertung: **hoch** — nicht wegen eines konkreten Fundes von
  Schadcode (dazu fehlt mangels Repo die Prüfmöglichkeit selbst), sondern
  WEIL eine Prüfung strukturell unmöglich ist. Das widerspricht dem
  Kern-Prinzip aus `CLAUDE.md` Abschnitt 4 ("kein Paket ohne Audit-Eintrag").
- **Status: [ABGELEHNT]** — wird nicht gekauft, heruntergeladen oder in
  `/templates-and-repos` referenziert. Bei Bedarf nach einer vergleichbaren,
  aber auditierbaren Alternative (z. B. GSAP + eigene WebGL-Shader aus
  `/skills-and-plugins/lusion-shader-notes.md`) suchen statt Animmaster Lib
  einzusetzen.

---

# Erweiterung 2026-09-03 (2) — 21st.dev & CodeRabbit (Tooling-Integration)

Hier wird erstmals im Hub kein npm-Paket/Repo, sondern ein **Drittanbieter-
Dienst mit Zugriff auf Quellcode bzw. GitHub-Berechtigungen** geprüft.
Zusätzlicher Prüfpunkt gegenüber der Standard-Methodik (siehe oben):
Datenverarbeitung, angeforderte Berechtigungen und bekannte
Sicherheitsvorfälle des Anbieters.

## 23. 21st.dev (21st Labs, Inc.)
- Link: https://21st.dev
- Betreiber: **21st Labs, Inc.**, verifizierbare Firma hinter einer
  etablierten Plattform (u. a. auch als Quelle für andere shadcn-Verzeichnisse
  wie shadcndeck.com referenziert).
- Modell: Community-Marketplace, ~700 Autoren, 12.000+ Komponenten,
  Freemium (2 kostenlose Copies/Tag, Mitgliedschaft für unlimitiert).
- Sicherheitsrelevanz: Komponenten werden **in die eigene Codebase kopiert**
  (kein laufender Fremdcode-Import, keine Supply-Chain-Abhängigkeit zur
  Laufzeit) — das ist strukturell sicherer als ein npm-Install von
  Drittanbieter-Paketen.
- Red Flag / Einschränkung: Als **Multi-Autoren-Marketplace** ist die
  Codequalität und Lizenzlage NICHT einheitlich wie bei einem einzelnen
  kuratierten Repo (vergleichbar mit der Skiper-UI-Situation, Audit #20).
  Jede Komponente ist individuell vor Übernahme zu prüfen (Autor-Reputation,
  Copy-Zahl, Lizenz, nachgezogene Dependencies).
- Risikobewertung: **niedrig-mittel**. Kein Supply-Chain-Risiko im
  klassischen Sinn (kein automatischer Code-Pull zur Laufzeit), aber
  variable Code-Qualität durch offenes Autoren-Modell.
- **Status: [BESTANDEN MIT EINSCHRÄNKUNG]** — Nutzung freigegeben unter der
  Bedingung, dass jede übernommene Komponente den in
  `21ST_DEV_INTEGRATION.md` Abschnitt 5 definierten Checklisten-Prozess
  durchläuft, bevor sie gemergt wird (inkl. CodeRabbit-Review, siehe #24).

## 24. CodeRabbit (CodeRabbit Inc.)
- Link: https://www.coderabbit.ai
- Betreiber: CodeRabbit Inc., etabliertes, finanziertes Unternehmen im
  AI-Code-Review-Markt.
- Zertifizierungen: **SOC 2 Type II** (offizielles Changelog-Announcement),
  zusätzlich ISO 27001 und GDPR-Konformität laut Trust-Center-Listing —
  vor Vertragsabschluss über https://trust.coderabbit.ai direkt
  verifizieren, da sich Zertifizierungsstatus ändern kann.
- Angeforderte GitHub-Berechtigungen: **Lesend** auf Actions, Checks,
  Discussions, Members, Metadata; **Lesend+Schreibend** auf Code,
  Commit-Status, Issues, Pull Requests. Repository-Zugriff ist granular
  einstellbar ("All repositories" vs. "Only select repositories").
  Quellcode wird laut Dokumentation nach dem Review nicht dauerhaft
  gespeichert, sofern Review-Caching nicht explizit aktiviert wird.
- **Bekannter Sicherheitsvorfall**: Am 19.08.2025 hat Kudelski Security eine
  Remote-Code-Execution-Schwachstelle in CodeRabbits Static-Analysis-
  Pipeline gemeldet (manipulierte Rubocop-Konfigurationsdatei führte zu
  Code-Ausführung auf Produktionsservern, potenziell bis zu 1 Mio. Repos
  betroffen). **CodeRabbit hat die Lücke gepatcht.** Wird hier dokumentiert,
  weil es die reale Angriffsfläche von Drittanbieter-Code-Review-Tools mit
  weitreichenden Repo-Berechtigungen zeigt — ähnliche Muster gab es laut
  Berichterstattung auch bei anderen Dev-Tools (z. B. Codecov).
- Risikobewertung: **niedrig-mittel**. Etablierter, zertifizierter Anbieter
  mit transparentem Umgang mit dem gemeldeten Vorfall (Patch, öffentliche
  Dokumentation), aber die Vorgeschichte rechtfertigt striktes
  Least-Privilege-Vorgehen statt Blindvertrauen.
- **Status: [BESTANDEN MIT SICHERHEITSHINWEIS]**
  - Installation ausschließlich mit **"Only select repositories"**, nie
    "All repositories".
  - Review-Caching nur aktivieren, wenn ein konkreter Bedarf besteht (Cache
    = zusätzlich gespeicherter Quellcode beim Anbieter).
  - `.coderabbit.yaml` aus `CODERABBIT_WORKFLOW.md` verwenden statt
    ungeprüfter Default-Konfiguration.

---

# Erweiterung 2026-09-03 (3) — 3D Asset Optimization

## 25. gltfjsx (pmndrs)
- Repo: https://github.com/pmndrs/gltfjsx | NPM: `gltfjsx`
- Autor/Org: **pmndrs** (identisch zu #1/#2/#17/#18) — durchgängig
  etablierte Vertrauensbasis im gesamten 3D-Stack des Hubs.
- Stars: 5.800
- Lizenz: MIT
- Maintenance: aktiv, Kernwerkzeug des gesamten R3F-Ökosystems.
- Zusätzlicher Prüfpunkt: `--transform` ruft intern `@gltf-transform/cli`
  (Autor: Don McCurdy, ebenfalls etabliertes, weit verbreitetes Tool im
  glTF-Ökosystem) auf — keine unbekannte Drittabhängigkeit.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

## 26. three-stdlib (pmndrs)
- Repo: https://github.com/pmndrs/three-stdlib | NPM: `three-stdlib`
- Autor/Org: pmndrs
- Stars: 847
- Lizenz: MIT
- Maintenance: aktiv, direkte TS-Portierung der offiziellen three.js-
  Beispielmodule.
- Risikobewertung: **sehr niedrig**
- **Status: [BESTANDEN]**

---

# Erweiterung 2026-09-04 — Routing (Kunden-Pitch Koch: echte Subpages statt Anker-Sections)

## 27. react-router-dom (remix-run)
- Repo: https://github.com/remix-run/react-router | NPM: `react-router-dom`
- Autor/Org: **remix-run** — offizielle GitHub-Org des React-Router-Projekts,
  seit der Übernahme des Remix-Kernteams durch **Shopify** (2022) dort
  weitergeführt; ursprüngliche Autoren Michael Jackson & Ryan Florence,
  seit 2014 durchgängig verantwortlich. Eines der am längsten etablierten
  React-Ökosystem-Pakete überhaupt, historisch von den React-Core-Maintainern
  selbst als De-facto-Standard-Router empfohlen.
- Stars/Downloads: mehrere zehn Millionen wöchentliche npm-Downloads (Top-50
  aller npm-Pakete nach Nutzung), 50.000+ GitHub-Stars — mit deutlichem
  Abstand die größte und am weitesten verbreitete Ressource, die bisher in
  diesem Hub geprüft wurde. Exakte Live-Zahlen wurden hier nicht per
  GitHub-API abgefragt (kein Live-Zugriff in dieser Umgebung, siehe
  Prüfmethodik-Hinweis oben) — Größenordnung ist aus der allgemein bekannten,
  langjährigen Marktposition des Pakets abgeleitet, nicht aus einer
  Stichprobenmessung.
- Lizenz: MIT (uneingeschränkt kommerziell nutzbar)
- Maintenance: sehr aktiv, professionell von einem bezahlten Kernteam
  betreut (Shopify-Anstellung), regelmäßige Major-Releases (v6 → v7),
  ausführliche Migrationsdokumentation zwischen Versionen.
- Red-Flag-Check: kein Postinstall-Skript mit Netzwerk-/Obfuscated-Code,
  keine bekannten Typosquatting-Verwechslungsgefahr (Paketname exakt
  `react-router-dom`, keine Namensvetter-Fake-Repos bekannt wie bei Audit
  #20/#21), keine offenen kritischen CVEs bekannt.
- Verwendungszweck im Projekt: reines Client-Side-Routing für ein
  Vite+React-SPA (kein SSR/Framework-Modus, `BrowserRouter`) — der
  einfachste, am wenigsten risikoreiche Einsatzmodus des Pakets.
- Risikobewertung: **sehr niedrig**. Kern-Infrastruktur-Paket mit der
  größten Downstream-Nutzerbasis aller bisher geprüften Hub-Ressourcen —
  vergleichbar mit react-three-fiber (Audit #1) in der Kategorie
  "Anomalie würde sofort öffentlich auffallen".
- **Status: [BESTANDEN]**
- **Pflicht-Nachtrag (CLAUDE.md Abschnitt 4):** `npm audit` wurde nach der
  tatsächlichen Installation im Projekt `example-project-e` erneut
  gegen den finalen Dependency-Baum ausgeführt (nicht nur dieser
  Vorab-Audit) — Ergebnis siehe Projekt-Setup-Log/`PITCH_SUMMARY.md` dort.

---

# Erweiterung 2026-09-04 (2) — Testing, CI/CD & geschlossene Audit-Lücke

Diese Charge schließt eine selbst verursachte Lücke (#28) und prüft die
Ressourcen, die für den neu eingeführten Testing-/CI-Layer (CLAUDE.md
Abschnitt 2e/2f) nötig sind. Gleiche Methodik wie oben.

## 28. @react-three/postprocessing + postprocessing (pmndrs)
- Repo: https://github.com/pmndrs/react-postprocessing (Paketname
  `@react-three/postprocessing`) | Basis-Lib: https://github.com/pmndrs/postprocessing
- **Hintergrund des Eintrags:** Beide Pakete standen bereits seit der ersten
  Fassung der Tech-Stack-Matrix (Abschnitt 2a) als Pflicht-Tool in `CLAUDE.md`,
  hatten aber entgegen der eigenen Regel ("kein Paket ohne Audit-Eintrag",
  Abschnitt 4) noch keinen Eintrag hier — wird hiermit nachgezogen.
- Autor/Org: **pmndrs** (identisch zu #1/#2/#17/#18/#25/#26) — durchgängig
  etablierte Vertrauensbasis im gesamten 3D-Stack des Hubs.
- Stars: `postprocessing` (Basis-Lib, Autor vanruesc/pmndrs) ~2.400,
  `@react-three/postprocessing` ~1.500 — kleinere, aber aktive Nischenpakete
  innerhalb desselben etablierten Ökosystems.
- Lizenz: MIT (beide Pakete)
- Maintenance: aktiv, Standard-Postprocessing-Lösung im gesamten R3F-Ökosystem.
- Risikobewertung: **sehr niedrig** — gleiches Vertrauensniveau wie R3F/Drei/
  gltfjsx/three-stdlib.
- **Status: [BESTANDEN]**

## 29. Playwright (Microsoft)
- Repo: https://github.com/microsoft/playwright
- Autor/Org: **Microsoft**, offizielle Organisation, breiteste Verwendung
  aller Browser-Automatisierungs-/E2E-Test-Frameworks im JS-Ökosystem.
- Lizenz: Apache-2.0
- Maintenance: sehr aktiv, professionell von Microsoft betreut.
- Verwendungszweck im Hub: E2E-Tests + visuelle Regression (Screenshot-Diffing)
  als Pflicht-Gate vor Merge (CLAUDE.md Abschnitt 2e/2f).
- Risikobewertung: **sehr niedrig**. Kern-Infrastruktur-Paket, vergleichbar
  mit react-router-dom (#27) in der Kategorie "Anomalie würde sofort auffallen".
- **Status: [BESTANDEN]**

## 30. @axe-core/playwright (Deque Systems)
- Repo: https://github.com/dequelabs/axe-core-npm (Monorepo, Paket
  `@axe-core/playwright`)
- Autor/Org: **Deque Systems** — De-facto-Industriestandard-Anbieter für
  automatisierte Accessibility-Engines (axe-core wird u. a. auch in Chrome
  DevTools Lighthouse verwendet).
- Lizenz: MPL-2.0 (Kopierlinks-Lizenz auf Dateiebene — für die reine Nutzung
  als Test-Tooling in der eigenen CI unkritisch, da kein Redistribution des
  axe-core-Quellcodes im Kundenprodukt stattfindet).
- Maintenance: aktiv, professionell betreut.
- Risikobewertung: **sehr niedrig**.
- **Status: [BESTANDEN]**

## 31. Dependabot (GitHub, natives Feature)
- Kein externes Paket/Repo — natives GitHub-Feature, kein zusätzlicher
  Drittanbieter-Zugriff auf den Code (im Unterschied zu CodeRabbit, #24).
- Funktion: automatisierte wöchentliche PRs für veraltete/verwundbare
  npm-Dependencies, inkl. GitHub Security Advisories.
- Risikobewertung: **keine** (Plattform-Feature des ohnehin genutzten
  Git-Hosters, kein eigener Audit-Gegenstand im klassischen Sinn).
- **Status: [BESTANDEN]**

## 32. shadcn MCP-Server (shadcn/ui-Team)
- Quelle: https://ui.shadcn.com/docs/registry/mcp (offizielle Dokumentation)
- Autor/Org: **shadcn/ui-Team** (identisch zu #19), offiziell vom
  Projekt-Maintainer selbst veröffentlicht, keine Drittanbieter-Nachbildung.
- Funktion: MCP-Server für strukturierten Claude-Code-Zugriff auf
  shadcn-kompatible Registries (Setup: `pnpm dlx shadcn@latest mcp init
  --client claude`). Läuft lokal, kein zusätzlicher Cloud-Dienst mit
  Repo-Zugriff wie CodeRabbit.
- Risikobewertung: **sehr niedrig** — Erstanbieter-Tool desselben Projekts,
  das mit shadcn/ui (#19) bereits BESTANDEN ist.
- **Status: [BESTANDEN]**

## 33. @types/node (DefinitelyTyped)
- Repo: https://github.com/DefinitelyTyped/DefinitelyTyped (Paket
  `@types/node`, hier 22.20.3)
- Autor/Org: **DefinitelyTyped** — das von Microsoft mitbetreute
  Community-Typ-Repository; `@types/node` ist dessen meistgenutztes Paket.
- Lizenz: MIT.
- Funktion: **reine Typdeklarationen** (`.d.ts`). Kein ausführbarer Code, kein
  Bundle-Beitrag, ausschliesslich devDependency — die Datei verschwindet
  vollständig aus dem Produktionsartefakt.
- Anlass: Die Playwright-Suite verwendet `Buffer`, `node:zlib` und
  `node:fs/promises` (eigener PNG-Dekoder). Ohne diese Typen lässt sich die
  Suite nicht typprüfen — und sie wurde bis dahin gar nicht geprüft, weil
  `tsconfig.json` auf `"include": ["src"]` stand. Aufgefallen ist die Lücke,
  als zwei offensichtlich kaputte Test-Bearbeitungen glatt durch
  `tsc --noEmit` gingen.
- Risikobewertung: **sehr niedrig** — Typen-only, MIT, devDependency.
- **Status: [BESTANDEN]**

---

## 34. Fontsource — `@fontsource-variable/*` (selbst gehostete Variable Fonts)
- Repo: https://github.com/fontsource/fontsource (Build-Tooling, MIT) bzw.
  https://github.com/fontsource/font-files (ausgelieferte Schriftdateien)
- Anlass (2026-09-24, Projekt `example-project-a`): CLAUDE.md Abschnitt 3a
  empfiehlt `@fontsource`-Pakete ausdrücklich als Weg zu selbst gehosteten
  Schriften, und `example-project-c` setzt sie bereits ein — ein eigener
  Audit-Eintrag existierte trotzdem nicht. Hiermit nachgezogen.
- Autor/Maintainer: Fontsource-Organisation (Open-Source-Projekt, keine
  Einzelperson); ~6.100 GitHub-Sterne, letzter Push 2026-09-23 (aktiv
  gepflegt, nicht archiviert).
- Lizenz: Tooling MIT; Schriftdateien unter der jeweiligen Schriftlizenz
  (für die hier genutzten Familien SIL Open Font License 1.1 — kommerzielle
  Nutzung und Selbst-Hosting erlaubt).
- Geprüfte Pakete: `@fontsource-variable/bricolage-grotesque@5.3.0`,
  `@fontsource-variable/newsreader@5.3.0` (beide OFL-1.1, Stand npm
  2026-07-19).
- Nachtrag 2026-11-02 (Projekt `example-project-d`): `@fontsource-variable/archivo@5.3.0`
  und `@fontsource-variable/jetbrains-mono@5.3.0` — beide OFL-1.1, keine
  `dependencies`, keine `scripts` (lokal aus `package.json` geprüft);
  `npm audit` nach Installation (und `npm audit fix` für vite 8.3.5):
  0 Schwachstellen. Status unverändert **[BESTANDEN]**.
- Dependency-Sicherheit: reine Asset-Pakete (CSS + woff2), KEINE
  Laufzeit-Abhängigkeiten, kein Install-Skript; `npm audit` nach Installation:
  0 Schwachstellen.
- Datenschutz: Dateien werden aus dem eigenen Bundle ausgeliefert — kein
  Request an Google/Dritte (genau der Zweck laut CLAUDE.md 3a).
- Risikobewertung: **sehr niedrig**.
- **Status: [BESTANDEN]**

---

## 35. Basis-Toolchain — three, react/react-dom, vite, @vitejs/plugin-react, typescript, @types/*
- Anlass (2026-09-24, QA-Hinweis Iteration 2, Projekt `example-project-a`):
  Diese Pakete sind das Fundament JEDES Hub-Projekts, standen aber nur
  implizit im Log (three über #1 „react-three-fiber", React/Vite gar nicht).
  Hiermit ausdrücklich nachgezogen — keine neue Technologie, nur
  Dokumentationslücke geschlossen.
- Geprüfte Versionen (aus `node_modules/*/package.json`):
  | Paket | Version | Lizenz | Maintainer / Repo |
  |---|---|---|---|
  | three | 0.170.0 | MIT | mrdoob / github.com/mrdoob/three.js |
  | react, react-dom | 18.3.1 | MIT | Meta / github.com/facebook/react |
  | vite | 8.2.2 | MIT | Vite-Team (VoidZero) / github.com/vitejs/vite |
  | @vitejs/plugin-react | 6.1.1 | MIT | Vite-Team / github.com/vitejs/vite-plugin-react |
  | typescript | 5.9.3 | Apache-2.0 | Microsoft / github.com/microsoft/TypeScript |
  | @types/react, @types/react-dom, @types/three | 18.3.31 / 18.3.7 / 0.170.0 | MIT | DefinitelyTyped (s. #33) |
- Maintenance: alle Organisations-getragen (Meta, Microsoft, Vite-Team,
  three.js-Kernteam), fortlaufende Releases, keine Einzelpersonen-Abhängigkeit.
- Dependency-Sicherheit: `npm audit --audit-level=high` im Projekt
  `example-project-a` nach Installation: **0 Schwachstellen**. vite,
  @vitejs/plugin-react, typescript und @types/* sind reine devDependencies
  (nicht im ausgelieferten Bundle).
- Lizenz-Hinweis: Apache-2.0 (TypeScript) ist mit MIT-Projekten kompatibel und
  betrifft nur das Build-Werkzeug, nicht den ausgelieferten Code.
- Risikobewertung: **sehr niedrig**.
- **Status: [BESTANDEN]**

---

## Zusammenfassung

| # | Ressource | Status | Kernrisiko |
|---|---|---|---|
| 1 | react-three-fiber | BESTANDEN | — |
| 2 | drei | BESTANDEN | — |
| 3 | ogl | BESTANDEN | — |
| 4 | WebGL-Fluid-Simulation | BESTANDEN | — |
| 5 | curtainsjs | BESTANDEN | kleinere Community |
| 6 | GSAP | BESTANDEN | Sonderlizenz (kein MIT) |
| 7 | sonner | BESTANDEN | — |
| 8 | vaul | BESTANDEN | — |
| 9 | motion | BESTANDEN | — |
| 10 | cmdk | BESTANDEN | — |
| 11 | magicui | BESTANDEN | — |
| 12 | react-bits | BESTANDEN | Commons-Clause-Klausel |
| 13 | theatre.js | BESTANDEN | AGPL nur im Studio-Editor |
| 14 | award-winning-website | **ABGELEHNT** | keine Lizenz + Marken-Nachbau |
| 15 | Liquidglass.js | BESTANDEN | junge Community (287★) |
| 16 | Shadergradient | BESTANDEN | — |
| 17/18 | R3F / Drei / Lenis | BESTANDEN | Re-Bestätigung, siehe #1/#2 |
| 19 | shadcn/ui | BESTANDEN | — |
| 20 | Skiper UI | **BESTANDEN MIT EINSCHRÄNKUNG** | nur Free-Tier, keine Lizenzangabe, Fake-Clone-Repo im Umlauf |
| 21 | Vengeance UI | **BESTANDEN MIT LIZENZHINWEIS** | keine LICENSE-Datei im Repo |
| 22 | Animmaster Lib | **ABGELEHNT** | kein Repo, Google-Drive-Vertrieb, nicht auditierbar |
| 23 | 21st.dev | **BESTANDEN MIT EINSCHRÄNKUNG** | Multi-Autoren-Marketplace, Qualität/Lizenz pro Komponente prüfen |
| 24 | CodeRabbit | **BESTANDEN MIT SICHERHEITSHINWEIS** | 2025 gepatchte RCE-Lücke, Least-Privilege-Zugriff zwingend |
| 25 | gltfjsx | BESTANDEN | — |
| 26 | three-stdlib | BESTANDEN | — |
| 27 | react-router-dom | BESTANDEN | — |
| 28 | @react-three/postprocessing + postprocessing | BESTANDEN | nachgezogener Audit (stand bereits in CLAUDE.md 2a ohne Eintrag) |
| 29 | Playwright | BESTANDEN | — |
| 30 | @axe-core/playwright | BESTANDEN | MPL-2.0 (unkritisch für reines Test-Tooling) |
| 31 | Dependabot | BESTANDEN | natives GitHub-Feature, kein Audit-Gegenstand im klassischen Sinn |
| 32 | shadcn MCP-Server | BESTANDEN | Erstanbieter-Tool, siehe #19 |
| 33 | @types/node | BESTANDEN | reine Typdeklarationen, devDependency |
| 34 | Fontsource (`@fontsource-variable/*`) | BESTANDEN | reine Asset-Pakete, OFL-1.1 |
| 35 | Basis-Toolchain (three, react, vite, typescript, @types/*) | BESTANDEN | nachgezogene Dokumentation, keine neue Technik |

**32 von 35 geprüften Ressourcen bestanden den Audit vollständig (davon 4 mit
dokumentierten Einschränkungen/Hinweisen). 2 Ressourcen wurden abgelehnt.** Nur
bestandene Ressourcen (inkl. Einschränkungen-Charge) werden als
Referenzdokumentation bzw. Starter-Snippet in `/templates-and-repos` und
`/skills-and-plugins` bereitgestellt bzw. als Tooling-Pipeline in `CLAUDE.md`
verankert.
