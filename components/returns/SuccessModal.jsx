import { CheckCircle2 } from "lucide-react";

export function SuccessModal({ order, refund, onReset }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm animate-fade-up sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="my-auto w-full max-w-md rounded-3xl border border-border bg-card p-5 shadow-2xl sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 className="size-9" />
          </div>
          <p className="mt-5 text-sm font-semibold text-accent">
            Devolución completada
          </p>
          <h2
            id="success-title"
            className="mt-2 text-2xl font-semibold tracking-tight"
          >
            ¡Todo listo!
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            La devolución fue registrada correctamente.
          </p>
        </div>

        <div className="mt-7 divide-y divide-border rounded-2xl border border-border bg-muted/30 px-4">
          <SummaryRow label="Pedido" value={order.id} mono />
          <SummaryRow label="Producto" value={order.product} />
          <SummaryRow label="Monto reembolsado" value={order.amount} />
          <SummaryRow label="Reembolso a" value={refund} />
        </div>

        <button
          onClick={onReset}
          className="mt-6 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
        >
          Procesar otra devolución
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, mono = false }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`${mono ? "font-mono" : "text-right"} font-semibold`}>
        {value}
      </span>
    </div>
  );
}
