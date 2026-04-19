import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/account/SignOutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account — SparePart",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { count } = await supabase
    .from("repair_history")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const initial = user.email?.[0]?.toUpperCase() ?? "?";
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-charcoal mb-6">Account</h1>

      {/* Profile card */}
      <div
        className="rounded-2xl p-6 border mb-4"
        style={{ borderColor: "#C8DDEF", background: "white" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: "#FAD5B0", color: "#9A5A00" }}
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-charcoal truncate">{user.email}</p>
            <p className="text-xs mt-0.5" style={{ color: "#5A5A5A" }}>
              Member since {memberSince}
            </p>
          </div>
        </div>
      </div>

      {/* Repairs stat */}
      <div
        className="rounded-2xl p-5 border mb-4"
        style={{ borderColor: "#C8DDEF", background: "white" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: "#5A5A5A" }}>
              Repairs saved
            </p>
            <p className="text-3xl font-bold text-charcoal">{count ?? 0}</p>
          </div>
          <Link
            href="/history"
            className="text-sm px-4 py-2 rounded-full border transition-colors hover:opacity-80"
            style={{ borderColor: "#C8DDEF", color: "#2D2D2D" }}
          >
            View all →
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div
        className="rounded-2xl border mb-4 overflow-hidden"
        style={{ borderColor: "#C8DDEF", background: "white" }}
      >
        {[
          { href: "/history", label: "My Repairs", icon: "🔧" },
          { href: "/", label: "Browse Devices", icon: "🔍" },
          { href: "/submit", label: "Submit a Device", icon: "➕" },
        ].map((item, i, arr) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-5 py-3.5 hover:opacity-70 transition-opacity"
            style={{
              borderBottom: i < arr.length - 1 ? "1px solid #E4EEF7" : undefined,
            }}
          >
            <span>{item.icon}</span>
            <span className="text-sm text-charcoal">{item.label}</span>
            <span className="ml-auto text-xs" style={{ color: "#9A9A9A" }}>→</span>
          </Link>
        ))}
      </div>

      <SignOutButton />
    </div>
  );
}
