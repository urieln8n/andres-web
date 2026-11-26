"use client";

import { useState } from "react";
import { enviarEvento } from "@/lib/aeo/evento-cliente";
import { Check, Share2 } from "lucide-react";

const BASE = "https://www.andresrendon.com";

export function CompartirNota({ dominio, nota, pagina = "nota-ia" }: { dominio: string; nota: number; pagina?: string }) {
  const contar = () => enviarEvento("compartir", pagina);
  const [copiado, setCopiado] = useState(false);
  const enlace = `${BASE}/nota-ia/${dominio}`;
  const texto = `Mi web ${dominio} saca ${nota}/100 para ChatGPT. ¿Y la tuya?`;
  const boton = "focus-premium inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.05] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5";

  async function compartir() {
    contar();
    if (navigator.share) { try { await navigator.share({ title: `¿Te ve ChatGPT? · ${dominio}`, text: texto, url: enlace }); return; } catch { /* cancelado */ } }
    await navigator.clipboard.writeText(`${texto} ${enlace}`);
    setCopiado(true); setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-slate-400">Comparte tu nota:</span>
      <a onClick={contar} className={boton} href={`https://wa.me/?text=${encodeURIComponent(`${texto} ${enlace}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a onClick={contar} className={boton} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(enlace)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a onClick={contar} className={boton} href={`https://x.com/intent/post?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(enlace)}`} target="_blank" rel="noopener noreferrer">X</a>
      <button type="button" className={boton} onClick={compartir}>{copiado ? <><Check className="h-4 w-4" /> Enlace copiado</> : <><Share2 className="h-4 w-4" /> Más</>}</button>
    </div>
  );
}
