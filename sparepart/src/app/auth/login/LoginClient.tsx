"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SparePartLogo } from "@/components/layout/SparePartLogo";

const BENEFITS = [
  { icon: "/images/RandomMachine.png", text: "Auto-save every diagnosis to your history" },
  { icon: "/images/Wrench1.png",       text: "Track which parts you still need to buy" },
  { icon: "/images/Smartphone.png",    text: "Access your repairs from any device" },
];

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleGoogle = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (authError) { setError(authError.message); setLoading(false); }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #E4EEF7 0%, #FDE8CF 60%, #EBE5F7 100%)" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-3xl p-8 border shadow-sm"
          style={{ background: "white", borderColor: "#C8DDEF" }}
        >
          <div className="flex justify-center mb-7">
            <Link href="/"><SparePartLogo /></Link>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-charcoal mb-1.5">
              Sign in to SparePart
            </h1>
            <p className="text-sm" style={{ color: "#5A5A5A" }}>
              Sign in with Google to save your repairs and history.
            </p>
          </div>

          {/* Benefits */}
          <div
            className="rounded-2xl p-4 mb-6 space-y-2.5"
            style={{ background: "#F8F9FB", border: "1px solid #E4EEF7" }}
          >
            {BENEFITS.map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt="" width={20} height={20} className="object-contain shrink-0" />
                <span style={{ color: "#2D2D2D" }}>{b.text}</span>
              </div>
            ))}
          </div>

          {error && (
            <div
              className="rounded-xl p-3 text-xs border mb-4"
              style={{ background: "#FFF0F0", borderColor: "#F5D5D5", color: "#8A1A1A" }}
            >
              ⚠️ {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all"
            style={{
              borderColor: "#C8DDEF",
              background: loading ? "#F8F9FB" : "white",
              color: "#2D2D2D",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
              <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.4-5L31 34.7c-2 1.4-4.5 2.3-7 2.3-5.8 0-10.7-3.9-12.4-9.3l-7 5.4C7.5 40.8 15.2 46 24 46z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.6-4.8 6l7.4 5.7c4.3-4 6.6-9.9 6.6-16.2 0-1.3-.2-2.7-.5-4z"/>
            </svg>
            {loading ? "Redirecting…" : "Continue with Google"}
          </button>
        </div>

        <p className="text-xs text-center mt-4" style={{ color: "#9A9A9A" }}>
          <Link href="/" className="underline hover:no-underline">
            ← Back to SparePart
          </Link>
        </p>
      </div>
    </div>
  );
}
