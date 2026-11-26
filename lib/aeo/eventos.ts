// Registro de estadísticas de «¿Te ve ChatGPT?». Nunca rompe la petición: si falla, se ignora.
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const TIPOS = ["visita", "comprobacion", "informe", "whatsapp", "compartir", "sello"] as const;
export type TipoEvento = (typeof TIPOS)[number];

/** Canal o página: solo letras, números y guiones, como mucho 24. */
export function limpiarEtiqueta(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().toLowerCase().slice(0, 24);
  return /^[a-z0-9-]+$/.test(s) ? s : null;
}

export async function registrarEvento(e: { tipo: TipoEvento; pagina?: unknown; canal?: unknown; dominio?: string | null; nota?: number | null }) {
  try {
    const db = getSupabaseAdmin();
    if (!db) return;
    await db.from("nota_ia_eventos").insert({
      tipo: e.tipo,
      pagina: limpiarEtiqueta(e.pagina),
      canal: limpiarEtiqueta(e.canal) || "directo",
      dominio: e.dominio ? e.dominio.slice(0, 253) : null,
      nota: typeof e.nota === "number" ? Math.round(e.nota) : null,
    });
  } catch {
    /* las estadísticas nunca bloquean */
  }
}
