/**
 * GPGPU_PARTICLES_EXAMPLE.tsx — hochperformantes R3F-Partikelsystem mit
 * Maus-Interaktion, Positions-Simulation läuft komplett auf der GPU
 * (GPUComputationRenderer aus dem three.js-Core-Beispielset, siehe
 * CLAUDE.md Abschnitt 2d). Kein CPU-Update pro Partikel pro Frame — die
 * Simulation skaliert auf zehntausende Partikel bei 60/120 FPS.
 *
 * Abhängigkeiten:
 *   npm install three @react-three/fiber
 * `GPUComputationRenderer` wird direkt aus dem three.js-Paket importiert
 * (Teil von `three/examples/jsm`, nicht separat zu installieren).
 *
 * Architektur:
 *  1. Alle Partikelpositionen leben in einer Float-Datentextur (WIDTH x
 *     WIDTH Pixel = WIDTH² Partikel).
 *  2. Ein Fragment-Shader ("Simulation") berechnet pro Frame die neue
 *     Position jedes Partikels aus der alten Position + Mausabstoßung +
 *     Rückfeder-Kraft zur Ursprungsposition (Ping-Pong zwischen zwei
 *     Render-Targets, von GPUComputationRenderer verwaltet).
 *  3. Ein `<points>`-Objekt mit Custom-ShaderMaterial liest die aktuelle
 *     Positionstextur aus und positioniert jeden Vertex entsprechend.
 *
 *
 * ===========================================================================
 * MERGE-VERMERK (2026-09-05) — zusammengeführt mit der Motiv-Variante
 * ===========================================================================
 * Die Maus-Uniforms dieser Datei (`uMouse3D`, `uMouseActive`) und die
 * Cursor-Raycast-Projektion darunter wurden erstmals in die scroll-/
 * `stages`-getriebene Schwester-Referenz `GPGPU_MOTIF_PARTICLES_EXAMPLE.tsx`
 * übernommen — produktiv in `projects/example-project-b/src/motif/
 * GPGPUMotifParticles.tsx`.
 *
 * Beide Dateien bleiben getrennt geführt (unterschiedliche APIs,
 * unterschiedliche Treiber: Maus hier, `scrollProgress` dort). Wer sie
 * kombiniert, muss EINE Sache anpassen: der Ansatz dieser Datei, die
 * Abstoßung als Kraft auf die Position zu addieren (`pos += velocity * ...`),
 * ist hier korrekt, weil die Rückstellkraft direkt zur festen
 * Ursprungsposition zeigt. In einem System mit Feder-Interpolation zwischen
 * ZWEI Zielformen führt dieselbe Konstruktion zu einer Gleichgewichts-
 * auslenkung von `Kraft / Federsteifigkeit` und damit zu einer um ein
 * Vielfaches zu großen Amplitude. Dort stattdessen die Maus auf das Ziel
 * anwenden, nicht auf die Position.
 * ===========================================================================
 *
 * CodeRabbit-Pflichtpunkte (siehe CLAUDE.md Abschnitt 2c) sind inline
 * markiert: vollständiges Dispose aller GPU-Ressourcen beim Unmount,
 * keine Objekt-Allokationen in useFrame, Reduced-Motion-/WebGL2-Fallback.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
// @ts-expect-error - kein eigenes @types-Paket, Teil von three/examples/jsm
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const WIDTH = 128; // 128 * 128 = 16.384 Partikel. Für Low-End-Geräte auf 64 reduzieren.

const simulationShader = /* glsl */ `
  uniform float uTime;
  uniform float uDelta;
  uniform vec3 uMouse3D;
  uniform float uMouseActive;

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 posData = texture2D(texturePosition, uv);
    vec3 pos = posData.xyz;
    vec3 origin = texture2D(textureOrigin, uv).xyz;

    // Rückfeder-Kraft zur Ursprungsposition (haelt die Formation stabil).
    vec3 toOrigin = (origin - pos) * 0.02;

    // Mausabstoßung: nur wirksam, wenn der Cursor aktiv im Canvas ist.
    vec3 toMouse = pos - uMouse3D;
    float dist = length(toMouse);
    float repelStrength = uMouseActive * smoothstep(2.5, 0.0, dist) * 0.6;
    vec3 repel = normalize(toMouse + 0.0001) * repelStrength;

    vec3 velocity = toOrigin + repel;
    pos += velocity * uDelta * 60.0;

    gl_FragColor = vec4(pos, 1.0);
  }
`;

const particleVertexShader = /* glsl */ `
  uniform sampler2D texturePosition;
  varying float vDist;

  void main() {
    vec3 pos = texture2D(texturePosition, uv).xyz;
    vDist = length(pos);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 3.5 * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = /* glsl */ `
  varying float vDist;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vec3(0.6 + vDist * 0.05, 0.7, 1.0), alpha);
  }
