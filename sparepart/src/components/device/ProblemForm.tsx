"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LoadingMachine } from "@/components/shared/LoadingMachine";
import type { DiagnosisResult } from "@/types/diagnosis";
import type { Part } from "@/types/device";
import { DiagnosisResult as DiagnosisResultComponent } from "@/components/device/DiagnosisResult";
import { SaveRepairButton } from "@/components/shared/SaveRepairButton";

interface Props {
  deviceId: number;
  deviceName: string;
  commonIssues: string[];
  catalogParts: Part[];
}

export function ProblemForm({ deviceId, deviceName, commonIssues, catalogParts }: Props) {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [autoSaved, setAutoSaved] = useState(false);
  const submittedProblemRef = useRef("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }: { data: { user: { id: string } | null } }) =>
      setUser(data.user)
    );
  }, []);

  // Auto-save when result arrives and user is signed in
  useEffect(() => {
    if (result && user && !autoSaved) {
      fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_id: deviceId,
          problem_text: submittedProblemRef.current,
          diagnosis: result,
        }),
      })
        .then(() => setAutoSaved(true))
        .catch(console.error);
    }
  }, [result, user, autoSaved, deviceId]);

  const handleChipClick = (issue: string) => {
    setProblem(issue);
    setResult(null);
    setError(null);
    setAutoSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || loading) return;
    submittedProblemRef.current = problem.trim();
    setLoading(true);
    setError(null);
    setResult(null);
    setAutoSaved(false);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          deviceName,
          commonIssues,
          problemText: problem.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong. Please try again.");
      else setResult(data as DiagnosisResult);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Quick-fill chips */}
      {commonIssues.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: "#5A5A5A" }}>
            Common issues — tap to pre-fill:
          </p>
          <div className="flex flex-wrap gap-2">
            {commonIssues.map((issue) => (
              <button
                key={issue}
                type="button"
                onClick={() => handleChipClick(issue)}
                className="px-3 py-1.5 rounded-full text-xs border transition-all hover:shadow-sm"
                style={{
                  borderColor: problem === issue ? "#E8A97A" : "#C8DDEF",
                  background: problem === issue ? "#FDE8CF" : "white",
                  color: "#2D2D2D",
                }}
              >
                {issue}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sign-in nudge — shown when not signed in and no result yet */}
      {!user && !result && (
        <div
          className="mb-4 rounded-xl px-4 py-3 flex items-center gap-3 border"
          style={{ background: "#FFFBF4", borderColor: "#FAD5B0" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Wrench1.png" alt="" width={18} height={18} className="object-contain shrink-0" />
          <p className="text-xs" style={{ color: "#7A4A00" }}>
            <Link
              href="/auth/login"
              className="font-semibold underline hover:no-underline"
              style={{ color: "#B8860B" }}
            >
              Sign in
            </Link>{" "}
            to auto-save every diagnosis to{" "}
            <Link href="/auth/login" className="underline hover:no-underline" style={{ color: "#B8860B" }}>
              My Repairs
            </Link>
          </p>
        </div>
      )}

      {loading ? (
        <LoadingMachine label="Diagnosing your problem…" />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={problem}
            onChange={(e) => {
              setProblem(e.target.value);
              if (result) { setResult(null); setAutoSaved(false); }
              if (error) setError(null);
            }}
            placeholder="Describe what's wrong — e.g. 'The left stick keeps drifting up even when I'm not touching it'"
            rows={4}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm resize-none focus:outline-none transition-all"
            style={{ borderColor: "#C8DDEF", color: "#2D2D2D" }}
            onFocus={(e) => (e.target.style.borderColor = "#E8A97A")}
            onBlur={(e) => (e.target.style.borderColor = "#C8DDEF")}
          />

          <button
            type="submit"
            disabled={!problem.trim()}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            style={{
              background: !problem.trim() ? "#E4EEF7" : "#FAD5B0",
              color: !problem.trim() ? "#5A5A5A" : "#9A5A00",
              cursor: !problem.trim() ? "not-allowed" : "pointer",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/robot arm.png" alt="" width={18} height={18} className="object-contain" />
            Diagnose My Problem
          </button>
        </form>
      )}

      {error && (
        <div
          className="mt-4 rounded-xl p-4 text-sm border"
          style={{ background: "#FFF0F0", borderColor: "#F5D5D5", color: "#8A1A1A" }}
        >
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <DiagnosisResultComponent
            result={result}
            catalogParts={catalogParts}
            deviceName={deviceName}
          />
          <div className="mt-4">
            {user ? (
              autoSaved ? (
                <div
                  className="text-center text-xs py-2.5 px-4 rounded-full"
                  style={{ background: "#D8F5E0", color: "#1A7A3A" }}
                >
                  ✓ Auto-saved to{" "}
                  <Link href="/history" className="font-semibold underline hover:no-underline">
                    My Repairs
                  </Link>
                </div>
              ) : (
                <div className="text-center text-xs py-2" style={{ color: "#9A9A9A" }}>
                  Saving…
                </div>
              )
            ) : (
              <SaveRepairButton
                deviceId={deviceId}
                problemText={submittedProblemRef.current}
                diagnosis={result}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
