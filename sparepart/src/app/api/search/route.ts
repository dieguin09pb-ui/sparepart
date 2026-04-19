import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (q.length < 1) {
    return Response.json([]);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("devices")
    .select("id, slug, name, brand, thumbnail_url, category:categories(name, icon_emoji)")
    .ilike("name", `%${q}%`)
    .order("is_popular", { ascending: false })
    .limit(8);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data ?? [], {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
