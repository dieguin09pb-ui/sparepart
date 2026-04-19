import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  'https://ptywpubhtqkewyzzmhlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXdwdWJodHFrZXd5enptaGxqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2OTYxNywiZXhwIjoyMDkyMDQ1NjE3fQ.HxfWEFeHIFVKC8M6bkIrGJTgKX_YksO6ObpemQ9C5nA'
);

// ── STEP 1: Update model_file for existing devices ────────────────────────────
const MODEL_UPDATES = {
  // Headphones
  'sony-wh-1000xm5':              'b811efeda50f4ed79689bc32fce4d66c',
  // Gaming controllers
  'ps5-dualsense':                '49138c28de334c84955719ffcb4e7aab',
  'ps4-dualshock-4':              'e3c2f0dc16524fc19cdde45bad1de1a9',
  'xbox-series-x-controller':     'b01796d12b9446c8a4f950a99695219d',
  'xbox-one-controller':          'ce1d0c7e7b1d4ef2b17b56f64540b2c1',
  'xbox-360-controller':          '31f699500e58427ebf042ff75abd4bec',
  'nintendo-switch-pro-controller':'2390dcd05e9544c2ab63a6ba3542bc94',
  'joy-con-left':                 '3e0a5d1b47c84f6480d600bbaf8074ab',
  'joy-con-right':                '90855b2a9ca14ca094475f5435bc7565',
  'steam-deck':                   '30596fb11be44718ba795f3ceecbe543',
  'steam-controller':             '8e9b0c0c584d41bb9ebb2516afde30d6',
  'razer-wolverine-v2':           'c650661efdbb4482908a91a43518289a',
  '8bitdo-sn30-pro':              'f7a4887bdd2f494fbfd77a9fe9206318',
  'logitech-f310':                '5ba74dcf8d444df483128722ccfcb2a1',
  'logitech-f710':                '1d4d01ea729840ba95e1f45c56447435',
  // TV remotes
  'samsung-smart-remote':         'c8cc75295ef54515abe5dbb93e3f933d',
  'lg-magic-remote':              '5d7f383c98ae43ff92350255aa3643ad',
  'sony-bravia-remote':           '3a784add78294c4e861c77cbcbe1c6dc',
  'amazon-fire-tv-remote':        '34980d506d574965a9facb12dd44a7a0',
  'apple-tv-siri-remote':         'bd51773c52e54812a88c38c14935ae98',
  // Electronics
  'macbook-pro-m3':               '8e34fc2b303144f78490007d91ff57c4',
  'macbook-pro-m2':               'df6cb7f0cc13434fbaea484e3aa90194',
  'macbook-pro-m1':               'f6b0b940fb6a4286b18a674ef32af2d3',
  'ipad-pro':                     'e5ffb3c80b2d4d6690249f8ee2bdafbe',
  'ipad-air':                     '5da0fb60d24a49bcb567cf424dc11003',
  'airpods-pro-1st-gen':          '2fc2dadea52945dc8f1ac19dce2851e3',
  'airpods-pro-2nd-gen':          'f4a9fc9379fa4c21ab7bc225f934f31e',
  'nintendo-switch':              'b30e0a74899b4f9baf030d02f45ab599',
  'ps5-console':                  '54810f0b23a441ca93f44a8b06ec937b',
  'xbox-series-x':                'cc6603469f9c4c36a93a52f5afaaad01',
  'kindle-paperwhite':            '8822c56aad7242cbad5db8193732a553',
  // Cars (existing slugs)
  'toyota-camry':    '236a5a6e2fa6420fbdf641f4800cd544',
  'toyota-corolla':  '6d7d34ee42734d1ab28a6b1f1c5fc4fc',
  'toyota-rav4':     'ed155ad0cb7d447085a519eaff9aa2df',
  'honda-civic':     'ff844e296f214e709c0d0691d031c68b',
  'honda-accord':    '76e98c37e7c54fe682a3a58bafa73646',
  'honda-crv':       'ed36890fa6e843349f81b59df88fa038',
  'ford-f150':       '2be278ef4dc94d9fa00fae8b33da8273',
  'ford-mustang':    '0eaa7a16796540f29461ddae05ecdeb3',
  'tesla-model-3':   '55daee6824b945bb94f9018197b7949d',
  'tesla-model-y':   '66edf828087744479015edff815e85b3',
  'bmw-3-series':    '6465b6ee36e24233b5b269b99471f8ef',
  'chevy-silverado': 'a0faa0f4de6d4830b3d2ef34442abae4',
  'dodge-charger':   '00194c8fa243478a966a79fd62b47c6d',
  'vw-golf':         '166f64a89a244304ac9ab9d94eca31bc',
  'jeep-wrangler':   'dd3e24a1a5b845888c8e246e7deb81a0',
};

