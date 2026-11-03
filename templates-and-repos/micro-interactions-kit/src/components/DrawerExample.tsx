import { Drawer } from "vaul";

/**
 * Grundgerüst für einen Vaul-Drawer mit physikbasiertem Rubber-Band-
 * Overscroll (kommt out-of-the-box aus der Library). Snap-Points nach Bedarf
 * ergänzen (`snapPoints` Prop) für mehrstufige Drawer wie bei nativen Apps.
 */
export function DrawerExample() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>Öffnen</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }} />
        <Drawer.Content
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "white",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            padding: "1.5rem",
          }}
        >
          <Drawer.Title>Titel</Drawer.Title>
          <p>Inhalt des Drawers.</p>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