`;

interface GPGPUParticlesProps {
  /** Formation der Partikel-Ursprungspositionen, z. B. Kugel oder Ebene */
  shape?: "sphere" | "plane";
}

export function GPGPUParticles({ shape = "sphere" }: GPGPUParticlesProps) {
  const { gl, camera, size } = useThree();
  const [supported, setSupported] = useState(true);

  const gpuComputeRef = useRef<GPUComputationRenderer | null>(null);
  const positionVariableRef = useRef<ReturnType<
    GPUComputationRenderer["addVariable"]
  > | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const raycastPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 9999));
  const mouseActive = useRef(0);

  // Reduced-Motion- / WebGL2-Fallback (siehe CLAUDE.md Abschnitt 3).
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFloatTextures = gl.capabilities.isWebGL2;
    setSupported(!prefersReducedMotion && hasFloatTextures);
  }, [gl]);

  // Geometrie: nur UV-Attribute noetig, die Positionen kommen aus der Textur.
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const uvs = new Float32Array(WIDTH * WIDTH * 2);
    let i = 0;
    for (let y = 0; y < WIDTH; y++) {
      for (let x = 0; x < WIDTH; x++) {
        uvs[i++] = x / (WIDTH - 1);
        uvs[i++] = y / (WIDTH - 1);
      }
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    // Position-Attribut wird von Three.js für das Bounding-Sphere-Culling
    // erwartet; echte Position kommt aus dem Vertex-Shader via Textur.
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(WIDTH * WIDTH * 3), 3)
    );
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);
    return geo;
  }, []);

  useEffect(() => {
    if (!supported) return;

    const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl);
    if (!gl.capabilities.isWebGL2) {
      gpuCompute.setDataType(THREE.HalfFloatType);
    }

    const positionTexture = gpuCompute.createTexture();
    const originTexture = gpuCompute.createTexture();
    fillInitialPositions(positionTexture, shape);
    fillInitialPositions(originTexture, shape);

    const positionVariable = gpuCompute.addVariable(
      "texturePosition",
      simulationShader,
      positionTexture
    );
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable]);
    positionVariable.material.uniforms.uTime = { value: 0 };
    positionVariable.material.uniforms.uDelta = { value: 0 };
    positionVariable.material.uniforms.uMouse3D = {
      value: new THREE.Vector3(9999, 9999, 9999),
    };
    positionVariable.material.uniforms.uMouseActive = { value: 0 };
    // "textureOrigin" wird nur gelesen, nicht simuliert -> als globales
    // Uniform statt als weitere GPGPU-Variable registrieren.
    positionVariable.material.uniforms.textureOrigin = { value: originTexture };

    const error = gpuCompute.init();
    if (error !== null) {
      console.error("[GPGPUParticles] Initialisierung fehlgeschlagen:", error);
      setSupported(false);
      return;
    }

    gpuComputeRef.current = gpuCompute;
    positionVariableRef.current = positionVariable;

    // CodeRabbit-Pflicht: vollständiges Cleanup aller GPU-Ressourcen.
    return () => {
      positionTexture.dispose();
      originTexture.dispose();
      gpuCompute.dispose?.();
      gpuComputeRef.current = null;
      positionVariableRef.current = null;
    };
  }, [gl, shape, supported]);

  // Maus -> Weltkoordinaten-Projektion, nur Ref-Mutation, keine Allokation
  // pro Frame (CodeRabbit-Regel: keine Objekt-Allokationen in useFrame).
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useEffect(() => {
    if (!supported) return;
    const canvas = gl.domElement;

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(raycastPlane, hit)) {
        mouseWorld.current.copy(hit);
        mouseActive.current = 1;
      }
    }
    function handlePointerLeave() {
      mouseActive.current = 0;
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    // CodeRabbit-Pflicht: Listener beim Unmount entfernen.
    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl, camera, supported, ndc, raycaster, raycastPlane]);

  useFrame((_, delta) => {
    const gpuCompute = gpuComputeRef.current;
    const positionVariable = positionVariableRef.current;
    if (!gpuCompute || !positionVariable || !materialRef.current) return;

    const uniforms = positionVariable.material.uniforms;
    uniforms.uDelta.value = Math.min(delta, 1 / 30);
    uniforms.uTime.value += delta;
    uniforms.uMouse3D.value.copy(mouseWorld.current);
    uniforms.uMouseActive.value = mouseActive.current;

    gpuCompute.compute();
    materialRef.current.uniforms.texturePosition.value =
      gpuCompute.getCurrentRenderTarget(positionVariable).texture;
  });

  if (!supported) {
    // Statischer Low-End-/Reduced-Motion-Fallback statt WebGL-Simulation.
    return (
      <points geometry={geometry}>
        <pointsMaterial size={0.05} color="#8fb8ff" />
      </points>
    );
  }

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={{ texturePosition: { value: null } }}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function fillInitialPositions(texture: THREE.DataTexture, shape: "sphere" | "plane") {
  const data = texture.image.data as Float32Array;
  for (let i = 0; i < data.length; i += 4) {
    if (shape === "sphere") {
      const radius = 4 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      data[i] = radius * Math.sin(phi) * Math.cos(theta);
      data[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      data[i + 2] = radius * Math.cos(phi);
    } else {
      data[i] = (Math.random() - 0.5) * 8;
      data[i + 1] = (Math.random() - 0.5) * 8;
      data[i + 2] = (Math.random() - 0.5) * 0.5;
    }
    data[i + 3] = 1;
  }
}

/**
 * Nutzung:
 *
 *   <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10] }}>
 *     <GPGPUParticles shape="sphere" />
 *   </Canvas>
 *
 * Performance-Hinweise (siehe CLAUDE.md Abschnitt 3):
 * - WIDTH bestimmt die Partikelanzahl quadratisch (128 = 16.384). Auf
 *   mobilen Geräten auf 64 (4.096 Partikel) reduzieren.
 * - `frustumCulled={false}`, weil die echten Positionen im Shader liegen
 *   und Three.js sie nicht für Culling kennt — bewusster Trade-off,
 *   funktioniert nur bei Szenen, in denen die Partikelwolke ohnehin meist
 *   im Bild ist.
 */
