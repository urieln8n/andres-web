import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Globe, Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import {
  getLeadById,
  getLeadAudit,
  getLeadProposals,
  getLeadFollowups,
} from "@/lib/dashboard/queries";
import { LeadStatusBadge } from "@/components/dashboard/LeadStatusBadge";
import { LeadStatusSelect } from "@/components/dashboard/LeadStatusSelect";
import { LeadNotesEditor } from "@/components/dashboard/LeadNotesEditor";
import { AuditResultCard } from "@/components/dashboard/AuditResultCard";
import { ProposalCard } from "@/components/dashboard/ProposalCard";
import { GenerateAuditButton } from "@/components/dashboard/GenerateAuditButton";
import { GenerateProposalButton } from "@/components/dashboard/GenerateProposalButton";
import { CreateFollowupForm } from "@/components/dashboard/CreateFollowupForm";
import { CopyWhatsAppButton } from "@/components/dashboard/CopyWhatsAppButton";

export const metadata = {
  title: "Lead · Dashboard",
  robots: { index: false, follow: false },
};

function InfoRow({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-0.5 truncate text-sm text-slate-300">{value}</p>
      </div>
    </div>
  );
}

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const [lead, audit, proposals, followups] = await Promise.all([
    getLeadById(params.id),
    getLeadAudit(params.id),
    getLeadProposals(params.id),
    getLeadFollowups(params.id),
  ]);

  if (!lead) notFound();

  const contactPhone = lead.whatsapp ?? lead.phone;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Leads
        </Link>
        <span className="text-slate-700">/</span>
        <span className="text-sm text-white">{lead.business_name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
          <p className="mt-1 text-base text-cyan-300">{lead.business_name}</p>
        </div>
        <LeadStatusBadge status={lead.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: data + actions */}
        <div className="space-y-6 lg:col-span-1">
          {/* Contact info */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contacto</p>
            <div className="space-y-3">
              <InfoRow icon={Mail} label="Email" value={lead.email} />
              <InfoRow icon={Phone} label="Teléfono" value={lead.phone} />
              <InfoRow icon={MessageCircle} label="WhatsApp" value={lead.whatsapp} />
              <InfoRow icon={MapPin} label="Ciudad" value={lead.city} />
              <InfoRow icon={Globe} label="Web" value={lead.website} />
              <InfoRow icon={Instagram} label="Instagram" value={lead.instagram_url} />
            </div>
            {contactPhone && (
              <div className="pt-2">
                <CopyWhatsAppButton
                  message={`Hola ${lead.name}, te contacto desde el Growth Engine.`}
                  phone={contactPhone}
                  variant="open"
                />
              </div>
            )}
          </div>

          {/* Lead details */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Detalles</p>
            {lead.sector && (
              <div>
                <p className="text-xs text-slate-500">Sector</p>
                <p className="mt-0.5 text-sm text-slate-300">{lead.sector}</p>
              </div>
            )}
            {lead.service && (
              <div>
                <p className="text-xs text-slate-500">Servicio de interés</p>
                <p className="mt-0.5 text-sm text-slate-300">{lead.service}</p>
              </div>
            )}
            {lead.budget && (
              <div>
                <p className="text-xs text-slate-500">Presupuesto</p>
                <p className="mt-0.5 text-sm text-slate-300">{lead.budget}</p>
              </div>
            )}
            {(lead.main_problem || lead.goal) && (
              <div>
                <p className="text-xs text-slate-500">Problema / objetivo</p>
                <p className="mt-0.5 text-sm text-slate-300">{lead.main_problem ?? lead.goal}</p>
              </div>
            )}
            {lead.message && (
              <div>
                <p className="text-xs text-slate-500">Mensaje</p>
                <p className="mt-0.5 text-sm text-slate-400 italic">&ldquo;{lead.message}&rdquo;</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-500">Fuente</p>
              <p className="mt-0.5 text-sm text-slate-400">{lead.source ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Registrado</p>
              <p className="mt-0.5 text-sm text-slate-400">
                {new Date(lead.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Status editor */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
          </div>

          {/* Notes */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5">
            <LeadNotesEditor leadId={lead.id} initialNotes={lead.internal_notes} />
          </div>
        </div>

        {/* Right column: audit, proposals, followups */}
        <div className="space-y-6 lg:col-span-2">
          {/* Audit section */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-white">Auditoría IA</p>
              <GenerateAuditButton leadId={lead.id} hasAudit={!!audit} />
            </div>
            {audit ? (
              <AuditResultCard audit={audit} leadPhone={contactPhone} />
            ) : (
              <p className="text-sm text-slate-500">
                No hay auditoría todavía. Genera una para analizar el estado digital de este negocio.
              </p>
            )}
          </div>

          {/* Proposals section */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-white">
                Propuestas ({proposals.length})
              </p>
              <GenerateProposalButton
                leadId={lead.id}
                leadPhone={contactPhone}
                hasProposal={proposals.length > 0}
              />
            </div>
            {proposals.length > 0 ? (
              <div className="space-y-4">
                {proposals.map((p) => (
                  <ProposalCard key={p.id} proposal={p} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Sin propuestas. Genera una tras revisar la auditoría.
              </p>
            )}
          </div>

          {/* Followups section */}
          <div className="rounded-2xl border border-white/8 bg-white/[.03] p-5 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-white">
                Seguimientos ({followups.length})
              </p>
            </div>
            <CreateFollowupForm leadId={lead.id} />
            {followups.length > 0 && (
              <div className="space-y-2 pt-2">
                {followups.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-orange-300">{f.channel}</span>
                          {f.scheduled_at && (
                            <span className="text-xs text-slate-500">
                              {new Date(f.scheduled_at).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </span>
                          )}
                        </div>
                        {f.message && (
                          <p className="mt-1 text-sm text-slate-300">{f.message}</p>
                        )}
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                          f.status === "done"
                            ? "bg-emerald-300/10 text-emerald-400"
                            : f.status === "sent"
                              ? "bg-amber-300/10 text-amber-400"
                              : "bg-slate-300/10 text-slate-400"
                        }`}
                      >
                        {f.status === "done" ? "Hecho" : f.status === "sent" ? "Enviado" : "Pendiente"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
