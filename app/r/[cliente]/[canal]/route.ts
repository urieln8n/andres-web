import { NextResponse } from "next/server";
import { apuntarClic, destinoDe } from "@/lib/panel/datos";

// QR y enlaces con seguimiento: apunta el escaneo (sin IP ni cookies) y lleva al destino.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9-]{1,40}$/;

export async function GET(_req: Request, { params }: { params: { cliente: string; canal: string } }) {
  const cliente = params.cliente.toLowerCase();
  const canal = params.canal.toLowerCase();
  const destino = SLUG.test(cliente) && SLUG.test(canal) ? await destinoDe(cliente, canal) : null;
  if (!destino) return NextResponse.redirect("https://www.andresrendon.com/", 302);
  await apuntarClic(cliente, canal);
  return NextResponse.redirect(destino, { status: 302, headers: { "cache-control": "no-store", "x-robots-tag": "noindex" } });
}
