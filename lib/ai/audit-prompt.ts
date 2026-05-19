export interface AuditInput {
  name: string;
  businessName: string;
  sector: string;
  city?: string;
  website?: string;
  instagramUrl?: string;
  mainProblem?: string;
  service?: string;
  budget?: string;
}

export function buildAuditPrompt(input: AuditInput): string {
  return `Eres un consultor experto en sistemas digitales para negocios locales. Analiza el siguiente negocio y genera una auditoría comercial profesional en español.

DATOS DEL NEGOCIO:
- Nombre del negocio: ${input.businessName}
- Sector: ${input.sector}
- Ciudad: ${input.city || "No especificada"}
- Web actual: ${input.website || "Sin web"}
- Instagram: ${input.instagramUrl || "Sin Instagram"}
- Problema principal declarado: ${input.mainProblem || "No especificado"}
- Servicio de interés: ${input.service || "No especificado"}
- Presupuesto: ${input.budget || "No especificado"}

INSTRUCCIONES:
Analiza el caso con criterio de negocio. No inventes datos no disponibles. Si falta web o Instagram, menciona eso como debilidad. El objetivo es generar una auditoría útil para vender servicios de IA, web premium, SEO local, WhatsApp IA, reseñas y automatización.

Genera la auditoría con estas secciones:
1. SCORE (0-100): estado digital actual. 0=sin presencia, 100=sistema digital completo.
2. DIAGNÓSTICO GENERAL (2-3 frases directas sobre el estado digital del negocio)
3. DEBILIDADES CLAVE (3-5 puntos específicos)
4. OPORTUNIDADES RÁPIDAS (3-5 acciones que mejoran resultados en 30 días)
5. OFERTA RECOMENDADA (uno de: Web Premium Local, Automatización IA, Recepcionista IA WhatsApp, SEO Local, Sistema Digital 360 IA, BarberíaOS, Demo Growth)
6. RESUMEN EJECUTIVO (1 párrafo para presentar al cliente)
7. MENSAJE DE WHATSAPP (mensaje breve y cercano, máx 3 frases, listo para copiar y enviar)
8. PLAN DE 7 DÍAS (7 acciones concretas, una por día)

Responde ÚNICAMENTE en JSON válido con estas claves exactas:
{
  "score": number,
  "diagnosis": string,
  "weaknesses": string[],
  "opportunities": string[],
  "recommendedOffer": string,
  "aiSummary": string,
  "whatsappMessage": string,
  "sevenDayPlan": string[]
}`;
}
