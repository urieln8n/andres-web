"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { enviarEvento } from "@/lib/aeo/evento-cliente";

const BASE = "https://www.andresrendon.com";

export function SelloEmbed({ dominio, pagina = "nota-ia" }: { dominio: string; pagina?: string }) {
  const [copiado, setCopiado] = useState(false);
  const codigo = `<a href="${BASE}/nota-ia/${dominio}" target="_blank" rel="noopener"><img src="${BASE}/sello-ia/${dominio}" alt="Legible por IA: comprobado con el auditor de Andrés AI Studio" height="28"></a>`;
  return (
    <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-5">
      <p className="font-semibold text-white">Pon el sello en tu web</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">Demuestra a tus clientes que la IA puede leerte. Se actualiza solo con tu nota.</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/sello-ia/${dominio}`} alt="Sello Legible por IA" height={28} className="mt-4" />
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-slate-300">{codigo}</pre>
      <button type="button" onClick={() => { enviarEvento("sello", pagina); navigator.clipboard.writeText(codigo).then(() => { setCopiado(true); setTimeout(() => setCopiado(false), 2000); }); }} className="focus-premium mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
        {copiado ? <><Check className="h-4 w-4" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar el código</>}
      </button>
      <p className="mt-2 text-xs text-slate-400">Pégalo en el pie de tu web. En WordPress, Wix o Shopify: un bloque de «HTML personalizado».</p>
    </div>
  );
}
