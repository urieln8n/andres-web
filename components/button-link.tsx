import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary", size = "md", className }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; size?: "sm" | "md"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-premium inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300",
        size === "sm" ? "px-5 py-2.5 text-sm" : "px-6 py-3.5 text-sm sm:text-base",
        variant === "primary"
          ? "bg-white text-ink shadow-[0_14px_40px_rgba(34,211,238,.14),inset_0_-1px_0_rgba(15,23,42,.18)] hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-[0_18px_48px_rgba(214,178,94,.16),0_0_34px_rgba(34,211,238,.16)]"
          : "border border-white/12 bg-white/[.035] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur hover:-translate-y-0.5 hover:border-cyan-200/25 hover:bg-white/[.075]",
        className
      )}
    >
      {children}
    </Link>
  );
}
