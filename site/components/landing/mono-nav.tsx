// A thin top bar: small spaced-out capitals, the current page in a black box, a divider before
// the last group. After getartcraft.com's, in our own code.
//
//   <MonoNav logo={<b>A</b>} links={[{ label: "Ana sayfa", href: "/" }, { label: "Projeler", href: "#projeler" }]}
//     extra={[{ label: "İletişim", href: "#iletisim" }]} active="/" />
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Link = { label: string; href: string };

export function MonoNav({ logo, links, extra = [], active, className }: {
  logo?: ReactNode;
  links: Link[];
  extra?: Link[];
  active?: string;
  className?: string;
}) {
  const item = (l: Link) => (
    <a key={l.href} href={l.href}
      className={cn("whitespace-nowrap px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        l.href === active ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950")}>
      {l.label}
    </a>
  );
  return (
    <nav className={cn("fixed inset-x-0 top-0 z-[200] flex h-11 items-center gap-4 overflow-x-auto border-b border-neutral-950/10 bg-[#f2f1ee]/80 px-4 backdrop-blur", className)}>
      {logo}
      <div className="flex items-center gap-2 sm:gap-4">{links.map(item)}</div>
      {extra.length > 0 && <div className="flex items-center gap-2 border-l border-neutral-950/10 pl-4 sm:gap-4 sm:pl-6">{extra.map(item)}</div>}
    </nav>
  );
}
