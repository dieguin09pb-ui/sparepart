import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://ptywpubhtqkewyzzmhlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXdwdWJodHFrZXd5enptaGxqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2OTYxNywiZXhwIjoyMDkyMDQ1NjE3fQ.HxfWEFeHIFVKC8M6bkIrGJTgKX_YksO6ObpemQ9C5nA'
);

const { data: devices } = await sb.from('devices').select('id, slug, name, brand');
const d = Object.fromEntries(devices.map(x => [x.slug, { id: x.id, name: x.name, brand: x.brand }]));

function links(deviceName, partName) {
  const q = encodeURIComponent(`${deviceName} ${partName}`);
  return [
    { store: 'iFixit', label: 'iFixit', url: `https://www.ifixit.com/Search?query=${q}` },
    { store: 'Amazon', label: 'Amazon', url: `https://www.amazon.com/s?k=${q}` },
    { store: 'eBay',   label: 'eBay',   url: `https://www.ebay.com/sch/i.html?_nkw=${q}` },
  ];
}

function part(slug, name, category, description, price, extraLinks) {
  const dev = d[slug];
  if (!dev) return null;
  return {
    device_id: dev.id,
    name,
    category,
    description,
    price_usd_est: price,
    buy_links: extraLinks ?? links(dev.name, name),
  };
}

// Helper to generate parts for any iPhone model
function iphoneParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  const isModern = slug.includes('15') || slug.includes('16') || slug.includes('17') || slug.includes('14');
  const hasHomeButton = slug.includes('7') || slug.includes('8') || slug.includes('9') || slug.includes('se');
  const connector = (slug.includes('15') || slug.includes('16') || slug.includes('17')) ? 'USB-C' : 'Lightning';
  return [
    { device_id: dev.id, name: 'OLED Display Assembly', category: 'screen', description: `Complete screen replacement for ${n}. Includes digitizer and frame.`, price_usd_est: hasHomeButton ? 59.99 : 89.99, buy_links: links(n, 'OLED Display Assembly') },
    { device_id: dev.id, name: 'Battery', category: 'battery', description: `OEM-spec Li-Ion battery for ${n}. Restores full-day battery life.`, price_usd_est: 14.99, buy_links: links(n, 'battery replacement') },
    { device_id: dev.id, name: `${connector} Charging Port Flex`, category: 'charging', description: `Replacement ${connector} charging port + microphone assembly for ${n}.`, price_usd_est: 12.99, buy_links: links(n, `${connector} charging port`) },
    { device_id: dev.id, name: 'Rear Camera Module', category: 'camera', description: `OEM rear camera replacement for ${n}. Fixes blurry or broken main camera.`, price_usd_est: 29.99, buy_links: links(n, 'rear camera module') },
    { device_id: dev.id, name: 'Front Camera & Sensor Flex', category: 'camera', description: `Front camera, Face ID/proximity sensor assembly for ${n}.`, price_usd_est: 19.99, buy_links: links(n, 'front camera sensor flex') },
    { device_id: dev.id, name: 'Earpiece Speaker', category: 'speaker', description: `Top earpiece speaker for ${n}. Fixes muffled or no audio on calls.`, price_usd_est: 7.99, buy_links: links(n, 'earpiece speaker') },
    { device_id: dev.id, name: 'Loud Speaker Module', category: 'speaker', description: `Bottom loudspeaker replacement for ${n}. Fixes distorted or silent speakers.`, price_usd_est: 9.99, buy_links: links(n, 'loudspeaker module') },
    { device_id: dev.id, name: 'Power Button Flex Cable', category: 'button', description: `Power/sleep button flex cable for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'power button flex cable') },
    { device_id: dev.id, name: 'Volume & Mute Button Flex', category: 'button', description: `Volume up/down and mute switch flex cable for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'volume button flex cable') },
    { device_id: dev.id, name: hasHomeButton ? 'Home Button with Touch ID' : 'Action Button Assembly', category: 'button', description: hasHomeButton ? `Home button + Touch ID sensor for ${n}.` : `Action button replacement for ${n}.`, price_usd_est: 11.99, buy_links: links(n, hasHomeButton ? 'home button Touch ID' : 'action button') },
    { device_id: dev.id, name: 'Back Glass Panel', category: 'housing', description: `Rear glass panel for ${n}. Fixes cracked or shattered back.`, price_usd_est: 19.99, buy_links: links(n, 'back glass panel') },
    { device_id: dev.id, name: 'SIM Card Tray', category: 'housing', description: `SIM card tray for ${n}. Replaces bent or damaged trays.`, price_usd_est: 4.99, buy_links: links(n, 'SIM card tray') },
    { device_id: dev.id, name: 'Taptic Engine (Vibration Motor)', category: 'vibration', description: `Taptic engine for ${n}. Restores haptic feedback.`, price_usd_est: 12.99, buy_links: links(n, 'taptic engine vibration motor') },
    { device_id: dev.id, name: 'WiFi / Bluetooth Antenna', category: 'antenna', description: `Internal WiFi and Bluetooth antenna flex for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'WiFi antenna') },
    { device_id: dev.id, name: 'Waterproof Adhesive Seal Kit', category: 'adhesive', description: `Pre-cut adhesive strips to re-seal ${n} after repair. Maintains water resistance.`, price_usd_est: 3.99, buy_links: links(n, 'waterproof adhesive seal') },
    { device_id: dev.id, name: 'Screen Repair Tool Kit', category: 'tools', description: `Pentalobe screwdrivers, spudgers, suction cups for opening ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'iPhone repair tool kit') },
  ];
}

