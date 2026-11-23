import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ButtonLink({ href, children, variant = "primary", size = "md", className }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; size?: "sm" | "md"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-premium group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition duration-300",
        size === "sm" ? "px-5 py-2.5 text-sm" : "px-7 py-4 text-sm sm:text-base",
        variant === "primary"
          ? "bg-lima-300 text-ink shadow-[0_0_0_1px_rgba(198,255,61,.4),0_18px_50px_rgba(198,255,61,.18)] hover:-translate-y-0.5 hover:bg-lima-200 hover:shadow-[0_0_0_1px_rgba(198,255,61,.6),0_22px_60px_rgba(198,255,61,.28)] [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
          : "border border-white/15 bg-white/[.03] text-white backdrop-blur hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[.07]",
        className
      )}
    >
      {children}
    </Link>
  );
}
