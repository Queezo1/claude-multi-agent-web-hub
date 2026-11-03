/**
 * GPGPU_MOTIF_PARTICLES_EXAMPLE.tsx (neu, 2026-09, Fidelity-Gate-Remediation
 * Example Project B)
 *
 * NICHT zu verwechseln mit `GPGPU_PARTICLES_EXAMPLE.tsx` (bestehende
 * Referenz, CLAUDE.md Abschnitt 2d): jene Datei ist für
 * mausinteraktions-getriebene Partikelsysteme (Abstoßung/Rückfederung zu
 * einer festen Ursprungsform). DIESE Datei ist für einen anderen Fall:
 * einen Lusion-Style Partikel-Motiv-Übergang, der über MEHRERE benannte
 * Zielformen entlang des Scroll-Fortschritts morpht (kein Maus-Input nötig).
 * Beide nutzen denselben GPGPU-Grundmechanismus (GPUComputationRenderer),
 * aber unterschiedliche Treiber (Maus vs. `scrollProgress`) und
 * unterschiedliche APIs — deshalb als eigene Datei geführt, nicht als
 * Variante der bestehenden.
 *
 * ===========================================================================
 * MERGE-VERMERK (2026-09-05) — Maus-Interaktion aus GPGPU_PARTICLES_EXAMPLE
 * ===========================================================================
 * Diese Datei und `GPGPU_PARTICLES_EXAMPLE.tsx` wurden erstmals produktiv
 * zusammengeführt: in `projects/example-project-b/src/motif/
 * GPGPUMotifParticles.tsx`. Dort speist der scroll-/`stages`-getriebene
 * Morph AUS DIESER Datei weiterhin die Choreografie, ergänzt um die Uniforms
 * `uMouse3D`/`uMouseActive` und die Cursor-Raycast-Projektion aus der
 * anderen Referenz.
 *
 * Wichtiger Umsetzungshinweis für künftige Projekte, der aus diesem Merge
 * stammt: Die Mausabstoßung darf in einem federgetriebenen System NICHT als
 * Kraft auf die Position addiert werden (so macht es die andere Referenz,
 * dort korrekt, weil sie keine Feder-Zielinterpolation hat). Die
 * Gleichgewichtsauslenkung wäre `Kraft / uStiffness` — bei stiffness 0.12
 * also rund das Achtfache der beabsichtigten Amplitude. Stattdessen die
 * Maus auf das ZIEL anwenden (`target.xy += ...`): dann ist die Auslenkung
 * hart durch die gewünschte Amplitude begrenzt und bleibt federgedämpft.
 *
 * Zweiter Befund aus demselben Durchlauf, ebenfalls für Nachnutzer relevant:
 * die Punktgrößen-Formel `gl_PointSize = uSize * (300.0 / -mvPosition.z)`
 * weiter unten ist NICHT in Pixeln gedacht. Bei Kamera-z 8 ergibt sie den
 * Faktor 37.5 — ein Partikel mit uSize 2.4 wird 90 px groß, und 16.384
 * solcher Punkte verschmelzen zu deckenden Flächen. Wer pixelgenaue
 * Formationen braucht (z. B. wegen der Kollisionsregel), sollte die Größe
 * explizit in Pixeln definieren und mit `devicePixelRatio` auf den
 * Framebuffer umrechnen — siehe die Example Project B-Fassung.
 * ===========================================================================
 *
 * Referenzimplementierung für Lusion-Style Partikel-Motiv-Systeme mit echtem
 * Geometrie-Handoff zwischen Sektionen (siehe CLAUDE.md Abschnitt 1 "Signature
 * Moment" / Abschnitt 2d "GPGPU-Ansatz" und PITCH_CONCEPT_PIPELINE.md,
 * TRANSITIONS_STORYBOARD).
 *
 * Kernprinzip: EIN Partikel-Buffer wird über die gesamte Seite hinweg
 * simuliert. Jede benannte "Stage" (z. B. "cloud", "line", "grid") liefert
 * nur die ZIEL-Positionen für diese Partikel — nicht eine eigene, unabhängige
 * Animation. Der Übergang zwischen zwei Stages ist eine GPU-seitige
 * Feder-Interpolation zwischen genau zwei benachbarten Zielpositions-
 * Texturen, angetrieben von einem einzigen `scrollProgress`-Wert (0..1) aus
 * EINER gemeinsamen GSAP-ScrollTrigger-Timeline (scrub: true). Damit ist
 * "Ende der vorherigen Animation = Anfang der nächsten" strukturell
 * garantiert (gleicher Partikel-Buffer, gleiche Simulation) statt nur
 * optisch angestrebt — kein harter Schnitt zwischen unabhängigen Effekten.
 *
 * Abhängigkeiten (alle bereits im Hub auditiert, KEINE neuen Pakete nötig):
 * - @react-three/fiber, three            (AUDIT_LOG.md #1)
 * - three-stdlib → GPUComputationRenderer (AUDIT_LOG.md #26)
 *
 * Performance (CLAUDE.md Abschnitt 3):
 * - DPR-Cap kommt vom Eltern-<Canvas dpr={[1,2]}>, hier nicht erneut gesetzt.
 * - textureSize bestimmt die Partikelzahl (textureSize²), Default 128 →
 *   16.384 Partikel. Für Low-End-Geräte kleiner wählen.
 * - Vollständiger Cleanup im useEffect-Return (Render-Targets, Geometrie,
 *   Materialien, Texturen) — siehe Abschnitt 2c, keine Ausnahme.
 * - Vor dem Mounten IMMER `supportsGPGPUParticles(gl)` prüfen UND
 *   `prefers-reduced-motion` respektieren — ohne beides auf ein statisches
 *   Poster-Bild zurückfallen (siehe Nutzungshinweis am Dateiende).
 *
 * Build-/Render-verifiziert (2026-09): eigenständiger Vite+R3F-Prototyp,
 * echter `npm run build`, echte Live-Läufe via Playwright/Chromium (nur
 * Software-WebGL/SwiftShader verfügbar) — saubere, farbtreue Darstellung,
 * kein Farbkanalversatz. Details: `projects/example-project-b/
 * GPGPU_REBUILD_VERIFICATION.md`.
 *
 * WICHTIG für Agenten, die diese Datei referenzieren: Diese Datei MUSS vor
 * jeder Nutzung tatsächlich vorhanden sein (mit `ls`/`Read` prüfen, nicht
 * annehmen). Falls sie zu einem späteren Zeitpunkt fehlt oder veraltet ist,
 * NICHT so tun, als wäre sie vorhanden — stattdessen nach diesem Muster neu
 * aufbauen (GPUComputationRenderer aus three-stdlib, bereits auditiert #26).
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GPUComputationRenderer } from 'three-stdlib'

export interface MotifStage {
  /** Eindeutiger Name der Stage, z. B. "cloud", "line", "grid". Nur für Logging/Debug. */
  id: string
  /**
   * Zielpositionen, xyz interleaved (Float32Array der Länge
   * textureSize * textureSize * 3). Siehe `buildStageTexture` unten für die
   * Kodierung — z. B. Punkte entlang eines SVG-Pfads, eines Grids oder einer
   * importierten (gltfjsx/Draco-komprimierten) Mesh-Oberfläche sampeln.
   */
  positions: Float32Array
}

