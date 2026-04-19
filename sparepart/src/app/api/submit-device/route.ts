import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CATEGORY_SLUGS: Record<string, number> = {
  "gaming-controllers": 1,
  "phones": 2,
  "tv-remotes": 3,
  "electronics": 4,
};

function slugify(brand: string, name: string): string {
  return `${brand}-${name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { brand, name, model_year, category, description, common_issues, sketchfab_id } = body;

  if (!brand?.trim() || !name?.trim()) {
    return Response.json({ error: "Brand and device name are required." }, { status: 400 });
  }

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const issues = common_issues
    ? common_issues.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const slug = slugify(brand, name);
  const model_file = sketchfab_id?.trim() ? `sketchfab:${sketchfab_id.trim()}` : null;
  const category_id = CATEGORY_SLUGS[category] ?? 4;

  const { error } = await sb.from("devices").insert({
    brand: brand.trim(),
    name: name.trim(),
    model_year: model_year ? parseInt(model_year) : null,
    category_id,
    description: description?.trim() || null,
    common_issues: issues,
    model_file,
    slug,
    is_popular: false,
  });

  if (error) {
    if (error.code === "23505") {
      return Response.json({ error: "A device with this name and brand already exists." }, { status: 409 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true, slug });
}
