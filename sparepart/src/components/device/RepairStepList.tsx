import type { RepairStep } from "@/types/diagnosis";

interface Props {
  steps: RepairStep[];
}

export function RepairStepList({ steps }: Props) {
  if (steps.length === 0) return null;

  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.step_number} className="flex gap-4">
          <div
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "#FAD5B0", color: "#9A5A00" }}
          >
            {step.step_number}
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="font-medium text-charcoal mb-1">{step.title}</div>
            <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>
              {step.description}
            </p>
            {step.tools_needed.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {step.tools_needed.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#E4EEF7", color: "#2D2D2D" }}
                  >
                    🔩 {tool}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
