import { buildProposalPrompt } from "./proposal-prompt";
import { offerNameFromText } from "./audit-formatters";
import type { Lead } from "@/lib/dashboard/types";

export interface AuditContext {
  score: number;
  diagnosis: string;
  weaknesses: unknown[];
  opportunities: unknown[];
  recommendedOffer: string;
  aiSummary: string;
  whatsappMessage: string;
  sevenDayPlan: unknown[];
  nextSteps?: unknown[];
}

export interface ProposalResult {
  title: string;
  packageType: string;
  price: string;
  whatWeDoFor: string;
  includes: string[];
  mainBenefit: string;
  nextSteps: string[];
  whatsappMessage: string;
  proposalText: string;
  isDemo?: boolean;
}

function buildDemoProposal(lead: Lead, audit?: AuditContext | null): ProposalResult {
  const pkg = offerNameFromText(audit?.recommendedOffer);
  const price =
    pkg === "Web Premium Local"
      ? "desde 790€"
      : pkg === "Demo Growth"
        ? "desde 149€"
        : pkg === "Recepcionista IA WhatsApp"
          ? "desde 79€/mes"
          : pkg === "Mantenimiento y Automatización"
            ? "desde 97€/mes"
            : "desde 1.500€";

  return {
    title: `Propuesta para ${lead.business_name}`,
    packageType: pkg,
    price,
    whatWeDoFor: `Diseñamos e implementamos un sistema digital completo para que ${lead.business_name} capture más clientes y automatice sus respuestas desde el primer día.`,
    includes: [
      "Web premium mobile-first con SEO local",
      "Asistente WhatsApp IA activo 24/7",
      "CRM básico para seguimiento de leads",
      "Optimización Google Business Profile",
      "Sistema de captación de reseñas",
    ],
    mainBenefit: `Dejar de perder clientes por falta de respuesta y tener un sistema que trabaja por ti mientras tú te centras en el negocio.`,
    nextSteps: [
      "Llamada de 30 min para validar el plan",
      "Envío de contrato y acceso al onboarding",
      "Inicio del sistema en menos de 7 días",
    ],
    whatsappMessage: `Hola ${lead.name}, te he preparado una propuesta para ${lead.business_name}. Creo que podemos mejorar tu captación digital de forma significativa. ¿Tienes 30 minutos esta semana?`,
    proposalText: `Estimado ${lead.name},\n\nTras analizar la situación digital de ${lead.business_name}, hemos preparado una propuesta personalizada con el paquete ${pkg}.\n\nEste sistema está diseñado para negocios del sector ${lead.sector ?? "servicios locales"} que quieren captar más clientes sin depender solo del boca a boca.\n\nEl próximo paso es agendar una llamada de 30 minutos para revisar los detalles y resolver cualquier duda.\n\nUn saludo,\nAndrés Rendón`,
    isDemo: true,
  };
}

export async function generateProposal(
  lead: Lead,
  audit?: AuditContext | null
): Promise<ProposalResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildDemoProposal(lead, audit);
  }

  const prompt = buildProposalPrompt(lead, audit);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) return buildDemoProposal(lead, audit);

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return buildDemoProposal(lead, audit);

    const parsed = JSON.parse(content) as ProposalResult;
    return { ...parsed, isDemo: false };
  } catch {
    return buildDemoProposal(lead, audit);
  }
}
