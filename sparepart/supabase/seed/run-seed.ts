import { createClient } from "@supabase/supabase-js";
import { categories } from "./categories";
import { devices } from "./devices";
import { parts } from "./parts";

// Load env manually (ts-node doesn't read .env.local by default)
import * as fs from "fs";
import * as path from "path";

function loadEnv() {
  const envPath = path.join(__dirname, "../../.env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...rest] = trimmed.split("=");
        process.env[key.trim()] = rest.join("=").trim();
      }
    }
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function seed() {
  console.log("Seeding categories...");
  const { error: catErr } = await supabase
    .from("categories")
    .upsert(categories, { onConflict: "slug" });
  if (catErr) throw catErr;

  const { data: catRows } = await supabase
    .from("categories")
    .select("id, slug");
  const categoryMap = Object.fromEntries(
    (catRows ?? []).map((c: { id: number; slug: string }) => [c.slug, c.id])
  );

  console.log("Seeding devices...");
  for (const device of devices) {
    const { category_slug, ...rest } = device;
    const { error } = await supabase
      .from("devices")
      .upsert(
        { ...rest, category_id: categoryMap[category_slug] ?? null },
        { onConflict: "slug" }
      );
    if (error) {
      console.error(`Error upserting device ${device.slug}:`, error.message);
    }
  }

  const { data: deviceRows } = await supabase
    .from("devices")
    .select("id, slug");
  const deviceMap = Object.fromEntries(
    (deviceRows ?? []).map((d: { id: number; slug: string }) => [d.slug, d.id])
  );

  console.log("Seeding parts...");
  for (const part of parts) {
    const { device_slug, ...rest } = part;
    const device_id = deviceMap[device_slug];
    if (!device_id) {
      console.warn(`  Skipping part "${part.name}" — device "${device_slug}" not found`);
      continue;
    }
    const { error } = await supabase.from("parts").upsert(
      { ...rest, device_id },
      { onConflict: "device_id,name" }
    );
    if (error) {
      console.error(`  Error upserting part "${part.name}":`, error.message);
    }
  }

  console.log("Seed complete!");
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Devices:    ${devices.length}`);
  console.log(`  Parts:      ${parts.length}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
