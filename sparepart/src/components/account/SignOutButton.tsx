"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full py-3 rounded-xl text-sm font-medium border transition-all hover:opacity-80"
      style={{ borderColor: "#F5D5D5", color: "#8A1A1A", background: "#FFF0F0" }}
    >
      Sign Out
    </button>
  );
}
