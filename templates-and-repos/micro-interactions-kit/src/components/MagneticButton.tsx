import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Haptischer "Magnetic Button": der Button folgt dem Cursor innerhalb eines
 * Radius mit Spring-Physics statt CSS-Transition. Klassisches Awwwards-/
 * Lusion-Pattern für Primary-CTAs.
 */
export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{
        padding: "1rem 2rem",
        borderRadius: "999px",
        border: "1px solid currentColor",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </motion.button>
  );
}
