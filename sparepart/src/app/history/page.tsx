import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Repairs — SparePart",
};

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: history } = await supabase
    .from("repair_history")
    .select("*, device:devices(id, slug, name, brand, thumbnail_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal">My Repairs</h1>
        <Link
          href="/"
          className="text-sm px-4 py-2 rounded-full border transition-colors"
          style={{ borderColor: "#C8DDEF", color: "#2D2D2D" }}
        >
          + New repair
        </Link>
      </div>

      {!history || history.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔧</div>
          <p className="font-semibold text-charcoal mb-2">No repairs yet</p>
          <p className="text-sm mb-6" style={{ color: "#5A5A5A" }}>
            Search for a device and run a diagnosis to save your first repair.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full font-medium text-sm transition-all"
            style={{ background: "#FAD5B0", color: "#9A5A00" }}
          >
            Browse devices
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const device = item.device as { id: number; slug: string; name: string; brand: string } | null;
            const diagnosis = item.diagnosis as { difficulty?: string; summary?: string } | null;

            return (
              <div
                key={item.id}
                className="rounded-2xl p-5 border"
                style={{ borderColor: "#C8DDEF", background: "white" }}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <div className="font-semibold text-charcoal">
                      {device ? (
                        <Link
                          href={`/device/${device.slug}`}
                          className="hover:underline"
                        >
                          {device.name}
                        </Link>
                      ) : (
                        "Unknown device"
                      )}
                    </div>
                    <div className="text-xs mt-0.5 mb-2" style={{ color: "#5A5A5A" }}>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "#5A5A5A" }}
                    >
                      {item.problem_text}
                    </p>
                    {diagnosis?.summary && (
                      <p
                        className="text-xs mt-2 line-clamp-2"
                        style={{ color: "#2D2D2D" }}
                      >
                        {diagnosis.summary}
                      </p>
                    )}
                  </div>
                  {diagnosis?.difficulty && (
                    <span
                      className="text-xs px-2 py-1 rounded-full shrink-0 font-medium"
                      style={{
                        background:
                          diagnosis.difficulty === "easy"
                            ? "#D8F5E0"
                            : diagnosis.difficulty === "medium"
                            ? "#FDE8CF"
                            : "#F5D5D5",
                        color:
                          diagnosis.difficulty === "easy"
                            ? "#1A7A3A"
                            : diagnosis.difficulty === "medium"
                            ? "#9A5A00"
                            : "#8A1A1A",
                      }}
                    >
                      {diagnosis.difficulty}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
