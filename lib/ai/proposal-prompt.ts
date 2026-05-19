import type { AuditResult } from "./generate-audit";
import type { Lead } from "@/lib/dashboard/types";

export const PACKAGES = [
  { name: "Auditoría IA Express", price: "Gratis", description: "Diagnóstico completo de presencia digital" },
  { name: "Demo Growth", price: "desde 149€", description: "Demo visual del sistema antes de invertir" },
  { name: "Web Premium Local", price: "desde 790€", description: "Web premium mobile-first con SEO y captación" },
  { name: "Sistema Digital 360 IA", price: "desde 1.500€", description: "Sistema completo: web, WhatsApp IA, CRM, SEO" },
  { name: "Mantenimiento IA", price: "desde 97€/mes", description: "Seguimiento mensual y automatizaciones activas" },
  { name: "Recepcionista IA WhatsApp", price: "desde 79€/mes", description: "Asistente WhatsApp con IA 24/7" },
  { name: "BarberíaOS", price: "a medida", description: "Sistema completo para barberías" },
];

export function buildProposalPrompt(lead: Lead, audit?: AuditResult | null): string {
  const auditContext = audit
    ? `
AUDITORÍA DISPONIBLE:
- Score digital: ${audit.score}/100
- Diagnóstico: ${audit.diagnosis}
- Oferta recomendada por IA: ${audit.recommendedOffer}
- Debilidades: ${audit.weaknesses?.join(", ")}
- Oportunidades: ${audit.opportunities?.join(", ")}
`
    : "No hay auditoría previa disponible.";

  return `Eres un consultor experto en sistemas digitales para negocios locales. Crea una propuesta comercial profesional en español.

DATOS DEL CLIENTE:
- Nombre: ${lead.name}
- Negocio: ${lead.business_name}
- Sector: ${lead.sector || "No especificado"}
- Ciudad: ${lead.city || "No especificada"}
- Web: ${lead.website || "Sin web"}
- Instagram: ${lead.instagram_url || "Sin Instagram"}
- Problema principal: ${lead.main_problem || lead.goal || "No especificado"}
- Servicio solicitado: ${lead.service || "No especificado"}
- Presupuesto: ${lead.budget || "No especificado"}

${auditContext}

PAQUETES DISPONIBLES:
${PACKAGES.map((p) => `- ${p.name}: ${p.price} — ${p.description}`).join("\n")}

INSTRUCCIONES:
Crea una propuesta clara, profesional y orientada a conversión. Elige el paquete más adecuado según el perfil. Incluye qué problema resuelve, qué incluye, cuál es el beneficio principal y cuál es el siguiente paso. Sé directo y conciso.

Responde ÚNICAMENTE en JSON válido con estas claves:
{
  "title": string,
  "packageType": string,
  "price": string,
  "whatWeDoFor": string,
  "includes": string[],
  "mainBenefit": string,
  "nextSteps": string[],
  "whatsappMessage": string,
  "proposalText": string
}`;
}