// Helper to generate parts for Samsung Galaxy
function samsungParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'AMOLED Display Assembly', category: 'screen', description: `Full AMOLED screen + frame assembly for ${n}.`, price_usd_est: 79.99, buy_links: links(n, 'AMOLED display assembly') },
    { device_id: dev.id, name: 'Battery', category: 'battery', description: `Genuine-spec replacement battery for ${n}.`, price_usd_est: 16.99, buy_links: links(n, 'battery replacement') },
    { device_id: dev.id, name: 'USB-C Charging Port Board', category: 'charging', description: `USB-C charging + microphone sub board for ${n}.`, price_usd_est: 14.99, buy_links: links(n, 'USB-C charging port board') },
    { device_id: dev.id, name: 'Rear Camera Array', category: 'camera', description: `Multi-lens rear camera module for ${n}.`, price_usd_est: 34.99, buy_links: links(n, 'rear camera module') },
    { device_id: dev.id, name: 'Front Camera Module', category: 'camera', description: `Selfie camera + punch-hole sensor for ${n}.`, price_usd_est: 18.99, buy_links: links(n, 'front camera module') },
    { device_id: dev.id, name: 'Earpiece Speaker', category: 'speaker', description: `Top earpiece speaker for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'earpiece speaker') },
    { device_id: dev.id, name: 'Loudspeaker Module', category: 'speaker', description: `Bottom loudspeaker for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'loudspeaker module') },
    { device_id: dev.id, name: 'Power Button Flex', category: 'button', description: `Side power / fingerprint sensor flex cable for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'power button fingerprint flex') },
    { device_id: dev.id, name: 'Volume Button Flex', category: 'button', description: `Volume up/down button flex cable for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'volume button flex cable') },
    { device_id: dev.id, name: 'Back Glass Panel', category: 'housing', description: `Rear glass replacement for ${n}.`, price_usd_est: 22.99, buy_links: links(n, 'back glass replacement') },
    { device_id: dev.id, name: 'SIM Tray', category: 'housing', description: `SIM card tray for ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'SIM tray') },
    { device_id: dev.id, name: 'Vibration Motor', category: 'vibration', description: `Linear vibration motor for ${n}. Restores haptic feedback.`, price_usd_est: 8.99, buy_links: links(n, 'vibration motor') },
    { device_id: dev.id, name: 'Wireless Charging Coil', category: 'charging', description: `NFC + wireless charging coil for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'wireless charging coil NFC') },
    { device_id: dev.id, name: 'In-Display Fingerprint Sensor', category: 'sensor', description: `Under-display optical fingerprint scanner for ${n}.`, price_usd_est: 24.99, buy_links: links(n, 'in-display fingerprint sensor') },
    { device_id: dev.id, name: 'Adhesive Seal Kit', category: 'adhesive', description: `Waterproof adhesive strips for reassembly of ${n}.`, price_usd_est: 3.99, buy_links: links(n, 'Samsung waterproof adhesive') },
    { device_id: dev.id, name: 'Screen Repair Tool Kit', category: 'tools', description: `Heat gun, picks, spudgers, and pry tools for Samsung repair.`, price_usd_est: 12.99, buy_links: links(n, 'Samsung repair tool kit') },
  ];
}

