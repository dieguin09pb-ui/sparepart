"use client";

import { useEffect, useRef, useCallback } from "react";
import { SearchAutocomplete } from "@/components/search/SearchAutocomplete";

interface ParticleDef {
  src: string;
  size: number;
  vx: number;   // px/s base
  vy: number;   // px/s base
  rotSpeed: number; // deg/s (0 for cars)
  opacity: number;
  isCar?: boolean; // flip horizontally when going left
}

const DEFS: ParticleDef[] = [
  // Cars — fast horizontal lanes
  { src: "/images/Car2.png",        size: 82,  vx:  95, vy:  6,  rotSpeed: 0,   opacity: 0.22, isCar: true },
  { src: "/images/Car3.png",        size: 72,  vx: -78, vy: -4,  rotSpeed: 0,   opacity: 0.22, isCar: true },
  { src: "/images/PickupTruck1.png",size: 92,  vx:  62, vy:  10, rotSpeed: 0,   opacity: 0.20, isCar: true },
  // Gears — spin while drifting
  { src: "/images/Gear1.png",       size: 74,  vx:  18, vy: -12, rotSpeed:  42, opacity: 0.18 },
  { src: "/images/Gear2.png",       size: 58,  vx: -14, vy:  16, rotSpeed: -58, opacity: 0.18 },
  // Repair tools — diagonal drift
  { src: "/images/Wrench1.png",     size: 62,  vx:  28, vy: -20, rotSpeed:   9, opacity: 0.20 },
  { src: "/images/Screwdriver.png", size: 56,  vx: -22, vy:  24, rotSpeed: -11, opacity: 0.20 },
  { src: "/images/Hammer1.png",     size: 66,  vx:  20, vy:  30, rotSpeed:  13, opacity: 0.20 },
  { src: "/images/Drill2.png",      size: 60,  vx: -30, vy: -18, rotSpeed:  -8, opacity: 0.20 },
  { src: "/images/Screwdriver2.png",size: 52,  vx:  15, vy:  22, rotSpeed:  10, opacity: 0.18 },
  // Devices — gentle float
  { src: "/images/Smartphone.png",  size: 54,  vx: -24, vy:  16, rotSpeed:   5, opacity: 0.18 },
  { src: "/images/laptop.png",      size: 82,  vx:  22, vy: -14, rotSpeed:  -4, opacity: 0.18 },
  { src: "/images/game-controller-clipart-free-18.png", size: 72, vx: -18, vy: 22, rotSpeed: 6, opacity: 0.18 },
  { src: "/images/Headphone1.png",  size: 64,  vx:  32, vy:  12, rotSpeed:  -7, opacity: 0.18 },
  { src: "/images/Watch1.png",      size: 56,  vx:  20, vy:  26, rotSpeed: -12, opacity: 0.18 },
  // Robot arm + misc
  { src: "/images/robot arm.png",   size: 86,  vx: -16, vy: -22, rotSpeed:   4, opacity: 0.17 },
  { src: "/images/Hammer2.png",     size: 60,  vx: -25, vy:  18, rotSpeed:  11, opacity: 0.18 },
];

const REPEL_RADIUS = 170;
const REPEL_BOOST  = 320;  // px/s added when cursor is at item center
const LERP_BACK    = 0.025; // how fast cvx/cvy returns to vx/vy per frame

interface Particle {
  src: string;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  cvx: number; // current (includes repel impulse)
  cvy: number;
  rot: number;
  rotSpeed: number;
  opacity: number;
  isCar: boolean;
}

function initParticles(W: number, H: number): Particle[] {
  return DEFS.map((d, i) => {
    // Spread initial positions pseudo-randomly across the canvas
    const angle = (i / DEFS.length) * Math.PI * 2;
    const rx = 0.1 + 0.8 * ((i * 1.618) % 1);
    const ry = 0.1 + 0.8 * ((i * 2.236 + 0.3) % 1);
    return {
      ...d,
      x: rx * W,
      y: ry * H,
      cvx: d.vx,
      cvy: d.vy,
      rot: angle * (180 / Math.PI),
      isCar: d.isCar ?? false,
    };
  });
}

