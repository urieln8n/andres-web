import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AeoAuditTool } from "@/components/aeo-audit-tool";
import { SelloEmbed } from "@/components/sello-embed";
import { limpiarDominio, NIVEL_COLOR, NIVEL_TEXTO, notaPublica, UMBRAL_SELLO, type NotaPublica } from "@/lib/aeo/nota-publica";
import { siteUrl } from "@/lib/utils";

export const maxDuration = 60;

type Props = { params: { dominio: string } };

async function cargar(param: string): Promise<NotaPublica | null> {
  const dominio = limpiarDominio(param);
  if (!dominio) return null;
  return notaPublica(dominio).catch(() => null);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dominio = limpiarDominio(params.dominio);
  if (!dominio) return { title: "Nota IA" };
  const titulo = `¿Puede ChatGPT leer ${dominio}?`;
  const descripcion = `La nota de ${dominio} para ChatGPT, Perplexity, Claude y Google. Comprueba gratis la tuya en segundos.`;
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: siteUrl(`/nota-ia/${dominio}`) },
    robots: { index: false, follow: true },
    openGraph: { title: titulo, description: descripcion, url: siteUrl(`/nota-ia/${dominio}`), type: "website" },
    twitter: { card: "summary_large_image", title: titulo, description: descripcion },
  };
}

export default async function NotaIa({ params }: Props) {
  const n = await cargar(params.dominio);
  if (!n) notFound();
  const color = NIVEL_COLOR[n.nivel] || "#8ea6ff";
  const fecha = new Date(n.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-200">¿Te ve ChatGPT?</p>
      <h1 className="mt-3 break-words font-display text-4xl font-semibold text-white md:text-5xl">{n.dominio}</h1>

      <div className="premium-border glass-panel mt-8 rounded-[1.75rem] p-6 md:p-9">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${n.nota * 3.6}deg, rgba(255,255,255,.08) 0)` }}>
            <div className="grid h-28 w-28 place-items-center rounded-full bg-ink text-center">
              <div><span className="text-4xl font-semibold text-white">{n.nota}</span><span className="block text-xs text-slate-400">de 100</span></div>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[.2em]" style={{ color }}>{NIVEL_TEXTO[n.nivel]}</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {n.nota >= UMBRAL_SELLO ? "La IA puede leer esta web." : n.nota >= 50 ? "La IA lee esta web a medias." : "Para la IA, esta web casi no existe."}
            </p>
            <p className="mt-2 text-sm text-slate-400">Comprobado el {fecha}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-3">
          {n.ejes.map((e) => (
            <div key={e.id}>
              <div className="flex justify-between text-sm text-slate-300"><span>{e.nombre}</span><span className="font-semibold text-white">{e.nota}</span></div>
              <div className="mt-1 h-2 rounded-full bg-white/[.07]"><div className="h-2 rounded-full" style={{ width: `${e.nota}%`, background: e.nota >= 50 ? "#8ea6ff" : "#f87171" }} /></div>
            </div>
          ))}
        </div>
        {n.nota >= UMBRAL_SELLO && <SelloEmbed dominio={n.dominio} />}
      </div>

      <h2 className="mt-16 font-display text-3xl font-semibold text-white">¿Y tu web? Compruébala gratis</h2>
      <p className="mt-2 text-slate-400">Sin registrarte. Tu nota de 0 a 100 en unos segundos.</p>
      <div className="mt-6"><AeoAuditTool origen="nota-ia" /></div>
      <p className="mt-6 text-xs leading-5 text-slate-500">Análisis automático de la portada, sin ejecutar JavaScript, como la leen los buscadores con IA. Mide las condiciones para que la IA lea y cite una web; nadie puede garantizar que un modelo concreto la cite.</p>
    </main>
  );
}
