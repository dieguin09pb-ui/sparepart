import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://ptywpubhtqkewyzzmhlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXdwdWJodHFrZXd5enptaGxqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2OTYxNywiZXhwIjoyMDkyMDQ1NjE3fQ.HxfWEFeHIFVKC8M6bkIrGJTgKX_YksO6ObpemQ9C5nA'
);

const CAR_CATEGORY_ID = 5;

const CARS = [
  { slug: 'toyota-camry',       name: 'Camry',        brand: 'Toyota',      model_year: 2023, description: 'Mid-size sedan — one of the best-selling cars in the US.', common_issues: ['Battery dead', 'Brake pads worn', 'Check engine light', 'AC not cooling', 'Starter clicking'], is_popular: true },
  { slug: 'toyota-corolla',     name: 'Corolla',      brand: 'Toyota',      model_year: 2023, description: 'Compact sedan known for reliability and low cost of ownership.', common_issues: ['Battery dead', 'Oil leak', 'Brake pads worn', 'Alternator failing', 'Check engine light'], is_popular: false },
  { slug: 'toyota-rav4',        name: 'RAV4',         brand: 'Toyota',      model_year: 2023, description: 'Compact SUV — most popular SUV in the US.', common_issues: ['Battery dead', 'Brake pads worn', 'AC not cooling', 'Spark plugs fouled', 'Oil change due'], is_popular: true },
  { slug: 'honda-civic',        name: 'Civic',        brand: 'Honda',       model_year: 2023, description: 'Compact car renowned for reliability and fuel economy.', common_issues: ['Battery dead', 'Brake pads worn', 'Check engine light', 'AC not cooling', 'Starter motor failing'], is_popular: true },
  { slug: 'honda-accord',       name: 'Accord',       brand: 'Honda',       model_year: 2023, description: 'Mid-size sedan — a perennial best-seller.', common_issues: ['Battery dead', 'Oil leak', 'Transmission fluid low', 'Brake pads worn', 'Check engine light'], is_popular: false },
  { slug: 'honda-crv',          name: 'CR-V',         brand: 'Honda',       model_year: 2023, description: 'Compact crossover SUV with excellent reliability ratings.', common_issues: ['Battery dead', 'Brake pads worn', 'Oil change due', 'AC not cooling', 'Spark plugs fouled'], is_popular: false },
  { slug: 'ford-f150',          name: 'F-150',        brand: 'Ford',        model_year: 2023, description: 'Best-selling truck in the US for over 40 years.', common_issues: ['Battery dead', 'Brake pads worn', 'Spark plugs fouled', 'Alternator failing', '4WD not engaging'], is_popular: true },
  { slug: 'ford-mustang',       name: 'Mustang',      brand: 'Ford',        model_year: 2023, description: 'Iconic American muscle car.', common_issues: ['Battery dead', 'Brake pads worn', 'Fuel injector issues', 'Oxygen sensor fault', 'Clutch slipping'], is_popular: false },
  { slug: 'tesla-model-3',      name: 'Model 3',      brand: 'Tesla',       model_year: 2023, description: 'Electric sedan — most popular EV in the world.', common_issues: ['12V battery dead', 'Brake pads worn', 'HVAC issues', 'Touchscreen unresponsive', 'Door handle stuck'], is_popular: true },
  { slug: 'tesla-model-y',      name: 'Model Y',      brand: 'Tesla',       model_year: 2023, description: 'Electric SUV — top-selling vehicle globally in 2023.', common_issues: ['12V battery dead', 'Brake pads worn', 'Frunk latch stuck', 'HVAC issues', 'Panel gaps'], is_popular: true },
  { slug: 'bmw-3-series',       name: '3 Series',     brand: 'BMW',         model_year: 2023, description: 'Luxury compact sedan — benchmark of the segment.', common_issues: ['Battery dead', 'Valve cover gasket leak', 'Coolant leak', 'Brake pads worn', 'Check engine light'], is_popular: false },
  { slug: 'chevy-silverado',    name: 'Silverado',    brand: 'Chevrolet',   model_year: 2023, description: 'Full-size pickup truck competing with the F-150.', common_issues: ['Battery dead', 'Brake pads worn', 'Throttle body dirty', 'Transmission issues', 'Check engine light'], is_popular: false },
  { slug: 'dodge-charger',      name: 'Charger',      brand: 'Dodge',       model_year: 2023, description: 'Full-size muscle sedan with V8 power.', common_issues: ['Battery dead', 'Brake pads worn', 'Spark plugs fouled', 'Alternator failing', 'Throttle body dirty'], is_popular: false },
  { slug: 'vw-golf',            name: 'Golf',         brand: 'Volkswagen',  model_year: 2023, description: 'Compact hatchback — one of the best-selling cars in history.', common_issues: ['Battery dead', 'DSG fluid change', 'Brake pads worn', 'Check engine light', 'Timing chain rattle'], is_popular: false },
  { slug: 'jeep-wrangler',      name: 'Wrangler',     brand: 'Jeep',        model_year: 2023, description: 'Iconic off-road SUV with removable doors and roof.', common_issues: ['Battery dead', 'Death wobble', 'Brake pads worn', 'Soft top leaking', 'Check engine light'], is_popular: false },
];

