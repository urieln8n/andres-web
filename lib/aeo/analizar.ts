// Mini-auditoría AEO instantánea: descarga la página SIN ejecutar JavaScript (lo mismo que ve un crawler de IA)
// y puntúa 8 ejes. El código mide; no inventa métricas ni redacta prosa comercial.
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { parsearRobots, permitido, type AnalisisRobots } from "./robots";
import { CRAWLERS_CRITICOS } from "./crawlers";

export type Severidad = "critico" | "alto" | "medio" | "bajo";
export type EjeId =
  | "acceso-crawlers" | "render-sin-js" | "datos-estructurados" | "estructura-respondible"
  | "entidad-marca" | "frescura" | "indexacion" | "acceso-tecnico";

export interface Hallazgo { eje: EjeId; severidad: Severidad; titulo: string; detalle: string; esfuerzo: string }
export interface ResultadoEje { id: EjeId; nombre: string; peso: number; nota: number }
export interface ResultadoAeo {
  url: string;
  nota: number;
  nivel: "excelente" | "bueno" | "mejorable" | "critico";
  ejes: ResultadoEje[];
  hallazgos: Hallazgo[];
  datos: {
    palabrasSinJs: number; enlacesInternos: number; scripts: number; tiposSchema: string[];
    bloqueados: string[]; tieneSitemap: boolean; tieneLlmsTxt: boolean; msRespuesta: number;
  };
  analizadoEn: string;
}

export class WebBloqueada extends Error {
  constructor(public status: number) { super(`La web rechazó la visita automática (error ${status})`); this.name = "WebBloqueada"; }
}

export const EJES: { id: EjeId; nombre: string; peso: number }[] = [
  { id: "acceso-crawlers", nombre: "¿Puede la IA llegar a tu web?", peso: 20 },
  { id: "render-sin-js", nombre: "¿Puede leer lo que hay dentro?", peso: 20 },
  { id: "datos-estructurados", nombre: "¿Entiende qué eres y qué vendes?", peso: 18 },
  { id: "estructura-respondible", nombre: "¿Puede citar tus respuestas?", peso: 15 },
  { id: "entidad-marca", nombre: "¿Sabe quién eres y se fía?", peso: 10 },
  { id: "frescura", nombre: "¿Sabe si está actualizado?", peso: 7 },
  { id: "indexacion", nombre: "¿Está la base del SEO en orden?", peso: 5 },
  { id: "acceso-tecnico", nombre: "¿Responde rápido?", peso: 5 },
];

const UA = "AndresRendonAEOAudit/1.0 (+https://andresrendon.com/auditoria-aeo)";
const ORDEN_SEVERIDAD: Record<Severidad, number> = { critico: 0, alto: 1, medio: 2, bajo: 3 };

