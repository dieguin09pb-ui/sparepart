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
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (authError) setError(authError.message);
    else setSent(true);
    setLoading(false);
  };

  const handleGoogle = async () => {
    if (oauthLoading) return;
    setOauthLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (authError) { setError(authError.message); setOauthLoading(false); }
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

          {sent ? (
            <div className="text-center py-2">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#D8F5E0" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Smartphone.png" alt="" width={32} height={32} className="object-contain" />
              </div>
              <h2 className="text-xl font-bold text-charcoal mb-2">Check your inbox</h2>
              <p className="text-sm mb-1" style={{ color: "#5A5A5A" }}>
                We sent a magic link to
              </p>
              <p className="font-semibold text-charcoal mb-3">{email}</p>
              <p className="text-sm" style={{ color: "#5A5A5A" }}>
                Click the link in the email to sign in instantly.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="mt-6 text-xs underline hover:no-underline"
                style={{ color: "#5A5A5A" }}
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-charcoal mb-1.5">
                  Sign in to SparePart
                </h1>
                <p className="text-sm" style={{ color: "#5A5A5A" }}>
                  No password needed — get a one-click sign-in link by email.
                </p>
              </div>

              {/* Benefits */}
              <div
                className="rounded-2xl p-4 mb-5 space-y-2.5"
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

              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={oauthLoading}
                className="w-full py-3 rounded-xl font-semibold text-sm border flex items-center justify-center gap-2 transition-all mb-3"
                style={{
                  borderColor: "#C8DDEF",
                  background: oauthLoading ? "#F8F9FB" : "white",
                  color: "#2D2D2D",
                  cursor: oauthLoading ? "not-allowed" : "pointer",
                }}
              >
                {/* Google G icon inline SVG */}
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                  <path fill="#FBBC05" d="M24 46c5.5 0 10.5-1.9 14.4-5L31 34.7c-2 1.4-4.5 2.3-7 2.3-5.8 0-10.7-3.9-12.4-9.3l-7 5.4C7.5 40.8 15.2 46 24 46z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.6-4.8 6l7.4 5.7c4.3-4 6.6-9.9 6.6-16.2 0-1.3-.2-2.7-.5-4z"/>
                </svg>
                {oauthLoading ? "Redirecting…" : "Continue with Google"}
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px" style={{ background: "#E4EEF7" }} />
                <span className="text-xs" style={{ color: "#ABABAB" }}>or use email</span>
                <div className="flex-1 h-px" style={{ background: "#E4EEF7" }} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                    <img src="/images/Smartphone.png" alt="" width={16} height={16} className="object-contain opacity-50" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoFocus
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 text-sm focus:outline-none transition-all"
                    style={{ borderColor: "#C8DDEF", color: "#2D2D2D", background: "white" }}
                    onFocus={(e) => (e.target.style.borderColor = "#E8A97A")}
                    onBlur={(e) => (e.target.style.borderColor = "#C8DDEF")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email.trim() || loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: !email.trim() || loading ? "#E4EEF7" : "#FAD5B0",
                    color: !email.trim() || loading ? "#9A9A9A" : "#9A5A00",
                    cursor: !email.trim() || loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending…" : "Send magic link ✨"}
                </button>

                <p className="text-xs text-center" style={{ color: "#ABABAB" }}>
                  We never spam. No subscription, just a sign-in link.
                </p>
              </form>
            </>
          )}
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
