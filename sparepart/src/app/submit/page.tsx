"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  { value: "gaming-controllers", label: "🎮 Gaming Controllers" },
  { value: "phones", label: "📱 Phones" },
  { value: "tv-remotes", label: "📺 TV Remotes" },
  { value: "electronics", label: "💻 Electronics" },
];

export default function SubmitDevicePage() {
  const [form, setForm] = useState({
    brand: "",
    name: "",
    model_year: "",
    category: "electronics",
    description: "",
    common_issues: "",
    sketchfab_id: "",
    contact_email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-charcoal mb-2">Device Submitted!</h1>
        <p className="text-sm mb-6" style={{ color: "#5A5A5A" }}>
          Your device has been added to SparePart. It will appear in search results immediately.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "#C8DDEF", color: "#1A3A5A" }}
          >
            Go home
          </Link>
          <button
            onClick={() => { setForm({ brand: "", name: "", model_year: "", category: "electronics", description: "", common_issues: "", sketchfab_id: "", contact_email: "" }); setStatus("idle"); }}
            className="px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: "#FAD5B0", color: "#7A3A00" }}
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "#5A5A5A" }}>
          ← Back to SparePart
        </Link>
        <h1 className="text-3xl font-bold text-charcoal mt-4">Add Your Product</h1>
        <p className="mt-2 text-sm" style={{ color: "#5A5A5A" }}>
          List your device on SparePart so customers can find repair guides and spare parts.
          Free for all manufacturers and brands.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Brand + Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Brand *</label>
            <input
              required
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="e.g. Samsung"
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2"
              style={{ borderColor: "#C8DDEF", background: "white" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Device Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Galaxy S25"
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:ring-2"
              style={{ borderColor: "#C8DDEF", background: "white" }}
            />
          </div>
        </div>

        {/* Category + Year */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
              style={{ borderColor: "#C8DDEF", background: "white" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Model Year</label>
            <input
              type="number"
              value={form.model_year}
              onChange={(e) => set("model_year", e.target.value)}
              placeholder="e.g. 2024"
              min="1990"
              max="2030"
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
              style={{ borderColor: "#C8DDEF", background: "white" }}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of the device..."
            rows={3}
            className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
            style={{ borderColor: "#C8DDEF", background: "white" }}
          />
        </div>

        {/* Common Issues */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Common Issues</label>
          <input
            value={form.common_issues}
            onChange={(e) => set("common_issues", e.target.value)}
            placeholder="e.g. Battery draining fast, Screen cracked, Button stuck"
            className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
            style={{ borderColor: "#C8DDEF", background: "white" }}
          />
          <p className="text-[10px] mt-1" style={{ color: "#9A9A9A" }}>Separate with commas — these appear as quick-fill chips on the device page</p>
        </div>

        {/* Sketchfab ID */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">
            Sketchfab Model ID{" "}
            <span className="font-normal" style={{ color: "#9A9A9A" }}>(optional — for 3D viewer)</span>
          </label>
          <input
            value={form.sketchfab_id}
            onChange={(e) => set("sketchfab_id", e.target.value)}
            placeholder="e.g. 97de6214adfb440fa025bb741ff8421e"
            className="w-full px-3 py-2 rounded-xl text-sm border outline-none font-mono"
            style={{ borderColor: "#C8DDEF", background: "white" }}
          />
          <p className="text-[10px] mt-1" style={{ color: "#9A9A9A" }}>
            Find the ID in your Sketchfab embed URL:{" "}
            <span className="font-mono">sketchfab.com/models/[ID]/embed</span>
          </p>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Contact Email</label>
          <input
            type="email"
            value={form.contact_email}
            onChange={(e) => set("contact_email", e.target.value)}
            placeholder="your@company.com"
            className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
            style={{ borderColor: "#C8DDEF", background: "white" }}
          />
        </div>

        {status === "error" && (
          <p className="text-xs px-3 py-2 rounded-xl" style={{ background: "#FDE8CF", color: "#9A2A00" }}>
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60"
          style={{ background: "#FAD5B0", color: "#7A3A00" }}
        >
          {status === "loading" ? "Submitting…" : "Submit Device"}
        </button>
      </form>
    </div>
  );
}
