import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-pale-blue/30 bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="text-lg font-bold text-charcoal mb-2">
              Spare<span style={{ color: "#E8A97A" }}>Part</span>
            </div>
            <p className="text-sm text-charcoal-light leading-relaxed">
              Fix it. Don&apos;t replace it. Every repaired device is one less
              device in a landfill.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div>
              <div className="font-medium text-charcoal mb-3">Browse</div>
              <div className="flex flex-col gap-2 text-charcoal-light">
                <Link href="/" className="hover:text-charcoal transition-colors">Gaming Controllers</Link>
                <Link href="/" className="hover:text-charcoal transition-colors">Phones</Link>
                <Link href="/" className="hover:text-charcoal transition-colors">TV Remotes</Link>
                <Link href="/" className="hover:text-charcoal transition-colors">Electronics</Link>
              </div>
            </div>
            <div>
              <div className="font-medium text-charcoal mb-3">Account</div>
              <div className="flex flex-col gap-2 text-charcoal-light">
                <Link href="/auth/login" className="hover:text-charcoal transition-colors">Sign In</Link>
                <Link href="/history" className="hover:text-charcoal transition-colors">My Repairs</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-pale-blue/20 text-xs text-charcoal-light">
          © {new Date().getFullYear()} SparePart · Made for the planet
        </div>
      </div>
    </footer>
  );
}
