import { limpiarDominio, notaPublica, UMBRAL_SELLO } from "@/lib/aeo/nota-publica";

// Sello para poner en una web: «Legible por IA · 85/100» si la nota llega al umbral;
// si no, un sello neutro «¿Te ve ChatGPT?». La nota la calcula siempre el servidor.
export const runtime = "nodejs";
export const maxDuration = 60;

const escapar = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function svg(izq: string, der: string, colorDer: string, textoDer = "#111") {
  const ancho = (t: string) => Math.round(t.length * 7.4 + 22);
  const a = ancho(izq), b = ancho(der);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${a + b}" height="28" role="img" aria-label="${escapar(izq)}: ${escapar(der)}">
<rect width="${a + b}" height="28" rx="6" fill="#0b0b0c"/><rect x="${a}" width="${b}" height="28" rx="6" fill="${colorDer}"/><rect x="${a}" width="6" height="28" fill="${colorDer}"/>
<rect x=".5" y=".5" width="${a + b - 1}" height="27" rx="5.5" fill="none" stroke="#f5c518" stroke-opacity=".6"/>
<g font-family="Verdana,DejaVu Sans,sans-serif" font-size="12" font-weight="700">
<text x="${a / 2}" y="18.5" fill="#f5c518" text-anchor="middle">${escapar(izq)}</text>
<text x="${a + b / 2}" y="18.5" fill="${textoDer}" text-anchor="middle">${escapar(der)}</text></g></svg>`;
}

export async function GET(_req: Request, { params }: { params: { dominio: string } }) {
  const dominio = limpiarDominio(params.dominio);
  const n = dominio ? await notaPublica(dominio).catch(() => null) : null;
  const cuerpo = n && n.nota >= UMBRAL_SELLO ? svg("Legible por IA ✓", `${n.nota}/100`, "#f5c518") : svg("¿Te ve ChatGPT?", "Compruébalo", "#1f2937", "#f4f1e8");
  return new Response(cuerpo, {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      "access-control-allow-origin": "*",
      "x-robots-tag": "noindex",
    },
  });
}
