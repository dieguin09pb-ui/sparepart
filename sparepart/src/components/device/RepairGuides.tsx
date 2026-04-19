"use client";

import { useState } from "react";
import type { RepairGuide } from "@/data/repair-guides";

const DIFFICULTY_COLORS = {
  easy:   { bg: "#D4F0D4", text: "#1A6A1A" },
  medium: { bg: "#FDE8CF", text: "#7A3A00" },
  hard:   { bg: "#F0D4D4", text: "#6A1A1A" },
};

function GuideCard({ guide }: { guide: RepairGuide }) {
  const [open, setOpen] = useState(false);
  const colors = DIFFICULTY_COLORS[guide.difficulty];

  return (
    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "#C8DDEF" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        style={{ background: open ? "#F0F6FB" : "white" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-charcoal">{guide.title}</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
            style={{ background: colors.bg, color: colors.text }}
          >
            {guide.difficulty}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px]" style={{ color: "#9A9A9A" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/Watch1.png" alt="" width={10} height={10} className="object-contain" />
                  {guide.time}
                </span>
        </div>
        <span className="text-charcoal text-sm" style={{ color: "#5A5A5A" }}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: "#E4EEF7" }}>
          {guide.warning && (
            <div className="mt-4 mb-4 px-4 py-3 rounded-xl text-xs" style={{ background: "#FDE8CF", color: "#7A3A00" }}>
              ⚠️ <strong>Warning:</strong> {guide.warning}
            </div>
          )}

          <div className="mt-4 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: "#9A9A9A" }}>Tools needed</p>
            <div className="flex flex-wrap gap-1.5">
              {guide.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-2 py-1 rounded-lg"
                  style={{ background: "#EBE5F7", color: "#5A3A8A" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <ol className="space-y-4 mt-5">
            {guide.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: "#FAD5B0", color: "#7A3A00" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{step.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#5A5A5A" }}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export function RepairGuides({ guides }: { guides: RepairGuide[] }) {
  if (!guides || guides.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-charcoal mb-4">Repair Guides</h2>
      <div className="space-y-3">
        {guides.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
}
