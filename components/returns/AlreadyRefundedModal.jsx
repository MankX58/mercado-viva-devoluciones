import { CircleAlert, RotateCcw, X } from "lucide-react";

export function AlreadyRefundedModal({ refund, reverting, onRevert, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-up">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
            <CircleAlert className="size-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold">Este pedido ya fue reembolsado</h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              El pedido <span className="font-medium text-foreground">{refund.orderId}</span>{" "}
              ya tiene un reembolso registrado el{" "}
              {new Date(refund.createdAt).toLocaleString("es-CO")} mediante{" "}
              <span className="font-medium text-foreground">{refund.refundMethod}</span>.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          ¿Quieres revertir este reembolso para poder procesar uno nuevo?
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="h-11 rounded-xl px-4 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={onRevert}
            disabled={reverting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
          >
            <RotateCcw className="size-4" />
            {reverting ? "Revirtiendo..." : "Revertir reembolso"}
          </button>
        </div>
      </div>
    </div>
  );
}
