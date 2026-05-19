import { z } from "zod";

const optionalText = z.string().trim().optional().or(z.literal(""));

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre"),
  email: z.string().trim().email("Email no válido").optional().or(z.literal("")),
  phone: optionalText,
  whatsapp: optionalText,
  businessName: optionalText,
  business_name: optionalText,
  website: optionalText,
  website_url: optionalText,
  instagramUrl: optionalText,
  instagram_url: optionalText,
  sector: z.string().trim().min(2, "Indica el sector"),
  city: optionalText,
  goal: optionalText,
  mainProblem: optionalText,
  main_problem: optionalText,
  service: optionalText,
  service_interest: optionalText,
  interest: optionalText,
  budget: optionalText,
  message: optionalText,
  source: optionalText.default("andresrendon.com"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadInsertInput {
  name: string;
  email: string | null;
  phone: string;
  whatsapp: string;
  business_name: string;
  website: string | null;
  website_url: string | null;
  instagram_url: string | null;
  sector: string;
  city: string | null;
  goal: string | null;
  main_problem: string;
  service: string;
  service_interest: string;
  budget: string | null;
  message: string | null;
  source: string;
  status: "new";
}

function valueOrNull(value?: string | null) {
  const clean = value?.trim();
  return clean ? clean : null;
}

export function normalizeLeadInsertInput(input: LeadInput): LeadInsertInput {
  const whatsapp = valueOrNull(input.whatsapp) ?? valueOrNull(input.phone);
  const businessName = valueOrNull(input.business_name) ?? valueOrNull(input.businessName);
  const website = valueOrNull(input.website_url) ?? valueOrNull(input.website);
  const instagram = valueOrNull(input.instagram_url) ?? valueOrNull(input.instagramUrl);
  const mainProblem = valueOrNull(input.main_problem) ?? valueOrNull(input.mainProblem) ?? valueOrNull(input.goal);
  const service = valueOrNull(input.service_interest) ?? valueOrNull(input.interest) ?? valueOrNull(input.service);

  if (!whatsapp) throw new Error("Añade un teléfono o WhatsApp");
  if (!businessName) throw new Error("Nombre del negocio requerido");
  if (!mainProblem) throw new Error("Indica el objetivo principal");
  if (!service) throw new Error("Selecciona un servicio");

  return {
    name: input.name,
    email: valueOrNull(input.email),
    phone: whatsapp,
    whatsapp,
    business_name: businessName,
    website,
    website_url: website,
    instagram_url: instagram,
    sector: input.sector,
    city: valueOrNull(input.city),
    goal: mainProblem,
    main_problem: mainProblem,
    service,
    service_interest: service,
    budget: valueOrNull(input.budget),
    message: valueOrNull(input.message),
    source: valueOrNull(input.source) ?? "andresrendon.com",
    status: "new",
  };
}
