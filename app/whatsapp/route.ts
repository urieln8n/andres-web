import { NextResponse } from "next/server";

// Enlace fijo para emails y QR: /whatsapp?texto=... redirige al WhatsApp de Andrés.
// Cambiar el número en Vercel (NEXT_PUBLIC_WHATSAPP_NUMBER) actualiza todos los enlaces ya enviados.
export function GET(request: Request) {
  const numero = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000").replace(/\D/g, "");
  const texto = new URL(request.url).searchParams.get("texto")?.slice(0, 500) || "Hola Andrés, vengo de tu web y quiero información.";
  return NextResponse.redirect(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, 302);
}
