import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { projectStudies } from "@/lib/site-data";
import { AbrirAsistente } from "@/components/abrir-asistente";

// Página del enlace de la bio de Instagram: ligera, pensada para el navegador interno de Instagram
export const metadata = {
  ...createMetadata({
    title: "Andrés Rendón | Enlaces",
    description: "Webs 3D para negocios de Barcelona. Auditoría gratis, WhatsApp y proyectos.",
    path: "/instagram",
  }),
  robots: { index: false, follow: true },
};

const textoWhatsApp = "Hola Andrés, vengo de tu Instagram y quiero información para mi negocio.";
const etiqueta = { real: "Cliente", propuesta: "Propuesta", producto: "Producto propio", demo: "Demo" } as const;

export default function InstagramPage() {
  const proyectos = projectStudies.filter((p) => p.image && p.url);

  return (
    <div className="mx-auto min-h-svh max-w-md px-5 pb-28 pt-10">
      <header className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lima-300 text-2xl font-bold text-ink">AR</div>
        <h1 className="titulo-display mt-5 text-5xl text-white">Andrés Rendón</h1>
        <p className="mx-auto mt-3 max-w-xs leading-6 text-slate-300">Webs 3D para negocios de Barcelona. Que te encuentren en Google y ChatGPT, y que te escriban por WhatsApp.</p>
      </header>

      <nav className="mt-8 grid gap-3" aria-label="Enlaces principales">
        <Link href="/auditoria-gratis?source=instagram" className="focus-premium rounded-2xl bg-lima-300 px-5 py-4 text-center font-semibold text-ink transition active:scale-[.98]">
          Auditoría gratis de tu web
        </Link>
        <a href={`/whatsapp?texto=${encodeURIComponent(textoWhatsApp)}`} className="focus-premium rounded-2xl border border-white/15 bg-white/[.04] px-5 py-4 text-center font-semibold text-white transition active:scale-[.98]">
          Escríbeme por WhatsApp
        </a>
        <AbrirAsistente className="focus-premium rounded-2xl border border-white/15 bg-white/[.04] px-5 py-4 text-center font-semibold text-white transition active:scale-[.98]">
          Pregúntale a mi asistente con IA
        </AbrirAsistente>
        <Link href="/auditoria-aeo?source=instagram" className="focus-premium rounded-2xl border border-white/15 bg-white/[.04] px-5 py-4 text-center font-semibold text-white transition active:scale-[.98]">
          ¿Te ve ChatGPT? Compruébalo gratis
        </Link>
      </nav>

      <section className="mt-12" aria-labelledby="ultimos">
        <h2 id="ultimos" className="titulo-display text-3xl text-white">Últimos proyectos</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {proyectos.map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noopener" className="group focus-premium overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={p.image!} alt="" fill sizes="50vw" className={`object-cover ${p.imageKind === "movil" ? "object-top" : "object-[50%_25%] scale-[1.3]"}`} />
              </div>
              <div className="p-3">
                <p className="text-[11px] text-lima-300">{etiqueta[p.status ?? "real"]}</p>
                <p className="mt-0.5 flex items-center justify-between gap-1 text-sm font-semibold text-white">
                  {p.h1.split(":")[0]} <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <p className="mt-10 text-center text-sm">
        <Link href="/" className="text-slate-400 underline decoration-white/30 underline-offset-4">Ver la web completa</Link>
      </p>
    </div>
  );
}
