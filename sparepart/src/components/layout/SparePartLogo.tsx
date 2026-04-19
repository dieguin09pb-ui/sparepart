export function SparePartLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-xl";
  const gearSize = size === "sm" ? 14 : size === "lg" ? 26 : 18;

  return (
    <span className={`inline-flex items-center font-bold tracking-tight text-charcoal ${textSize}`} style={{ lineHeight: 1 }}>
      Sp
      <GearIcon size={gearSize} />
      re
      <span style={{ color: "#E8A97A" }}>Part</span>
    </span>
  );
}

function GearIcon({ size }: { size: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.24;
  const toothH = size * 0.14;
  const toothW = size * 0.18;
  const holeR = size * 0.10;
  const teeth = 8;

  // Build gear path: outer polygon with teeth, inner hole
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const nextAngle = ((i + 1) / teeth) * Math.PI * 2 - Math.PI / 2;
    const midAngle = angle + Math.PI / teeth;
    const halfTooth = toothW / 2 / outerR;

    // Valley point
    const vx = cx + Math.cos(angle) * outerR;
    const vy = cy + Math.sin(angle) * outerR;
    // Tooth left base
    const tlx = cx + Math.cos(midAngle - halfTooth) * outerR;
    const tly = cy + Math.sin(midAngle - halfTooth) * outerR;
    // Tooth tip left
    const ttlx = cx + Math.cos(midAngle - halfTooth) * (outerR + toothH);
    const ttly = cy + Math.sin(midAngle - halfTooth) * (outerR + toothH);
    // Tooth tip right
    const ttrx = cx + Math.cos(midAngle + halfTooth) * (outerR + toothH);
    const ttry = cy + Math.sin(midAngle + halfTooth) * (outerR + toothH);
    // Tooth right base
    const trx = cx + Math.cos(midAngle + halfTooth) * outerR;
    const trY = cy + Math.sin(midAngle + halfTooth) * outerR;

    points.push(`${vx},${vy} ${tlx},${tly} ${ttlx},${ttly} ${ttrx},${ttry} ${trx},${trY}`);
    void nextAngle;
  }

  const gearPoints = points.join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "inline-block", verticalAlign: "middle", margin: "0 1px" }}
    >
      <polygon
        points={gearPoints}
        fill="#FAD5B0"
        stroke="#2D2D2D"
        strokeWidth={size * 0.06}
        strokeLinejoin="round"
      />
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="#FAD5B0"
        stroke="#2D2D2D"
        strokeWidth={size * 0.06}
      />
      <circle
        cx={cx}
        cy={cy}
        r={holeR}
        fill="#2D2D2D"
      />
    </svg>
  );
}
