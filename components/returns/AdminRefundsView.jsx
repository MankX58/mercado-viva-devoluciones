import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  PackageX,
  RotateCcw,
} from "lucide-react";
import { listRefunds, revertRefund } from "../../app/db/refunds";

export function AdminRefundsView({ onBack }) {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revertingId, setRevertingId] = useState(null);
  const [error, setError] = useState(null);

  async function loadRefunds() {
    setLoading(true);
    setError(null);
    try {
      const data = await listRefunds();
      setRefunds(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los reembolsos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRefunds();
  }, []);

  async function handleRevert(id) {
    setRevertingId(id);
    setError(null);
    try {
      const updated = await revertRefund(id);
      setRefunds((prev) =>
        prev.map((refund) => (refund.id === updated.id ? updated : refund)),
      );
    } catch (err) {
      console.error(err);
      setError("No se pudo revertir el reembolso");
    } finally {
      setRevertingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-5 lg:px-8">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver a devoluciones
      </button>

      <div className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-semibold tracking-tight">
          Reembolsos registrados
        </h1>
        <p className="mt-2 text-muted-foreground">
          Administra los reembolsos guardados en la base de datos. Puedes
          revertir un reembolso con fines de demostración.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Cargando reembolsos...
        </div>
      ) : refunds.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          <PackageX className="size-8" />
          Aún no hay reembolsos registrados.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Pedido</th>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Monto</th>
                <th className="px-4 py-3">Medio</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{refund.orderId}</td>
                  <td className="px-4 py-3">{refund.product}</td>
                  <td className="px-4 py-3">{refund.amount}</td>
                  <td className="px-4 py-3">{refund.refundMethod}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {refund.reason || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {refund.status === "reverted" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        Revertido
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                        <CheckCircle2 className="size-3.5" />
                        Completado
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(refund.createdAt).toLocaleString("es-CO")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {refund.status !== "reverted" && (
                      <button
                        onClick={() => handleRevert(refund.id)}
                        disabled={revertingId === refund.id}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-50"
                      >
                        {revertingId === refund.id ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <RotateCcw className="size-3.5" />
                        )}
                        Revertir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
