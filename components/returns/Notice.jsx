import { CircleHelp, X } from "lucide-react";

export function Notice({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      className="mb-6 flex animate-fade-up items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent-foreground"
      role="status"
    >
      <CircleHelp className="mt-0.5 size-4 shrink-0" />
      <span>{message}</span>
      <button aria-label="Cerrar aviso" className="ml-auto" onClick={onClose}>
        <X className="size-4" />
      </button>
    </div>
  );
}
