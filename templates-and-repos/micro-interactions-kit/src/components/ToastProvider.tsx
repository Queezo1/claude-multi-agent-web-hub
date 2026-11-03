import { Toaster, toast } from "sonner";

/**
 * Hub-Standard-Konfiguration für Sonner. In den Projekt-Root-Layout einbinden:
 *   <ToastProvider />
 * und dann irgendwo im Code `toast("Nachricht")` aufrufen.
 */
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: { borderRadius: "12px" },
      }}
    />
  );
}

export { toast };
