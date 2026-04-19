export interface PartSeed {
  device_slug: string;
  name: string;
  part_number: string | null;
  category: string;
  description: string;
  price_usd_est: number | null;
  buy_links: { store: string; label: string; url: string }[];
}

export const parts: PartSeed[] = [
  // ── PS5 DualSense ──────────────────────────────────────────────
  { device_slug: "ps5-dualsense", name: "Left Analog Stick Module", part_number: "ALPS RKJXV1224005", category: "joystick", description: "Replacement Alps analog stick module for left stick drift repair.", price_usd_est: 8, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/dualsense-left-analog-stick" }] },
  { device_slug: "ps5-dualsense", name: "Right Analog Stick Module", part_number: "ALPS RKJXV1224005", category: "joystick", description: "Replacement Alps analog stick module for right stick drift repair.", price_usd_est: 8, buy_links: [] },
  { device_slug: "ps5-dualsense", name: "USB-C Charging Port", part_number: null, category: "port", description: "Replacement USB-C port board for DualSense charging issues.", price_usd_est: 12, buy_links: [] },
  { device_slug: "ps5-dualsense", name: "1560mAh LiPo Battery", part_number: "CFI-ZCT1W", category: "battery", description: "Original capacity replacement battery for PS5 DualSense.", price_usd_est: 18, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/ps5-dualsense-battery" }] },
  { device_slug: "ps5-dualsense", name: "L2 Trigger Assembly", part_number: null, category: "trigger", description: "Left adaptive trigger mechanism replacement.", price_usd_est: 15, buy_links: [] },
  { device_slug: "ps5-dualsense", name: "R2 Trigger Assembly", part_number: null, category: "trigger", description: "Right adaptive trigger mechanism replacement.", price_usd_est: 15, buy_links: [] },
  { device_slug: "ps5-dualsense", name: "Touchpad Assembly", part_number: null, category: "touchpad", description: "Complete touchpad replacement for DualSense.", price_usd_est: 20, buy_links: [] },
  { device_slug: "ps5-dualsense", name: "Speaker + Grille Assembly", part_number: null, category: "speaker", description: "Internal speaker and grille for crackling audio repair.", price_usd_est: 10, buy_links: [] },

  // ── PS4 DualShock 4 ───────────────────────────────────────────
  { device_slug: "ps4-dualshock-4", name: "Left Analog Stick Module", part_number: null, category: "joystick", description: "Alps replacement stick module for DualShock 4 drift.", price_usd_est: 6, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/dualshock-4-analog-stick" }] },
  { device_slug: "ps4-dualshock-4", name: "Right Analog Stick Module", part_number: null, category: "joystick", description: "Alps replacement stick module for right stick drift.", price_usd_est: 6, buy_links: [] },
  { device_slug: "ps4-dualshock-4", name: "Micro-USB Charging Port", part_number: null, category: "port", description: "Micro-USB port replacement for charging issues.", price_usd_est: 5, buy_links: [] },
  { device_slug: "ps4-dualshock-4", name: "L2 Trigger Spring", part_number: null, category: "trigger", description: "Replacement spring for L2 trigger mechanism.", price_usd_est: 3, buy_links: [] },
  { device_slug: "ps4-dualshock-4", name: "R2 Trigger Spring", part_number: null, category: "trigger", description: "Replacement spring for R2 trigger mechanism.", price_usd_est: 3, buy_links: [] },
  { device_slug: "ps4-dualshock-4", name: "1000mAh LiPo Battery", part_number: "LIP1522", category: "battery", description: "Replacement battery compatible with all DualShock 4 versions.", price_usd_est: 12, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/dualshock-4-battery" }] },
  { device_slug: "ps4-dualshock-4", name: "Light Bar Ribbon Cable", part_number: null, category: "cable", description: "Flex cable connecting light bar to mainboard.", price_usd_est: 5, buy_links: [] },

  // ── Xbox Series X/S Controller ────────────────────────────────
  { device_slug: "xbox-series-x-controller", name: "Left Analog Stick Module", part_number: null, category: "joystick", description: "Potentiometer-based stick module for Xbox Series controller drift.", price_usd_est: 8, buy_links: [] },
  { device_slug: "xbox-series-x-controller", name: "Right Analog Stick Module", part_number: null, category: "joystick", description: "Right stick replacement module.", price_usd_est: 8, buy_links: [] },
  { device_slug: "xbox-series-x-controller", name: "Left Bumper Button (LB)", part_number: null, category: "button", description: "LB bumper button plastic replacement.", price_usd_est: 5, buy_links: [] },
  { device_slug: "xbox-series-x-controller", name: "Right Bumper Button (RB)", part_number: null, category: "button", description: "RB bumper button plastic replacement.", price_usd_est: 5, buy_links: [] },
  { device_slug: "xbox-series-x-controller", name: "USB-C Port Board", part_number: null, category: "port", description: "USB-C charging and data port replacement board.", price_usd_est: 10, buy_links: [] },
  { device_slug: "xbox-series-x-controller", name: "AA Battery Pack (Rechargeable)", part_number: null, category: "battery", description: "Microsoft Play & Charge Kit replacement rechargeable pack.", price_usd_est: 22, buy_links: [] },

  // ── Nintendo Switch Pro Controller ────────────────────────────
  { device_slug: "nintendo-switch-pro-controller", name: "Left Analog Stick Module", part_number: null, category: "joystick", description: "Alps stick module for Pro Controller drift repair.", price_usd_est: 8, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/switch-pro-controller-stick" }] },
  { device_slug: "nintendo-switch-pro-controller", name: "Right Analog Stick Module", part_number: null, category: "joystick", description: "Right stick module replacement.", price_usd_est: 8, buy_links: [] },
  { device_slug: "nintendo-switch-pro-controller", name: "USB-C Charging Port", part_number: null, category: "port", description: "Charging port board replacement.", price_usd_est: 10, buy_links: [] },
  { device_slug: "nintendo-switch-pro-controller", name: "1300mAh LiPo Battery", part_number: "HAC-015", category: "battery", description: "Replacement battery for Switch Pro Controller.", price_usd_est: 15, buy_links: [] },

  // ── Joy-Con Left ──────────────────────────────────────────────
  { device_slug: "joy-con-left", name: "Left Analog Stick Module", part_number: "ALPS RKJXV", category: "joystick", description: "Alps stick module — the primary fix for Joy-Con drift.", price_usd_est: 7, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/joy-con-analog-stick" }] },
  { device_slug: "joy-con-left", name: "520mAh LiPo Battery", part_number: "HAC-006", category: "battery", description: "Left Joy-Con replacement battery.", price_usd_est: 10, buy_links: [] },
  { device_slug: "joy-con-left", name: "Rail Flex Cable", part_number: null, category: "cable", description: "Flex cable connecting Joy-Con to the rail connector.", price_usd_est: 6, buy_links: [] },
  { device_slug: "joy-con-left", name: "ZL Button", part_number: null, category: "button", description: "ZL trigger button replacement.", price_usd_est: 3, buy_links: [] },

  // ── Joy-Con Right ─────────────────────────────────────────────
  { device_slug: "joy-con-right", name: "Right Analog Stick Module", part_number: "ALPS RKJXV", category: "joystick", description: "Alps stick module for right Joy-Con drift.", price_usd_est: 7, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/joy-con-analog-stick" }] },
  { device_slug: "joy-con-right", name: "520mAh LiPo Battery", part_number: "HAC-007", category: "battery", description: "Right Joy-Con replacement battery.", price_usd_est: 10, buy_links: [] },
  { device_slug: "joy-con-right", name: "ZR Button", part_number: null, category: "button", description: "ZR trigger button replacement.", price_usd_est: 3, buy_links: [] },

  // ── Steam Deck ────────────────────────────────────────────────
  { device_slug: "steam-deck", name: "Left Analog Stick Module", part_number: null, category: "joystick", description: "Steam Deck left stick replacement module.", price_usd_est: 12, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/steam-deck-analog-stick" }] },
  { device_slug: "steam-deck", name: "Right Analog Stick Module", part_number: null, category: "joystick", description: "Steam Deck right stick replacement module.", price_usd_est: 12, buy_links: [] },
  { device_slug: "steam-deck", name: "40Wh LiPo Battery", part_number: "1ICP5/58/98-2", category: "battery", description: "Steam Deck main battery replacement.", price_usd_est: 50, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/steam-deck-battery" }] },
  { device_slug: "steam-deck", name: "7\" LCD Screen Assembly", part_number: null, category: "screen", description: "Complete display replacement for Steam Deck LCD model.", price_usd_est: 80, buy_links: [] },
  { device_slug: "steam-deck", name: "USB-C Port Board", part_number: null, category: "port", description: "USB-C charging and dock port replacement.", price_usd_est: 20, buy_links: [] },
  { device_slug: "steam-deck", name: "Cooling Fan", part_number: null, category: "cooling", description: "Replacement fan for loud or grinding fan issues.", price_usd_est: 25, buy_links: [] },

  // ── iPhone 15 Pro ─────────────────────────────────────────────
  { device_slug: "iphone-15-pro", name: "OLED Screen Assembly (with Face ID)", part_number: null, category: "screen", description: "Complete OLED display with Face ID sensors intact — critical for Face ID preservation.", price_usd_est: 280, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-15-pro-screen" }] },
  { device_slug: "iphone-15-pro", name: "3274mAh Battery", part_number: null, category: "battery", description: "Replacement battery for iPhone 15 Pro.", price_usd_est: 35, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-15-pro-battery" }] },
  { device_slug: "iphone-15-pro", name: "USB-C Port Flex", part_number: null, category: "port", description: "USB-C charging and Thunderbolt port flex cable.", price_usd_est: 30, buy_links: [] },
  { device_slug: "iphone-15-pro", name: "Rear Camera Module (Triple)", part_number: null, category: "camera", description: "Complete rear triple camera system replacement.", price_usd_est: 180, buy_links: [] },
  { device_slug: "iphone-15-pro", name: "Rear Titanium Frame", part_number: null, category: "frame", description: "Titanium outer frame (advanced repair).", price_usd_est: 120, buy_links: [] },

  // ── iPhone 15 ─────────────────────────────────────────────────
  { device_slug: "iphone-15", name: "OLED Screen Assembly", part_number: null, category: "screen", description: "Dynamic Island OLED display for iPhone 15.", price_usd_est: 220, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-15-screen" }] },
  { device_slug: "iphone-15", name: "3349mAh Battery", part_number: null, category: "battery", description: "Replacement battery for iPhone 15.", price_usd_est: 30, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-15-battery" }] },
  { device_slug: "iphone-15", name: "USB-C Port Assembly", part_number: null, category: "port", description: "USB-C charge port assembly.", price_usd_est: 25, buy_links: [] },

  // ── iPhone 14 ─────────────────────────────────────────────────
  { device_slug: "iphone-14", name: "OLED Screen Assembly (with Face ID)", part_number: null, category: "screen", description: "Full OLED display with TrueDepth camera.", price_usd_est: 190, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-14-screen" }] },
  { device_slug: "iphone-14", name: "3279mAh Battery", part_number: null, category: "battery", description: "iPhone 14 replacement battery.", price_usd_est: 28, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-14-battery" }] },
  { device_slug: "iphone-14", name: "Lightning Charge Port Flex", part_number: null, category: "port", description: "Lightning port flex cable and microphone assembly.", price_usd_est: 15, buy_links: [] },
  { device_slug: "iphone-14", name: "Rear Glass Panel", part_number: null, category: "glass", description: "Rear glass repair (requires heating to remove).", price_usd_est: 40, buy_links: [] },

  // ── iPhone 13 ─────────────────────────────────────────────────
  { device_slug: "iphone-13", name: "Super Retina OLED Screen", part_number: null, category: "screen", description: "iPhone 13 display assembly.", price_usd_est: 130, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-13-screen" }] },
  { device_slug: "iphone-13", name: "3227mAh Battery", part_number: null, category: "battery", description: "iPhone 13 replacement battery.", price_usd_est: 22, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/iphone-13-battery" }] },
  { device_slug: "iphone-13", name: "Lightning Port Flex", part_number: null, category: "port", description: "Lightning charge port and speaker assembly.", price_usd_est: 12, buy_links: [] },

  // ── Samsung Galaxy S24 ────────────────────────────────────────
  { device_slug: "samsung-galaxy-s24", name: "Dynamic AMOLED Screen Assembly", part_number: null, category: "screen", description: "Galaxy S24 complete screen replacement.", price_usd_est: 200, buy_links: [] },
  { device_slug: "samsung-galaxy-s24", name: "4000mAh Battery", part_number: null, category: "battery", description: "Galaxy S24 battery replacement.", price_usd_est: 30, buy_links: [] },
  { device_slug: "samsung-galaxy-s24", name: "USB-C Charging Port", part_number: null, category: "port", description: "USB-C port flex cable for S24.", price_usd_est: 18, buy_links: [] },
  { device_slug: "samsung-galaxy-s24", name: "Rear Glass Panel", part_number: null, category: "glass", description: "Back glass cover for Galaxy S24.", price_usd_est: 35, buy_links: [] },

  // ── Google Pixel 8 ────────────────────────────────────────────
  { device_slug: "google-pixel-8", name: "OLED Screen Assembly", part_number: null, category: "screen", description: "Pixel 8 display replacement.", price_usd_est: 180, buy_links: [] },
  { device_slug: "google-pixel-8", name: "4575mAh Battery", part_number: null, category: "battery", description: "Pixel 8 battery replacement.", price_usd_est: 32, buy_links: [] },
  { device_slug: "google-pixel-8", name: "USB-C Port Flex", part_number: null, category: "port", description: "Charging port flex for Pixel 8.", price_usd_est: 20, buy_links: [] },

  // ── MacBook Pro M3 ────────────────────────────────────────────
  { device_slug: "macbook-pro-m3", name: "Battery Assembly", part_number: "A2780", category: "battery", description: "MacBook Pro M3 14\" battery pack (6 cells).", price_usd_est: 130, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/macbook-pro-m3-battery" }] },
  { device_slug: "macbook-pro-m3", name: "Liquid Retina XDR Display Assembly", part_number: null, category: "screen", description: "Complete display replacement for MacBook Pro M3 14\".", price_usd_est: 450, buy_links: [] },
  { device_slug: "macbook-pro-m3", name: "MagSafe 3 Charging Port", part_number: null, category: "port", description: "MagSafe 3 board and cable assembly.", price_usd_est: 60, buy_links: [] },
  { device_slug: "macbook-pro-m3", name: "Keyboard (US English)", part_number: null, category: "keyboard", description: "Full keyboard assembly replacement.", price_usd_est: 180, buy_links: [] },
  { device_slug: "macbook-pro-m3", name: "Cooling Fan (Left)", part_number: null, category: "cooling", description: "Left cooling fan replacement.", price_usd_est: 40, buy_links: [] },
  { device_slug: "macbook-pro-m3", name: "Cooling Fan (Right)", part_number: null, category: "cooling", description: "Right cooling fan replacement.", price_usd_est: 40, buy_links: [] },

  // ── MacBook Pro M2 ────────────────────────────────────────────
  { device_slug: "macbook-pro-m2", name: "Battery Assembly", part_number: "A2442", category: "battery", description: "MacBook Pro M2 14\" battery.", price_usd_est: 120, buy_links: [] },
  { device_slug: "macbook-pro-m2", name: "Display Assembly", part_number: null, category: "screen", description: "MacBook Pro M2 14\" complete display.", price_usd_est: 420, buy_links: [] },
  { device_slug: "macbook-pro-m2", name: "MagSafe 3 Board", part_number: null, category: "port", description: "MagSafe 3 charging board.", price_usd_est: 55, buy_links: [] },

  // ── MacBook Pro M1 ────────────────────────────────────────────
  { device_slug: "macbook-pro-m1", name: "Battery Assembly", part_number: "A2338", category: "battery", description: "MacBook Pro M1 13\" battery (58.2Wh).", price_usd_est: 90, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/macbook-pro-m1-battery" }] },
  { device_slug: "macbook-pro-m1", name: "Display Assembly", part_number: null, category: "screen", description: "MacBook Pro M1 13\" display.", price_usd_est: 350, buy_links: [] },

  // ── Nintendo Switch ────────────────────────────────────────────
  { device_slug: "nintendo-switch", name: "USB-C Charging Port", part_number: null, category: "port", description: "Switch main board USB-C port — advanced soldering repair.", price_usd_est: 15, buy_links: [] },
  { device_slug: "nintendo-switch", name: "4310mAh Battery", part_number: "HAC-003", category: "battery", description: "Nintendo Switch console battery replacement.", price_usd_est: 25, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/nintendo-switch-battery" }] },
  { device_slug: "nintendo-switch", name: "6.2\" LCD Screen", part_number: null, category: "screen", description: "Nintendo Switch touchscreen LCD replacement.", price_usd_est: 45, buy_links: [{ store: "iFixit", label: "Buy on iFixit", url: "https://www.ifixit.com/products/nintendo-switch-screen" }] },
  { device_slug: "nintendo-switch", name: "Left Joy-Con Rail", part_number: null, category: "connector", description: "Left rail slider for Joy-Con attachment.", price_usd_est: 8, buy_links: [] },
  { device_slug: "nintendo-switch", name: "Cooling Fan", part_number: null, category: "cooling", description: "Internal fan for Switch thermal management.", price_usd_est: 20, buy_links: [] },

  // ── AirPods Pro 2nd Gen ───────────────────────────────────────
  { device_slug: "airpods-pro-2nd-gen", name: "Ear Tip Set (S/M/L)", part_number: null, category: "accessory", description: "Silicone ear tips set for better seal and noise cancellation.", price_usd_est: 12, buy_links: [{ store: "Amazon", label: "Buy on Amazon", url: "https://www.amazon.com/s?k=airpods+pro+2+ear+tips" }] },
  { device_slug: "airpods-pro-2nd-gen", name: "Charging Case (MagSafe)", part_number: null, category: "case", description: "Replacement MagSafe charging case for AirPods Pro 2.", price_usd_est: 80, buy_links: [] },

  // ── Sony WH-1000XM5 ───────────────────────────────────────────
  { device_slug: "sony-wh-1000xm5", name: "Ear Cushion Set", part_number: null, category: "cushion", description: "Replacement ear pad cushions — fixes peeling vinyl issue.", price_usd_est: 22, buy_links: [{ store: "Amazon", label: "Buy on Amazon", url: "https://www.amazon.com/s?k=sony+xm5+ear+cushion+replacement" }] },
  { device_slug: "sony-wh-1000xm5", name: "USB-C Charging Port", part_number: null, category: "port", description: "Charging port board replacement.", price_usd_est: 18, buy_links: [] },
  { device_slug: "sony-wh-1000xm5", name: "Headband Padding", part_number: null, category: "accessory", description: "Replacement headband padding strip.", price_usd_est: 15, buy_links: [{ store: "Amazon", label: "Buy on Amazon", url: "https://www.amazon.com/s?k=sony+xm5+headband+replacement" }] },

  // ── Kindle Paperwhite ─────────────────────────────────────────
  { device_slug: "kindle-paperwhite", name: "E-ink Display Module", part_number: null, category: "screen", description: "6.8\" E-ink display replacement for Kindle Paperwhite 11th gen.", price_usd_est: 55, buy_links: [] },
  { device_slug: "kindle-paperwhite", name: "1750mAh Battery", part_number: null, category: "battery", description: "Kindle Paperwhite battery replacement.", price_usd_est: 18, buy_links: [] },
  { device_slug: "kindle-paperwhite", name: "USB-C Port Board", part_number: null, category: "port", description: "Charging port board for Paperwhite.", price_usd_est: 12, buy_links: [] },

  // ── GoPro HERO12 ──────────────────────────────────────────────
  { device_slug: "gopro-hero-12", name: "Enduro Battery", part_number: "ADBAT-011", category: "battery", description: "Official GoPro Enduro rechargeable battery.", price_usd_est: 25, buy_links: [{ store: "Amazon", label: "Buy on Amazon", url: "https://www.amazon.com/s?k=gopro+enduro+battery+hero12" }] },
  { device_slug: "gopro-hero-12", name: "Lens Replacement Kit", part_number: null, category: "lens", description: "Replacement protective lens for HERO12 — fixes fogging.", price_usd_est: 12, buy_links: [{ store: "Amazon", label: "Buy on Amazon", url: "https://www.amazon.com/s?k=gopro+hero+12+lens+replacement" }] },
  { device_slug: "gopro-hero-12", name: "Battery Door Latch", part_number: null, category: "housing", description: "Replacement battery door and latch assembly.", price_usd_est: 8, buy_links: [] },

  // ── LG Magic Remote ───────────────────────────────────────────
  { device_slug: "lg-magic-remote", name: "Scroll Wheel Assembly", part_number: null, category: "button", description: "Replacement scroll wheel for LG Magic Remote.", price_usd_est: 8, buy_links: [] },
  { device_slug: "lg-magic-remote", name: "AA Battery Spring Contact", part_number: null, category: "contact", description: "Battery contact springs for corrosion repair.", price_usd_est: 3, buy_links: [] },

  // ── Apple TV Siri Remote ──────────────────────────────────────
  { device_slug: "apple-tv-siri-remote", name: "USB-C Charging Port", part_number: null, category: "port", description: "Siri Remote USB-C port replacement.", price_usd_est: 15, buy_links: [] },
  { device_slug: "apple-tv-siri-remote", name: "Clickpad Assembly", part_number: null, category: "touchpad", description: "Clickpad touch surface replacement.", price_usd_est: 25, buy_links: [] },

  // ── Roku Voice Remote ─────────────────────────────────────────
  { device_slug: "roku-voice-remote", name: "USB-C Charge Port", part_number: null, category: "port", description: "USB-C port for Roku Voice Remote Pro charging.", price_usd_est: 8, buy_links: [] },

  // ── PS5 Console ───────────────────────────────────────────────
  { device_slug: "ps5-console", name: "HDMI Port", part_number: null, category: "port", description: "PS5 HDMI 2.1 port replacement — requires soldering.", price_usd_est: 25, buy_links: [] },
  { device_slug: "ps5-console", name: "Disc Drive Assembly", part_number: null, category: "drive", description: "Complete disc drive assembly for PS5 disc edition.", price_usd_est: 95, buy_links: [] },
  { device_slug: "ps5-console", name: "Cooling Fan", part_number: null, category: "cooling", description: "PS5 main cooling fan replacement.", price_usd_est: 35, buy_links: [] },

  // ── Xbox Series X Console ─────────────────────────────────────
  { device_slug: "xbox-series-x", name: "HDMI Port", part_number: null, category: "port", description: "Xbox Series X HDMI 2.1 port replacement.", price_usd_est: 22, buy_links: [] },
  { device_slug: "xbox-series-x", name: "Disc Drive Assembly", part_number: null, category: "drive", description: "Xbox Series X optical disc drive.", price_usd_est: 75, buy_links: [] },
  { device_slug: "xbox-series-x", name: "Cooling Fan", part_number: null, category: "cooling", description: "Xbox Series X main fan replacement.", price_usd_est: 30, buy_links: [] },

  // ── GameCube Controller ───────────────────────────────────────
  { device_slug: "gamecube-controller", name: "C-Stick Module", part_number: null, category: "joystick", description: "Replacement C-stick potentiometer module.", price_usd_est: 5, buy_links: [] },
  { device_slug: "gamecube-controller", name: "L Trigger Spring", part_number: null, category: "trigger", description: "Trigger spring for L button analog depth.", price_usd_est: 2, buy_links: [] },
  { device_slug: "gamecube-controller", name: "R Trigger Spring", part_number: null, category: "trigger", description: "Trigger spring for R button analog depth.", price_usd_est: 2, buy_links: [] },
  { device_slug: "gamecube-controller", name: "A Button Rubber Contact", part_number: null, category: "button", description: "Conductive rubber contact for mushy A button.", price_usd_est: 3, buy_links: [] },

  // ── iPad Pro ──────────────────────────────────────────────────
  { device_slug: "ipad-pro", name: "Liquid Retina XDR Screen", part_number: null, category: "screen", description: "iPad Pro M2 11\" display replacement.", price_usd_est: 280, buy_links: [] },
  { device_slug: "ipad-pro", name: "7538mAh Battery", part_number: null, category: "battery", description: "iPad Pro M2 11\" battery replacement.", price_usd_est: 55, buy_links: [] },
  { device_slug: "ipad-pro", name: "USB-C Port Board", part_number: null, category: "port", description: "USB-C Thunderbolt 4 port board.", price_usd_est: 40, buy_links: [] },

  // ── iPad Air ──────────────────────────────────────────────────
  { device_slug: "ipad-air", name: "Liquid Retina Display", part_number: null, category: "screen", description: "iPad Air 5th gen 10.9\" display.", price_usd_est: 180, buy_links: [] },
  { device_slug: "ipad-air", name: "7606mAh Battery", part_number: null, category: "battery", description: "iPad Air 5th gen battery replacement.", price_usd_est: 45, buy_links: [] },

  // ── Samsung Galaxy S23 ────────────────────────────────────────
  { device_slug: "samsung-galaxy-s23", name: "AMOLED Screen Assembly", part_number: null, category: "screen", description: "Galaxy S23 display replacement.", price_usd_est: 175, buy_links: [] },
  { device_slug: "samsung-galaxy-s23", name: "3900mAh Battery", part_number: null, category: "battery", description: "Galaxy S23 battery replacement.", price_usd_est: 28, buy_links: [] },

  // ── Samsung Galaxy S22 ────────────────────────────────────────
  { device_slug: "samsung-galaxy-s22", name: "AMOLED Screen Assembly", part_number: null, category: "screen", description: "Galaxy S22 display replacement.", price_usd_est: 150, buy_links: [] },
  { device_slug: "samsung-galaxy-s22", name: "3700mAh Battery", part_number: null, category: "battery", description: "Galaxy S22 battery replacement.", price_usd_est: 25, buy_links: [] },

  // ── Google Pixel 7 ────────────────────────────────────────────
  { device_slug: "google-pixel-7", name: "OLED Screen Assembly", part_number: null, category: "screen", description: "Pixel 7 display replacement.", price_usd_est: 160, buy_links: [] },
  { device_slug: "google-pixel-7", name: "4355mAh Battery", part_number: null, category: "battery", description: "Pixel 7 battery replacement.", price_usd_est: 28, buy_links: [] },

  // ── OnePlus 12 ────────────────────────────────────────────────
  { device_slug: "oneplus-12", name: "LTPO AMOLED Screen", part_number: null, category: "screen", description: "OnePlus 12 display replacement.", price_usd_est: 190, buy_links: [] },
  { device_slug: "oneplus-12", name: "5400mAh Battery", part_number: null, category: "battery", description: "OnePlus 12 battery replacement.", price_usd_est: 30, buy_links: [] },

  // ── Motorola Edge 40 ──────────────────────────────────────────
  { device_slug: "motorola-edge-40", name: "pOLED Screen Assembly", part_number: null, category: "screen", description: "Motorola Edge 40 curved display replacement.", price_usd_est: 120, buy_links: [] },
  { device_slug: "motorola-edge-40", name: "4400mAh Battery", part_number: null, category: "battery", description: "Edge 40 battery replacement.", price_usd_est: 25, buy_links: [] },
];
