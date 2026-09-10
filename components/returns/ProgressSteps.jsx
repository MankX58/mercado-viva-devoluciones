import { Check } from "lucide-react";

export function ProgressSteps({ steps, currentStep }) {
  return (
    <nav
      aria-label="Progreso de devolución"
      className="mb-6 grid grid-cols-3 gap-1 sm:mb-8 sm:gap-4"
    >
      {steps.map((label, index) => {
        const complete = index < currentStep;
        const current = index === currentStep;

        return (
          <div
            key={label}
            className="flex min-w-0 items-center gap-1.5 sm:gap-3"
          >
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500 ${complete || current ? "bg-primary text-primary-foreground shadow-[0_0_0_5px] shadow-primary/10" : "bg-muted text-muted-foreground"}`}
            >
              {complete ? <Check className="size-4" /> : index + 1}
            </div>
            <span
              className={`hidden truncate text-sm font-medium sm:block ${current ? "text-foreground" : "text-muted-foreground"}`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`ml-auto h-px flex-1 ${complete ? "bg-primary" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
