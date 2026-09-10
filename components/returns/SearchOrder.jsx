import { ArrowRight, QrCode, Search } from "lucide-react";

export function SearchOrder({ order, testOrders, onOrderChange, onFindOrder }) {
  function handleKeyDown(event) {
    const isEnter = event.key === "Enter";
    const isComposing = event.nativeEvent.isComposing || event.keyCode === 229;

    if (isEnter && !isComposing) {
      onFindOrder();
    }
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <Search className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Encuentra el pedido</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Usa el número de pedido o escanea el código QR de la compra.
          </p>
        </div>
      </div>

      <label htmlFor="order" className="mb-2 block text-sm font-medium">
        Número de pedido
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="order"
          value={order}
          onChange={(event) => onOrderChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ej. MV-2026-004281"
          className="h-12 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
        />
        <button
          onClick={() => onFindOrder()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
        >
          <Search className="size-4" /> Buscar pedido
        </button>
      </div>

      <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-foreground hover:underline">
        <QrCode className="size-4" /> Escanear código QR
      </button>

      <div className="hidden">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold">Pedidos de prueba</p>
          <span className="text-xs text-muted-foreground">
            Para explorar casos
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {Object.values(testOrders).map((item) => (
            <button
              key={item.id}
              onClick={() => onFindOrder(item.id)}
              className="group flex items-center justify-between rounded-xl border border-border p-3 text-left transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/40"
            >
              <span>
                <span className="block font-mono text-xs font-semibold">
                  {item.id}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {item.label}
                </span>
              </span>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
