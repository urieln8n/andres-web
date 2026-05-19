import type { AuditInput } from "./audit-prompt";
import type { GeneratedAudit } from "./audit-schema";

function hasLowBudget(budget?: string | null) {
  return Boolean(budget?.match(/gratis|bajo|menos|100|150|200|300|500/i));
}

function isBarberSector(sector?: string | null) {
  return Boolean(sector?.match(/barber|peluquer|barber shop/i));
}

function mentionsResponseProblem(problem?: string | null) {
  return Boolean(problem?.match(/whatsapp|respon|mensaje|consulta|cliente/i));
}

function recommendPackage(input: AuditInput) {
  if (isBarberSector(input.sector)) {
    return {
      packageName: "BarberíaOS",
      priceRange: "a medida",
      reason: "El sector permite convertir reservas, clientes recurrentes, reseñas y WhatsApp en un sistema operativo comercial específico.",
      included: ["Reservas", "CRM de clientes", "WhatsApp IA", "sistema de reseñas", "dashboard comercial"],
    };
  }

  if (!input.website) {
    return {
      packageName: input.instagramUrl ? "Web Premium Local + Recepcionista IA WhatsApp" : "Web Premium Local",
      priceRange: "desde 790€",
      reason: "Sin una web propia, el negocio depende demasiado de canales externos y pierde oportunidades desde Google.",
      included: ["web premium mobile-first", "SEO local", "formulario de leads", "CTA a WhatsApp", "analítica básica"],
    };
  }

  if (mentionsResponseProblem(input.mainProblem)) {
    return {
      packageName: "Recepcionista IA WhatsApp",
      priceRange: "desde 79€/mes",
      reason: "El problema declarado apunta a pérdida de oportunidades por respuesta tardía o seguimiento manual.",
      included: ["respuesta inicial", "cualificación de leads", "derivación a Andrés/equipo", "resúmenes comerciales"],
    };
  }

  if (hasLowBudget(input.budget)) {
    return {
      packageName: "Demo Growth",
      priceRange: "desde 149€",
      reason: "Con presupuesto prudente conviene mostrar una demo visual y reducir fricción antes de una inversión mayor.",
      included: ["diagnóstico", "wireframe comercial", "mini propuesta", "siguiente paso claro"],
    };
  }

  return {
    packageName: "Sistema Digital 360 IA",
    priceRange: "desde 1.500€",
    reason: "El negocio puede ganar control comercial conectando web, CRM, WhatsApp, SEO local y automatización.",
    included: ["web premium", "CRM de leads", "WhatsApp IA", "SEO local", "automatizaciones", "sistema de reseñas"],
  };
}

export function generateFallbackAudit(input: AuditInput): GeneratedAudit {
  const missingChannels = [
    !input.website ? "web propia" : null,
    !input.instagramUrl ? "Instagram visible" : null,
    !input.mainProblem ? "problema principal declarado" : null,
  ].filter(Boolean);
  const offer = recommendPackage(input);
  const score = !input.website ? 38 : input.instagramUrl ? 62 : 52;

  return {
    score,
    diagnosis: `${input.businessName} muestra potencial comercial, pero la información disponible todavía no permite validar un sistema digital completo. ${missingChannels.length > 0 ? `Falta información clave: ${missingChannels.join(", ")}.` : "Hay base suficiente para preparar una propuesta más concreta."}`,
    weaknesses: [
      {
        title: input.website ? "Conversión web no validada" : "Sin web propia identificada",
        impact: input.website
          ? "Puede haber visitas que no terminen en una conversación comercial clara."
          : "El negocio depende de canales externos y pierde búsquedas locales con intención de compra.",
        priority: "alta",
        recommendation: input.website
          ? "Revisar CTA, estructura mobile, formularios y claridad de oferta."
          : "Crear una web premium local con propuesta clara, SEO y CTA a WhatsApp.",
      },
      {
        title: "Seguimiento comercial manual",
        impact: "Los leads pueden enfriarse si no hay respuesta rápida, clasificación y recordatorios.",
        priority: "media",
        recommendation: "Centralizar oportunidades en CRM y automatizar la primera respuesta por WhatsApp.",
      },
      {
        title: "Falta de prueba social estructurada",
        impact: "Menos confianza antes del primer contacto, especialmente en búsquedas locales.",
        priority: "media",
        recommendation: "Activar sistema de reseñas y reutilizar testimonios en web, Google e Instagram.",
      },
    ],
    opportunities: [
      {
        title: "Oferta digital clara",
        description: "Convertir servicios y diferenciales en una propuesta fácil de entender en móvil.",
        businessImpact: "Mejora la calidad de los contactos y reduce conversaciones improductivas.",
        difficulty: "baja",
      },
      {
        title: "WhatsApp como canal comercial",
        description: "Preparar respuestas iniciales, preguntas de cualificación y próximos pasos.",
        businessImpact: "Aumenta velocidad de respuesta sin perder tono humano.",
        difficulty: "media",
      },
      {
        title: "SEO local y reseñas",
        description: "Ordenar presencia en Google, páginas por servicio y captación de reseñas.",
        businessImpact: "Hace el negocio más visible y confiable para búsquedas cercanas.",
        difficulty: "media",
      },
    ],
    recommendedOffer: offer,
    aiSummary: `${input.businessName} necesita una propuesta prudente, concreta y orientada a captar mejor desde canales locales. No conviene prometer resultados garantizados, sino mostrar mejoras visibles en web, WhatsApp, Google y seguimiento comercial.`,
    whatsappMessage: `Hola ${input.name}, soy Andrés Rendón. Revisé vuestra presencia digital y vi oportunidades claras para convertir más visitas en conversaciones comerciales. Preparé una auditoría breve con mejoras concretas para web, WhatsApp, Google e Instagram. ¿Te la puedo enviar?`,
    sevenDayPlan: [
      { day: 1, title: "Revisión de presencia digital", actions: ["Confirmar web, Instagram, Google Business Profile y canales activos."] },
      { day: 2, title: "Mensaje comercial", actions: ["Definir propuesta de valor, servicios principales y CTA prioritario."] },
      { day: 3, title: "Captación web", actions: ["Diseñar estructura de landing mobile-first con formulario y WhatsApp."] },
      { day: 4, title: "WhatsApp", actions: ["Crear guion de primera respuesta y preguntas de cualificación."] },
      { day: 5, title: "SEO local", actions: ["Listar servicios, ciudad, palabras clave y mejoras de Google Business Profile."] },
      { day: 6, title: "Reseñas", actions: ["Preparar flujo simple para pedir reseñas después del servicio."] },
      { day: 7, title: "CRM y seguimiento", actions: ["Crear pipeline de leads con estados, próxima acción y prioridad."] },
    ],
    nextSteps: [
      "Validar datos faltantes antes de enviar propuesta cerrada.",
      "Enviar auditoría breve por WhatsApp con tono consultivo.",
      "Ofrecer llamada de 15 minutos para priorizar el primer sistema a implementar.",
    ],
    generatedBy: "fallback",
    modelUsed: "fallback-local",
    isFallback: true,
  };
}
