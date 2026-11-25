import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PremiumCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("premium-lift cristal cristal-hover rounded-[1.5rem] p-7", className)}>
      {children}
    </div>
  );
}
