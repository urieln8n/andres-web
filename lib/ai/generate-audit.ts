import { buildAuditPrompt, type AuditInput } from "./audit-prompt";
import { generateFallbackAudit } from "./audit-fallback";
import { parseAuditPayload, type GeneratedAudit } from "./audit-schema";

export async function generateAudit(input: AuditInput): Promise<GeneratedAudit> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    return generateFallbackAudit(input);
  }

  const prompt = buildAuditPrompt(input);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.35,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    throw new Error("No se pudo generar la auditoría IA. Revisa la configuración de OpenAI.");
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI no devolvió contenido para la auditoría.");
  }

  try {
    const parsedJson = JSON.parse(content);
    return {
      ...parseAuditPayload(parsedJson),
      generatedBy: "ai",
      modelUsed: model,
      isFallback: false,
    };
  } catch {
    throw new Error("La auditoría IA no llegó en un formato válido. Intenta regenerarla.");
  }
}