// Helper for Xbox controllers
function xboxControllerParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Thumbstick Module (Pair)', category: 'joystick', description: `Replacement analog thumbstick modules for ${n}. Fixes stick drift.`, price_usd_est: 9.99, buy_links: links(n, 'thumbstick module replacement') },
    { device_id: dev.id, name: 'RB/LB Bumper Button Set', category: 'button', description: `Left and right bumper buttons for ${n}. Fixes sticky or broken bumpers.`, price_usd_est: 7.99, buy_links: links(n, 'bumper button replacement') },
    { device_id: dev.id, name: 'RT/LT Trigger Assembly', category: 'trigger', description: `Full trigger assembly with springs for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'trigger assembly replacement') },
    { device_id: dev.id, name: 'ABXY Face Button Set', category: 'button', description: `Complete A/B/X/Y button set with membranes for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'ABXY face button set') },
    { device_id: dev.id, name: 'D-Pad', category: 'button', description: `Directional pad replacement for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'D-pad replacement') },
    { device_id: dev.id, name: 'USB-C Charging Port', category: 'charging', description: `USB-C port for ${n}. Fixes no charging or loose connection.`, price_usd_est: 8.99, buy_links: links(n, 'USB-C port replacement') },
    { device_id: dev.id, name: 'Rumble Motor Set', category: 'motor', description: `Left and right vibration rumble motors for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'rumble motor set') },
    { device_id: dev.id, name: 'Front Shell', category: 'housing', description: `Front faceplate housing for ${n}. Replaces cracked or scratched shell.`, price_usd_est: 14.99, buy_links: links(n, 'front shell faceplate') },
    { device_id: dev.id, name: 'Back Shell', category: 'housing', description: `Rear housing for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'back shell housing') },
    { device_id: dev.id, name: 'Battery Pack', category: 'battery', description: `Rechargeable battery pack for ${n}. OEM-spec capacity.`, price_usd_est: 14.99, buy_links: links(n, 'rechargeable battery pack') },
    { device_id: dev.id, name: 'PCB Main Board', category: 'board', description: `Main circuit board for ${n}. Last resort for dead controller.`, price_usd_est: 29.99, buy_links: links(n, 'main PCB board') },
    { device_id: dev.id, name: 'Thumbstick Rubber Caps (Pair)', category: 'joystick', description: `Anti-slip rubber thumbstick caps for ${n}.`, price_usd_est: 3.99, buy_links: links(n, 'thumbstick rubber caps') },
    { device_id: dev.id, name: 'Trigger Springs Set', category: 'trigger', description: `Replacement metal trigger springs for ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'trigger springs') },
    { device_id: dev.id, name: 'Start/Select/Menu Buttons', category: 'button', description: `Menu, view and profile button set for ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'menu view button set') },
    { device_id: dev.id, name: 'Screwdriver Set (T6/T8)', category: 'tools', description: `Torx T6 and T8 screwdrivers needed to open ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'Torx T6 T8 screwdriver set') },
  ];
}

function ps5Parts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Thumbstick Module (Pair)', category: 'joystick', description: `Alps-spec analog sticks for ${n}. The #1 fix for stick drift.`, price_usd_est: 9.99, buy_links: [{ store: 'iFixit', label: 'iFixit', url: 'https://www.ifixit.com/Search?query=PS5+DualSense+thumbstick' }, { store: 'Amazon', label: 'Amazon', url: 'https://www.amazon.com/s?k=PS5+DualSense+thumbstick+replacement' }, { store: 'eBay', label: 'eBay', url: 'https://www.ebay.com/sch/i.html?_nkw=PS5+DualSense+thumbstick' }] },
    { device_id: dev.id, name: 'Hall Effect Thumbstick Upgrade', category: 'joystick', description: `Magnetic Hall Effect analog sticks — eliminates drift permanently.`, price_usd_est: 19.99, buy_links: links(n, 'Hall Effect thumbstick upgrade') },
    { device_id: dev.id, name: 'L2/R2 Trigger Assembly', category: 'trigger', description: `Adaptive trigger mechanism for ${n}. Fixes broken resistance or stuck triggers.`, price_usd_est: 14.99, buy_links: links(n, 'DualSense L2 R2 trigger assembly') },
    { device_id: dev.id, name: 'Trigger Spring Set', category: 'trigger', description: `Metal springs for L2/R2 triggers on ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'DualSense trigger springs') },
    { device_id: dev.id, name: 'L1/R1 Bumper Button Set', category: 'button', description: `Shoulder bumper buttons with hinges for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'DualSense L1 R1 bumper') },
    { device_id: dev.id, name: 'Cross/Circle/Square/Triangle Button Set', category: 'button', description: `Complete face button set for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'DualSense face buttons') },
    { device_id: dev.id, name: 'USB-C Charging Port', category: 'charging', description: `USB-C port for ${n}. Fixes intermittent charging.`, price_usd_est: 9.99, buy_links: links(n, 'DualSense USB-C port') },
    { device_id: dev.id, name: 'Battery (LIP1708)', category: 'battery', description: `1560mAh LIP1708 rechargeable battery for ${n}.`, price_usd_est: 16.99, buy_links: [{ store: 'iFixit', label: 'iFixit', url: 'https://www.ifixit.com/Search?query=PS5+DualSense+battery+LIP1708' }, { store: 'Amazon', label: 'Amazon', url: 'https://www.amazon.com/s?k=PS5+DualSense+battery+LIP1708' }, { store: 'eBay', label: 'eBay', url: 'https://www.ebay.com/sch/i.html?_nkw=PS5+DualSense+battery' }] },
    { device_id: dev.id, name: 'Touchpad', category: 'touchpad', description: `Capacitive touchpad panel for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'DualSense touchpad') },
    { device_id: dev.id, name: 'Speaker', category: 'speaker', description: `Built-in speaker for ${n}. Fixes no sound or distorted audio.`, price_usd_est: 8.99, buy_links: links(n, 'DualSense speaker') },
    { device_id: dev.id, name: 'Rumble Motor Set', category: 'motor', description: `Left and right haptic rumble motors for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'DualSense rumble motor') },
    { device_id: dev.id, name: 'D-Pad', category: 'button', description: `Directional pad for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'DualSense D-pad') },
    { device_id: dev.id, name: 'Front Shell (White)', category: 'housing', description: `Front faceplate for ${n}. Official white colorway.`, price_usd_est: 18.99, buy_links: links(n, 'DualSense front shell') },
    { device_id: dev.id, name: 'Back Shell', category: 'housing', description: `Rear housing for ${n}.`, price_usd_est: 15.99, buy_links: links(n, 'DualSense back shell') },
    { device_id: dev.id, name: 'Headphone Jack', category: 'audio', description: `3.5mm audio jack for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'DualSense headphone jack') },
    { device_id: dev.id, name: 'Repair Tool Kit (T8/T9)', category: 'tools', description: `Torx T8/T9 bits, spudgers, and pry tools for opening ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'PS5 controller repair tool kit') },
  ];
}

function switchProParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Thumbstick Module (Pair)', category: 'joystick', description: `Replacement analog sticks for ${n}. Fixes stick drift.`, price_usd_est: 8.99, buy_links: links(n, 'thumbstick module replacement') },
    { device_id: dev.id, name: 'Hall Effect Thumbstick Upgrade', category: 'joystick', description: `Magnetic Hall Effect sticks for ${n} — drift-free permanently.`, price_usd_est: 17.99, buy_links: links(n, 'Hall Effect thumbstick Nintendo') },
    { device_id: dev.id, name: 'ZL/ZR Trigger Assembly', category: 'trigger', description: `ZL and ZR trigger buttons with springs for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'ZL ZR trigger assembly') },
    { device_id: dev.id, name: 'L/R Bumper Set', category: 'button', description: `L and R shoulder buttons for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'Switch Pro L R bumper') },
    { device_id: dev.id, name: 'ABXY Face Button Set', category: 'button', description: `A/B/X/Y button set with rubber membranes for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'Switch Pro face buttons') },
    { device_id: dev.id, name: 'D-Pad', category: 'button', description: `D-pad replacement for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'Switch Pro D-pad') },
    { device_id: dev.id, name: 'USB-C Charging Port', category: 'charging', description: `USB-C charging port for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'Switch Pro USB-C charging port') },
    { device_id: dev.id, name: 'Battery (HAC-006)', category: 'battery', description: `1300mAh HAC-006 rechargeable battery for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'Switch Pro HAC-006 battery') },
    { device_id: dev.id, name: 'Rumble Motor Set', category: 'motor', description: `HD rumble vibration motors for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'Switch Pro rumble motor') },
    { device_id: dev.id, name: 'Front Shell', category: 'housing', description: `Front housing faceplate for ${n}.`, price_usd_est: 13.99, buy_links: links(n, 'Switch Pro front shell') },
    { device_id: dev.id, name: 'Back Shell', category: 'housing', description: `Rear housing for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'Switch Pro back shell') },
    { device_id: dev.id, name: 'Sync/Home Button Board', category: 'button', description: `Home, screenshot, and sync button PCB for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'Switch Pro home button board') },
    { device_id: dev.id, name: 'Screwdriver Set (Y00/JIS)', category: 'tools', description: `Y00 tri-point and JIS screwdrivers for opening ${n}.`, price_usd_est: 8.99, buy_links: links('nintendo-switch-pro-controller', 'Y00 JIS screwdriver') },
  ];
}

function joyConParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  const isLeft = slug.includes('left');
  return [
    { device_id: dev.id, name: 'Thumbstick Module', category: 'joystick', description: `Replacement analog stick for ${n}. The primary fix for Joy-Con drift.`, price_usd_est: 7.99, buy_links: [{ store: 'iFixit', label: 'iFixit', url: 'https://www.ifixit.com/Search?query=Joy-Con+thumbstick' }, { store: 'Amazon', label: 'Amazon', url: 'https://www.amazon.com/s?k=Joy-Con+thumbstick+replacement' }, { store: 'eBay', label: 'eBay', url: 'https://www.ebay.com/sch/i.html?_nkw=Joy-Con+thumbstick' }] },
    { device_id: dev.id, name: 'Hall Effect Thumbstick Upgrade', category: 'joystick', description: `Magnetic Hall Effect stick for ${n} — eliminates drift permanently.`, price_usd_est: 14.99, buy_links: links(n, 'Hall Effect thumbstick Joy-Con') },
    { device_id: dev.id, name: isLeft ? 'L Shoulder Button' : 'R Shoulder Button', category: 'button', description: `${isLeft ? 'L' : 'R'} shoulder button replacement for ${n}.`, price_usd_est: 4.99, buy_links: links(n, `${isLeft ? 'L' : 'R'} button replacement`) },
    { device_id: dev.id, name: isLeft ? 'ZL Trigger' : 'ZR Trigger', category: 'trigger', description: `${isLeft ? 'ZL' : 'ZR'} trigger button for ${n}.`, price_usd_est: 4.99, buy_links: links(n, `${isLeft ? 'ZL' : 'ZR'} trigger replacement`) },
    { device_id: dev.id, name: 'Face Button Set', category: 'button', description: `${isLeft ? 'D-pad and minus button' : 'ABXY and plus button'} set for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'face button set') },
    { device_id: dev.id, name: 'Battery (HAC-015 / HAC-016)', category: 'battery', description: `525mAh rechargeable battery for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'Joy-Con battery HAC-015') },
    { device_id: dev.id, name: 'Shell Housing', category: 'housing', description: `Replacement outer shell for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'Joy-Con shell housing') },
    { device_id: dev.id, name: 'Wrist Strap Rail', category: 'housing', description: `Replacement wrist strap attachment rail for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'Joy-Con wrist strap rail') },
    { device_id: dev.id, name: 'Rumble Motor', category: 'motor', description: `HD rumble vibration motor for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'Joy-Con rumble motor') },
    { device_id: dev.id, name: 'SL/SR Button Set', category: 'button', description: `SL and SR side buttons with LED for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'Joy-Con SL SR button') },
    { device_id: dev.id, name: 'Screwdriver Set (Y00/JIS)', category: 'tools', description: `Y00 tri-point and JIS screwdrivers needed to open ${n}.`, price_usd_est: 8.99, buy_links: links('joy-con-left', 'Y00 JIS screwdriver Joy-Con') },
  ];
}

function macbookParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'LCD Display Assembly', category: 'screen', description: `Full display assembly (lid) for ${n}. Includes LCD, camera, and frame.`, price_usd_est: 299.99, buy_links: links(n, 'LCD display assembly') },
    { device_id: dev.id, name: 'Battery', category: 'battery', description: `Replacement battery for ${n}. Restores full charge capacity.`, price_usd_est: 89.99, buy_links: links(n, 'battery replacement') },
    { device_id: dev.id, name: 'Keyboard (US Layout)', category: 'keyboard', description: `Full replacement keyboard for ${n}.`, price_usd_est: 79.99, buy_links: links(n, 'keyboard US layout replacement') },
    { device_id: dev.id, name: 'Trackpad / Touchpad', category: 'trackpad', description: `Force Touch trackpad for ${n}. Fixes clicking issues or unresponsive surface.`, price_usd_est: 59.99, buy_links: links(n, 'Force Touch trackpad replacement') },
    { device_id: dev.id, name: 'MagSafe/USB-C Charge Port Board', category: 'charging', description: `Charging port board for ${n}. Fixes no-charge or loose connection.`, price_usd_est: 34.99, buy_links: links(n, 'MagSafe USB-C charge port board') },
    { device_id: dev.id, name: 'Fan (Left)', category: 'cooling', description: `Left cooling fan for ${n}. Fixes overheating or loud fan noise.`, price_usd_est: 24.99, buy_links: links(n, 'cooling fan left') },
    { device_id: dev.id, name: 'Fan (Right)', category: 'cooling', description: `Right cooling fan for ${n}.`, price_usd_est: 24.99, buy_links: links(n, 'cooling fan right') },
    { device_id: dev.id, name: 'Speaker Set (Left + Right)', category: 'speaker', description: `Stereo speaker pair for ${n}. Fixes distorted or dead speakers.`, price_usd_est: 39.99, buy_links: links(n, 'speaker set') },
    { device_id: dev.id, name: 'Bottom Case', category: 'housing', description: `Bottom cover for ${n}. Replaces dented or stripped screw holes.`, price_usd_est: 49.99, buy_links: links(n, 'bottom case cover') },
    { device_id: dev.id, name: 'Top Case with Battery', category: 'housing', description: `Top case (keyboard + trackpad + battery) for ${n}.`, price_usd_est: 199.99, buy_links: links(n, 'top case battery') },
    { device_id: dev.id, name: 'Webcam (FaceTime HD)', category: 'camera', description: `FaceTime HD camera module for ${n}.`, price_usd_est: 29.99, buy_links: links(n, 'webcam FaceTime HD camera') },
    { device_id: dev.id, name: 'WiFi / Bluetooth Card', category: 'antenna', description: `AirPort WiFi + Bluetooth module for ${n}.`, price_usd_est: 34.99, buy_links: links(n, 'WiFi Bluetooth card module') },
    { device_id: dev.id, name: 'Thermal Paste', category: 'cooling', description: `High-conductivity thermal paste for CPU/GPU re-paste on ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'thermal paste CPU GPU') },
    { device_id: dev.id, name: 'Pentalobe Screwdriver Set (P5)', category: 'tools', description: `P5 pentalobe and T3/T5 Torx screwdrivers for opening ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'MacBook pentalobe P5 screwdriver') },
    { device_id: dev.id, name: 'SSD (1TB NVMe)', category: 'storage', description: `Compatible 1TB NVMe SSD upgrade for ${n}.`, price_usd_est: 89.99, buy_links: links(n, '1TB NVMe SSD upgrade MacBook') },
  ];
}

function airpodsParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Left Earbud', category: 'earbud', description: `Replacement left earbud for ${n}. Fixes no audio on left side.`, price_usd_est: 39.99, buy_links: links(n, 'left earbud replacement') },
    { device_id: dev.id, name: 'Right Earbud', category: 'earbud', description: `Replacement right earbud for ${n}. Fixes no audio on right side.`, price_usd_est: 39.99, buy_links: links(n, 'right earbud replacement') },
    { device_id: dev.id, name: 'Charging Case', category: 'case', description: `Replacement charging case for ${n}.`, price_usd_est: 49.99, buy_links: links(n, 'charging case replacement') },
    { device_id: dev.id, name: 'Ear Tips Set (S/M/L)', category: 'tips', description: `Silicone ear tip replacements in 3 sizes for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'ear tips silicone set') },
    { device_id: dev.id, name: 'Lightning / USB-C Charging Cable', category: 'cable', description: `Replacement charging cable for ${n} case.`, price_usd_est: 9.99, buy_links: links(n, 'charging cable replacement') },
    { device_id: dev.id, name: 'Mesh Dust Cover (Pair)', category: 'speaker', description: `Speaker mesh grille covers for ${n}. Replaces clogged or damaged mesh.`, price_usd_est: 4.99, buy_links: links(n, 'mesh dust cover speaker grille') },
    { device_id: dev.id, name: 'Protective Case Cover', category: 'case', description: `Silicone protective case for ${n} charging case.`, price_usd_est: 6.99, buy_links: links(n, 'protective silicone case cover') },
    { device_id: dev.id, name: 'Earbud Battery Cell', category: 'battery', description: `Tiny Li-Po battery for individual ${n} earbud. Advanced repair.`, price_usd_est: 14.99, buy_links: links(n, 'earbud battery cell replacement') },
    { device_id: dev.id, name: 'Precision Repair Tool Kit', category: 'tools', description: `Micro screwdrivers and spudgers for opening ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'AirPods precision repair tool kit') },
  ];
}

function sonyHeadphonesParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Left Ear Cushion', category: 'earcup', description: `Replacement left ear pad for ${n}. Restores comfort and sound isolation.`, price_usd_est: 19.99, buy_links: links(n, 'left ear cushion replacement') },
    { device_id: dev.id, name: 'Right Ear Cushion', category: 'earcup', description: `Replacement right ear pad for ${n}.`, price_usd_est: 19.99, buy_links: links(n, 'right ear cushion replacement') },
    { device_id: dev.id, name: 'Headband Cushion', category: 'headband', description: `Top headband pad for ${n}. Fixes worn or cracked headband.`, price_usd_est: 14.99, buy_links: links(n, 'headband cushion replacement') },
    { device_id: dev.id, name: 'Battery (WH-1000XM5)', category: 'battery', description: `Li-Ion replacement battery for ${n}.`, price_usd_est: 24.99, buy_links: links(n, 'battery replacement WH-1000XM5') },
    { device_id: dev.id, name: 'USB-C Charging Port', category: 'charging', description: `USB-C port for ${n}. Fixes intermittent charging.`, price_usd_est: 12.99, buy_links: links(n, 'USB-C charging port') },
    { device_id: dev.id, name: 'Left Driver Unit (Speaker)', category: 'speaker', description: `Left 30mm driver speaker unit for ${n}.`, price_usd_est: 34.99, buy_links: links(n, 'driver unit speaker left') },
    { device_id: dev.id, name: 'Right Driver Unit (Speaker)', category: 'speaker', description: `Right 30mm driver speaker unit for ${n}.`, price_usd_est: 34.99, buy_links: links(n, 'driver unit speaker right') },
    { device_id: dev.id, name: '3.5mm Audio Cable', category: 'cable', description: `Replacement 3.5mm audio cable for wired mode on ${n}.`, price_usd_est: 8.99, buy_links: links(n, '3.5mm audio cable replacement') },
    { device_id: dev.id, name: 'Headband Assembly', category: 'headband', description: `Full headband with slider arms for ${n}. Fixes cracked or broken headband.`, price_usd_est: 29.99, buy_links: links(n, 'headband assembly replacement') },
    { device_id: dev.id, name: 'Left Control Panel Board', category: 'board', description: `Left side control buttons PCB for ${n}.`, price_usd_est: 19.99, buy_links: links(n, 'left control panel board') },
    { device_id: dev.id, name: 'Carrying Case', category: 'case', description: `Replacement soft carrying case for ${n}.`, price_usd_est: 14.99, buy_links: links(n, 'carrying case') },
  ];
}

function nintendoSwitchParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'LCD Screen + Digitizer', category: 'screen', description: `Full LCD touchscreen assembly for ${n}. Fixes cracked or dead screen.`, price_usd_est: 59.99, buy_links: links(n, 'LCD screen digitizer') },
    { device_id: dev.id, name: 'Battery (HAC-003)', category: 'battery', description: `4310mAh HAC-003 battery for ${n}. Restores full playtime.`, price_usd_est: 19.99, buy_links: links(n, 'HAC-003 battery replacement') },
    { device_id: dev.id, name: 'Joy-Con Slider Rail (Left)', category: 'rail', description: `Left Joy-Con attachment rail for ${n}. Fixes Joy-Con not attaching.`, price_usd_est: 8.99, buy_links: links(n, 'Joy-Con slider rail left') },
    { device_id: dev.id, name: 'Joy-Con Slider Rail (Right)', category: 'rail', description: `Right Joy-Con attachment rail for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'Joy-Con slider rail right') },
    { device_id: dev.id, name: 'USB-C Charging Port', category: 'charging', description: `USB-C bottom charging port board for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'USB-C charging port board') },
    { device_id: dev.id, name: 'Kickstand', category: 'housing', description: `Replacement kickstand for ${n}. Fixes broken or loose stand.`, price_usd_est: 5.99, buy_links: links(n, 'kickstand replacement') },
    { device_id: dev.id, name: 'Cooling Fan', category: 'cooling', description: `Internal cooling fan for ${n}. Fixes overheating or loud fan.`, price_usd_est: 14.99, buy_links: links(n, 'cooling fan replacement') },
    { device_id: dev.id, name: 'Back Housing Shell', category: 'housing', description: `Rear shell for ${n}. Replaces cracked or scratched back.`, price_usd_est: 19.99, buy_links: links(n, 'back housing shell') },
    { device_id: dev.id, name: 'Volume / Power Button Flex', category: 'button', description: `Volume and power button flex cable for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'volume power button flex') },
    { device_id: dev.id, name: 'Game Card Reader', category: 'slot', description: `Game cartridge slot for ${n}. Fixes unrecognized game cards.`, price_usd_est: 14.99, buy_links: links(n, 'game card reader slot') },
    { device_id: dev.id, name: 'Headphone Jack Board', category: 'audio', description: `3.5mm headphone jack board for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'headphone jack board') },
    { device_id: dev.id, name: 'MicroSD Card Reader', category: 'slot', description: `MicroSD slot for ${n}. Fixes card not recognized.`, price_usd_est: 8.99, buy_links: links(n, 'microSD card reader slot') },
    { device_id: dev.id, name: 'Thermal Paste', category: 'cooling', description: `CPU thermal compound for ${n}. Fixes chronic overheating.`, price_usd_est: 6.99, buy_links: links(n, 'thermal paste Nintendo Switch') },
    { device_id: dev.id, name: 'Screen Protector (Tempered Glass)', category: 'protection', description: `9H tempered glass screen protector for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'tempered glass screen protector') },
  ];
}

function tvRemoteParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'Button Membrane Sheet', category: 'button', description: `Complete rubber button membrane/keypad for ${n}. Fixes unresponsive buttons.`, price_usd_est: 6.99, buy_links: links(n, 'button membrane keypad replacement') },
    { device_id: dev.id, name: 'Battery Cover', category: 'housing', description: `Replacement battery compartment cover for ${n}.`, price_usd_est: 3.99, buy_links: links(n, 'battery cover replacement') },
    { device_id: dev.id, name: 'IR Transmitter LED', category: 'sensor', description: `Infrared LED transmitter for ${n}. Fixes remote not working with TV.`, price_usd_est: 2.99, buy_links: links(n, 'IR LED transmitter replacement') },
    { device_id: dev.id, name: 'Main PCB Board', category: 'board', description: `Main circuit board for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'main PCB board remote') },
    { device_id: dev.id, name: 'USB-C / Micro-USB Charging Port', category: 'charging', description: `Charging port for ${n}.`, price_usd_est: 5.99, buy_links: links(n, 'USB charging port remote') },
    { device_id: dev.id, name: 'Front Shell', category: 'housing', description: `Front cover housing for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'front shell housing remote') },
    { device_id: dev.id, name: 'Back Shell', category: 'housing', description: `Rear housing for ${n}.`, price_usd_est: 6.99, buy_links: links(n, 'back shell housing remote') },
    { device_id: dev.id, name: 'Rechargeable Battery', category: 'battery', description: `Built-in rechargeable battery for ${n} (if applicable).`, price_usd_est: 8.99, buy_links: links(n, 'rechargeable battery remote') },
    { device_id: dev.id, name: 'Bluetooth / WiFi Module', category: 'wireless', description: `Wireless module for ${n} voice and smart features.`, price_usd_est: 9.99, buy_links: links(n, 'Bluetooth WiFi module remote') },
    { device_id: dev.id, name: 'Microphone', category: 'microphone', description: `Built-in microphone for voice commands on ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'microphone replacement remote') },
    { device_id: dev.id, name: 'Universal Remote Replacement', category: 'replacement', description: `OEM-compatible universal remote if repair is not cost-effective for ${n}.`, price_usd_est: 14.99, buy_links: links(n, 'universal remote replacement OEM compatible') },
  ];
}

function googlePixelParts(slug) {
  const dev = d[slug];
  if (!dev) return [];
  const n = dev.name;
  return [
    { device_id: dev.id, name: 'OLED Display Assembly', category: 'screen', description: `Full OLED screen + frame for ${n}.`, price_usd_est: 89.99, buy_links: links(n, 'OLED display assembly') },
    { device_id: dev.id, name: 'Battery', category: 'battery', description: `OEM-spec replacement battery for ${n}.`, price_usd_est: 17.99, buy_links: links(n, 'battery replacement') },
    { device_id: dev.id, name: 'USB-C Charging Port Board', category: 'charging', description: `USB-C port + microphone sub-board for ${n}.`, price_usd_est: 14.99, buy_links: links(n, 'USB-C charging port board') },
    { device_id: dev.id, name: 'Rear Camera System', category: 'camera', description: `Multi-camera rear module for ${n}.`, price_usd_est: 39.99, buy_links: links(n, 'rear camera system module') },
    { device_id: dev.id, name: 'Front Camera', category: 'camera', description: `Front selfie camera for ${n}.`, price_usd_est: 17.99, buy_links: links(n, 'front camera module') },
    { device_id: dev.id, name: 'Earpiece Speaker', category: 'speaker', description: `Top earpiece speaker for ${n}.`, price_usd_est: 9.99, buy_links: links(n, 'earpiece speaker') },
    { device_id: dev.id, name: 'Bottom Speaker', category: 'speaker', description: `Bottom loudspeaker for ${n}.`, price_usd_est: 11.99, buy_links: links(n, 'bottom speaker loudspeaker') },
    { device_id: dev.id, name: 'Power / Fingerprint Button', category: 'button', description: `Side power button with fingerprint sensor for ${n}.`, price_usd_est: 12.99, buy_links: links(n, 'power fingerprint button') },
    { device_id: dev.id, name: 'Volume Button Flex', category: 'button', description: `Volume up/down flex cable for ${n}.`, price_usd_est: 7.99, buy_links: links(n, 'volume button flex cable') },
    { device_id: dev.id, name: 'Back Glass', category: 'housing', description: `Rear glass panel for ${n}.`, price_usd_est: 24.99, buy_links: links(n, 'back glass panel') },
    { device_id: dev.id, name: 'Wireless Charging Coil', category: 'charging', description: `Wireless charging + NFC coil for ${n}.`, price_usd_est: 13.99, buy_links: links(n, 'wireless charging NFC coil') },
    { device_id: dev.id, name: 'Vibration Motor', category: 'vibration', description: `Haptic vibration motor for ${n}.`, price_usd_est: 8.99, buy_links: links(n, 'vibration motor haptic') },
    { device_id: dev.id, name: 'SIM Tray', category: 'housing', description: `SIM card tray for ${n}.`, price_usd_est: 4.99, buy_links: links(n, 'SIM tray') },
    { device_id: dev.id, name: 'Adhesive Kit', category: 'adhesive', description: `Waterproof adhesive strips for ${n} reassembly.`, price_usd_est: 3.99, buy_links: links(n, 'adhesive waterproof kit') },
  ];
}

// Compile all parts
const allParts = [
  // iPhones
  ...iphoneParts('iphone-15-pro'),
  ...iphoneParts('iphone-15'),
  ...iphoneParts('iphone-14'),
  ...iphoneParts('iphone-13'),
  ...iphoneParts('iphone-16-pro'),
  ...iphoneParts('iphone-17-pro'),
  ...iphoneParts('iphone-12-pro'),
  ...iphoneParts('iphone-11-pro'),
  ...iphoneParts('iphone-x'),
  ...iphoneParts('iphone-xr'),
  ...iphoneParts('iphone-9'),
  ...iphoneParts('iphone-8'),
  ...iphoneParts('iphone-7'),
  // Samsung
  ...samsungParts('samsung-galaxy-s24'),
  ...samsungParts('samsung-galaxy-s23'),
  ...samsungParts('samsung-galaxy-s22'),
  // Google Pixel
  ...googlePixelParts('google-pixel-8'),
  ...googlePixelParts('google-pixel-7'),
  // Other phones
  ...samsungParts('oneplus-12'),
  ...samsungParts('motorola-edge-40'),
  // Gaming Controllers
  ...ps5Parts('ps5-dualsense'),
  ...ps5Parts('ps5-dualsense-edge'),
  ...xboxControllerParts('xbox-series-x-controller'),
  ...xboxControllerParts('xbox-one-controller'),
  ...xboxControllerParts('xbox-360-controller'),
  ...switchProParts('nintendo-switch-pro-controller'),
  ...joyConParts('joy-con-left'),
  ...joyConParts('joy-con-right'),
  // TV Remotes
  ...tvRemoteParts('samsung-smart-remote'),
  ...tvRemoteParts('lg-magic-remote'),
  ...tvRemoteParts('sony-bravia-remote'),
  ...tvRemoteParts('roku-voice-remote'),
  ...tvRemoteParts('amazon-fire-tv-remote'),
  ...tvRemoteParts('apple-tv-siri-remote'),
  ...tvRemoteParts('vizio-smartcast-remote'),
  // MacBooks
  ...macbookParts('macbook-pro-m3'),
  ...macbookParts('macbook-pro-m2'),
  ...macbookParts('macbook-pro-m1'),
  // AirPods
  ...airpodsParts('airpods-pro-2nd-gen'),
  ...airpodsParts('airpods-pro-1st-gen'),
  ...airpodsParts('airpods-4'),
  // Sony headphones
  ...sonyHeadphonesParts('sony-wh-1000xm5'),
  // Nintendo Switch
  ...nintendoSwitchParts('nintendo-switch'),
].filter(Boolean);

console.log(`Inserting ${allParts.length} parts...`);

// Insert in batches of 50
let ok = 0, fail = 0;
for (let i = 0; i < allParts.length; i += 50) {
  const batch = allParts.slice(i, i + 50);
  const { error } = await sb.from('parts').insert(batch);
  if (error) { console.error('Batch error:', error.message); fail += batch.length; }
  else ok += batch.length;
}

console.log(`Done: ${ok} inserted, ${fail} failed`);