export interface GPGPUMotifParticlesProps {
  /** Geordnete Liste der Stages entlang der Scroll-Strecke, mind. 2 Einträge. */
  stages: MotifStage[]
  /**
   * 0..1 über die GESAMTE betrachtete Scroll-Strecke (eine gemeinsame
   * ScrollTrigger-Timeline, scrub: true). NICHT pro Sektion neu bei 0
   * starten — sonst geht der Geometrie-Handoff zwischen den Stages verloren
   * und es entstehen wieder unabhängige Einzeleffekte mit hartem Schnitt.
   */
  scrollProgress: number
  /** Partikelraster-Breite/Höhe. Partikelzahl = textureSize². Default 128. */
  textureSize?: number
  color?: THREE.ColorRepresentation
  /** Punktgröße in Pixeln (vor Kamera-Perspektiv-Skalierung). Default 3. */
  size?: number
  /** Federsteifigkeit Richtung aktuellem Zielpunkt. Default 0.12. */
  springStiffness?: number
  /** Dämpfung, verhindert endloses Nachwippen. Default 0.86. */
  springDamping?: number
  /** Pro-Partikel-Jitter gegen "zu perfekte" CGI-Optik (lusion-shader-notes.md #3). Default 0.02. */
  jitter?: number
}

const POSITION_VAR = 'texturePosition'
const VELOCITY_VAR = 'textureVelocity'

