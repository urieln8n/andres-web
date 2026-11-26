import { AeoAuditTool } from "@/components/aeo-audit-tool";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "¿Te ve ChatGPT? Comprueba tu web gratis",
  description: "Pega tu web y en segundos sabrás si ChatGPT, Perplexity, Claude y Google pueden leerla. Nota de 0 a 100, sin registrarte.",
  path: "/nota-ia",
});

export default function NotaIaInicio() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-200">Gratis y sin registro</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">¿Te ve ChatGPT?</h1>
      <p className="mt-5 max-w-2xl font-display text-2xl font-semibold leading-snug text-white md:text-3xl">
        Tus clientes ya no solo buscan en Google. Ahora se lo preguntan a la IA, <span className="text-cyan-300">y la IA recomienda a quien puede leer.</span>
      </p>
      <p className="mt-4 max-w-2xl text-lg text-slate-400">Pega tu web y en 10 segundos sabrás si estás entre los que recomienda, o si se está llevando a tus clientes a otro sitio.</p>
      <div className="mt-8"><AeoAuditTool origen="nota-ia" /></div>
    </main>
  );
}
