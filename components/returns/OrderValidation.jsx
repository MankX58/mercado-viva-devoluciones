import {
  ArrowRight,
  Check,
  CircleHelp,
  FileText,
  PackageCheck,
} from "lucide-react";

export function OrderValidation({
  orderFound,
  reason,
  reviewDecision,
  onReasonChange,
  onConfirmReturn,
  onAcceptReview,
  onDeclineReview,
  onConsultPolicy,
  onRequestException,
  onReset,
}) {
  const isEligible = orderFound.status === "eligible";

  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <PackageCheck className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold">
              {isEligible ? "Pedido elegible" : orderFound.label}
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {orderFound.detail}
            </p>
          </div>
        </div>
        <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          {orderFound.label}
        </span>
      </div>

      <div className="mb-7 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 sm:items-center sm:gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-card">
          <FileText className="size-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <p className="wrap-break-words font-medium">Pedido {orderFound.id}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Compra del {orderFound.date} · 1 producto
          </p>
        </div>
        {isEligible ? (
          <Check className="ml-auto size-5 shrink-0 text-accent" />
        ) : (
          <CircleHelp className="ml-auto size-5 shrink-0 text-muted-foreground" />
        )}
      </div>

      {isEligible && (
        <EligibleReturn
          reason={reason}
          onReasonChange={onReasonChange}
          onConfirmReturn={onConfirmReturn}
          onReset={onReset}
        />
      )}

      {orderFound.status === "review" && (
        <ManualReview
          reviewDecision={reviewDecision}
          onAccept={onAcceptReview}
          onDecline={onDeclineReview}
        />
      )}

      {orderFound.status === "expired" && (
        <ExpiredOrder
          onConsultPolicy={onConsultPolicy}
          onRequestException={onRequestException}
        />
      )}

      <button
        onClick={onReset}
        className="mt-6 text-sm font-medium text-muted-foreground hover:underline"
      >
        Buscar otro pedido
      </button>
    </div>
  );
}

function EligibleReturn({ reason, onReasonChange, onConfirmReturn, onReset }) {
  return (
    <>
      <label htmlFor="reason" className="mb-2 block text-sm font-medium">
        Motivo de devolución
      </label>
      <select
        id="reason"
        value={reason}
        onChange={(event) => onReasonChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
      >
        <option value="">Selecciona un motivo</option>
        <option>El producto no era lo esperado</option>
        <option>Producto defectuoso</option>
        <option>Recibí un producto diferente</option>
        <option>Compra duplicada</option>
      </select>
      <div className="mt-8 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button
          onClick={onReset}
          className="h-11 w-full rounded-xl px-4 text-sm font-medium text-muted-foreground hover:bg-muted sm:w-auto"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmReturn}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground sm:w-auto"
        >
          Continuar <ArrowRight className="size-4" />
        </button>
      </div>
    </>
  );
}

function ManualReview({ reviewDecision, onAccept, onDecline }) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-secondary/50 p-5">
      <h3 className="font-semibold">Decisión de devolución</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        El caso requiere validación adicional. Selecciona una decisión para
        registrar el resultado.
      </p>
      {reviewDecision === "accepted" ? (
        <div className="mt-5 rounded-xl bg-accent/10 p-4 text-sm font-medium text-accent-foreground">
          <Check className="mr-2 inline size-4" />
          Revisión aceptada y registrada
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onAccept}
            className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            Aceptar para revisión
          </button>
          <button
            onClick={onDecline}
            className="h-11 flex-1 rounded-xl border border-border text-sm font-semibold transition-all active:scale-[0.98] hover:bg-muted"
          >
            No aceptar
          </button>
        </div>
      )}
    </div>
  );
}

function ExpiredOrder({ onConsultPolicy, onRequestException }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-5">
      <h3 className="font-semibold">¿Qué puedes hacer?</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        La compra supera el plazo de devolución. Consulta la política o registra
        una atención excepcional si la tienda lo permite.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onConsultPolicy}
          className="h-11 flex-1 rounded-xl border border-border text-sm font-semibold transition-all active:scale-[0.98] hover:bg-muted"
        >
          Consultar política
        </button>
        <button
          onClick={onRequestException}
          className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
        >
          Solicitar excepción
        </button>
      </div>
    </div>
  );
}
