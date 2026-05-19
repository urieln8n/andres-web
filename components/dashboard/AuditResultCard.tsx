import type { Audit } from "@/lib/dashboard/types";
import { CopyWhatsAppButton } from "./CopyWhatsAppButton";

export function AuditResultCard({ audit, leadPhone }: { audit: Audit; leadPhone?: string | null }) {
  const score = audit.score ?? 0;
  const scoreColor =
    score >= 70 ? "text-emerald-300" : score >= 40 ? "text-amber-300" : "text-red-400";

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <span className={`text-2xl font-bold tabular-nums ${scoreColor}`}>{score}</span>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Score digital</p>
          <p className="mt-0.5 text-sm text-slate-300">{audit.diagnosis}</p>
        </div>
      </div>

      {/* Weaknesses */}
      {audit.weaknesses && audit.weaknesses.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400/70">Debilidades</p>
          <ul className="space-y-1">
            {audit.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-0.5 shrink-0 text-red-400">×</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Opportunities */}
      {audit.opportunities && audit.opportunities.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-400/70">Oportunidades</p>
          <ul className="space-y-1">
            {audit.opportunities.map((o, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended offer */}
      {audit.recommended_offer && (
        <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/8 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-widest text-cyan-400/70">Oferta recomendada</p>
          <p className="mt-0.5 font-semibold text-cyan-200">{audit.recommended_offer}</p>
        </div>
      )}

      {/* 7-day plan */}
      {audit.seven_day_plan && audit.seven_day_plan.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Plan 7 días</p>
          <ol className="space-y-1">
            {audit.seven_day_plan.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-0.5 shrink-0 tabular-nums text-slate-600">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* WhatsApp message */}
      {audit.whatsapp_message && (
        <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-slate-500">Mensaje WhatsApp</p>
          <p className="text-sm text-slate-300 italic">&ldquo;{audit.whatsapp_message}&rdquo;</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyWhatsAppButton message={audit.whatsapp_message} />
            {leadPhone && (
              <CopyWhatsAppButton
                message={audit.whatsapp_message}
                phone={leadPhone}
                variant="open"
              />
            )}
          </div>
        </div>
      )}

      <p className="text-right text-xs text-slate-600">
        Generada el{" "}
        {new Date(audit.created_at).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
