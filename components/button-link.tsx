import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary", size = "md" }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; size?: "sm" | "md" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300",
        size === "sm" ? "px-5 py-2.5 text-sm" : "px-6 py-3.5 text-sm sm:text-base",
        variant === "primary"
          ? "focus-premium bg-white text-ink shadow-glow hover:-translate-y-0.5 hover:bg-cyan-100"
          : "focus-premium border border-white/10 bg-white/[.05] text-white hover:-translate-y-0.5 hover:bg-white/[.1]"
      )}
    >
      {children}
    </Link>
  );
}