function links(carName, brand, partName) {
  const q = encodeURIComponent(`${brand} ${carName} ${partName}`);
  return [
    { store: 'Amazon',   label: 'Amazon',   url: `https://www.amazon.com/s?k=${q}` },
    { store: 'AutoZone', label: 'AutoZone', url: `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(partName)}` },
    { store: 'RockAuto', label: 'RockAuto', url: `https://www.rockauto.com/en/catalog/` },
  ];
}

function carParts(deviceId, carName, brand) {
  const n = `${brand} ${carName}`;
  return [
    { device_id: deviceId, name: 'Car Battery (12V)', category: 'battery', description: `12V automotive battery for ${n}. Fixes no-start and electrical issues.`, price_usd_est: 129.99, buy_links: links(carName, brand, '12V car battery') },
    { device_id: deviceId, name: 'Front Brake Pads', category: 'brakes', description: `OEM-spec front brake pad set for ${n}.`, price_usd_est: 34.99, buy_links: links(carName, brand, 'front brake pads') },
    { device_id: deviceId, name: 'Rear Brake Pads', category: 'brakes', description: `Rear brake pad set for ${n}.`, price_usd_est: 29.99, buy_links: links(carName, brand, 'rear brake pads') },
    { device_id: deviceId, name: 'Front Brake Rotors (Pair)', category: 'brakes', description: `Front brake disc rotors for ${n}.`, price_usd_est: 79.99, buy_links: links(carName, brand, 'front brake rotors') },
    { device_id: deviceId, name: 'Oil Filter', category: 'oil', description: `Engine oil filter for ${n}. Replace every oil change.`, price_usd_est: 8.99, buy_links: links(carName, brand, 'oil filter') },
    { device_id: deviceId, name: 'Engine Air Filter', category: 'filter', description: `Engine intake air filter for ${n}. Replace every 15,000–30,000 miles.`, price_usd_est: 14.99, buy_links: links(carName, brand, 'engine air filter') },
    { device_id: deviceId, name: 'Cabin Air Filter', category: 'filter', description: `Cabin HVAC air filter for ${n}. Improves AC airflow and removes allergens.`, price_usd_est: 12.99, buy_links: links(carName, brand, 'cabin air filter') },
    { device_id: deviceId, name: 'Spark Plugs (Set of 4)', category: 'ignition', description: `Iridium spark plugs for ${n}. Replace every 60,000–100,000 miles.`, price_usd_est: 29.99, buy_links: links(carName, brand, 'spark plugs set') },
    { device_id: deviceId, name: 'Wiper Blades (Pair)', category: 'wipers', description: `Front wiper blade set for ${n}. Beam-style for clean sweep.`, price_usd_est: 24.99, buy_links: links(carName, brand, 'wiper blades') },
    { device_id: deviceId, name: 'Alternator', category: 'electrical', description: `Remanufactured alternator for ${n}. Fixes battery not charging while driving.`, price_usd_est: 179.99, buy_links: links(carName, brand, 'alternator') },
    { device_id: deviceId, name: 'Starter Motor', category: 'electrical', description: `Replacement starter motor for ${n}. Fixes clicking or no-crank on startup.`, price_usd_est: 149.99, buy_links: links(carName, brand, 'starter motor') },
    { device_id: deviceId, name: 'Water Pump', category: 'cooling', description: `Engine water pump for ${n}. Fixes overheating and coolant leaks.`, price_usd_est: 59.99, buy_links: links(carName, brand, 'water pump') },
    { device_id: deviceId, name: 'Thermostat', category: 'cooling', description: `Engine thermostat for ${n}. Fixes overheating or slow-to-warm engine.`, price_usd_est: 19.99, buy_links: links(carName, brand, 'thermostat') },
    { device_id: deviceId, name: 'Oxygen Sensor (Upstream)', category: 'sensor', description: `Upstream O2 sensor for ${n}. Fixes rough idle and poor fuel economy.`, price_usd_est: 34.99, buy_links: links(carName, brand, 'oxygen sensor upstream') },
    { device_id: deviceId, name: 'Mass Air Flow Sensor', category: 'sensor', description: `MAF sensor for ${n}. Fixes rough idle and hesitation under acceleration.`, price_usd_est: 44.99, buy_links: links(carName, brand, 'mass air flow sensor MAF') },
    { device_id: deviceId, name: 'Fuel Filter', category: 'fuel', description: `Fuel filter for ${n}. Replace every 30,000 miles for optimal performance.`, price_usd_est: 17.99, buy_links: links(carName, brand, 'fuel filter') },
    { device_id: deviceId, name: 'Serpentine Belt', category: 'belt', description: `Drive belt for ${n}. Fixes squealing or broken accessory belt.`, price_usd_est: 24.99, buy_links: links(carName, brand, 'serpentine belt') },
    { device_id: deviceId, name: 'Coolant / Antifreeze (Gallon)', category: 'cooling', description: `OEM-compatible coolant for ${n}.`, price_usd_est: 18.99, buy_links: links(carName, brand, 'coolant antifreeze') },
  ];
}

