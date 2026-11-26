// Nota pública de una web, para compartir (página /nota-ia/[dominio], su imagen y el sello).
// La nota la calcula siempre el servidor: nadie puede inventarse una cifra cambiando la URL.
// Se guarda en caché un día por dominio para no lanzar el motor en cada visita.
import { unstable_cache } from "next/cache";
import { analizarWeb, type ResultadoAeo } from "./analizar";
import { analizarConMotor } from "./motor";

export interface NotaPublica { dominio: string; url: string; nota: number; nivel: ResultadoAeo["nivel"]; ejes: ResultadoAeo["ejes"]; fecha: string }

const DOMINIO = /^(?!-)[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})*\.[a-z]{2,24}$/;

/** Convierte lo que escriba la gente («https://www.Web.es/algo») en un dominio limpio, o null si no lo es. */
export function limpiarDominio(entrada: string): string | null {
  let v = decodeURIComponent(entrada).trim().toLowerCase();
  v = v.replace(/^https?:\/\//, "").split(/[/?#]/)[0].replace(/:\d+$/, "");
  return DOMINIO.test(v) && v.length <= 253 ? v : null;
}

export const NIVEL_TEXTO: Record<string, string> = { excelente: "Excelente", bueno: "Bueno", mejorable: "Mejorable", critico: "Crítico" };
export const NIVEL_COLOR: Record<string, string> = { excelente: "#34d399", bueno: "#8ea6ff", mejorable: "#f5c518", critico: "#f87171" };

/** Umbral para mostrar el sello «Legible por IA». */
export const UMBRAL_SELLO = 70;

export const etiquetaNota = (dominio: string) => `nota-ia-${dominio}`;

export function notaPublica(dominio: string): Promise<NotaPublica> {
  return unstable_cache(
    async (): Promise<NotaPublica> => {
      const r = await analizarConMotor(dominio).catch(() => analizarWeb(dominio));
      return { dominio, url: r.url, nota: r.nota, nivel: r.nivel, ejes: r.ejes, fecha: new Date().toISOString() };
    },
    ["nota-ia-v1", dominio],
    { revalidate: 86_400, tags: [etiquetaNota(dominio)] },
  )();
}