export function HeroSearch() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const imgRefs     = useRef<(HTMLImageElement | null)[]>([]);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const rafRef      = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastTRef    = useRef<number>(0);
  const sizeRef     = useRef({ W: 1, H: 1 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const W = rect.width  || window.innerWidth;
    const H = rect.height || 500;
    sizeRef.current = { W, H };
    particlesRef.current = initParticles(W, H);

    const onResize = () => {
      const r = section.getBoundingClientRect();
      sizeRef.current = { W: r.width, H: r.height };
    };
    window.addEventListener("resize", onResize);

    const animate = (t: number) => {
      const dt = Math.min((t - lastTRef.current) / 1000, 0.05); // cap at 50ms
      lastTRef.current = t;
      const { W, H } = sizeRef.current;
      const { x: mx, y: my } = mouseRef.current;

      particlesRef.current.forEach((p, i) => {
        const el = imgRefs.current[i];
        if (!el) return;

        // Repel: if cursor is close, add velocity away from it
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_BOOST;
          p.cvx += (dx / dist) * force * dt * 8;
          p.cvy += (dy / dist) * force * dt * 8;
        }

        // Lerp current velocity back toward base velocity
        p.cvx += (p.vx - p.cvx) * LERP_BACK;
        p.cvy += (p.vy - p.cvy) * LERP_BACK;

        // Move
        p.x += p.cvx * dt;
        p.y += p.cvy * dt;

        // Rotate
        p.rot += p.rotSpeed * dt;

        // Wrap at edges (with margin = size so it appears fully off-screen first)
        const margin = p.size;
        if (p.x > W + margin) p.x = -margin;
        else if (p.x < -margin) p.x = W + margin;
        if (p.y > H + margin) p.y = -margin;
        else if (p.y < -margin) p.y = H + margin;

        // For cars, flip image when going left
        const scaleX = p.isCar && p.cvx < 0 ? -1 : 1;

        el.style.transform = `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px) rotate(${p.rot}deg) scaleX(${scaleX})`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame((t) => {
      lastTRef.current = t;
      rafRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const updateMouse = useCallback((clientX: number, clientY: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => updateMouse(e.clientX, e.clientY),
    [updateMouse]
  );
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      const t = e.touches[0];
      if (t) updateMouse(t.clientX, t.clientY);
    },
    [updateMouse]
  );
  const handleLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #E4EEF7 0%, #FDE8CF 50%, #EBE5F7 100%)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      {/* ── Particle canvas (absolute, pointer-events-none) ── */}
      <div
        ref={canvasRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {DEFS.map((def, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            ref={(el) => { imgRefs.current[i] = el; }}
            src={def.src}
            alt=""
            width={def.size}
            height={def.size}
            className="absolute select-none object-contain"
            style={{
              opacity: def.opacity,
              willChange: "transform",
              top: 0,
              left: 0,
              transform: "translate(-9999px, -9999px)", // hide until RAF positions it
            }}
          />
        ))}
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "#C8DDEF" }} />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "#FAD5B0" }} />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pale-blue/60 bg-white/60 text-xs text-charcoal-light mb-6">
          <img src="/images/World.png" alt="" width={16} height={16} className="object-contain" />
          <span>Repair first · Replace only if necessary</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-charcoal mb-4 tracking-tight leading-tight">
          Fix what&apos;s broken.
          <br />
          <span style={{ color: "#B8860B" }}>Skip the landfill.</span>
        </h1>

        <p className="text-charcoal-light text-lg mb-10 max-w-xl mx-auto">
          Search your device, describe the problem, and get AI-powered repair
          guidance + spare parts — instantly.
        </p>

        <SearchAutocomplete autoFocus />
      </div>
    </section>
  );
}
