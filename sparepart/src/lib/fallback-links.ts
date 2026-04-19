import type { BuyLink } from "@/types/device";

export function buildFallbackLinks(
  partName: string,
  deviceName: string
): BuyLink[] {
  const query = encodeURIComponent(`${deviceName} ${partName} replacement`);
  const ifixitQuery = encodeURIComponent(`${partName} ${deviceName}`);

  return [
    {
      store: "iFixit",
      label: "Search iFixit",
      url: `https://www.ifixit.com/Search?query=${ifixitQuery}`,
    },
    {
      store: "Amazon",
      label: "Search Amazon",
      url: `https://www.amazon.com/s?k=${query}`,
    },
    {
      store: "eBay",
      label: "Search eBay",
      url: `https://www.ebay.com/sch/i.html?_nkw=${query}`,
    },
  ];
}

export function mergeBuyLinks(
  curatedLinks: BuyLink[],
  partName: string,
  deviceName: string
): BuyLink[] {
  if (curatedLinks.length > 0) {
    const curatedStores = new Set(curatedLinks.map((l) => l.store));
    const fallbacks = buildFallbackLinks(partName, deviceName).filter(
      (l) => !curatedStores.has(l.store)
    );
    return [...curatedLinks, ...fallbacks];
  }
  return buildFallbackLinks(partName, deviceName);
}
