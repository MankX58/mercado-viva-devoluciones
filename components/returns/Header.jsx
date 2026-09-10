import { ShieldCheck, Store } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Store className="size-5" />
          </div>
          <div>
            <p className="truncate font-semibold tracking-tight">
              Mercado Viva
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Gestión de devoluciones
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