// --- Seguridad: solo webs públicas (nada de IPs privadas, localhost ni puertos raros) ---
function ipPrivada(ip: string) {
  if (ip.includes(":")) {
    const v = ip.toLowerCase();
    return v === "::1" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80") || v === "::" || v.startsWith("::ffff:");
  }
  const [a, b] = ip.split(".").map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

export function normalizarUrl(entrada: string): URL {
  let texto = String(entrada || "").trim();
  if (!/^https?:\/\//i.test(texto)) texto = "https://" + texto;
  const url = new URL(texto);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Solo se pueden auditar webs http o https");
  if (url.port && !["80", "443"].includes(url.port)) throw new Error("Esa dirección no es una web pública");
  if (url.username || url.password) throw new Error("Esa dirección no es válida");
  if (!url.hostname.includes(".") || url.hostname.endsWith(".local") || url.hostname === "localhost") throw new Error("Escribe la dirección de una web pública");
  url.hash = "";
  return url;
}

async function comprobarHost(host: string) {
  if (isIP(host)) { if (ipPrivada(host)) throw new Error("Esa dirección no es una web pública"); return; }
  const ips = await lookup(host, { all: true }).catch(() => { throw new Error("No encuentro esa web. Revisa la dirección."); });
  if (!ips.length || ips.some((r) => ipPrivada(r.address))) throw new Error("Esa dirección no es una web pública");
}

async function descargar(url: URL, ms = 8000): Promise<{ status: number; url: URL; texto: string; ms: number; tipo: string }> {
  let actual = url;
  const inicio = Date.now();
  for (let saltos = 0; saltos < 5; saltos++) {
    await comprobarHost(actual.hostname);
    const ctrl = new AbortController();
    const temporizador = setTimeout(() => ctrl.abort(), ms);
    try {
      const res = await fetch(actual, { redirect: "manual", signal: ctrl.signal, headers: { "user-agent": UA, accept: "text/html,text/plain;q=0.9,*/*;q=0.5" } });
      if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
        actual = normalizarUrl(new URL(res.headers.get("location")!, actual).href);
        continue;
      }
      // Límite de 2 MB: una página más grande ya es un hallazgo y no necesitamos el resto
      const lector = res.body?.getReader();
      let bytes = 0; const trozos: Uint8Array[] = [];
      if (lector) {
        for (;;) {
          const { done, value } = await lector.read();
          if (done || !value) break;
          bytes += value.length; trozos.push(value);
          if (bytes > 2_000_000) { await lector.cancel(); break; }
        }
      }
      const texto = new TextDecoder().decode(Buffer.concat(trozos));
      return { status: res.status, url: actual, texto, ms: Date.now() - inicio, tipo: res.headers.get("content-type") || "" };
    } finally { clearTimeout(temporizador); }
  }
  throw new Error("La web redirige demasiadas veces");
}

// --- Lectura del HTML en crudo (sin ejecutar JavaScript) ---
const decodificar = (s: string) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const textoDe = (html: string) => decodificar(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const todos = (html: string, re: RegExp) => [...html.matchAll(re)].map((m) => textoDe(m[1] || "")).filter(Boolean);
const meta = (html: string, nombre: string) => {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${nombre}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  return tag ? decodificar(tag.match(/content=["']([^"']*)["']/i)?.[1] || "") : "";
};

function leerHtml(html: string, base: URL) {
  const sinScripts = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<noscript[\s\S]*?<\/noscript>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
  const cuerpo = sinScripts.match(/<body[\s\S]*<\/body>/i)?.[0] || sinScripts;
  const palabras = textoDe(cuerpo).split(" ").filter((p) => /[\p{L}\p{N}]/u.test(p)).length;
  const enlaces = [...cuerpo.matchAll(/<a\s[^>]*href=["']([^"'#]+)["']/gi)].map((m) => { try { return new URL(m[1], base); } catch { return null; } }).filter(Boolean) as URL[];
  const internos = new Set(enlaces.filter((u) => u.hostname.replace(/^www\./, "") === base.hostname.replace(/^www\./, "")).map((u) => u.pathname));
  const jsonld: any[] = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const d = JSON.parse(m[1].trim()); jsonld.push(...(Array.isArray(d) ? d : d["@graph"] ? d["@graph"] : [d])); } catch { jsonld.push({ __invalido: true }); }
  }
  const tipos = [...new Set(jsonld.flatMap((d) => (Array.isArray(d?.["@type"]) ? d["@type"] : [d?.["@type"]])).filter(Boolean).map(String))];
  return {
    palabras, internos: internos.size,
    scripts: (html.match(/<script\b/gi) || []).length,
    titulo: textoDe(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ""),
    descripcion: meta(html, "description"),
    canonical: /<link[^>]+rel=["']canonical["']/i.test(html),
    lang: /<html[^>]+lang=["'][a-z]/i.test(html),
    noindex: /noindex/i.test(meta(html, "robots")),
    h1: todos(cuerpo, /<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: todos(cuerpo, /<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    h3: todos(cuerpo, /<h3[^>]*>([\s\S]*?)<\/h3>/gi),
    listas: (cuerpo.match(/<(ul|ol|dl|table)\b/gi) || []).length,
    jsonld, tipos, jsonldInvalido: jsonld.some((d) => d?.__invalido),
    telefono: /href=["']tel:/i.test(cuerpo) || /(\+34[\s.-]?)?[6789]\d{2}[\s.-]?\d{2,3}[\s.-]?\d{2,3}[\s.-]?\d{0,3}\b/.test(textoDe(cuerpo)),
    email: /href=["']mailto:/i.test(cuerpo),
    direccion: /(calle|c\/|avenida|avda|plaza|carrer|passeig|travessera)\s/i.test(textoDe(cuerpo)) || jsonld.some((d) => d?.address),
    legal: /(aviso[- ]legal|pol[ií]tica[- ]de[- ]privacidad|privacy)/i.test(cuerpo),
    fechas: [meta(html, "article:modified_time"), meta(html, "article:published_time"), ...jsonld.map((d) => d?.dateModified || d?.datePublished || "")].filter(Boolean),
    tiempo: /<time\b/i.test(cuerpo),
  };
}

const NEGOCIO = /(LocalBusiness|Organization|Corporation|ProfessionalService|Store|Restaurant|HairSalon|BeautySalon|Dentist|MedicalBusiness|HomeAndConstructionBusiness|FoodEstablishment|Bakery|Person|AutoRepair|LegalService|RealEstateAgent|SportsActivityLocation|LodgingBusiness)/i;
const OFERTA = /(Product|Service|Offer|Menu|Course|Event)/i;

export async function analizarWeb(entrada: string): Promise<ResultadoAeo> {
  const url = normalizarUrl(entrada);
  const pagina = await descargar(url);
  if ([401, 403, 429, 503].includes(pagina.status)) throw new WebBloqueada(pagina.status);
  if (pagina.status >= 400) throw new Error(`La web respondió con un error ${pagina.status}. Revisa la dirección.`);
  if (!/html/i.test(pagina.tipo) && !/<html/i.test(pagina.texto)) throw new Error("Esa dirección no devuelve una página web");

  const origen = new URL("/", pagina.url);
  const [robotsRes, sitemapRes, llmsRes] = await Promise.all([
    descargar(new URL("/robots.txt", origen), 5000).catch(() => null),
    descargar(new URL("/sitemap.xml", origen), 5000).catch(() => null),
    descargar(new URL("/llms.txt", origen), 5000).catch(() => null),
  ]);
  const robots: AnalisisRobots = robotsRes && robotsRes.status < 400 && !/<html/i.test(robotsRes.texto) ? parsearRobots(robotsRes.texto) : { grupos: [], sitemaps: [] };
  const h = leerHtml(pagina.texto, pagina.url);
  const hallazgos: Hallazgo[] = [];
  const nota: Record<EjeId, number> = {} as Record<EjeId, number>;
  const ruta = pagina.url.pathname || "/";

  // 1 · Acceso de crawlers
  const bloqueados = CRAWLERS_CRITICOS.filter((c) => !permitido(robots, c.ua, ruta)).map((c) => c.ua);
  nota["acceso-crawlers"] = Math.round(100 * (1 - bloqueados.length / CRAWLERS_CRITICOS.length));
  if (h.noindex) { nota["acceso-crawlers"] = 0; hallazgos.push({ eje: "acceso-crawlers", severidad: "critico", titulo: "Tu página pide que no la indexen", detalle: "Lleva la etiqueta «noindex»: buscadores e IA la descartan.", esfuerzo: "5 minutos" }); }
  if (bloqueados.length) hallazgos.push({ eje: "acceso-crawlers", severidad: "critico", titulo: `Tu robots.txt bloquea ${bloqueados.length} buscador${bloqueados.length > 1 ? "es" : ""} de IA`, detalle: `No pueden entrar: ${bloqueados.join(", ")}. Mientras sigan bloqueados, no te citarán.`, esfuerzo: "10 minutos" });

  // 2 · Render sin JavaScript
  const cascara = h.palabras < 120 && h.scripts >= 3;
  nota["render-sin-js"] = cascara ? 5 : h.palabras >= 400 ? 100 : h.palabras >= 250 ? 80 : h.palabras >= 120 ? 55 : 25;
  if (h.internos === 0) nota["render-sin-js"] = Math.min(nota["render-sin-js"], 20);
  if (cascara) hallazgos.push({ eje: "render-sin-js", severidad: "critico", titulo: "Para la IA tu web está casi vacía", detalle: `Sin ejecutar JavaScript solo se leen ${h.palabras} palabras. ChatGPT y Perplexity no ejecutan JavaScript: no ven tus servicios ni tus precios.`, esfuerzo: "1 a 3 días (depende de la plataforma)" });
  else if (h.palabras < 250) hallazgos.push({ eje: "render-sin-js", severidad: "alto", titulo: "Hay muy poco texto que la IA pueda leer", detalle: `Solo ${h.palabras} palabras legibles sin JavaScript. Con tan poco contenido es difícil que te elija como respuesta.`, esfuerzo: "media jornada" });
  if (h.internos === 0) hallazgos.push({ eje: "render-sin-js", severidad: "critico", titulo: "La IA no puede descubrir tus otras páginas", detalle: "En el HTML sin JavaScript no hay ni un enlace interno: el crawler se queda en la portada.", esfuerzo: "media jornada" });

  // 3 · Datos estructurados
  const negocio = h.tipos.some((t) => NEGOCIO.test(t));
  const oferta = h.tipos.some((t) => OFERTA.test(t));
  const faq = h.tipos.some((t) => /FAQPage/i.test(t));
  nota["datos-estructurados"] = (h.jsonld.length ? 30 : 0) + (negocio ? 30 : 0) + (oferta ? 20 : 0) + (faq ? 10 : 0) + (h.jsonld.length && !h.jsonldInvalido ? 10 : 0);
  if (!h.jsonld.length) hallazgos.push({ eje: "datos-estructurados", severidad: "alto", titulo: "La IA no sabe qué tipo de negocio eres", detalle: "No hay datos estructurados (schema.org). Son la ficha que leen las IA para entender qué vendes, dónde y a qué hora.", esfuerzo: "1 a 2 horas" });
  else {
    if (!negocio) hallazgos.push({ eje: "datos-estructurados", severidad: "medio", titulo: "Falta la ficha de tu negocio", detalle: `Hay datos estructurados (${h.tipos.slice(0, 4).join(", ") || "sin tipo"}), pero ninguno describe tu negocio (LocalBusiness u Organization).`, esfuerzo: "1 hora" });
    if (h.jsonldInvalido) hallazgos.push({ eje: "datos-estructurados", severidad: "medio", titulo: "Hay datos estructurados rotos", detalle: "Algún bloque JSON-LD tiene errores y se ignora entero.", esfuerzo: "30 minutos" });
  }

  // 4 · Estructura respondible
  const preguntas = [...h.h2, ...h.h3].filter((t) => t.includes("?")).length;
  nota["estructura-respondible"] = (h.h1.length === 1 ? 25 : h.h1.length > 1 ? 12 : 0) + (h.h2.length >= 3 ? 25 : h.h2.length ? 12 : 0) + (preguntas || faq ? 25 : 0) + (h.listas ? 25 : 0);
  if (h.h1.length !== 1) hallazgos.push({ eje: "estructura-respondible", severidad: "medio", titulo: h.h1.length ? `Tienes ${h.h1.length} títulos principales (H1)` : "Tu página no tiene título principal (H1)", detalle: "La IA usa el H1 para saber de qué va la página. Debe haber uno y solo uno.", esfuerzo: "15 minutos" });
  if (!preguntas && !faq) hallazgos.push({ eje: "estructura-respondible", severidad: "alto", titulo: "No respondes a las preguntas de tus clientes", detalle: "Ninguna sección está escrita como pregunta («¿Cuánto cuesta…?», «¿Abrís los domingos?»). Es justo lo que la gente pregunta a ChatGPT.", esfuerzo: "2 a 3 horas" });

  // 5 · Entidad de marca
  const sameAs = h.jsonld.some((d) => Array.isArray(d?.sameAs) ? d.sameAs.length : d?.sameAs);
  nota["entidad-marca"] = (negocio ? 25 : 0) + (h.telefono ? 20 : 0) + (h.direccion ? 20 : 0) + (h.email ? 10 : 0) + (sameAs ? 15 : 0) + (h.legal ? 10 : 0);
  if (!h.telefono || !h.direccion) hallazgos.push({ eje: "entidad-marca", severidad: "medio", titulo: "Faltan datos de contacto legibles", detalle: `En el HTML no aparece${!h.telefono ? " el teléfono" : ""}${!h.telefono && !h.direccion ? " ni" : ""}${!h.direccion ? " la dirección" : ""}. Sin ellos la IA no puede recomendarte para búsquedas locales.`, esfuerzo: "30 minutos" });
  if (!sameAs) hallazgos.push({ eje: "entidad-marca", severidad: "bajo", titulo: "La IA no puede confirmar que tus redes son tuyas", detalle: "Enlaza tus perfiles (Google, Instagram…) en los datos estructurados con «sameAs».", esfuerzo: "15 minutos" });

  // 6 · Frescura
  nota["frescura"] = h.fechas.length ? 100 : h.tiempo ? 60 : new RegExp(String(new Date().getFullYear())).test(textoDe(pagina.texto)) ? 40 : 0;
  if (!h.fechas.length && !h.tiempo) hallazgos.push({ eje: "frescura", severidad: "bajo", titulo: "No hay fecha de actualización", detalle: "La IA prefiere información fechada. Indica cuándo actualizaste precios u horarios.", esfuerzo: "15 minutos" });

  // 7 · Indexación
  const tieneSitemap = !!(sitemapRes && sitemapRes.status < 400 && /<(urlset|sitemapindex)/i.test(sitemapRes.texto)) || robots.sitemaps.length > 0;
  nota["indexacion"] = (h.titulo ? 25 : 0) + (h.descripcion ? 25 : 0) + (h.canonical ? 15 : 0) + (h.lang ? 10 : 0) + (tieneSitemap ? 25 : 0);
  if (!h.descripcion) hallazgos.push({ eje: "indexacion", severidad: "medio", titulo: "Falta la descripción de la página", detalle: "Sin meta descripción, buscadores e IA tienen que adivinar el resumen de tu web.", esfuerzo: "10 minutos" });
  if (!tieneSitemap) hallazgos.push({ eje: "indexacion", severidad: "medio", titulo: "No tienes mapa del sitio (sitemap.xml)", detalle: "Es la lista de páginas que ayuda a los crawlers a encontrarlas todas.", esfuerzo: "15 minutos" });

  // 8 · Acceso técnico
  nota["acceso-tecnico"] = (pagina.url.protocol === "https:" ? 40 : 0) + (pagina.ms < 1200 ? 40 : pagina.ms < 3000 ? 20 : 0) + (pagina.texto.length < 1_500_000 ? 20 : 0);
  if (pagina.url.protocol !== "https:") hallazgos.push({ eje: "acceso-tecnico", severidad: "alto", titulo: "Tu web no usa HTTPS", detalle: "Sin candado, buscadores e IA la consideran poco fiable.", esfuerzo: "30 minutos" });
  if (pagina.ms >= 3000) hallazgos.push({ eje: "acceso-tecnico", severidad: "medio", titulo: "Tu web tarda en responder", detalle: `Ha tardado ${(pagina.ms / 1000).toFixed(1)} s. Los crawlers abandonan las páginas lentas.`, esfuerzo: "variable" });

  const tieneLlmsTxt = !!(llmsRes && llmsRes.status < 400 && !/<html/i.test(llmsRes.texto) && llmsRes.texto.trim().length > 20);
  if (!tieneLlmsTxt) hallazgos.push({ eje: "indexacion", severidad: "bajo", titulo: "No tienes llms.txt", detalle: "Un resumen en texto para modelos de IA. Poco usado todavía, pero cuesta 10 minutos.", esfuerzo: "10 minutos" });

  const ejes = EJES.map((e) => ({ ...e, nota: Math.max(0, Math.min(100, Math.round(nota[e.id]))) }));
  const total = Math.round(ejes.reduce((s, e) => s + (e.nota * e.peso) / 100, 0));
  hallazgos.sort((a, b) => ORDEN_SEVERIDAD[a.severidad] - ORDEN_SEVERIDAD[b.severidad] || (EJES.find((e) => e.id === b.eje)!.peso - EJES.find((e) => e.id === a.eje)!.peso));

  return {
    url: pagina.url.href,
    nota: total,
    nivel: total >= 85 ? "excelente" : total >= 70 ? "bueno" : total >= 50 ? "mejorable" : "critico",
    ejes, hallazgos,
    datos: { palabrasSinJs: h.palabras, enlacesInternos: h.internos, scripts: h.scripts, tiposSchema: h.tipos, bloqueados, tieneSitemap, tieneLlmsTxt, msRespuesta: pagina.ms },
    analizadoEn: new Date().toISOString(),
  };
}
