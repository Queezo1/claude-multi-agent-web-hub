import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DistortionPlane } from "./scene/DistortionPlane";
import { initLenis } from "./lib/lenis";

export default function App() {
  useEffect(() => {
    const lenis = initLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1] }}>
        <DistortionPlane textureUrl="/placeholder.jpg" />
      </Canvas>
    </div>
  );
}