console.log('── Step 1: Updating model_file for existing devices ──');
let updateOk = 0, updateFail = 0;
for (const [slug, id] of Object.entries(MODEL_UPDATES)) {
  const { error } = await sb.from('devices')
    .update({ model_file: `sketchfab:${id}` })
    .eq('slug', slug);
  if (error) { console.error(`  ❌ ${slug}: ${error.message}`); updateFail++; }
  else { console.log(`  ✅ ${slug}`); updateOk++; }
}
console.log(`Updates: ${updateOk} ok, ${updateFail} failed\n`);

// ── STEP 2: Delete devices without models ─────────────────────────────────────
const SLUGS_TO_DELETE = [
  // No model found / explicitly not found
  'ps5-dualsense-edge',
  'powera-enhanced-controller',
  'gamecube-controller',
  'roku-voice-remote',
  'vizio-smartcast-remote',
  'gopro-hero-12',
  // All phones (none had Sketchfab models provided)
  'iphone-15-pro', 'iphone-15', 'iphone-14', 'iphone-13',
  'samsung-galaxy-s24', 'samsung-galaxy-s23', 'samsung-galaxy-s22',
  'google-pixel-8', 'google-pixel-7',
  'oneplus-12', 'motorola-edge-40',
];

console.log('── Step 2: Deleting devices without models ──');
let delOk = 0, delFail = 0;
for (const slug of SLUGS_TO_DELETE) {
  // Delete parts first (FK constraint)
  const { data: dev } = await sb.from('devices').select('id').eq('slug', slug).single();
  if (dev) {
    await sb.from('parts').delete().eq('device_id', dev.id);
    const { error } = await sb.from('devices').delete().eq('slug', slug);
    if (error) { console.error(`  ❌ ${slug}: ${error.message}`); delFail++; }
    else { console.log(`  ✅ deleted ${slug}`); delOk++; }
  } else {
    console.log(`  – ${slug} not found (already gone)`);
  }
}
console.log(`Deletes: ${delOk} ok, ${delFail} failed\n`);

// ── STEP 3: Insert new devices ────────────────────────────────────────────────

// Look up category IDs
const { data: cats } = await sb.from('categories').select('id, slug');
const catId = Object.fromEntries(cats.map(c => [c.slug, c.id]));

