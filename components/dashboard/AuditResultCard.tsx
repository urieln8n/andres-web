import type { ReactNode } from "react";
import type { Audit } from "@/lib/dashboard/types";
import { normalizeList } from "@/lib/ai/audit-formatters";
import { AuditScoreBadge } from "./AuditScoreBadge";
import { CopyWhatsAppButton } from "./CopyWhatsAppButton";
import { CreateProposalFromAuditButton } from "./CreateProposalFromAuditButton";
import { SevenDayPlan } from "./SevenDayPlan";

function priorityClass(priority?: unknown) {
  if (priority === "alta") return "border-red-300/20 bg-red-300/10 text-red-200";
  if (priority === "media") return "border-amber-300/20 bg-amber-300/10 text-amber-200";
  return "border-slate-300/15 bg-white/5 text-slate-300";
}

function renderWeakness(item: unknown, index: number) {
  if (typeof item === "string") {
    return (
      <li key={`${item}-${index}`} className="rounded-xl border border-white/8 bg-white/[.03] p-4 text-sm text-slate-300">
        {item}
      </li>
    );
  }

  const weakness = item as { title?: string; impact?: string; priority?: string; recommendation?: string };
  return (
    <li key={`${weakness.title}-${index}`} className="rounded-xl border border-white/8 bg-white/[.03] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-white">{weakness.title}</p>
        {weakness.priority && (
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityClass(weakness.priority)}`}>
            {weakness.priority}
          </span>
        )}
      </div>
      {weakness.impact && <p className="mt-2 text-sm leading-6 text-slate-400">{weakness.impact}</p>}
      {weakness.recommendation && <p className="mt-2 text-sm leading-6 text-slate-300">{weakness.recommendation}</p>}
    </li>
  );
}

function renderOpportunity(item: unknown, index: number) {
  if (typeof item === "string") {
    return (
      <li key={`${item}-${index}`} className="rounded-xl border border-white/8 bg-white/[.03] p-4 text-sm text-slate-300">
        {item}
      </li>
    );
  }

  const opportunity = item as { title?: string; description?: string; businessImpact?: string; difficulty?: string };
  return (
    <li key={`${opportunity.title}-${index}`} className="rounded-xl border border-emerald-300/10 bg-emerald-300/[.04] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-white">{opportunity.title}</p>
        {opportunity.difficulty && (
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[11px] font-medium text-emerald-200">
            {opportunity.difficulty}
          </span>
        )}
      </div>
      {opportunity.description && <p className="mt-2 text-sm leading-6 text-slate-400">{opportunity.description}</p>}
      {opportunity.businessImpact && <p className="mt-2 text-sm leading-6 text-emerald-100/80">{opportunity.businessImpact}</p>}
    </li>
  );
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-2xl border border-white/8 bg-black/15 p-4">
      <summary className="cursor-pointer list-none text-sm font-semibold text-white marker:hidden">
        <div className="flex items-center justify-between gap-3">
          <span>{title}</span>
          <span className="text-xs text-slate-500 group-open:hidden">Abrir</span>
          <span className="hidden text-xs text-slate-500 group-open:inline">Cerrar</span>
        </div>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

export function AuditResultCard({ audit, leadPhone }: { audit: Audit; leadPhone?: string | null }) {
  const score = audit.score ?? 0;
  const weaknesses = audit.weaknesses ?? [];
  const opportunities = audit.opportunities ?? [];
  const nextSteps = normalizeList(audit.next_steps ?? []);

  return (
    <div className="space-y-4">
      <AuditScoreBadge score={score} />

      {(audit.generated_by || audit.model_used) && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {audit.generated_by === "fallback" && (
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-amber-200">
              Configura OPENAI_API_KEY para activar auditorías IA
            </span>
          )}
          {audit.model_used && <span>Modelo: {audit.model_used}</span>}
        </div>
      )}

      {audit.diagnosis && (
        <Section title="Diagnóstico comercial">
          <p className="text-sm leading-6 text-slate-300">{audit.diagnosis}</p>
        </Section>
      )}

      {audit.ai_summary && (
        <Section title="Resumen ejecutivo">
          <p className="text-sm leading-6 text-slate-300">{audit.ai_summary}</p>
        </Section>
      )}

      {weaknesses.length > 0 && (
        <Section title="Puntos débiles">
          <ul className="space-y-3">{weaknesses.map(renderWeakness)}</ul>
        </Section>
      )}

      {opportunities.length > 0 && (
        <Section title="Oportunidades">
          <ul className="space-y-3">{opportunities.map(renderOpportunity)}</ul>
        </Section>
      )}

      {audit.recommended_offer && (
        <Section title="Oferta recomendada">
          <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/8 p-4">
            <p className="whitespace-pre-line text-sm font-medium leading-6 text-cyan-100">{audit.recommended_offer}</p>
          </div>
        </Section>
      )}

      {audit.whatsapp_message && (
        <Section title="Mensaje comercial de WhatsApp">
          <div className="rounded-xl border border-white/8 bg-white/[.03] p-4">
            <p className="text-sm leading-6 text-slate-300">&ldquo;{audit.whatsapp_message}&rdquo;</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <CopyWhatsAppButton message={audit.whatsapp_message} />
              {leadPhone && <CopyWhatsAppButton message={audit.whatsapp_message} phone={leadPhone} variant="open" />}
            </div>
          </div>
        </Section>
      )}

      {audit.seven_day_plan && audit.seven_day_plan.length > 0 && (
        <Section title="Plan de acción de 7 días" defaultOpen={false}>
          <SevenDayPlan plan={audit.seven_day_plan} />
        </Section>
      )}

      {nextSteps.length > 0 && (
        <Section title="Próximos pasos" defaultOpen={false}>
          <ul className="space-y-2">
            {nextSteps.map((step) => (
              <li key={step} className="rounded-xl border border-white/8 bg-white/[.03] px-4 py-3 text-sm text-slate-300">
                {step}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <CreateProposalFromAuditButton auditId={audit.id} leadPhone={leadPhone} />
        <p className="text-xs text-slate-600">
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
    </div>
  );
}
