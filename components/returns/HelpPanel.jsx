import { Check, ShieldCheck } from "lucide-react";

export function HelpPanel() {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
          <ShieldCheck className="size-4 text-primary" />
        </div>
        <h2 className="font-semibold">Importante Antes de Hacer Las Devoluciones</h2>
      </div>
      <ul className="space-y-4 text-sm leading-5 text-muted-foreground">
        <li className="flex gap-3">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>El cliente debe mostrar su documento de identidad para validarlo con el de la compra.</span>
        </li>
        <li className="flex gap-3">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>El producto debe estar dentro del plazo de devolución.</span>
        </li>
        <li className="flex gap-3">
          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
          <span>El producto debe tener su empaque y accesorios.</span>
        </li>
      </ul>
    </aside>
  );
}
