/**
 * Shadergradient-Hero-Referenz — nutzt @shadergradient/react (Audit #16,
 * BESTANDEN) für einen animierten WebGL-Mesh-Gradient als Hero-Hintergrund.
 *
 * Installation:
 *   npm i @shadergradient/react @react-three/fiber three three-stdlib camera-controls
 *   npm i -D @types/three
 *
 * Wann Shadergradient statt einer vollen R3F-Szene? Wenn nur eine organische
 * Farbfläche gebraucht wird, kein 3D-Objekt (siehe RESOURCE_INDEX.md #16).
 */
import { Suspense, useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export function ShaderGradientHero({ children }: { children?: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Low-End-/Reduced-Motion-Fallback: statischer Gradient statt WebGL
    // (siehe CLAUDE.md Abschnitt 3).
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(!prefersReducedMotion);
  }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {enabled ? (
        <Suspense fallback={<StaticGradientFallback />}>
          <ShaderGradientCanvas
            style={{ position: "absolute", inset: 0 }}
            pixelDensity={Math.min(window.devicePixelRatio, 2)}
            fov={45}
          >
            <ShaderGradient cDistance={32} cPolarAngle={125} />
          </ShaderGradientCanvas>
        </Suspense>
      ) : (
        <StaticGradientFallback />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

function StaticGradientFallback() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 30% 20%, #6d5bff, #1a1a2e 70%)",
      }}
    />
  );
}
