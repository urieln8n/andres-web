import { NextResponse } from "next/server";
import { z } from "zod";
import { registrarEvento } from "@/lib/aeo/eventos";
import { limpiarDominio } from "@/lib/aeo/nota-publica";
import { analizarWeb, normalizarUrl, WebBloqueada, type ResultadoAeo } from "@/lib/aeo/analizar";
import { analizarConMotor } from "@/lib/aeo/motor";
import { enviarEmailBrevo, guardarEnBrevo } from "@/lib/brevo";
import { asuntoInforme, htmlInforme, textoInforme } from "@/lib/email-informe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const maxDuration = 60;

const entrada = z.object({
  web: z.string().trim().min(4, "Escribe la dirección de tu web").max(300),
  nombre: z.string().trim().min(2, "Escribe tu nombre").max(80),
  negocio: z.string().trim().min(2, "Escribe el nombre de tu negocio").max(120),
  email: z.string().trim().email("Revisa tu email").max(160),
  whatsapp: z.union([z.literal(""), z.string().trim().regex(/^[+\d][\d\s().-]{7,20}$/, "Revisa tu WhatsApp")]).optional().default(""),
  consentimiento: z.literal(true, { errorMap: () => ({ message: "Necesitamos tu permiso para enviarte el informe" }) }),
  comerciales: z.boolean().optional().default(false),
  origen: z.string().max(40).optional(),
  canal: z.string().max(40).optional(),
  empresa_web: z.string().max(0).optional(), // trampa para robots: debe llegar vacío
});

// Freno básico por IP (por instancia): 6 auditorías cada 10 minutos
const usos = new Map<string, number[]>();
function demasiadas(ip: string) {
  const ahora = Date.now();
  const lista = (usos.get(ip) || []).filter((t) => ahora - t < 10 * 60_000);
  lista.push(ahora);
  usos.set(ip, lista);
  return lista.length > 6;
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (demasiadas(ip)) return NextResponse.json({ error: "Has hecho muchas auditorías seguidas. Prueba en unos minutos." }, { status: 429 });

  const parsed = entrada.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos no válidos" }, { status: 400 });
  const d = parsed.data;

  let resultado: ResultadoAeo | null = null;
  let bloqueada = 0;
  try {
    // Motor nuevo (auditoria.andresrendon.com); si falla, el motor antiguo de esta web como respaldo
    resultado = await analizarConMotor(d.web).catch((e) => {
      console.warn("[auditoria-aeo] motor nuevo no disponible, uso el respaldo:", e instanceof Error ? e.message : e);
      return analizarWeb(d.web);
    });
  } catch (error) {
    if (error instanceof WebBloqueada) bloqueada = error.status;
    else {
      const motivo = error instanceof Error && error.name !== "AbortError" && error.name !== "TimeoutError" ? error.message : "Tu web ha tardado demasiado en responder.";
      return NextResponse.json({ error: motivo }, { status: 422 });
    }
  }
  // Webs que rechazan visitas automáticas: puede que también bloqueen a la IA. Se guarda el lead para revisión manual.
  if (!resultado) {
    const url = normalizarUrl(d.web).href;
    resultado = {
      url, nota: 0, nivel: "critico", ejes: [], analizadoEn: new Date().toISOString(),
      hallazgos: [{ eje: "acceso-crawlers", severidad: "critico", titulo: `Tu web rechaza las visitas automáticas (error ${bloqueada})`, detalle: "Si tu protección anti-bots trata igual a los buscadores de IA, no pueden leerte. Lo revisamos a mano y te lo enviamos.", esfuerzo: "revisión manual" }],
      datos: { palabrasSinJs: 0, enlacesInternos: 0, scripts: 0, tiposSchema: [], bloqueados: [], tieneSitemap: false, tieneLlmsTxt: false, msRespuesta: 0 },
    };
  }

  const problemas = resultado.hallazgos.slice(0, 3).map((h) => h.titulo);

  // 1) Panel de leads (Supabase): lead + auditoría ligada
  let leadId: string | null = null;
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase.from("leads").insert({
      name: d.nombre, email: d.email, phone: d.whatsapp, whatsapp: d.whatsapp,
      business_name: d.negocio, website: resultado.url, website_url: resultado.url,
      sector: "Sin indicar", goal: "Aparecer en ChatGPT, Perplexity y Google (AEO)",
      main_problem: problemas[0] || "Auditoría AEO", service: "Auditoría AEO", service_interest: "Auditoría AEO",
      message: bloqueada ? `Web bloquea visitas automáticas (${bloqueada}): revisar a mano` : `Nota AEO ${resultado.nota}/100 (${resultado.nivel}). ${problemas.join(" · ")}`,
      source: "auditoria-aeo", status: "audit_generated",
    }).select("id").single();
    if (error) console.error("[auditoria-aeo] Supabase lead", error.code, error.message);
    leadId = data?.id ?? null;
    if (leadId) {
      const { error: errorAudit } = await supabase.from("audits").insert({
        lead_id: leadId, score: resultado.nota,
        diagnosis: `Auditoría AEO instantánea de ${resultado.url}: ${resultado.nota}/100 (${resultado.nivel}).`,
        weaknesses: resultado.hallazgos, opportunities: resultado.ejes, next_steps: resultado.datos,
        generated_by: "aeo-instantanea", model_used: "reglas",
      });
      if (errorAudit) console.error("[auditoria-aeo] Supabase audit", errorAudit.code, errorAudit.message);
    }
  }

  // 2) Brevo: contacto en la lista del embudo (dispara la secuencia de emails)
  // Solo entra en la lista (y en la secuencia de emails) quien lo ha marcado aparte
  const brevo = !d.comerciales ? { ok: false, motivo: "sin-consentimiento-comercial" } : await guardarEnBrevo({
    email: d.email, nombre: d.nombre, negocio: d.negocio, web: resultado.url, whatsapp: d.whatsapp,
    notaAeo: resultado.nota, nivelAeo: bloqueada ? "revision-manual" : resultado.nivel, problemas, origen: "auditoria-aeo",
  });

  // 3) Email 1: el informe completo que ha pedido (transaccional, sale al momento)
  const email = await enviarEmailBrevo({
    para: d.email, nombre: d.nombre, etiqueta: "informe-aeo",
    asunto: asuntoInforme(resultado, d.negocio, Boolean(bloqueada)),
    html: htmlInforme(resultado, { nombre: d.nombre, negocio: d.negocio }, Boolean(bloqueada)),
    texto: textoInforme(resultado, { nombre: d.nombre, negocio: d.negocio }, Boolean(bloqueada)),
  });

  // 4) Aviso opcional a n8n
  const webhook = process.env.N8N_NEW_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ tipo: "auditoria-aeo", leadId, ...d, consentimiento: true, resultado: { nota: resultado.nota, nivel: resultado.nivel, problemas } }), signal: AbortSignal.timeout(5000) }).catch(() => {});
  }

  await registrarEvento({ tipo: "informe", pagina: parsed.data.origen, canal: parsed.data.canal, dominio: limpiarDominio(resultado.url || parsed.data.web), nota: bloqueada ? null : resultado.nota });
  return NextResponse.json({ resultado, revisionManual: Boolean(bloqueada), guardado: { panel: Boolean(leadId), brevo: brevo.ok, email: email.ok } });
}
