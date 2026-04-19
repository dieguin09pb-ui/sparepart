import Link from "next/link";
import type { Device } from "@/types/device";

interface Props {
  devices: Pick<Device, "id" | "slug" | "name" | "brand">[];
}

export function PopularDeviceChips({ devices }: Props) {
  if (devices.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-sm text-charcoal-light mb-4 font-medium">
        Popular repairs
      </p>
      <div className="flex flex-wrap gap-2">
        {devices.map((device) => (
          <Link
            key={device.id}
            href={`/device/${device.slug}`}
            className="px-4 py-2 rounded-full border border-pale-blue/50 bg-white text-sm text-charcoal hover:bg-pale-blue/30 hover:border-pale-blue transition-all shadow-sm"
          >
            {device.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
