import type { DiagnosisResult as DiagnosisResultType } from "@/types/diagnosis";
import type { Part } from "@/types/device";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { RepairStepList } from "@/components/device/RepairStepList";
import { PartsPanel } from "@/components/device/PartsPanel";
import { formatCurrency, formatMinutes } from "@/lib/utils";

interface Props {
  result: DiagnosisResultType;
  catalogParts: Part[];
  deviceName: string;
}

export function DiagnosisResult({ result, catalogParts, deviceName }: Props) {
  return (
    <div className="space-y-8">
      {/* Summary card */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg, #E4EEF7 0%, #EBE5F7 100%)" }}
      >
        <h3 className="font-semibold text-charcoal mb-2">AI Diagnosis</h3>
        <p className="text-sm leading-relaxed" style={{ color: "#2D2D2D" }}>
          {result.summary}
        </p>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-3 mt-4">
          <DifficultyBadge difficulty={result.difficulty} />
          <span
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
            style={{ background: "#E4EEF7", color: "#2D2D2D" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Watch1.png" alt="" width={12} height={12} className="object-contain" />
            {formatMinutes(result.estimated_time_minutes)}
          </span>
          <span
            className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full"
            style={{ background: "#FDE8CF", color: "#9A5A00" }}
          >
            $ {formatCurrency(result.estimated_cost_usd.min)}–
            {formatCurrency(result.estimated_cost_usd.max)}
          </span>
        </div>
      </div>

      {/* Likely causes */}
      {result.likely_causes.length > 0 && (
        <div>
          <h3 className="font-semibold text-charcoal mb-3">Likely causes</h3>
          <ul className="space-y-2">
            {result.likely_causes.map((cause, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: "#5A5A5A" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={i === 0 ? "/images/Screwdriver.png" : i === 1 ? "/images/Drill2.png" : "/images/Wrench1.png"}
                  alt=""
                  width={16}
                  height={16}
                  className="object-contain shrink-0 mt-0.5"
                />
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety warnings */}
      {result.safety_warnings.length > 0 && (
        <div
          className="rounded-xl p-4 border"
          style={{ background: "#FFF8F0", borderColor: "#FAD5B0" }}
        >
          <div className="font-semibold text-sm mb-2" style={{ color: "#9A5A00" }}>
            ⚠️ Safety notes
          </div>
          <ul className="space-y-1">
            {result.safety_warnings.map((w, i) => (
              <li key={i} className="text-sm" style={{ color: "#7A4500" }}>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Repair steps */}
      {result.repair_steps.length > 0 && (
        <div>
          <h3 className="font-semibold text-charcoal mb-4">Repair steps</h3>
          <RepairStepList steps={result.repair_steps} />
        </div>
      )}

      {/* Parts needed */}
      {result.parts_needed.length > 0 && (
        <div>
          <h3 className="font-semibold text-charcoal mb-4">Parts you&apos;ll need</h3>
          <PartsPanel
            partsNeeded={result.parts_needed}
            catalogParts={catalogParts}
            deviceName={deviceName}
          />
        </div>
      )}

      {/* Sustainability note */}
      <div
        className="rounded-xl p-4 flex gap-3 border"
        style={{ background: "#F0F8FF", borderColor: "#C8DDEF" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/World.png" alt="" width={24} height={24} className="object-contain shrink-0" />
        <p className="text-sm leading-relaxed" style={{ color: "#1A4A6A" }}>
          {result.sustainability_note}
        </p>
      </div>
    </div>
  );
}
