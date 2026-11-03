/**
 * Liquidglass-Navbar-Referenz — nutzt @ybouane/liquidglass (Audit #15,
 * BESTANDEN) für eine echte WebGL-Glasbrechung auf einer Sticky-Navbar.
 *
 * Installation:
 *   npm install @ybouane/liquidglass
 *
 * Gemäß CLAUDE.md Abschnitt 2a: Glasbrechung gezielt für 1-2 Signature-
 * Elemente einsetzen, nicht flächendeckend (jede Instanz kostet einen
 * eigenen WebGL-Renderpass).
 */
import { useEffect, useRef } from "react";
import { LiquidGlass } from "@ybouane/liquidglass";

interface LiquidGlassNavbarProps {
  children: React.ReactNode;
}

export function LiquidGlassNavbar({ children }: LiquidGlassNavbarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !glassRef.current) return;

    // Reduced-Motion / Low-End-Fallback: kein WebGL-Glass, nur CSS-Blur
    // (siehe CLAUDE.md Abschnitt 3 — Performance-Budget).
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasWebGL2 = !!document.createElement("canvas").getContext("webgl2");

    if (prefersReducedMotion || !hasWebGL2) {
      glassRef.current.style.backdropFilter = "blur(16px)";
      glassRef.current.style.background = "rgba(255,255,255,0.08)";
      return;
    }

    glassRef.current.dataset.config = JSON.stringify({
      floating: true,
      blurAmount: 0.25,
    });

    let instance: Awaited<ReturnType<typeof LiquidGlass.init>> | undefined;

    LiquidGlass.init({
      root: rootRef.current,
      glassElements: [glassRef.current],
    }).then((i) => {
      instance = i;
    });

    return () => {
      instance?.destroy?.();
    };
  }, []);

  return (
    <div ref={rootRef} id="liquid-glass-root" style={{ position: "relative" }}>
      <nav
        ref={glassRef}
        className="liquid-glass-navbar"
        style={{
          position: "sticky",
          top: "1rem",
          margin: "0 auto",
          maxWidth: "720px",
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {children}
      </nav>
    </div>
  );
}
