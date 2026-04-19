"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DiagnosisResult } from "@/types/diagnosis";
import Link from "next/link";

interface Props {
  deviceId: number;
  problemText: string;
  diagnosis: DiagnosisResult;
}

export function SaveRepairButton({ deviceId, problemText, diagnosis }: Props) {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }: { data: { user: { id: string } | null } }) => setUser(data.user));
  }, []);

  if (!user) {
    return (
      <p className="text-xs text-center" style={{ color: "#5A5A5A" }}>
        <Link href="/auth/login" className="underline hover:no-underline" style={{ color: "#B8860B" }}>
          Sign in
        </Link>{" "}
        to save this repair to your history.
      </p>
    );
  }

  if (saved) {
    return (
      <div
        className="text-center text-xs py-2 px-4 rounded-full"
        style={{ background: "#D8F5E0", color: "#1A7A3A" }}
      >
        ✓ Repair saved to your history
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: deviceId, problem_text: problemText, diagnosis }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className="w-full py-2 rounded-xl text-sm border transition-all"
      style={{ borderColor: "#C8DDEF", color: "#5A5A5A", background: "white" }}
    >
      {saving ? "Saving..." : "Save to my repairs"}
    </button>
  );
}
