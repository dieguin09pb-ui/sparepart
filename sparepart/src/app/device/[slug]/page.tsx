import { createClient } from "@/lib/supabase/server";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { DeviceViewer3D } from "@/components/device/DeviceViewer3D";
import { ProblemForm } from "@/components/device/ProblemForm";
import { RepairGuides } from "@/components/device/RepairGuides";
import { RepairRecommendations } from "@/components/device/RepairRecommendations";
import { DEVICE_GUIDES } from "@/data/repair-guides";
import type { Metadata } from "next";

export const revalidate = 86400; // ISR — revalidate every 24h

// generateStaticParams cannot use cookies — use a plain Supabase client
export async function generateStaticParams() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return []; // no DB configured yet — pages generated on-demand via ISR
  }
  const supabase = createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase.from("devices").select("slug");
  return (data ?? []).map((d: { slug: string }) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { title: "Device — SparePart" };
  }
  const supabase = await createClient();
  const { data } = await supabase
    .from("devices")
    .select("name, brand, description")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Device not found — SparePart" };

  return {
    title: `${data.name} Repair Guide — SparePart`,
    description: `Find spare parts and AI-powered repair instructions for the ${data.brand} ${data.name}. ${data.description ?? ""}`.trim(),
  };
}

export default async function DevicePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const supabase = await createClient();

  const { data: device } = await supabase
    .from("devices")
    .select("*, category:categories(name, icon_emoji, slug)")
    .eq("slug", slug)
    .single();

  if (!device) notFound();

  const { data: deviceParts } = await supabase
    .from("parts")
    .select("*")
    .eq("device_id", device.id)
    .order("name");

  const category = device.category as { name: string; icon_emoji: string | null; slug: string } | null;
  const guides = DEVICE_GUIDES[slug] ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-2" style={{ color: "#5A5A5A" }}>
        <a href="/" className="hover:text-charcoal transition-colors">Home</a>
        <span>/</span>
        {category && (
          <>
            <span>{category.icon_emoji} {category.name}</span>
            <span>/</span>
          </>
        )}
        <span className="text-charcoal font-medium">{device.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left column — 3D viewer + device info */}
        <div>
          <DeviceViewer3D
            modelFile={device.model_file}
            deviceName={device.name}
            thumbnailUrl={device.thumbnail_url}
          />

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-1">
              {category && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#E4EEF7", color: "#2D2D2D" }}
                >
                  {category.icon_emoji} {category.name}
                </span>
              )}
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#FDE8CF", color: "#9A5A00" }}
              >
                {device.brand}
              </span>
              {device.model_year && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#EBE5F7", color: "#5A3A8A" }}
                >
                  {device.model_year}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-charcoal mt-2">
              {device.name}
            </h1>

            {device.description && (
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "#5A5A5A" }}>
                {device.description}
              </p>
            )}

            {/* Catalog parts list */}
            {deviceParts && deviceParts.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-charcoal mb-3">
                  Available parts ({deviceParts.length})
                </h2>
                <div className="flex flex-col gap-2">
                  {deviceParts.map((part) => {
                    const links: { store: string; label: string; url: string }[] = Array.isArray(part.buy_links) ? part.buy_links : [];
                    const fallbackLinks = [
                      { store: "iFixit", label: "iFixit", url: `https://www.ifixit.com/Search?query=${encodeURIComponent(device.name + " " + part.name)}` },
                      { store: "Amazon", label: "Amazon", url: `https://www.amazon.com/s?k=${encodeURIComponent(device.name + " " + part.name)}` },
                      { store: "eBay", label: "eBay", url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(device.name + " " + part.name)}` },
                    ];
                    const displayLinks = links.length > 0 ? links : fallbackLinks;
                    return (
                      <div
                        key={part.id}
                        className="text-xs rounded-lg px-3 py-2.5 border"
                        style={{ borderColor: "#C8DDEF", background: "#F8F9FB", color: "#2D2D2D" }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="font-medium">{part.name}</div>
                          {part.price_usd_est && (
                            <div className="shrink-0 font-medium" style={{ color: "#9A5A00" }}>~${part.price_usd_est}</div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {displayLinks.map((link) => (
                            <a
                              key={link.store}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium transition-opacity hover:opacity-80"
                              style={{ background: "#E4EEF7", color: "#1A5A8A" }}
                            >
                              {link.label ?? link.store}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          <RepairGuides guides={guides} />
          <RepairRecommendations deviceName={device.name} brand={device.brand} />
          </div>
        </div>

        {/* Right column — problem form + diagnosis */}
        <div>
          <div
            className="rounded-2xl p-6 border"
            style={{ borderColor: "#C8DDEF", background: "white" }}
          >
            <h2 className="font-semibold text-charcoal mb-1">
              What&apos;s broken?
            </h2>
            <p className="text-sm mb-5" style={{ color: "#5A5A5A" }}>
              Describe the issue and our AI will diagnose it and find you the
              right spare parts.
            </p>
            <ProblemForm
              deviceId={device.id}
              deviceName={device.name}
              commonIssues={device.common_issues ?? []}
              catalogParts={deviceParts ?? []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
