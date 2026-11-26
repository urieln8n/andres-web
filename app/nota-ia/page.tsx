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
      <p className="mt-4 text-lg text-slate-300">Pega la dirección de tu web y en unos segundos tendrás tu nota de 0 a 100. Después puedes compartirla y, si pasas de 70, poner el sello «Legible por IA» en tu web.</p>
      <div className="mt-8"><AeoAuditTool origen="nota-ia" /></div>
    </main>
  );
}
