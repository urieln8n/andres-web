import type { ReactNode } from "react";

export function Section({ eyebrow, title, children, numero }: { eyebrow: string; title: string; children: ReactNode; numero?: string }) {
  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 border-t border-white/10 pt-8 lg:mb-16 lg:grid-cols-[14rem_1fr]">
          <p className="premium-kicker text-xs">{numero ? `(${numero}) ` : ""}{eyebrow}</p>
          <h2 className="titulo-display text-balance max-w-4xl text-4xl text-white md:text-6xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
