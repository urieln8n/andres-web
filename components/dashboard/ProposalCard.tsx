import type { Proposal } from "@/lib/dashboard/types";

const statusColors: Record<string, string> = {
  draft: "bg-slate-300/10 text-slate-400",
  sent: "bg-amber-300/10 text-amber-300",
  accepted: "bg-emerald-300/10 text-emerald-300",
  rejected: "bg-red-300/10 text-red-400",
};

const statusLabels: Record<string, string> = {
  draft: "Borrador",
  sent: "Enviada",
  accepted: "Aceptada",
  rejected: "Rechazada",
};

export function ProposalCard({ proposal }: { proposal: Proposal }) {
  const colorClass = statusColors[proposal.status] ?? "bg-slate-300/10 text-slate-400";
  const label = statusLabels[proposal.status] ?? proposal.status;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{proposal.title ?? "Propuesta"}</p>
          {proposal.package_type && (
            <p className="mt-0.5 text-sm text-cyan-300">{proposal.package_type}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>{label}</span>
          {proposal.price && (
            <span className="text-sm font-bold text-gold">{proposal.price}</span>
          )}
        </div>
      </div>

      {proposal.proposal_text && (
        <p className="whitespace-pre-wrap text-sm text-slate-400">{proposal.proposal_text}</p>
      )}

      <p className="mt-3 text-right text-xs text-slate-600">
        {new Date(proposal.created_at).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
