"use client";
// The page's sections listed small in the bottom-right corner; the one on screen is darker,
// and each jumps to its section. After getartcraft.com's, in our own code.
//
//   <SectionIndex sections={[{ id: "projeler", label: "Projeler" }, { id: "iletisim", label: "İletişim" }]} />
//   ...and give each section that id: <section id="projeler">…</section>
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SectionIndex({ sections, className }: {
  sections: { id: string; label: string }[];
  className?: string;
}) {
  const [on, setOn] = useState<string>();
  useEffect(() => {
    const seen = new IntersectionObserver(
      (all) => all.forEach((e) => e.isIntersecting && setOn(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" },   // the one crossing the middle of the screen
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) seen.observe(el); });
    return () => seen.disconnect();
  }, [sections]);

  return (
    <nav className={cn("fixed bottom-4 right-4 z-[200] flex flex-col items-end text-right", className)}>
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`}
          className={cn("text-sm font-semibold uppercase leading-tight tracking-wide transition-colors",
            on === s.id ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-700")}>
          {s.label}
        </a>
      ))}
    </nav>
  );
}
