import type { AuditPayload } from "./audit-schema";

export function formatRecommendedOffer(offer: AuditPayload["recommendedOffer"]) {
  return [
    `${offer.packageName} — ${offer.priceRange}`,
    offer.reason,
    offer.included.length > 0 ? `Incluye: ${offer.included.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function offerNameFromText(value?: string | null) {
  if (!value) return "Sistema Digital 360 IA";
  return value.split("—")[0]?.trim() || value.split("\n")[0]?.trim() || "Sistema Digital 360 IA";
}

export function normalizeList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return [record.title, record.impact, record.description, record.businessImpact, record.recommendation]
          .filter((part): part is string => typeof part === "string" && part.length > 0)
          .join(" · ");
      }
      return "";
    })
    .filter(Boolean);
}
