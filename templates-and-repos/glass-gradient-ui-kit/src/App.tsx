import { useEffect } from "react";
import { ShaderGradientHero } from "../../../skills-and-plugins/shadergradient-hero-snippet";
import { LiquidGlassNavbar } from "../../../skills-and-plugins/liquidglass-navbar-snippet";
import { setupLenis } from "../../../skills-and-plugins/lenis-setup";
import { TasteAdjustedSection, HoverUnderlineLink } from "../../../skills-and-plugins/skiper-vengeance-example";

export default function App() {
  useEffect(() => {
    const lenis = setupLenis();
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <ShaderGradientHero>
        <LiquidGlassNavbar>
          <span>Studio</span>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <HoverUnderlineLink href="#work">Work</HoverUnderlineLink>
            <HoverUnderlineLink href="#about">About</HoverUnderlineLink>
            <HoverUnderlineLink href="#contact">Contact</HoverUnderlineLink>
          </nav>
        </LiquidGlassNavbar>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "80vh",
            padding: "0 clamp(1.5rem, 6vw, 5rem)",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", maxWidth: "16ch" }}>
            High-End-Web, ohne AI-Slop.
          </h1>
        </div>
      </ShaderGradientHero>

      <TasteAdjustedSection eyebrow="Aus dem Hub" title="Nächster Baustein">
        <p>
          Diese Section demonstriert das Taste-Adjusted-Pattern aus{" "}
          <code>skiper-vengeance-example.tsx</code> — Ausgangspunkt statt
          Endprodukt.
        </p>
      </TasteAdjustedSection>
    </>
  );
}
