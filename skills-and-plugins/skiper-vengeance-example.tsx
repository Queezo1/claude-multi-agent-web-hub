/**
 * Referenzbeispiel für den Einsatz von Skiper UI (Audit #20, BESTANDEN MIT
 * EINSCHRÄNKUNG — nur Free-Tier) und Vengeance UI (Audit #21, BESTANDEN MIT
 * LIZENZHINWEIS).
 *
 * WICHTIG: Dieser Snippet enthält KEINEN kopierten Quellcode der beiden
 * Bibliotheken (Skiper UI: keine dokumentierte Lizenz; Vengeance UI: keine
 * LICENSE-Datei im Repo) — stattdessen ein eigenständig geschriebenes
 * Muster, das zeigt, WIE ihre Komponenten gemäß 'Taste'-Checkliste
 * eingebunden und angepasst werden. Die echten Komponenten selbst per CLI /
 * Copy-Paste aus den offiziellen Quellen ziehen (siehe RESOURCE_INDEX.md
 * #20/#21).
 *
 * Skiper UI installieren:
 *   npx shadcn add @skiper-ui/skiper40
 *
 * Vengeance UI: Komponente von https://www.vengenceui.com/components/...
 * manuell in den eigenen Codebase kopieren.
 */
import { motion, useReducedMotion } from "motion/react";

/**
 * Muster für eine "Un-common Section" im Skiper-UI-Stil: nach dem
 * `npx shadcn add`-Pull wird die gezogene Komponente NICHT unverändert
 * übernommen (siehe CLAUDE.md, Verbot generischer Standard-Kompositionen),
 * sondern mit projektspezifischen Werten überschrieben — hier exemplarisch
 * an Radius, Timing und Spacing demonstriert.
 */
export function TasteAdjustedSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{
        padding: "clamp(2rem, 6vw, 6rem) clamp(1rem, 4vw, 3rem)",
        // Bewusst NICHT der Skiper-Standardradius — projekteigene Skala.
        borderRadius: "28px",
      }}
    >
      <p style={{ opacity: 0.6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {eyebrow}
      </p>
      <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>{title}</h2>
      {children}
    </motion.section>
  );
}

/**
 * Muster für eine Vengeance-UI-artige "Line Hover Link"-Interaktion:
 * eigenständig implementiert (Spring statt CSS-Transition, siehe
 * emil-kowalski-patterns.md Punkt 1), demonstriert das gleiche Prinzip wie
 * die Original-Komponente ("Line Hover Link" auf vengenceui.com), ohne
 * deren Code zu übernehmen.
 */
export function HoverUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      style={{ position: "relative", display: "inline-block", textDecoration: "none" }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {children}
      <motion.span
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "absolute",
          left: 0,
          bottom: -2,
          height: "1px",
          width: "100%",
          background: "currentColor",
          transformOrigin: "left",
        }}
      />
    </motion.a>
  );
}
