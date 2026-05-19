import { buildAuditPrompt, type AuditInput } from "./audit-prompt";

export interface AuditResult {
  score: number;
  diagnosis: string;
  weaknesses: string[];
  opportunities: string[];
  recommendedOffer: string;
  aiSummary: string;
  whatsappMessage: string;
  sevenDayPlan: string[];
  isDemo?: boolean;
}

function buildDemoAudit(input: AuditInput): AuditResult {
  return {
    score: 35,
    diagnosis: `${input.businessName} tiene una presencia digital básica en el sector ${input.sector}. Sin sistema de captación estructurado, las oportunidades se pierden por falta de seguimiento automatizado y visibilidad local.`,
    weaknesses: [
      input.website ? "Web existente sin estructura de conversión clara ni CTA optimizados" : "Sin web identificada — pérdida directa de leads desde Google",
      "WhatsApp sin flujo automatizado para captar y cualificar leads",
      "SEO local sin arquitectura por servicios y ciudad",
      "Sin sistema de reseñas o prueba social activa",
      "Sin pipeline CRM para hacer seguimiento de oportunidades",
    ],
    opportunities: [
      "Crear landing mobile-first con CTA claro y formulario cualificado",
      "Automatizar respuesta inicial en WhatsApp con cualificación de leads",
      "Optimizar Google Business Profile con servicios, fotos y reseñas",
      "Implementar sistema de reseñas post-servicio por QR o WhatsApp",
      "Crear pipeline CRM para no perder ningún lead",
    ],
    recommendedOffer: "Sistema Digital 360 IA",
    aiSummary: `${input.businessName} es un negocio del sector ${input.sector} con oportunidades claras de mejora digital. La falta de sistema de captación y seguimiento supone pérdida de clientes potenciales. Un sistema digital completo con web premium, WhatsApp IA y SEO local puede transformar la captación del negocio.`,
    whatsappMessage: `Hola ${input.name}, soy Andrés. He revisado el caso de ${input.businessName} y tengo ideas concretas para mejorar tu captación digital. ¿Tienes 15 minutos esta semana para que te lo cuente?`,
    sevenDayPlan: [
      "Día 1: Revisar y optimizar Google Business Profile",
      "Día 2: Definir la propuesta de valor y oferta principal del negocio",
      "Día 3: Crear landing básica con CTA claro y formulario",
      "Día 4: Configurar respuesta automática inicial en WhatsApp",
      "Día 5: Crear página de servicios con SEO básico",
      "Día 6: Activar sistema de captación de reseñas",
      "Día 7: Configurar CRM básico para seguimiento de leads",
    ],
    isDemo: true,
  };
}

export async function generateAudit(input: AuditInput): Promise<AuditResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildDemoAudit(input);
  }

  const prompt = buildAuditPrompt(input);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) return buildDemoAudit(input);

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return buildDemoAudit(input);

    const parsed = JSON.parse(content) as AuditResult;
    return { ...parsed, isDemo: false };
  } catch {
    return buildDemoAudit(input);
  }
}
