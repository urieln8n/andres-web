import { z } from "zod";

const prioritySchema = z.enum(["alta", "media", "baja"]);
const difficultySchema = z.enum(["baja", "media", "alta"]);

function stripDangerousHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

const cleanString = z.string().transform(stripDangerousHtml);

export const auditSchema = z.object({
  score: z.number().int().min(0).max(100),
  diagnosis: cleanString,
  weaknesses: z
    .array(
      z.object({
        title: cleanString,
        impact: cleanString,
        priority: prioritySchema,
        recommendation: cleanString,
      })
    )
    .min(1)
    .max(6),
  opportunities: z
    .array(
      z.object({
        title: cleanString,
        description: cleanString,
        businessImpact: cleanString,
        difficulty: difficultySchema,
      })
    )
    .min(1)
    .max(6),
  recommendedOffer: z.object({
    packageName: cleanString,
    reason: cleanString,
    priceRange: cleanString,
    included: z.array(cleanString).min(1).max(8),
  }),
  aiSummary: cleanString,
  whatsappMessage: cleanString,
  sevenDayPlan: z
    .array(
      z.object({
        day: z.number().int().min(1).max(7),
        title: cleanString,
        actions: z.array(cleanString).min(1).max(5),
      })
    )
    .length(7),
  nextSteps: z.array(cleanString).min(1).max(6),
});

export type AuditPayload = z.infer<typeof auditSchema>;

export type GeneratedAudit = AuditPayload & {
  generatedBy: "ai" | "fallback";
  modelUsed: string;
  isFallback: boolean;
};

export function parseAuditPayload(value: unknown): AuditPayload {
  const parsed = auditSchema.parse(value);
  return {
    ...parsed,
    score: Math.max(0, Math.min(100, parsed.score)),
    sevenDayPlan: parsed.sevenDayPlan
      .slice()
      .sort((a, b) => a.day - b.day)
      .map((item, index) => ({ ...item, day: index + 1 })),
  };
}
