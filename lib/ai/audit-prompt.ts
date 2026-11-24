export interface AuditInput {
  name: string;
  email?: string | null;
  whatsapp?: string | null;
  businessName: string;
  sector?: string | null;
  city?: string | null;
  website?: string | null;
  instagramUrl?: string | null;
  mainProblem?: string | null;
  service?: string | null;
  budget?: string | null;
  message?: string | null;
  source?: string | null;
  createdAt?: string | null;
}

const packages = [
  "Auditoría IA Express — Gratis",
  "Demo Growth — desde 149€",
  "Web Premium Local — 390€ (precio cerrado)",
  "Sistema Digital 360 IA — desde 1.500€",
  "Mantenimiento y Automatización — 29€/mes",
  "Recepcionista IA WhatsApp — desde 79€/mes",
  "BarberíaOS — solo para barberías, peluquerías, barber shop o similar",
];

export function buildAuditPrompt(input: AuditInput): string {
  return `Eres un consultor senior de marketing digital, automatización e IA para negocios locales. Analiza los datos de este lead y genera una auditoría comercial clara, honesta y accionable.

Reglas críticas:
- No inventes datos. Si falta web, Instagram o información, dilo como oportunidad de mejora.
- No prometas resultados garantizados.
- No uses mensajes agresivos ni spam.
- Mantén un enfoque premium B2B local, profesional y claro.
- El objetivo es ayudar a Andrés Rendón a preparar una propuesta para vender web premium, WhatsApp IA, SEO local, automatización, sistema de reseñas, CRM y BarberíaOS si el sector es barbería.
- Si el sector es barbería, peluquería, barber shop o similar, recomienda BarberíaOS o Sistema Digital 360 IA + BarberíaOS.
- Si no tiene web, recomienda Web Premium Local.
- Si tiene Instagram pero no web, recomienda Web Premium Local + WhatsApp.
- Si el problema principal menciona responder clientes, recomienda Recepcionista IA WhatsApp.
- Si el negocio parece premium o con alto potencial, recomienda Sistema Digital 360 IA.
- Si el presupuesto es bajo, recomienda Demo Growth o Auditoría IA Express.
- Si hay poca información, recomienda Auditoría IA Express + Demo Growth.

Paquetes disponibles:
${packages.map((item) => `- ${item}`).join("\n")}

Datos del lead:
- Nombre contacto: ${input.name || "No especificado"}
- Email: ${input.email || "No especificado"}
- WhatsApp: ${input.whatsapp || "No especificado"}
- Negocio: ${input.businessName || "No especificado"}
- Sector: ${input.sector || "No especificado"}
- Ciudad: ${input.city || "No especificada"}
- Web: ${input.website || "No facilitada"}
- Instagram: ${input.instagramUrl || "No facilitado"}
- Problema principal: ${input.mainProblem || "No especificado"}
- Servicio de interés: ${input.service || "No especificado"}
- Presupuesto: ${input.budget || "No especificado"}
- Mensaje: ${input.message || "No especificado"}
- Fuente: ${input.source || "No especificada"}
- Fecha de entrada: ${input.createdAt || "No especificada"}

Devuelve únicamente JSON válido con esta estructura exacta:
{
  "score": 0,
  "diagnosis": "",
  "weaknesses": [
    {
      "title": "",
      "impact": "",
      "priority": "alta | media | baja",
      "recommendation": ""
    }
  ],
  "opportunities": [
    {
      "title": "",
      "description": "",
      "businessImpact": "",
      "difficulty": "baja | media | alta"
    }
  ],
  "recommendedOffer": {
    "packageName": "",
    "reason": "",
    "priceRange": "",
    "included": []
  },
  "aiSummary": "",
  "whatsappMessage": "",
  "sevenDayPlan": [
    {
      "day": 1,
      "title": "",
      "actions": []
    }
  ],
  "nextSteps": [
    ""
  ]
}

Validación esperada:
- score entre 0 y 100.
- sevenDayPlan debe tener exactamente 7 días, day 1 a day 7.
- priority solo puede ser alta, media o baja.
- difficulty solo puede ser baja, media o alta.
- whatsappMessage debe ser corto, humano, comercial y no sonar como spam.`;
}