// Helper: car parts template
function carParts(deviceId, carName, brand) {
  const q = (p) => encodeURIComponent(`${brand} ${carName} ${p}`);
  const links = (p) => [
    { store: 'Amazon',   url: `https://www.amazon.com/s?k=${q(p)}` },
    { store: 'AutoZone', url: `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(p)}` },
    { store: 'RockAuto', url: `https://www.rockauto.com/en/catalog/` },
  ];
  return [
    { device_id: deviceId, name: 'Car Battery (12V)',        category: 'battery',   description: `12V battery for ${brand} ${carName}.`,           price_usd_est: 129.99, buy_links: links('12V car battery') },
    { device_id: deviceId, name: 'Front Brake Pads',         category: 'brakes',    description: `Front brake pads for ${brand} ${carName}.`,        price_usd_est:  34.99, buy_links: links('front brake pads') },
    { device_id: deviceId, name: 'Rear Brake Pads',          category: 'brakes',    description: `Rear brake pads for ${brand} ${carName}.`,          price_usd_est:  29.99, buy_links: links('rear brake pads') },
    { device_id: deviceId, name: 'Front Brake Rotors (Pair)',category: 'brakes',    description: `Front rotors for ${brand} ${carName}.`,             price_usd_est:  79.99, buy_links: links('front brake rotors') },
    { device_id: deviceId, name: 'Oil Filter',               category: 'oil',       description: `Oil filter for ${brand} ${carName}.`,               price_usd_est:   8.99, buy_links: links('oil filter') },
    { device_id: deviceId, name: 'Engine Air Filter',        category: 'filter',    description: `Engine air filter for ${brand} ${carName}.`,         price_usd_est:  14.99, buy_links: links('engine air filter') },
    { device_id: deviceId, name: 'Cabin Air Filter',         category: 'filter',    description: `Cabin air filter for ${brand} ${carName}.`,          price_usd_est:  12.99, buy_links: links('cabin air filter') },
    { device_id: deviceId, name: 'Spark Plugs (Set of 4)',   category: 'ignition',  description: `Iridium spark plugs for ${brand} ${carName}.`,       price_usd_est:  29.99, buy_links: links('spark plugs') },
    { device_id: deviceId, name: 'Wiper Blades (Pair)',      category: 'wipers',    description: `Front wiper blades for ${brand} ${carName}.`,        price_usd_est:  24.99, buy_links: links('wiper blades') },
    { device_id: deviceId, name: 'Alternator',               category: 'electrical',description: `Alternator for ${brand} ${carName}.`,               price_usd_est: 179.99, buy_links: links('alternator') },
    { device_id: deviceId, name: 'Starter Motor',            category: 'electrical',description: `Starter motor for ${brand} ${carName}.`,             price_usd_est: 149.99, buy_links: links('starter motor') },
    { device_id: deviceId, name: 'Water Pump',               category: 'cooling',   description: `Water pump for ${brand} ${carName}.`,               price_usd_est:  59.99, buy_links: links('water pump') },
    { device_id: deviceId, name: 'Thermostat',               category: 'cooling',   description: `Thermostat for ${brand} ${carName}.`,               price_usd_est:  19.99, buy_links: links('thermostat') },
    { device_id: deviceId, name: 'Serpentine Belt',          category: 'belt',      description: `Drive belt for ${brand} ${carName}.`,               price_usd_est:  24.99, buy_links: links('serpentine belt') },
    { device_id: deviceId, name: 'Oxygen Sensor (Upstream)', category: 'sensor',    description: `O2 sensor for ${brand} ${carName}.`,                price_usd_est:  34.99, buy_links: links('oxygen sensor upstream') },
  ];
}

async function insertDevice(device) {
  const { data, error } = await sb.from('devices').upsert(device, { onConflict: 'slug' }).select('id').single();
  if (error) { console.error(`  ❌ ${device.slug}: ${error.message}`); return null; }
  console.log(`  ✅ ${device.slug}`);
  return data.id;
}

async function insertCarWithParts(slug, name, brand, modelYear, sketchfabId, issues, popular = false) {
  const id = await insertDevice({
    slug, name, brand,
    model_year: modelYear,
    model_file: `sketchfab:${sketchfabId}`,
    thumbnail_url: null,
    description: `${brand} ${name} (${modelYear}).`,
    common_issues: issues,
    is_popular: popular,
    category_id: catId['cars'],
  });
  if (!id) return;
  const parts = carParts(id, name, brand);
  const { error } = await sb.from('parts').insert(parts);
  if (error) console.error(`    parts error: ${error.message}`);
  else console.log(`    + ${parts.length} parts`);
}

