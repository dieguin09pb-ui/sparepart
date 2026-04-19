export function LoadingMachine({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative" style={{ width: 140, height: 140 }}>
        {/* Machine */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/RandomMachine.png"
          alt=""
          width={140}
          height={140}
          style={{ objectFit: "contain", display: "block" }}
        />
        {/* Smoke puffs — staggered so they cycle continuously */}
        {[
          { left: 38, delay: 0,    size: 34 },
          { left: 56, delay: 0.65, size: 42 },
          { left: 72, delay: 1.3,  size: 30 },
        ].map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src="/images/Smoke1.png"
            alt=""
            width={s.size}
            height={s.size}
            style={{
              position: "absolute",
              top: -10,
              left: s.left,
              opacity: 0,
              animation: `smokeUp 2s ease-out infinite`,
              animationDelay: `${s.delay}s`,
              objectFit: "contain",
            }}
          />
        ))}
      </div>
      <p className="text-sm font-medium" style={{ color: "#5A5A5A" }}>{label}</p>
      <p className="text-xs" style={{ color: "#ABABAB" }}>Usually takes 5–10 seconds</p>
    </div>
  );
}
