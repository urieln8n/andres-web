import type { Lead } from "@/lib/dashboard/types";
import type { AuditResult } from "./generate-audit";

export function buildFollowUpWhatsAppMessage(lead: Lead, audit?: AuditResult | null): string {
  if (audit?.whatsappMessage) return audit.whatsappMessage;

  const problem = lead.main_problem ?? lead.goal ?? "mejorar tu presencia digital";
  return `Hola ${lead.name}, soy Andrés. He estado pensando en cómo podría ayudarte a ${problem} para ${lead.business_name}. ¿Tienes unos minutos para contarte mis ideas?`;
}

export function buildAuditReadyWhatsAppMessage(lead: Lead, audit: AuditResult): string {
  return (
    audit.whatsappMessage ||
    `Hola ${lead.name}, he terminado el análisis de ${lead.business_name}. Score digital: ${audit.score}/100. Tengo ideas concretas para mejorar tu captación. ¿Hablamos esta semana?`
  );
}

export function buildProposalWhatsAppMessage(lead: Lead, whatsappMessage: string): string {
  return whatsappMessage || `Hola ${lead.name}, te he preparado una propuesta para ${lead.business_name}. ¿Cuándo tienes 30 min para revisarla juntos?`;
}