const CAR_ISSUES = {
  camry:     ['Battery dead', 'Brake pads worn', 'Check engine light', 'AC not cooling', 'Starter clicking'],
  corolla:   ['Battery dead', 'Oil leak', 'Brake pads worn', 'Alternator failing', 'Check engine light'],
  rav4:      ['Battery dead', 'Brake pads worn', 'AC not cooling', 'Spark plugs fouled', 'Oil change due'],
  civic:     ['Battery dead', 'Brake pads worn', 'Check engine light', 'AC not cooling', 'Starter motor failing'],
  accord:    ['Battery dead', 'Oil leak', 'Transmission fluid low', 'Brake pads worn', 'Check engine light'],
  crv:       ['Battery dead', 'Brake pads worn', 'Oil change due', 'AC not cooling', 'Spark plugs fouled'],
  f150:      ['Battery dead', 'Brake pads worn', 'Spark plugs fouled', 'Alternator failing', '4WD not engaging'],
  mustang:   ['Battery dead', 'Brake pads worn', 'Fuel injector issues', 'Oxygen sensor fault', 'Clutch slipping'],
  tesla:     ['12V battery dead', 'Brake pads worn', 'HVAC issues', 'Touchscreen unresponsive', 'Door handle stuck'],
  bmw:       ['Battery dead', 'Valve cover gasket leak', 'Coolant leak', 'Brake pads worn', 'Check engine light'],
  silverado: ['Battery dead', 'Brake pads worn', 'Throttle body dirty', 'Transmission issues', 'Check engine light'],
  charger:   ['Battery dead', 'Brake pads worn', 'Spark plugs fouled', 'Alternator failing', 'Throttle body dirty'],
  golf:      ['Battery dead', 'DSG fluid change', 'Brake pads worn', 'Check engine light', 'Timing chain rattle'],
  wrangler:  ['Battery dead', 'Death wobble', 'Brake pads worn', 'Soft top leaking', 'Check engine light'],
};

console.log('── Step 3a: New non-car devices ──');

// Sony WH-1000XM4
await insertDevice({
  slug: 'sony-wh-1000xm4',
  name: 'Sony WH-1000XM4',
  brand: 'Sony',
  model_year: 2020,
  model_file: 'sketchfab:18e9aa472d884f95897a3e70ee38026b',
  thumbnail_url: null,
  description: 'Sony flagship over-ear noise cancelling headphones with multipoint Bluetooth.',
  common_issues: ['Ear cup padding peeling', 'ANC weak', 'USB-C port loose', 'Headband cracking', 'Bluetooth dropout'],
  is_popular: true,
  category_id: catId['electronics'],
});

// MacBook Pro M4
await insertDevice({
  slug: 'macbook-pro-m4',
  name: 'MacBook Pro (M4, 2024)',
  brand: 'Apple',
  model_year: 2024,
  model_file: 'sketchfab:c14aa19d45674948bda936d9d3de744b',
  thumbnail_url: null,
  description: 'Apple MacBook Pro with M4 chip, Liquid Retina XDR display, and MagSafe 3.',
  common_issues: ['Battery swelling', 'MagSafe port not charging', 'Keyboard key stuck', 'Screen flickering', 'Trackpad click not registering'],
  is_popular: true,
  category_id: catId['electronics'],
});

// Xbox One Console
await insertDevice({
  slug: 'xbox-one-console',
  name: 'Xbox One',
  brand: 'Microsoft',
  model_year: 2013,
  model_file: 'sketchfab:8866e33768e84b27b69e07abcde8a593',
  thumbnail_url: null,
  description: 'Microsoft Xbox One home console.',
  common_issues: ['Disc drive not reading', 'HDMI port damage', 'Power brick buzzing', 'Fan loud', 'USB port broken'],
  is_popular: false,
  category_id: catId['electronics'],
});

// Xbox 360 Console
await insertDevice({
  slug: 'xbox-360-console',
  name: 'Xbox 360',
  brand: 'Microsoft',
  model_year: 2005,
  model_file: 'sketchfab:c7bfaf92d6f64ddd99e741562ecf32c3',
  thumbnail_url: null,
  description: 'Microsoft Xbox 360 home console.',
  common_issues: ['Red Ring of Death (RROD)', 'Disc drive not reading', 'Overheating', 'E74 error', 'HDMI no signal'],
  is_popular: false,
  category_id: catId['electronics'],
});

