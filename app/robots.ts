import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

// Buscadores y asistentes de IA a los que se da paso de forma explícita (AEO).
// Cada grupo repite las mismas restricciones: un grupo propio NO hereda las reglas de «*» (RFC 9309).
const BUSCADORES_IA = [
  "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "PerplexityBot", "Perplexity-User",
  "Claude-SearchBot", "Claude-User", "ClaudeBot",
  "Googlebot", "Google-Extended", "Bingbot",
  "Applebot", "Applebot-Extended", "DuckAssistBot",
];
const PRIVADO = ["/api/", "/dashboard"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: BUSCADORES_IA, allow: "/", disallow: PRIVADO },
      { userAgent: "*", allow: "/", disallow: PRIVADO },
    ],
    sitemap: siteUrl("/sitemap.xml"),
  };
}
