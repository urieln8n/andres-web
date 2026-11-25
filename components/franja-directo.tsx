import { ArrowUpRight, Radio } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { INSTAGRAM_URL } from "@/lib/seo";

/** Franja "Lo construyo en directo": AI Market como proyecto que se construye en abierto. */
export function FranjaDirecto() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="cristal relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-8 md:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[.16em] text-lima-300">
              <Radio className="h-4 w-4" aria-hidden="true" /> En directo · AI Market
            </p>
            <h2 className="titulo-display mt-4 text-balance text-4xl text-white sm:text-6xl">
              Lo construyo <span className="ig-degradado">en directo</span>, con Claude.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              AI Market sigue cada día qué cambia en la IA: proyectos de GitHub, modelos de Hugging Face y servidores MCP. En los directos lo mejoro delante de ti y te enseño cómo trabajo con IA de principio a fin.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="https://aimarket.andresrendon.com">Abrir AI Market <ArrowUpRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href={INSTAGRAM_URL} variant="secondary">Avisos de los directos en Instagram</ButtonLink>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {[
              ["535", "proyectos seguidos"],
              ["1.595", "observaciones guardadas"],
              ["3", "fuentes: GitHub, Hugging Face y MCP"],
              ["2 meses", "de historial (sep–oct)"],
            ].map(([n, t]) => (
              <div key={t} className="rounded-2xl border border-[rgba(142,166,255,.18)] bg-white/[.03] p-5">
                <dt className="sr-only">{t}</dt>
                <dd className="titulo-display ig-degradado text-4xl">{n}</dd>
                <dd className="mt-1 text-sm text-slate-400">{t}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 text-xs text-slate-500">Datos de la recogida del 25 de noviembre de 2026.</p>
      </div>
    </section>
  );
}