/** Kodiert Zielpositionen in eine RGBA32F-DataTexture (a-Kanal ungenutzt). */
function buildStageTexture(positions: Float32Array, textureSize: number): THREE.DataTexture {
  const count = textureSize * textureSize
  const data = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    data[i * 4 + 0] = positions[i * 3 + 0] ?? 0
    data[i * 4 + 1] = positions[i * 3 + 1] ?? 0
    data[i * 4 + 2] = positions[i * 3 + 2] ?? 0
    data[i * 4 + 3] = 1
  }
  const tex = new THREE.DataTexture(data, textureSize, textureSize, THREE.RGBAFormat, THREE.FloatType)
  tex.needsUpdate = true
  return tex
}

function buildZeroTexture(textureSize: number): THREE.DataTexture {
  const data = new Float32Array(textureSize * textureSize * 4)
  const tex = new THREE.DataTexture(data, textureSize, textureSize, THREE.RGBAFormat, THREE.FloatType)
  tex.needsUpdate = true
  return tex
}

/**
 * Prüft, ob das aktuelle Device GPGPU-Partikel (Float-Render-Targets)
 * unterstützt. IMMER vor dem Mounten dieser Komponente aufrufen und bei
 * `false` (oder `prefers-reduced-motion`) auf ein statisches Poster-Bild
 * zurückfallen, siehe CLAUDE.md Abschnitt 3.
 */
export function supportsGPGPUParticles(gl: THREE.WebGLRenderer): boolean {
  const isWebGL2 = gl.capabilities.isWebGL2
  const hasFloatBuffer = gl.extensions.has('EXT_color_buffer_float')
  return Boolean(isWebGL2 && hasFloatBuffer)
}

// Custom Uniforms werden manuell deklariert. texturePosition/textureVelocity
// werden von GPUComputationRenderer anhand der Dependencies automatisch
// injiziert — hier NICHT erneut deklarieren (Doppel-Deklarationsfehler).
const positionShader = /* glsl */ `
  uniform sampler2D uTargetA;
  uniform sampler2D uTargetB;
  uniform float uBlend;
  uniform float uStiffness;
  uniform float uDamping;
  uniform float uJitter;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);

    vec3 targetA = texture2D(uTargetA, uv).xyz;
    vec3 targetB = texture2D(uTargetB, uv).xyz;
    vec3 target = mix(targetA, targetB, uBlend);

    // langsam wandernder Jitter statt statischem Offset — bricht die
    // "zu perfekte" CGI-Optik, ohne dass die Zielform instabil wirkt.
    float n = hash(uv + floor(uTime * 0.5));
    target += (n - 0.5) * uJitter;

    vec3 force = (target - pos.xyz) * uStiffness;
    vel.xyz = vel.xyz * uDamping + force;
    pos.xyz += vel.xyz;

    gl_FragColor = vec4(pos.xyz, 1.0);
  }
`

