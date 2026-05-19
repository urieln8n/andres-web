import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "cyan" | "gold" | "emerald" | "violet" | "orange";
  subtitle?: string;
}

const accentMap = {
  cyan: "text-cyan-300 bg-cyan-300/10 border-cyan-300/20",
  gold: "text-gold bg-gold/10 border-gold/20",
  emerald: "text-emerald-300 bg-emerald-300/10 border-emerald-300/20",
  violet: "text-violet-300 bg-violet-300/10 border-violet-300/20",
  orange: "text-orange-300 bg-orange-300/10 border-orange-300/20",
};

export function KpiCard({ label, value, icon: Icon, accent = "cyan", subtitle }: KpiCardProps) {
  const colors = accentMap[accent];
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[.04] p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
          <p className="mt-1.5 text-3xl font-bold tabular-nums text-white">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border", colors)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
