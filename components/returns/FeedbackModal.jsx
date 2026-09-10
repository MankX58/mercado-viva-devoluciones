import { CheckCircle2 } from "lucide-react";

export function FeedbackModal({ message, orderId, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm animate-fade-up sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="my-auto w-full max-w-sm rounded-3xl border border-border bg-card p-5 text-center shadow-2xl sm:p-6">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="size-7" />
        </div>
        <h2 id="feedback-title" className="mt-4 text-xl font-semibold">
          {message}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          El resultado quedó registrado en el pedido {orderId}.
        </p>
        <button
          onClick={onClose}
          className="mt-6 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
