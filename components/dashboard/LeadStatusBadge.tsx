import { LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

export function LeadStatusBadge({ status }: { status: string }) {
  const key = status as LeadStatus;
  const label = LEAD_STATUS_LABELS[key] ?? status;
  const colors = LEAD_STATUS_COLORS[key] ?? "bg-slate-300/10 text-slate-300 border-slate-300/20";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", colors)}>
      {label}
    </span>
  );
}
