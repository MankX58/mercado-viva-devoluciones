import { Check } from "lucide-react";

const refundOptions = ["Vale de compra", "Medio de pago original"];

export function RefundConfirmation({
  order,
  refund,
  onRefundChange,
  onBack,
  onFinish,
}) {
  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <Check className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Confirma el reembolso</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Elige cómo recibirá el cliente el valor de su devolución.
          </p>
        </div>
      </div>

      <p className="mb-3 text-sm font-medium">Medio de reembolso</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {refundOptions.map((option) => (
          <button
            key={option}
            onClick={() => onRefundChange(option)}
            aria-pressed={refund === option}
            className={`rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${refund === option ? "border-primary bg-secondary shadow-[0_0_0_3px] shadow-primary/10" : "border-border hover:border-primary/40 hover:bg-muted/40"}`}
          >
            <span className="flex items-center justify-between font-medium">
              {option}
              <span
                className={`size-4 rounded-full border-4 ${refund === option ? "border-primary" : "border-muted-foreground/30"}`}
              />
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              {option === "Vale de compra"
                ? "Disponible de inmediato"
                : "Puede tardar de 3 a 5 días"}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border p-4">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
          <span className="text-muted-foreground">Total a devolver</span>
          <span className="font-semibold">{order.amount}</span>
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
          <span className="text-muted-foreground">Producto</span>
          <span>{order.product}</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          onClick={onBack}
          className="h-11 w-full rounded-xl px-4 text-sm font-medium text-muted-foreground hover:bg-muted sm:w-auto"
        >
          Volver
        </button>
        <button
          onClick={onFinish}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 sm:w-auto"
        >
          Registrar devolución <Check className="size-4" />
        </button>
      </div>
    </div>
  );
}
