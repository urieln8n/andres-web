import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Escribe tu nombre"),
  email: z.string().email("Email no válido").optional().or(z.literal("")),
  phone: z.string().min(6, "Añade un teléfono o WhatsApp"),
  whatsapp: z.string().optional().or(z.literal("")),
  businessName: z.string().min(2, "Nombre del negocio requerido"),
  website: z.string().optional().or(z.literal("")),
  instagramUrl: z.string().optional().or(z.literal("")),
  sector: z.string().min(2, "Indica el sector"),
  city: z.string().optional().or(z.literal("")),
  goal: z.string().min(2, "Indica el objetivo principal"),
  mainProblem: z.string().optional().or(z.literal("")),
  service: z.string().min(2, "Selecciona un servicio"),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
  source: z.string().optional().default("web"),
});

export type LeadInput = z.infer<typeof leadSchema>;
