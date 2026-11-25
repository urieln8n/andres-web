// Conector con el motor de auditoría AEO (Cloudflare Worker de urieln8n/aeo-auditor).
// Es el mismo motor que el auditor del PC: 8 ejes, 22 crawlers de IA, varias páginas y la capa de Cloudflare.
// Si el motor falla o no responde, route.ts vuelve a lib/aeo/analizar.ts (motor antiguo) como respaldo.
import type { EjeId, Hallazgo, ResultadoAeo, Severidad } from "./analizar";

const MOTOR_URL = process.env.AEO_MOTOR_URL || "https://auditoria.andresrendon.com/api/auditar";

interface RespuestaMotor {
  url: string;
  nota: number | null;
  banda: string;
  ejes: { id: EjeId; nombre: string; peso: number; nota: number | null }[];
  principales: { severidad: Severidad; titulo: string; detalle: string; esfuerzo: string }[];
  resto: { severidad: Severidad; titulo: string }[];
  hallazgos?: { eje: EjeId; severidad: Severidad; titulo: string; detalle: string; esfuerzo: string }[];
  vistaIA: { palabras: number; enlaces: number; datosEstructurados: string[]; crawlersBloqueados: string[] };
  extra?: { sitemap: boolean; llmsTxt: boolean; ttfb: number };
  error?: string;
}

const NIVEL: Record<string, ResultadoAeo["nivel"]> = { excelente: "excelente", bueno: "bueno", mejorable: "mejorable", "crítico": "critico", critico: "critico" };

export async function analizarConMotor(web: string): Promise<ResultadoAeo> {
  const res = await fetch(MOTOR_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url: web }),
    signal: AbortSignal.timeout(25_000),
    cache: "no-store",
  });
  const r = (await res.json()) as RespuestaMotor;
  if (!res.ok || r.error || r.nota == null) throw new Error(r.error || `Motor AEO: HTTP ${res.status}`);

  // El motor nuevo devuelve la lista completa en `hallazgos`; versiones anteriores solo los 3 principales + títulos
  const hallazgos: Hallazgo[] = r.hallazgos?.length
    ? r.hallazgos
    : [
        ...r.principales.map((h) => ({ eje: "indexacion" as EjeId, ...h })),
        ...r.resto.map((h) => ({ eje: "indexacion" as EjeId, severidad: h.severidad, titulo: h.titulo, detalle: "", esfuerzo: "" })),
      ];
  const titulos = hallazgos.map((h) => h.titulo.toLowerCase());

  return {
    url: r.url,
    nota: r.nota,
    nivel: NIVEL[r.banda] ?? "mejorable",
    ejes: r.ejes.map((e) => ({ id: e.id, nombre: e.nombre, peso: e.peso, nota: e.nota ?? 0 })),
    hallazgos,
    datos: {
      palabrasSinJs: r.vistaIA.palabras,
      enlacesInternos: r.vistaIA.enlaces,
      scripts: 0,
      tiposSchema: r.vistaIA.datosEstructurados,
      bloqueados: r.vistaIA.crawlersBloqueados,
      tieneSitemap: r.extra?.sitemap ?? !titulos.some((t) => t.includes("no hay sitemap")),
      tieneLlmsTxt: r.extra?.llmsTxt ?? !titulos.some((t) => t.includes("llms.txt")),
      msRespuesta: r.extra?.ttfb ?? 0,
    },
    analizadoEn: new Date().toISOString(),
  };
}
