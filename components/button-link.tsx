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
          ? "btn-ia font-semibold hover:-translate-y-0.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
          : "btn-cristal hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </Link>
  );
}
