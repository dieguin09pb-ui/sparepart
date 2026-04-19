import type { BuyLink } from "@/types/device";

interface Props {
  links: BuyLink[];
}

const STORE_ICONS: Record<string, string> = {
  iFixit: "🔧",
  Amazon: "📦",
  eBay: "🛒",
  AutoZone: "🚗",
  "O'Reilly": "🔴",
  RockAuto: "🚙",
};

export function BuyLinks({ links }: Props) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {links.map((link) => (
        <a
          key={link.store}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:shadow-sm"
          style={{
            borderColor: "#C8DDEF",
            background: "white",
            color: "#2D2D2D",
          }}
        >
          <span>{STORE_ICONS[link.store] ?? "🔗"}</span>
          {link.label ?? link.store}
        </a>
      ))}
    </div>
  );
}
