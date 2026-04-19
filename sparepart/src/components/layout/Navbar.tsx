"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { SparePartLogo } from "@/components/layout/SparePartLogo";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) =>
      setUser(data.user)
    );
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: User } | null) =>
        setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.refresh();
  };

  const initial = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pale-blue/40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SparePartLogo />
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="hover:text-charcoal transition-colors hidden sm:block"
            style={{ color: "#5A5A5A" }}
          >
            Browse
          </Link>
          <Link
            href="/submit"
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:opacity-80"
            style={{ background: "#FAD5B0", color: "#7A3A00" }}
          >
            + Add Device
          </Link>

          {user ? (
            <>
              <Link
                href="/history"
                className="hover:text-charcoal transition-colors hidden sm:block"
                style={{ color: "#5A5A5A" }}
              >
                My Repairs
              </Link>
              {/* Avatar — links to account settings */}
              <Link
                href="/account"
                title={user.email ?? "Account"}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-opacity hover:opacity-75 shrink-0"
                style={{ background: "#FAD5B0", color: "#9A5A00" }}
              >
                {initial}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-xs hover:text-charcoal transition-colors hidden sm:block"
                style={{ color: "#9A9A9A" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-4 py-1.5 rounded-full text-sm font-medium border hover:opacity-80 transition-colors"
              style={{ borderColor: "#C8DDEF", color: "#2D2D2D" }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
