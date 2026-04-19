import { HeroSearch } from "@/components/home/HeroSearch";
import { PopularDeviceChips } from "@/components/home/PopularDeviceChips";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import Image from "next/image";

// Use the anon client (no cookies) so this page can be statically cached via ISR
export const revalidate = 1800; // rebuild at most every 30 min

const HOW_IT_WORKS = [
  {
    image: "/images/Search.png",
    title: "Search your device",
    description: "Type your device name and select from our catalog of 60+ devices — controllers, phones, remotes, cars, and more.",
    color: "#C8DDEF",
  },
  {
    image: "/images/robot arm.png",
    title: "Describe the problem",
    description: "Tell us what's wrong. Our AI diagnoses the issue and gives you a step-by-step repair guide tailored to your situation.",
    color: "#FAD5B0",
  },
  {
    image: "/images/shopping-cart-clipart-md.png",
    title: "Get the right parts",
    description: "See exactly which parts you need with links to buy them on iFixit, Amazon, and eBay — at fair prices.",
    color: "#D8CBF0",
  },
];

const CATEGORIES = [
  { image: "/images/game-controller-clipart-free-18.png", label: "Gaming Controllers", slug: "gaming-controllers" },
  { image: "/images/Smartphone.png",                      label: "Phones",              slug: "phones" },
  { image: "/images/tv-remote-clipart-sm.png",            label: "TV Remotes",          slug: "tv-remotes" },
  { image: "/images/laptop.png",                          label: "Electronics",         slug: "electronics" },
  { image: "/images/Basic Car.png",                       label: "Car Parts",           slug: "cars" },
];

export default async function HomePage() {
  let popularDevices: { id: number; slug: string; name: string; brand: string }[] = [];
  try {
    const supabase = createAnonClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase
      .from("devices")
      .select("id, slug, name, brand")
      .eq("is_popular", true)
      .order("name")
      .limit(12);
    popularDevices = data ?? [];
  } catch {
    // Supabase not configured yet — show empty state
  }

  return (
    <>
      <HeroSearch />

      <PopularDeviceChips devices={popularDevices ?? []} />

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-charcoal mb-2 text-center">
          How SparePart works
        </h2>
        <p className="text-center mb-12 max-w-lg mx-auto" style={{ color: "#5A5A5A" }}>
          From broken to fixed in three simple steps.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ background: step.color + "33" }}
            >
              <div className="w-20 h-20 mb-5 relative">
                <Image src={step.image} alt={step.title} fill className="object-contain drop-shadow-sm" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2 text-lg">{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5A5A5A" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category quick links */}
      <section className="py-16" style={{ background: "#F8F9FB" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-charcoal mb-2">Browse by category</h2>
          <p className="mb-8" style={{ color: "#5A5A5A" }}>
            60+ devices across 5 categories — controllers, phones, remotes, electronics, and cars.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-pale-blue/30 hover:border-pale-blue hover:shadow-sm transition-all text-center cursor-default"
              >
                <div className="w-16 h-16 relative">
                  <Image src={cat.image} alt={cat.label} fill className="object-contain drop-shadow-sm" />
                </div>
                <span className="text-sm font-medium text-charcoal">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability banner */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div
          className="rounded-3xl px-8 py-14 flex flex-col items-center"
          style={{ background: "linear-gradient(135deg, #E4EEF7 0%, #EBE5F7 100%)" }}
        >
          <div className="w-16 h-16 relative mb-4">
            <Image src="/images/World.png" alt="World" fill className="object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-3">Every repair counts</h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ color: "#5A5A5A" }}>
            Manufacturing a single smartphone generates up to 70kg of CO₂.
            Repairing instead of replacing keeps devices in use and e-waste out
            of landfills. SparePart makes repair accessible to everyone.
          </p>
        </div>
      </section>
    </>
  );
}
