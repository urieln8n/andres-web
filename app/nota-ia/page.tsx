import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AeoAuditTool } from "@/components/aeo-audit-tool";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "¿Te ve ChatGPT? Comprueba tu web gratis",
  description: "Pega tu web y en segundos sabrás si ChatGPT, Perplexity, Claude y Google pueden leerla. Nota de 0 a 100, sin registrarte.",
  path: "/nota-ia",
});

export default function NotaIaInicio() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-24 md:pt-32">
      <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">¿Te ve ChatGPT?</h1>
      <p className="mt-3 max-w-2xl text-lg leading-snug text-slate-300 md:text-xl">
        Tus clientes ya se lo preguntan a la IA. <span className="text-cyan-300">Y la IA solo recomienda a quien puede leer.</span>
      </p>

      <div className="mt-6"><AeoAuditTool origen="nota-ia" compacto /></div>
      <p className="mt-3 text-sm text-slate-400">Gratis, sin registrarte y en unos segundos. Si pasas de 70, te llevas el sello «Legible por IA».</p>

      <section className="mt-12 flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[.03] p-6 sm:flex-row sm:items-center" aria-label="Quién está detrás">
        <Image src="/andres.webp" alt="Andrés Rendón" width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-2 ring-cyan-300/40" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">Lo he creado yo, Andrés Rendón</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">Construyo webs, asistentes con IA y automatizaciones para negocios de Barcelona y alrededores. Esta herramienta es la misma que uso con mis clientes.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/proyectos" className="focus-premium inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5">Mira mis trabajos <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/sobre-mi" className="focus-premium inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5">Quién soy</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
