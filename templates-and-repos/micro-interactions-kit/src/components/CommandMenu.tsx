import { useEffect, useState } from "react";
import { Command } from "cmdk";

/**
 * ⌘K-Command-Menu als hochwertige Alternative zur generischen Navbar-Suche.
 * Öffnet sich global via Cmd/Ctrl+K.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command Menu">
      <Command.Input placeholder="Suchen oder Befehl eingeben…" />
      <Command.List>
        <Command.Empty>Keine Ergebnisse.</Command.Empty>
        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => setOpen(false)}>Start</Command.Item>
          <Command.Item onSelect={() => setOpen(false)}>Projekte</Command.Item>
          <Command.Item onSelect={() => setOpen(false)}>Kontakt</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
