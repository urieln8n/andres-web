import { NextResponse } from "next/server";
import { registrarEvento } from "@/lib/aeo/eventos";

export const runtime = "nodejs";

// Eventos que manda el navegador. Comprobaciones e informes los registra el servidor.
const DEL_NAVEGADOR = new Set(["visita", "whatsapp", "compartir", "sello"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !DEL_NAVEGADOR.has(body.tipo)) return NextResponse.json({ ok: false }, { status: 400 });
  await registrarEvento({ tipo: body.tipo, pagina: body.pagina, canal: body.canal });
  return NextResponse.json({ ok: true });
}
