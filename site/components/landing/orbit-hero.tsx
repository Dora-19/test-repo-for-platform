"use client";
// A full-screen hero: pictures (or videos) drift on tilted rings around the page's centre, the
// nearer ones bigger and on top, with whatever you put inside (a title, a line, two buttons)
// in the middle. Made after the look of getartcraft.com, in our own code.
//
//   <OrbitHero items={[{ src: "/me.jpg" }, { src: "/clip.mp4", video: true }, {}]}>
//     <h1 className="text-7xl font-black tracking-tight">ADIM</h1>
//     <p className="text-3xl font-semibold">Yaptığım şeyler <em className="font-serif font-normal">benim için.</em></p>
//   </OrbitHero>
//
// An item with no src is a soft colour tile, so it looks right before there are any pictures.
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type OrbitItem = { src?: string; video?: boolean; alt?: string };

const RINGS = [0.22, 0.34, 0.46, 0.58];   // radius, as a share of the hero's larger side
const TILT = 0.62;                        // the rings seen from above: 1 is a flat circle
const TILES = ["#e9d5c3", "#c9d6e8", "#e5c7c7", "#d3e3d0", "#ddd0e8", "#efe2bf"];

export function OrbitHero({ items = Array(12).fill({}), speed = 1, className, children }: {
  items?: OrbitItem[];
  speed?: number;
  className?: string;
  children?: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const rings = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const onRing = RINGS.map((_, ring) => Math.ceil((items.length - ring) / RINGS.length));
    const draw = (t: number) => {
      const el = box.current;
      if (!el) return;
      const { width: w, height: h } = el.getBoundingClientRect();
      const r = Math.max(w, h);
      rings.current.forEach((e, i) => {
        e?.setAttribute("rx", String(RINGS[i] * r));
        e?.setAttribute("ry", String(RINGS[i] * r * TILT));
      });
      tiles.current.forEach((tile, i) => {
        if (!tile) return;
        const ring = i % RINGS.length;
        // each ring turns its own way at its own pace; the tiles on it are spread evenly
        const a = (Math.floor(i / RINGS.length) / onRing[ring]) * 2 * Math.PI + ring * 0.9
          + (still ? 0 : (t / 1000) * speed * (ring % 2 ? -1 : 1) * (0.05 / (ring + 1)));
        const near = (Math.sin(a) + 1) / 2;   // 0 at the back, 1 at the front
        const x = w / 2 + Math.cos(a) * RINGS[ring] * r;
        const y = h / 2 + Math.sin(a) * RINGS[ring] * r * TILT;
        tile.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${0.6 + 0.5 * near})`;
        tile.style.zIndex = String(Math.round(near * 100));
        tile.style.opacity = String(0.5 + 0.5 * near);   // not blur: boxes draw without a GPU
      });
      if (!still) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    const redraw = () => still && requestAnimationFrame(draw);
    addEventListener("resize", redraw);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", redraw); };
  }, [items.length, speed]);

  return (
    <section ref={box} className={cn("relative h-screen w-full overflow-hidden bg-[#f2f1ee] text-neutral-950", className)}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {RINGS.map((_, i) => (
          <ellipse key={i} ref={(e) => { rings.current[i] = e; }} cx="50%" cy="50%"
            fill="none" stroke="currentColor" strokeOpacity={i % 2 ? 0.12 : 0.35} strokeWidth={i % 2 ? 1 : 1.5}
            strokeDasharray={i % 2 ? "1 7" : undefined} />
        ))}
      </svg>
      {items.map((item, i) => (
        <div key={i} ref={(el) => { tiles.current[i] = el; }}
          className="absolute left-0 top-0 aspect-[3/2] w-[clamp(90px,11vw,200px)] overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.18),-2px_0_0_rgba(255,80,120,0.25),2px_0_0_rgba(80,160,255,0.25)] will-change-transform">
          {item.src && item.video
            ? <video src={item.src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            : item.src
              ? <img src={item.src} alt={item.alt ?? ""} className="h-full w-full object-cover" />
              : <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${TILES[i % TILES.length]}, ${TILES[(i + 2) % TILES.length]})` }} />}
        </div>
      ))}
      <div className="relative z-[101] flex h-full flex-col items-center justify-center gap-5 px-4 text-center">{children}</div>
    </section>
  );
}
