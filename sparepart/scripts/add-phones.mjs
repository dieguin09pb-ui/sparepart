import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://ptywpubhtqkewyzzmhlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXdwdWJodHFrZXd5enptaGxqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2OTYxNywiZXhwIjoyMDkyMDQ1NjE3fQ.HxfWEFeHIFVKC8M6bkIrGJTgKX_YksO6ObpemQ9C5nA'
);

const { data: cats } = await sb.from('categories').select('id, slug');
const catId = Object.fromEntries(cats.map(c => [c.slug, c.id]));
const phoneCatId = catId['phones'];

function phoneLinks(brand, model, part) {
  const q = encodeURIComponent(`${brand} ${model} ${part}`);
  return [
    { store: 'Amazon',   url: `https://www.amazon.com/s?k=${q}` },
    { store: 'iFixit',   url: `https://www.ifixit.com/Search?query=${encodeURIComponent(brand+' '+model)}` },
    { store: 'eBay',     url: `https://www.ebay.com/sch/i.html?_nkw=${q}` },
  ];
}

function phoneParts(deviceId, brand, model) {
  return [
    { device_id: deviceId, name: 'Replacement Screen (OLED)',  category: 'screen',   description: `OEM-quality OLED screen assembly for ${brand} ${model}. Fixes cracked or unresponsive display.`, price_usd_est:  89.99, buy_links: phoneLinks(brand, model, 'replacement screen OLED') },
    { device_id: deviceId, name: 'Battery',                    category: 'battery',  description: `Replacement battery for ${brand} ${model}. Restores full battery capacity.`,                     price_usd_est:  29.99, buy_links: phoneLinks(brand, model, 'battery replacement') },
    { device_id: deviceId, name: 'Charging Port / USB-C',      category: 'charging', description: `Charging port flex cable for ${brand} ${model}. Fixes intermittent charging.`,                   price_usd_est:  19.99, buy_links: phoneLinks(brand, model, 'charging port USB-C') },
    { device_id: deviceId, name: 'Rear Camera Module',         category: 'camera',   description: `Rear camera assembly for ${brand} ${model}. Fixes blurry or non-functional camera.`,             price_usd_est:  49.99, buy_links: phoneLinks(brand, model, 'rear camera module') },
    { device_id: deviceId, name: 'Front Camera',               category: 'camera',   description: `Front-facing camera module for ${brand} ${model}.`,                                               price_usd_est:  24.99, buy_links: phoneLinks(brand, model, 'front camera') },
    { device_id: deviceId, name: 'Earpiece Speaker',           category: 'audio',    description: `Earpiece speaker for ${brand} ${model}. Fixes muffled or silent call audio.`,                    price_usd_est:  14.99, buy_links: phoneLinks(brand, model, 'earpiece speaker') },
    { device_id: deviceId, name: 'Loudspeaker',                category: 'audio',    description: `Bottom loudspeaker for ${brand} ${model}. Fixes quiet or distorted speaker.`,                    price_usd_est:  16.99, buy_links: phoneLinks(brand, model, 'loudspeaker') },
    { device_id: deviceId, name: 'Back Glass Panel',           category: 'housing',  description: `Rear glass panel for ${brand} ${model}. Fixes cracked back glass.`,                              price_usd_est:  22.99, buy_links: phoneLinks(brand, model, 'back glass') },
    { device_id: deviceId, name: 'Screen Protector (Tempered)',category: 'accessory',description: `Tempered glass screen protector for ${brand} ${model}.`,                                          price_usd_est:   9.99, buy_links: phoneLinks(brand, model, 'tempered glass screen protector') },
    { device_id: deviceId, name: 'Microphone',                 category: 'audio',    description: `Microphone module for ${brand} ${model}. Fixes muffled or silent mic during calls.`,              price_usd_est:  12.99, buy_links: phoneLinks(brand, model, 'microphone') },
  ];
}

async function insertPhone(slug, name, brand, modelYear, sketchfabId, issues, popular = false) {
  const { data, error } = await sb.from('devices').upsert({
    slug, name, brand,
    model_year: modelYear,
    model_file: `sketchfab:${sketchfabId}`,
    thumbnail_url: null,
    description: `${brand} ${name} (${modelYear}).`,
    common_issues: issues,
    is_popular: popular,
    category_id: phoneCatId,
  }, { onConflict: 'slug' }).select('id').single();

  if (error) { console.error(`  ❌ ${slug}: ${error.message}`); return; }
  console.log(`  ✅ ${slug}`);

  const parts = phoneParts(data.id, brand, name);
  const { error: pe } = await sb.from('parts').insert(parts);
  if (pe) console.error(`    parts error: ${pe.message}`);
  else console.log(`    + ${parts.length} parts`);
}

