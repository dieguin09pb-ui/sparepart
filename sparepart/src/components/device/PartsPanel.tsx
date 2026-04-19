import type { PartRecommendation } from "@/types/diagnosis";
import type { Part } from "@/types/device";
import { BuyLinks } from "@/components/shared/BuyLinks";
import { mergeBuyLinks } from "@/lib/fallback-links";
import { formatCurrency } from "@/lib/utils";

interface Props {
  partsNeeded: PartRecommendation[];
  catalogParts: Part[];
  deviceName: string;
}

export function PartsPanel({ partsNeeded, catalogParts, deviceName }: Props) {
  if (partsNeeded.length === 0) return null;

  const catalogMap = new Map(catalogParts.map((p) => [p.id, p]));

  return (
    <div className="space-y-4">
      {partsNeeded.map((rec, i) => {
        const catalogPart = rec.part_id ? catalogMap.get(rec.part_id) : undefined;
        const curatedLinks = catalogPart?.buy_links ?? [];
        const allLinks = mergeBuyLinks(curatedLinks, rec.name, deviceName);
        const price = catalogPart?.price_usd_est ?? rec.estimated_price_usd;

        return (
          <div
            key={i}
            className="rounded-xl p-4 border"
            style={{ borderColor: "#C8DDEF", background: "#F8F9FB" }}
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <div className="font-medium text-charcoal text-sm">
                  {rec.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#5A5A5A" }}>
                  {rec.reason}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {price && (
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#9A5A00" }}
                  >
                    ~{formatCurrency(price)}
                  </span>
                )}
                {rec.is_catalog_part ? (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#D8F5E0", color: "#1A7A3A" }}
                  >
                    In catalog
                  </span>
                ) : (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#FDE8CF", color: "#9A5A00" }}
                  >
                    AI suggested
                  </span>
                )}
              </div>
            </div>
            <BuyLinks links={allLinks} />
          </div>
        );
      })}
    </div>
  );
}
