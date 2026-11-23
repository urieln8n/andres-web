import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PremiumCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("premium-lift rounded-[1.5rem] border border-white/[.08] bg-[#0f0f0f]/90 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur", className)}>
      {children}
    </div>
  );
}
