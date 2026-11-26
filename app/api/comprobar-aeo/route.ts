import { NextResponse } from "next/server";
import { z } from "zod";
import { analizarWeb, WebBloqueada, type ResultadoAeo } from "@/lib/aeo/analizar";
import { analizarConMotor } from "@/lib/aeo/motor";

// Comprobación instantánea: solo la web, sin datos personales. No guarda nada.
// El informe completo por email sigue en /api/auditoria-aeo.
export const runtime = "nodejs";
export const maxDuration = 60;

const entrada = z.object({ web: z.string().trim().min(4, "Escribe la dirección de tu web").max(300) });

// Freno básico por IP (por instancia): 10 comprobaciones cada 10 minutos
const usos = new Map<string, number[]>();
function demasiadas(ip: string) {
  const ahora = Date.now();
  const lista = (usos.get(ip) || []).filter((t) => ahora - t < 10 * 60_000);
  lista.push(ahora);
  usos.set(ip, lista);
  return lista.length > 10;
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (demasiadas(ip)) return NextResponse.json({ error: "Has hecho muchas comprobaciones seguidas. Prueba en unos minutos." }, { status: 429 });

  const parsed = entrada.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos no válidos" }, { status: 400 });

  let r: ResultadoAeo;
  try {
    r = await analizarConMotor(parsed.data.web).catch(() => analizarWeb(parsed.data.web));
  } catch (error) {
    if (error instanceof WebBloqueada) return NextResponse.json({ bloqueada: error.status });
    const motivo = error instanceof Error && error.name !== "AbortError" && error.name !== "TimeoutError" ? error.message : "Tu web ha tardado demasiado en responder.";
    return NextResponse.json({ error: motivo }, { status: 422 });
  }

  // En pantalla: nota, ejes y los 3 problemas principales. El detalle de cómo arreglar cada uno va en el informe por email.
  return NextResponse.json({
    url: r.url,
    nota: r.nota,
    nivel: r.nivel,
    ejes: r.ejes,
    principales: r.hallazgos.slice(0, 3).map((h, i) => ({ severidad: h.severidad, titulo: h.titulo, detalle: i === 0 ? h.detalle : "" })),
    total: r.hallazgos.length,
  });
}
