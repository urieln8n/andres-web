import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PremiumCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("premium-border glass-panel premium-lift rounded-[1.35rem] p-6", className)}>
      {children}
    </div>
  );
}