const APPLE_ISSUES   = ['Cracked screen', 'Battery draining fast', 'Charging port debris', 'Rear glass cracked', 'Camera not focusing', 'Speaker muffled', 'Face ID not working'];
const SAMSUNG_ISSUES = ['Cracked screen', 'Battery draining fast', 'USB-C port loose', 'Back glass cracked', 'Fingerprint sensor not working', 'Camera app crashing', 'Charging slow'];
const PIXEL_ISSUES   = ['Cracked screen', 'Battery draining fast', 'Overheating', 'USB-C port issues', 'Camera module loose', 'Speaker crackling'];
const ONEPLUS_ISSUES = ['Cracked screen', 'Alert slider stuck', 'Charging port damage', 'Battery draining', 'Back glass cracked', 'Camera lens scratched'];
const MOTO_ISSUES    = ['Curved screen cracked', 'USB-C port loose', 'Battery draining fast', 'Rear camera lens cracked', 'Speaker muffled'];

await insertPhone('iphone-14-pro',          'iPhone 14 Pro',          'Apple',    2022, '5cb0778041a34f09b409a38c687bb1d4', APPLE_ISSUES,   true);
await insertPhone('iphone-13-pro-max',      'iPhone 13 Pro Max',      'Apple',    2021, '0a8de332cc1c4184800419015799c95c', APPLE_ISSUES,   false);
await insertPhone('iphone-15-pro',          'iPhone 15 Pro',          'Apple',    2023, '97de6214adfb440fa025bb741ff8421e', APPLE_ISSUES,   true);
await insertPhone('iphone-15-pro-max',      'iPhone 15 Pro Max',      'Apple',    2023, 'dcf6110190bd4f2682caddedbf850a94', APPLE_ISSUES,   true);
await insertPhone('samsung-galaxy-s22-ultra','Galaxy S22 Ultra',      'Samsung',  2022, 'a95eec5181a24bcd8a8452df50b29f3a', SAMSUNG_ISSUES, false);
await insertPhone('samsung-galaxy-s21-ultra','Galaxy S21 Ultra',      'Samsung',  2021, 'cd962832be7744efb6b37fe0ee2027e7', SAMSUNG_ISSUES, false);
await insertPhone('samsung-galaxy-z-flip-3','Galaxy Z Flip 3',        'Samsung',  2021, '112947cbab7a4f708d0d01adb7d3fa3d', [...SAMSUNG_ISSUES, 'Fold hinge stiff', 'Inner screen crease'], false);
await insertPhone('samsung-galaxy-s24-ultra','Galaxy S24 Ultra',      'Samsung',  2024, '1e8fecdb2a1849ec8dad382b73bd39d1', SAMSUNG_ISSUES, true);
await insertPhone('samsung-galaxy-s23-ultra','Galaxy S23 Ultra',      'Samsung',  2023, '999395b70d7f476fb4ee2027ac49c700', SAMSUNG_ISSUES, false);
await insertPhone('google-pixel-8',         'Pixel 8',                'Google',   2023, '3d3da3da99ee434b8c501eb867912216', PIXEL_ISSUES,   false);
await insertPhone('google-pixel-8-pro',     'Pixel 8 Pro',            'Google',   2023, 'ab567912dd944fd59ed73a3a012f3eba', PIXEL_ISSUES,   false);
await insertPhone('oneplus-12',             'OnePlus 12',             'OnePlus',  2024, '0a91199a8bb34446be18ec74ba8414a0', ONEPLUS_ISSUES, false);
await insertPhone('oneplus-9-pro',          'OnePlus 9 Pro',          'OnePlus',  2021, 'd234c9b703dc41788643f2a5d821adab', ONEPLUS_ISSUES, false);
await insertPhone('motorola-edge-50-neo',   'Motorola Edge 50 Neo',   'Motorola', 2024, '45818636f9194abda61c3fc6d32a6e09', MOTO_ISSUES,    false);

console.log('\nDone!');
