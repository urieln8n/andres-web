import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, MessageCircle, ScanSearch, Sparkles } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { projectStudies } from "@/lib/site-data";
import { AbrirAsistente } from "@/components/abrir-asistente";

// Página del enlace de la bio de Instagram: ligera (solo CSS), pensada para el navegador interno de Instagram.
// Estética "IA": aurora animada, retícula neuronal, avatar con aro de luz y botones de cristal. Estilos en globals.css (.ig-*).
export const metadata = {
  ...createMetadata({
    title: "Andrés Rendón | Enlaces",
    description: "Webs 3D con IA para negocios de Barcelona. Auditoría IA gratis, WhatsApp y proyectos.",
    path: "/instagram",
  }),
  robots: { index: false, follow: true },
};

const textoWhatsApp = "Hola Andrés, vengo de tu Instagram y quiero información para mi negocio.";
const etiqueta = { real: "Cliente", propuesta: "Propuesta", producto: "Producto propio", demo: "Demo" } as const;

export default function InstagramPage() {
  const proyectos = projectStudies.filter((p) => p.image && p.url);

  return (
    <div className="relative mx-auto min-h-svh max-w-md px-5 pb-28 pt-10">
      <div className="ig-fondo" aria-hidden="true">
        <div className="ig-aurora" />
        <div className="ig-red" />
      </div>

      <header className="text-center">
        <div className="ig-avatar">
          <div className="ig-avatar__foto">
            <Image src="/andres.webp" alt="Andrés Rendón" fill sizes="112px" priority className="object-cover object-top" />
          </div>
        </div>
        <span className="ig-chip mt-4">
          <span className="ig-punto" aria-hidden="true" /> IA · Disponible para proyectos
        </span>
        <h1 className="titulo-display ig-degradado mt-4 text-5xl">Andrés Rendón</h1>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[.18em] text-lima-300">Andrés AI Studio</p>
        <p className="mx-auto mt-3 max-w-xs leading-6 text-slate-300">
          Webs 3D creadas con IA para negocios de Barcelona. Que te encuentren Google y ChatGPT, y que te escriban por WhatsApp.
        </p>
        <p className="mt-4 h-5" aria-hidden="true">
          <span className="ig-terminal">› analizando tu web con IA…</span>
        </p>
      </header>

      <nav className="mt-7 grid gap-3" aria-label="Enlaces principales">
        <Link href="/auditoria-aeo?source=instagram" className="ig-boton ig-boton--principal focus-premium">
          <span className="relative z-10 inline-flex items-center gap-2"><ScanSearch className="h-5 w-5" /> ¿Te recomienda ChatGPT?</span>
          <small className="relative z-10">Analiza tu web gratis en 30 segundos</small>
        </Link>
        <a href={`/whatsapp?texto=${encodeURIComponent(textoWhatsApp)}`} className="ig-boton focus-premium">
          <span className="inline-flex items-center gap-2"><MessageCircle className="h-5 w-5 text-emerald-300" /> Escríbeme por WhatsApp</span>
        </a>
        <AbrirAsistente className="ig-boton focus-premium w-full">
          <span className="inline-flex items-center gap-2"><Bot className="h-5 w-5 text-cyan-300" /> Pregúntale a mi asistente con IA</span>
        </AbrirAsistente>
        <Link href="/auditoria-gratis?source=instagram" className="ig-boton focus-premium">
          <span className="inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-violet-300" /> Revisión completa de tu negocio</span>
        </Link>
      </nav>

      <section className="mt-12" aria-labelledby="ultimos">
        <h2 id="ultimos" className="titulo-display text-3xl text-white">Últimos proyectos</h2>
        <p className="mt-1 text-sm text-slate-400">Hechos con IA, publicados y funcionando.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {proyectos.map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noopener" className="ig-tarjeta group focus-premium">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={p.image!} alt="" fill sizes="50vw" className={`object-cover ${p.imageKind === "movil" ? "object-top" : "object-[50%_25%] scale-[1.3]"}`} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#05060d] to-transparent" />
              </div>
              <div className="p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-lima-300">{etiqueta[p.status ?? "real"]}</p>
                <p className="mt-0.5 flex items-center justify-between gap-1 text-sm font-semibold text-white">
                  {p.h1.split(":")[0]} <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover:text-white" />
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