console.log('\n── Step 3b: New car variants ──');

// ── Toyota Camry variants
await insertCarWithParts('toyota-camry-hybrid-2021', 'Camry Hybrid SE 2021', 'Toyota', 2021, '147a0afe465144b5a474dc2f8c0a42cc', CAR_ISSUES.camry);

// ── Toyota Corolla variants
await insertCarWithParts('toyota-corolla-cross-2021', 'Corolla Cross 2021', 'Toyota', 2021, '6412b1bba68848af88169be2c75e10a6', CAR_ISSUES.corolla);
await insertCarWithParts('toyota-corolla-altis-2018', 'Corolla Altis 2018', 'Toyota', 2018, '11fa3ac64ef64cc0a6208e54d792f2d3', CAR_ISSUES.corolla);

// ── Toyota RAV4 variants
await insertCarWithParts('toyota-rav4-adventure-2021', 'RAV4 Adventure 2021', 'Toyota', 2021, '34645485dd284ac1b473b52f8a74da6b', CAR_ISSUES.rav4);
await insertCarWithParts('toyota-rav4-le-2019',        'RAV4 LE 2019',        'Toyota', 2019, 'fce8c48330674e659b73fcd597468dd8', CAR_ISSUES.rav4);
await insertCarWithParts('toyota-rav4-prime-2020',     'RAV4 Prime PHEV 2020','Toyota', 2020, 'fc30b71e31aa409cbca8bf6885533af5', CAR_ISSUES.rav4);

// ── Honda Civic variants
await insertCarWithParts('honda-civic-type-r-2023', 'Civic Type R 2023', 'Honda', 2023, '8c9484184a2b4254aafd67418b8c18db', CAR_ISSUES.civic);

// ── Honda CR-V variants
await insertCarWithParts('honda-crv-2019',     'CR-V 2019',              'Honda', 2019, '9926416f5c794cbd81e1cf4d808119dc', CAR_ISSUES.crv);
await insertCarWithParts('honda-crv-lx-2021',  'CR-V LX 2021',           'Honda', 2021, '7b410046e8994094a1a54f8daca1c4b6', CAR_ISSUES.crv);
await insertCarWithParts('honda-crv-2025',     'CR-V 1.5 VTEC Turbo 2025','Honda', 2025, '91c6673859444597bf006a0ef8570005', CAR_ISSUES.crv);

// ── Honda Accord variants
await insertCarWithParts('honda-accord-2008', 'Accord 2008', 'Honda', 2008, '1e3be91c28104f6489b42248884327fe', CAR_ISSUES.accord);
await insertCarWithParts('honda-accord-2012', 'Accord 2012', 'Honda', 2012, '393707adfc4648d2820f0cf8c7cb2a0b', CAR_ISSUES.accord);
await insertCarWithParts('honda-accord-2017', 'Accord 2017', 'Honda', 2017, '68892cd369e84a218e5e5dcf82365ee3', CAR_ISSUES.accord);
await insertCarWithParts('honda-accord-2018', 'Accord 2018', 'Honda', 2018, '54c227442c4b42dfbaa25e474ad9d736', CAR_ISSUES.accord);
await insertCarWithParts('honda-accord-2021', 'Accord 2021', 'Honda', 2021, 'e742636e46814de5af1568542e7c9bdb', CAR_ISSUES.accord);
await insertCarWithParts('honda-accord-2024', 'Accord 2024', 'Honda', 2024, '89820f6164ec491da844f286b612d8d4', CAR_ISSUES.accord);

// ── Ford F-150 variants
await insertCarWithParts('ford-f150-xlt-2009',        'F-150 XLT 2009',            'Ford', 2009, '04bf160284ff4eb89f937954d6a859fd', CAR_ISSUES.f150);
await insertCarWithParts('ford-f150-lariat-2015',     'F-150 Lariat Super Cab 2015','Ford', 2015, 'a684f94fa7c747dba8f79e8569054578', CAR_ISSUES.f150);
await insertCarWithParts('ford-f150-raptor-2022',     'F-150 Raptor 2022',          'Ford', 2022, '08ff551e7df3477ab1d941df77e0636c', CAR_ISSUES.f150);
await insertCarWithParts('ford-f150-raptor-r-2024',   'F-150 Raptor R 2024',        'Ford', 2024, '91aedf1119724f3396dcfe87686545c1', CAR_ISSUES.f150);

