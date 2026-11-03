---
name: gltf-pipeline-guide
description: Cheatsheet für die Konvertierung von .glb/.gltf-Dateien in typisierte R3F-Komponenten mit gltfjsx, inkl. Draco-/Meshopt-Komprimierung. Vor jedem 3D-Asset-Import konsultieren (siehe CLAUDE.md Abschnitt 2d).
---

# GLTF Pipeline Guide — gltfjsx Cheatsheet

Verbindliche Pipeline für jedes 3D-Modell, das in ein Hub-Projekt importiert
wird (siehe `CLAUDE.md` Abschnitt 2d). Tool: **gltfjsx** (`pmndrs/gltfjsx`),
Audit: `/security-audits/AUDIT_LOG.md` #25.

## 1. Grundbefehl

```bash
npx gltfjsx model.glb
```

Erzeugt `Model.jsx` — eine deklarative R3F-Komponente mit `<mesh>`/
`<primitive>`-Struktur passend zur Node-Hierarchie des Modells.

## 2. Empfohlener Standardbefehl für den Hub

```bash
npx gltfjsx model.glb --types --transform --instance --shadows -o src/components/generated/Model.tsx
```

| Flag | Zweck |
|---|---|
| `--types`, `-t` | TypeScript-Definitionen generieren (Pflicht, siehe CodeRabbit-Regel „keine strikte Typisierung fehlt“) |
| `--transform` | Komprimiert/optimiert das Asset über `@gltf-transform/cli` (Draco + Meshopt, 70–90 % kleiner) — siehe Abschnitt 3 |
| `--instance`, `-i` | Erzeugt `<Instance>`-Komponenten für wiederkehrende Geometrie → Grundlage für `InstancedMesh` (CLAUDE.md Abschnitt 2d) |
| `--shadows`, `-s` | Aktiviert Schatten-Casting/-Receiving pro Mesh |
| `-o` | Zielpfad/-dateiname der generierten Komponente |

## 3. Draco-/Meshopt-Komprimierung im Detail

`--transform` ruft intern `@gltf-transform/cli` auf. Für mehr Kontrolle
(z. B. nur Draco, kein Meshopt, oder umgekehrt) direkt aufrufen:

```bash
# Nur Draco-Geometriekompression
npx gltf-transform draco input.glb output.glb

# Meshopt (oft besser bei animierten/skinned Meshes)
npx gltf-transform meshopt input.glb output.glb

# Vollständige Optimierungs-Pipeline (Draco + Texturen + Pruning)
npx gltf-transform optimize input.glb output.glb --texture-compress webp
```

**Faustregel, wann was:**
- **Draco**: statische Hard-Surface-Geometrie (Produkte, Architektur,
  Deko-Objekte) — beste Kompressionsrate.
- **Meshopt**: animierte/skinned Meshes (Charaktere), da Draco dort
  gelegentlich Artefakte an Bone-Weights verursacht.
- Bei Unsicherheit: `--transform` (Standardbefehl oben) nutzt eine
  sinnvolle Default-Kombination.

## 4. Komponente einbinden

```tsx
import { Model } from "./components/generated/Model";

<Canvas dpr={[1, 2]}>
  <Model scale={1.5} position={[0, -1, 0]} />
</Canvas>
```

Bei `--instance` generierte Modelle immer über den mitgelieferten
`<Instances>`-Wrapper einbinden statt die Komponente mehrfach zu rendern —
sonst geht der `InstancedMesh`-Vorteil (1 Draw-Call statt N) verloren.

## 5. Nach der Generierung — Pflichtschritte

1. Generierte Datei NICHT manuell umbenennen/verschieben, ohne den
   Original-Pfad im Kommentarkopf der Datei zu aktualisieren (gltfjsx
   schreibt den Quellpfad als Referenz in die Datei).
2. Preload ergänzen, wo die Ladezeit kritisch ist:
   ```tsx
   useGLTF.preload("/model-transformed.glb");
   ```
3. Draco-Decoder-Pfad prüfen: `--transform` legt Draco-komprimierte Dateien
   an, die zur Laufzeit einen Decoder brauchen (`useGLTF` lädt ihn
   standardmäßig von Googles CDN — für Projekte ohne externe
   CDN-Abhängigkeit den Decoder stattdessen selbst hosten, siehe
   `useGLTF.setDecoderPath()`).
4. Jede generierte Komponente durchläuft die CodeRabbit-Pipeline
   (`CLAUDE.md` Abschnitt 2c) wie jeder andere Code auch — insbesondere die
   Prüfung auf korrektes Dispose, falls die Komponente manuell nachbearbeitet
   wurde.

## 6. Troubleshooting

| Problem | Lösung |
|---|---|
| Generierte Datei enthält hunderte `<mesh>`-Tags | Modell in Blender/C4D vor Export mit „Join Meshes“ zusammenfassen oder `--instance` nutzen |
| Materialien fehlen nach `--transform` | `--transform` komprimiert auch Texturen — bei Qualitätsverlust `--transform` weglassen und `gltf-transform optimize` mit expliziten Textur-Flags nutzen |
| Ladezeit trotz Draco hoch | Texturauflösung prüfen (oft der größere Anteil an der Dateigröße als die Geometrie), auf KTX2/Basis umstellen |