// Insert cars
console.log('Seeding car devices...');
let carOk = 0, carFail = 0;
for (const car of CARS) {
  const { error } = await sb.from('devices').upsert(
    { ...car, category_id: CAR_CATEGORY_ID },
    { onConflict: 'slug' }
  );
  if (error) { console.error(`  ❌ ${car.slug}: ${error.message}`); carFail++; }
  else { console.log(`  ✅ ${car.slug}`); carOk++; }
}
console.log(`Cars: ${carOk} ok, ${carFail} failed\n`);

// Fetch inserted car IDs
const { data: inserted } = await sb.from('devices').select('id, slug').in('slug', CARS.map(c => c.slug));
const idMap = Object.fromEntries(inserted.map(r => [r.slug, r.id]));

// Insert parts
console.log('Seeding car parts...');
const allParts = CARS.flatMap(car => carParts(idMap[car.slug], car.name, car.brand)).filter(p => p.device_id);
let partOk = 0, partFail = 0;
for (let i = 0; i < allParts.length; i += 50) {
  const batch = allParts.slice(i, i + 50);
  const { error } = await sb.from('parts').insert(batch);
  if (error) { console.error('  Batch error:', error.message); partFail += batch.length; }
  else partOk += batch.length;
}
console.log(`Parts: ${partOk} ok, ${partFail} failed`);