// ── Ford Mustang variants
await insertCarWithParts('ford-mustang-1965',         'Mustang Convertible 1965',   'Ford', 1965, '05f2a294087541ab82f681136d134344', CAR_ISSUES.mustang);
await insertCarWithParts('ford-mustang-rtr-2019',     'Mustang RTR Spec5 2019',     'Ford', 2019, 'f436838e1873456894328bc25fb029e6', CAR_ISSUES.mustang);
await insertCarWithParts('ford-mustang-gt-2024',      'Mustang GT 2024',            'Ford', 2024, '16f0753d26a04a089223f2d9107a777f', CAR_ISSUES.mustang);

// ── Tesla variants
await insertCarWithParts('tesla-roadster-2',          'Roadster 2',                 'Tesla', 2025, '05b04ad95a344307890586396653d4d4', CAR_ISSUES.tesla);
await insertCarWithParts('tesla-cybertruck',          'Cybertruck',                 'Tesla', 2023, '2702a9fad1fc4b3e894ca07a213f2d20', [...CAR_ISSUES.tesla, 'Frunk latch stuck', 'Panel gaps'], true);
await insertCarWithParts('tesla-model-y-2025',        'Model Y 2025',               'Tesla', 2025, '619601e7800d418da5922c4fa7833f74', CAR_ISSUES.tesla);
await insertCarWithParts('tesla-model-y-performance-2026','Model Y Performance 2026','Tesla', 2026, '8a0bc252f9da4015a02a7bd99efd4847', CAR_ISSUES.tesla);

// ── BMW variants
await insertCarWithParts('bmw-3-series-touring-2017', '3 Series Touring 2017',      'BMW',  2017, '6f65a1aba089419588299e4605963da1', CAR_ISSUES.bmw);

// ── Chevy Silverado variants
await insertCarWithParts('chevy-silverado-2002',      'Silverado 2002',             'Chevrolet', 2002, '5e0e5ec5ba124af39d7a7d737c70e959', CAR_ISSUES.silverado);
await insertCarWithParts('chevy-silverado-ltz-2013',  'Silverado LTZ 2013',         'Chevrolet', 2013, 'ca35fb231d03429fa67daf98e6ac445b', CAR_ISSUES.silverado);

// ── Dodge Charger variants
await insertCarWithParts('dodge-charger-sxt-2008',    'Charger SXT 2008',           'Dodge', 2008, 'b2987d0fb997453ba686c4725a3e2504', CAR_ISSUES.charger);
await insertCarWithParts('dodge-charger-hellcat-2015','Charger SRT Hellcat 2015',   'Dodge', 2015, 'd3e9b042718c48a99b661d003abdf004', CAR_ISSUES.charger);

// ── VW Golf variants
await insertCarWithParts('vw-golf-mk1',               'Golf Mk1',                   'Volkswagen', 1974, '61044ed105494491a66a7e90583cbdfc', CAR_ISSUES.golf);

// ── Jeep Wrangler variants
await insertCarWithParts('jeep-wrangler-rubicon-2007','Wrangler Rubicon 2007',       'Jeep', 2007, 'a50b83c3f6554230818a9a7a93587c37', CAR_ISSUES.wrangler);
await insertCarWithParts('jeep-wrangler-2018',        'Wrangler 2018',               'Jeep', 2018, '384381621efc4e4d8fd8abd1fcde2e87', CAR_ISSUES.wrangler);
await insertCarWithParts('jeep-wrangler-rubicon-392-2023','Wrangler Rubicon 392 2023','Jeep', 2023, '7247a74596224c3dadc219836430279c', CAR_ISSUES.wrangler);

console.log('\nDone!');
