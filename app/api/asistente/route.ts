import { NextResponse } from "next/server";
import { z } from "zod";
import { promptAsistente, respuestaSinIA, type AccionAsistente } from "@/lib/ai/asistente";

const cuerpo = z.object({
  mensajes: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(600) }))
    .min(1)
    .max(16),
});

// Límite sencillo por IP (en memoria de cada instancia): 25 mensajes cada 10 minutos
const ventana = 10 * 60 * 1000;
const usos = new Map<string, number[]>();
function permitido(ip: string) {
  const ahora = Date.now();
  const lista = (usos.get(ip) || []).filter((t) => ahora - t < ventana);
  if (lista.length >= 25) return false;
  lista.push(ahora);
  usos.set(ip, lista);
  if (usos.size > 5000) usos.clear();
  return true;
}

const accionesValidas = new Set(["whatsapp", "auditoria", "proyectos", "contacto"]);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (!permitido(ip)) {
    return NextResponse.json({ respuesta: "Has enviado muchos mensajes seguidos. Si quieres, sigue la conversación con Andrés por WhatsApp.", accion: "whatsapp" }, { status: 429 });
  }

  const parsed = cuerpo.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ respuesta: "No he entendido el mensaje. Prueba a escribirlo otra vez.", accion: null }, { status: 400 });
  }

  const mensajes = parsed.data.mensajes.slice(-10);
  const ultimo = [...mensajes].reverse().find((m) => m.role === "user")?.content || "";
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json(respuestaSinIA(ultimo));

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 300,
        response_format: { type: "json_object" },
        messages: [{ role: "system", content: promptAsistente() }, ...mensajes],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    const json = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    const respuesta = typeof json.respuesta === "string" && json.respuesta.trim() ? json.respuesta.trim().slice(0, 900) : respuestaSinIA(ultimo).respuesta;
    const accion = (accionesValidas.has(json.accion) ? json.accion : null) as AccionAsistente;
    return NextResponse.json({ respuesta, accion });
  } catch (error) {
    console.error("[asistente]", error instanceof Error ? error.message : error);
    return NextResponse.json(respuestaSinIA(ultimo));
  }
}