const velocityShader = /* glsl */ `
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    // Velocity wird bereits im Position-Pass fortgeschrieben; dieser Pass
    // hält den Wert nur (GPUComputationRenderer verlangt getrennte
    // Doppelpuffer-FBOs pro Variable).
    gl_FragColor = texture2D(textureVelocity, uv);
  }
`

const particleVertexShader = /* glsl */ `
  uniform sampler2D texturePosition;
  uniform float uSize;
  attribute vec2 reference;

  void main() {
    vec3 pos = texture2D(texturePosition, reference).xyz;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, d);
    if (alpha < 0.02) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`

export function GPGPUMotifParticles({
  stages,
  scrollProgress,
  textureSize = 128,
  color = '#ffffff',
  size = 3,
  springStiffness = 0.12,
  springDamping = 0.86,
  jitter = 0.02,
}: GPGPUMotifParticlesProps) {
  const { gl } = useThree()
  const gpuComputeRef = useRef<GPUComputationRenderer | null>(null)
  const positionVarRef = useRef<ReturnType<GPUComputationRenderer['addVariable']> | null>(null)
  const stageTexturesRef = useRef<THREE.DataTexture[]>([])
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const clockRef = useRef(0)

  if (stages.length < 2) {
    throw new Error('GPGPUMotifParticles: mindestens 2 Stages erforderlich für einen Handoff.')
  }

  const count = textureSize * textureSize

  // Geometrie: pro Partikel nur eine UV-Referenz ins Positions-FBO. Eine
  // Dummy-Position wird mitgeführt, damit BufferGeometry gültig bleibt
  // (frustumCulled wird unten deaktiviert, da die Bounding Sphere aus den
  // Dummy-Positionen sonst falsch wäre).
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const reference = new Float32Array(count * 2)
    for (let i = 0; i < count; i++) {
      const x = (i % textureSize) / textureSize
      const y = Math.floor(i / textureSize) / textureSize
      reference[i * 2 + 0] = x
      reference[i * 2 + 1] = y
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('reference', new THREE.BufferAttribute(reference, 2))
    return geo
  }, [count, textureSize])

  useEffect(() => {
    if (!supportsGPGPUParticles(gl)) {
      // Aufrufende Komponente ist dafür verantwortlich, bei false gar nicht
      // erst zu mounten (siehe Nutzungshinweis am Dateiende) — hier nur ein
      // defensiver Abbruch, falls die Prüfung vom Aufrufer vergessen wurde.
      console.warn('GPGPUMotifParticles: WebGL2/Float-Render-Targets nicht unterstützt, überspringe Init.')
      return
    }

    const gpuCompute = new GPUComputationRenderer(textureSize, textureSize, gl)
    stageTexturesRef.current = stages.map((s) => buildStageTexture(s.positions, textureSize))

    const positionTexture = gpuCompute.createTexture()
    // @types/three typisiert DataTexture.image.data als Union
    // (Uint8Array | Uint8ClampedArray | Float32Array | ...), unabhängig vom
    // tatsächlich zur Laufzeit über THREE.FloatType erzeugten Format. Der
    // direkte Cast auf Float32Array wird von TS als "nicht überlappend"
    // abgelehnt (TS2352) — der Doppel-Cast über `unknown` ist hier korrekt,
    // weil buildStageTexture()/createTexture() immer FloatType-Texturen mit
    // Float32Array-Backing erzeugen. (Gefunden beim ersten echten
    // `npm run typecheck` gegen @types/three ^0.170.0 im echten Projekt —
    // der isolierte Prototyp dieser Session nutzte eine neuere
    // @types/three-Version mit anderer/schärferer Typisierung, die diesen
    // einfachen Cast noch akzeptierte.)
    ;(positionTexture.image.data as unknown as Float32Array).set(
      buildStageTexture(stages[0].positions, textureSize).image.data as unknown as Float32Array
    )
    const velocityTexture = buildZeroTexture(textureSize)

    const positionVar = gpuCompute.addVariable(POSITION_VAR, positionShader, positionTexture)
    const velocityVar = gpuCompute.addVariable(VELOCITY_VAR, velocityShader, velocityTexture)
    gpuCompute.setVariableDependencies(positionVar, [positionVar, velocityVar])
    gpuCompute.setVariableDependencies(velocityVar, [velocityVar])

    positionVar.material.uniforms.uTargetA = { value: stageTexturesRef.current[0] }
    positionVar.material.uniforms.uTargetB = { value: stageTexturesRef.current[1] }
    positionVar.material.uniforms.uBlend = { value: 0 }
    positionVar.material.uniforms.uStiffness = { value: springStiffness }
    positionVar.material.uniforms.uDamping = { value: springDamping }
    positionVar.material.uniforms.uJitter = { value: jitter }
    positionVar.material.uniforms.uTime = { value: 0 }

    const error = gpuCompute.init()
    if (error !== null) {
      console.error('GPGPUMotifParticles: GPUComputationRenderer.init() fehlgeschlagen:', error)
    }

    gpuComputeRef.current = gpuCompute
    positionVarRef.current = positionVar

    return () => {
      // Pflicht-Cleanup, siehe CLAUDE.md Abschnitt 2c — kein "fire and forget".
      gpuCompute.dispose()
      stageTexturesRef.current.forEach((t) => t.dispose())
      stageTexturesRef.current = []
      gpuComputeRef.current = null
      positionVarRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Stages/Größe ändern sich pro Projekt nicht zur Laufzeit.
  }, [gl, textureSize, springStiffness, springDamping, jitter])

  useFrame((_, delta) => {
    const gpuCompute = gpuComputeRef.current
    const positionVar = positionVarRef.current
    if (!gpuCompute || !positionVar) return

    clockRef.current += delta

    const segmentCount = stages.length - 1
    const segment = THREE.MathUtils.clamp(scrollProgress, 0, 1) * segmentCount
    const index = Math.min(Math.floor(segment), segmentCount - 1)
    const blend = segment - index

    positionVar.material.uniforms.uTargetA.value = stageTexturesRef.current[index]
    positionVar.material.uniforms.uTargetB.value = stageTexturesRef.current[index + 1]
    positionVar.material.uniforms.uBlend.value = blend
    positionVar.material.uniforms.uTime.value = clockRef.current

    gpuCompute.compute()

    if (materialRef.current) {
      materialRef.current.uniforms.texturePosition.value =
        gpuCompute.getCurrentRenderTarget(positionVar).texture
    }
  })

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          texturePosition: { value: null },
          uSize: { value: size },
          uColor: { value: new THREE.Color(color) },
        }}
      />
    </points>
  )
}

/**
 * NUTZUNGSHINWEIS (siehe TRANSITIONS_STORYBOARD.md):
 *
 *   const { gl } = useThree()
 *   const canUseGPGPU = supportsGPGPUParticles(gl) && !prefersReducedMotion
 *
 *   {canUseGPGPU ? (
 *     <GPGPUMotifParticles
 *       stages={[
 *         { id: 'cloud', positions: cloudPositions },   // Hero
 *         { id: 'line',  positions: linePositions },    // → Vertrauens-Linie
 *         { id: 'grid',  positions: gridPositions },     // → Leistungsübersicht
 *       ]}
 *       scrollProgress={scrollProgress} // 0..1 aus EINER gemeinsamen
 *                                        // ScrollTrigger-Timeline (scrub: true)
 *     />
 *   ) : (
 *     <StaticPosterFallback />
 *   )}
 *
 * scrollProgress darf NICHT pro Sektion zurückgesetzt werden — sonst bricht
 * der Geometrie-Handoff und es entstehen wieder unabhängige Einzeleffekte.
 */
