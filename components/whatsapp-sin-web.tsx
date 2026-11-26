"use client";

import { MessageCircle } from "lucide-react";
import { enviarEvento } from "@/lib/aeo/evento-cliente";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308";
const MENSAJE = encodeURIComponent("Hola Andrés, no tengo web todavía. ¿Me cuentas cómo empezar?");

export function WhatsappSinWeb() {
  return (
    <a onClick={() => enviarEvento("whatsapp", "nota-ia")} href={`https://wa.me/${WHATSAPP}?text=${MENSAJE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 underline underline-offset-4">
      <MessageCircle className="h-4 w-4" /> ¿No tienes web? Escríbeme
    </a>
  );
}
