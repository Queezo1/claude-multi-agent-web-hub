import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/distortion.vert.glsl";
import fragmentShader from "./shaders/distortion.frag.glsl";

/**
 * Referenz-Implementierung eines Lusion-artigen Mouse-Distortion-Effekts auf
 * einer texturierten Plane. Eigenstaendig geschrieben (kein kopierter Code
 * aus lusion.co), demonstriert nur das zugrunde liegende Muster:
 * Velocity-getriebene UV-Verzerrung um die Cursor-Position.
 */
export function DistortionPlane({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const texture = useMemo(() => new THREE.TextureLoader().load(textureUrl), [textureUrl]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelocity: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  const lastMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;

    // Mausposition in Plane-lokale UVs projizieren (vereinfachtes Beispiel;
    // in Produktion via Raycaster gegen die Plane praeziser loesen).
    const x = state.pointer.x * 0.5 + 0.5;
    const y = state.pointer.y * 0.5 + 0.5;

    const velocity = Math.min(
      1,
      lastMouse.current.distanceTo(new THREE.Vector2(x, y)) * 20
    );
    lastMouse.current.set(x, y);

    uniforms.uMouse.value.set(x, y);
    uniforms.uVelocity.value = THREE.MathUtils.lerp(
      uniforms.uVelocity.value,
      velocity,
      0.1
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
