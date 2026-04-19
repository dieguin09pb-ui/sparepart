const BRAND_DATA: Record<string, { supportUrl: string; siteUrl: string; siteName: string }> = {
  Apple:     { supportUrl: "https://support.apple.com",                     siteUrl: "https://www.apple.com",           siteName: "apple.com" },
  Samsung:   { supportUrl: "https://www.samsung.com/us/support/",           siteUrl: "https://www.samsung.com",         siteName: "samsung.com" },
  Google:    { supportUrl: "https://support.google.com/pixelphone",         siteUrl: "https://store.google.com",        siteName: "store.google.com" },
  Microsoft: { supportUrl: "https://support.microsoft.com",                 siteUrl: "https://www.microsoft.com",       siteName: "microsoft.com" },
  Sony:      { supportUrl: "https://www.sony.com/en/support/",              siteUrl: "https://www.sony.com",            siteName: "sony.com" },
  Nintendo:  { supportUrl: "https://en-americas-support.nintendo.com",      siteUrl: "https://www.nintendo.com",        siteName: "nintendo.com" },
  LG:        { supportUrl: "https://www.lg.com/us/support",                 siteUrl: "https://www.lg.com",              siteName: "lg.com" },
  Motorola:  { supportUrl: "https://www.motorola.com/us/support",           siteUrl: "https://www.motorola.com",        siteName: "motorola.com" },
  OnePlus:   { supportUrl: "https://www.oneplus.com/us/support",            siteUrl: "https://www.oneplus.com",         siteName: "oneplus.com" },
  Amazon:    { supportUrl: "https://www.amazon.com/gp/help/customer/contact-us", siteUrl: "https://www.amazon.com",    siteName: "amazon.com" },
  Roku:      { supportUrl: "https://support.roku.com",                      siteUrl: "https://www.roku.com",            siteName: "roku.com" },
  Vizio:     { supportUrl: "https://www.vizio.com/support",                 siteUrl: "https://www.vizio.com",           siteName: "vizio.com" },
  Razer:     { supportUrl: "https://mysupport.razer.com",                   siteUrl: "https://www.razer.com",           siteName: "razer.com" },
  Logitech:  { supportUrl: "https://support.logi.com",                      siteUrl: "https://www.logitech.com",        siteName: "logitech.com" },
  Valve:     { supportUrl: "https://help.steampowered.com",                 siteUrl: "https://www.steampowered.com",    siteName: "steampowered.com" },
  GoPro:     { supportUrl: "https://community.gopro.com/s/support",         siteUrl: "https://www.gopro.com",           siteName: "gopro.com" },
  "8BitDo":  { supportUrl: "https://support.8bitdo.com",                    siteUrl: "https://www.8bitdo.com",          siteName: "8bitdo.com" },
  PowerA:    { supportUrl: "https://www.powera.com/support/",               siteUrl: "https://www.powera.com",          siteName: "powera.com" },
  Toyota:    { supportUrl: "https://www.toyota.com/owners",                 siteUrl: "https://www.toyota.com",          siteName: "toyota.com" },
  Honda:     { supportUrl: "https://owners.honda.com",                      siteUrl: "https://www.honda.com",           siteName: "honda.com" },
  Ford:      { supportUrl: "https://owner.ford.com",                        siteUrl: "https://www.ford.com",            siteName: "ford.com" },
  Tesla:     { supportUrl: "https://www.tesla.com/support",                 siteUrl: "https://www.tesla.com",           siteName: "tesla.com" },
  BMW:       { supportUrl: "https://www.bmwusa.com/owners.html",            siteUrl: "https://www.bmwusa.com",          siteName: "bmwusa.com" },
  Chevrolet: { supportUrl: "https://www.chevrolet.com/owners",              siteUrl: "https://www.chevrolet.com",       siteName: "chevrolet.com" },
  Dodge:     { supportUrl: "https://www.dodge.com/owners.html",             siteUrl: "https://www.dodge.com",           siteName: "dodge.com" },
  Volkswagen:{ supportUrl: "https://www.vw.com/en/models/ownerresources.html", siteUrl: "https://www.vw.com",           siteName: "vw.com" },
  Jeep:      { supportUrl: "https://www.jeep.com/owners.html",              siteUrl: "https://www.jeep.com",            siteName: "jeep.com" },
};

interface Props {
  deviceName: string;
  brand: string;
}

export function RepairRecommendations({ deviceName, brand }: Props) {
  const brandData = BRAND_DATA[brand];
  const ifixitUrl = `https://www.ifixit.com/Search?query=${encodeURIComponent(deviceName)}`;
  const repairShopsUrl = `https://www.google.com/maps/search/${encodeURIComponent(brand + " repair near me")}`;

  const links = [
    {
      icon: "🛠️",
      label: "Official Support",
      description: `${brand} support portal`,
      url: brandData?.supportUrl ?? `https://www.google.com/search?q=${encodeURIComponent(brand + " official support")}`,
      color: "#E4EEF7",
      textColor: "#1A3A6A",
    },
    {
      icon: "📖",
      label: "iFixit Guide",
      description: `Repair guides for ${deviceName}`,
      url: ifixitUrl,
      color: "#FDE8CF",
      textColor: "#7A3A00",
    },
    {
      icon: "📍",
      label: "Find Repair Shops",
      description: "Local shops near you",
      url: repairShopsUrl,
      color: "#EBE5F7",
      textColor: "#4A2A8A",
    },
    {
      icon: "🌐",
      label: "Manufacturer Site",
      description: brandData?.siteName ?? `${brand.toLowerCase()}.com`,
      url: brandData?.siteUrl ?? `https://www.google.com/search?q=${encodeURIComponent(brand)}`,
      color: "#D4F0D4",
      textColor: "#1A5A1A",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-charcoal mb-3">Get Help</h2>
      <div className="grid grid-cols-2 gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-opacity hover:opacity-80"
            style={{ background: link.color }}
          >
            <span className="text-lg shrink-0 mt-0.5">{link.icon}</span>
            <div>
              <div className="text-xs font-semibold" style={{ color: link.textColor }}>{link.label}</div>
              <div className="text-[10px] mt-0.5 truncate" style={{ color: link.textColor, opacity: 0.75 }}>{link.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
