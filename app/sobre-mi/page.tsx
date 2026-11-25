import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, MessageCircle, Rocket, ScanSearch, Wrench } from "lucide-react";
import { createMetadata, INSTAGRAM_URL, personJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/button-link";

export const metadata = createMetadata({
  title: "Sobre Andrés Fabián Rendón Ramírez | Webs 3D con IA en Barcelona",
  description: "Quién soy y cómo trabajo: webs 3D creadas con IA para negocios de Barcelona, auditoría AEO con motor propio, demo gratis antes de pagar y web online en 7 días.",
  path: "/sobre-mi",
});

const WA_NUMERO = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308").replace(/\D/g, "");
const WHATSAPP = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent("Hola Andrés, he leído tu página «Sobre mí» y quiero hablar de la web de mi negocio.")}`;

const pasos = [
  { icono: ScanSearch, titulo: "1 · Audito tu web", texto: "La paso por mi auditor de IA: 8 ejes, los crawlers de ChatGPT, Perplexity y Claude, y la capa de Cloudflare. Sabes qué falla y cuánto cuesta arreglarlo." },
  { icono: Bot, titulo: "2 · Demo gratis", texto: "Antes de pagar nada, te enseño cómo quedaría tu web con tu marca, tus fotos y tus servicios. Decides con algo real delante." },
  { icono: Rocket, titulo: "3 · Online en 7 días", texto: "Web rápida, pensada para el móvil, con WhatsApp en un toque y preparada para Google y para la IA desde el primer día." },
  { icono: Wrench, titulo: "4 · La cuido contigo", texto: "Cambios, copias y una auditoría cada mes para ver la nota subir. Sin permanencia." },
];

const herramientas = ["Claude", "ChatGPT", "VS Code", "Next.js", "Three.js", "Cloudflare", "Supabase", "Brevo"];

const productos = [
  { nombre: "Auditor IA (AEO)", texto: "Mi motor propio: mide si ChatGPT, Perplexity y Claude pueden leer y citar una web.", href: "/auditoria-aeo", externo: false },
  { nombre: "Lumbrera", texto: "App gratuita para aprender Génesis jugando, sola o en grupo con PIN.", href: "https://genesis.andresrendon.com", externo: true },
  { nombre: "Web Rescue OS", texto: "Diagnóstico de seguridad y salud web con panel de control.", href: "https://webrescure.andresrendon.com", externo: true },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />

      {/* QUIÉN SOY */}
      <section className="overflow-x-clip px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="mx-auto">
            <div className="ig-avatar" style={{ width: 280, height: 280, padding: 5 }}>
              <div className="ig-avatar__foto">
                <Image src="/andres.webp" alt="Andrés Rendón, Andrés AI Studio" fill sizes="280px" priority className="object-cover object-top" />
              </div>
            </div>
            <p className="mt-6 text-center"><span className="ig-chip"><span className="ig-punto" aria-hidden="true" /> IA · Disponible para proyectos</span></p>
          </div>
          <div>
            <p className="font-mono text-sm uppercase tracking-[.16em] text-lima-300">Sobre mí · Andrés AI Studio</p>
            <h1 className="titulo-display mt-5 text-balance text-5xl text-white sm:text-7xl">
              Soy Andrés. Hago webs <span className="ig-degradado">con IA</span> para que te encuentren y te escriban.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              Vivo en L&apos;Hospitalet y trabajo con negocios de Barcelona. Llevo años construyendo cada día con VS Code, ChatGPT y Claude: así diseño webs 3D que se recuerdan, y así he creado mi propio auditor para medir si la IA puede leer y recomendar tu negocio.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              No vendo humo: <strong className="font-semibold text-white">te enseño una demo gratis antes de pagar</strong>, el precio es cerrado y cada mejora se mide con una nota.
            </p>
            <p className="mt-6 h-5" aria-hidden="true"><span className="ig-terminal" style={{ ["--ch" as string]: "29ch" }}>› construyendo con Claude y IA…</span></p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-aeo?source=sobre-mi"><ScanSearch className="h-4 w-4" /> ¿Te recomienda ChatGPT? Compruébalo</ButtonLink>
              <ButtonLink href={WHATSAPP} variant="secondary"><MessageCircle className="h-4 w-4" /> Escríbeme por WhatsApp</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO TRABAJO */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl border-t border-[rgba(142,166,255,.14)] pt-10">
          <h2 className="titulo-display text-5xl text-white sm:text-7xl">Cómo <span className="ig-degradado">trabajo</span></h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p) => (
              <div key={p.titulo} className="cristal cristal-hover rounded-3xl p-7">
                <span className="icono-ia"><p.icono className="h-6 w-6" /></span>
                <h3 className="mt-6 text-xl font-semibold text-white">{p.titulo}</h3>
                <p className="mt-3 leading-7 text-slate-400">{p.texto}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-2" aria-label="Herramientas con las que trabajo">
            {herramientas.map((h) => (
              <span key={h} className="rounded-full border border-[rgba(142,166,255,.25)] bg-white/[.03] px-4 py-1.5 font-mono text-xs text-slate-300">{h}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CASO REAL */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl border-t border-[rgba(142,166,255,.14)] pt-10">
          <p className="text-sm text-lima-300">Caso real</p>
          <h2 className="titulo-display mt-3 text-5xl text-white sm:text-7xl">Avancés Campus</h2>
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <a href="https://avancescampus.andresrendon.com" target="_blank" rel="noopener" className="group block" aria-label="Abrir la web de Avancés Campus">
              <div className="marco transition duration-500 group-hover:-translate-y-1">
                <div className="marco__barra"><span /><span /><span /></div>
                <div className="relative aspect-[16/10]">
                  <Image src="/proyectos-avancescampus.webp" alt="Web 3D de Avancés Campus" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-top" />
                </div>
              </div>
            </a>
            <div>
              <p className="leading-8 text-slate-300">
                Un taller de Barcelona que fabrica avancés a medida para caravanas tenía una web antigua, difícil de leer para buscadores e IA y sin un camino claro para pedir presupuesto. Le hice una web nueva con una caravana en 3D, sus modelos y un presupuesto que se envía por WhatsApp ya escrito.
              </p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="cristal rounded-2xl p-5">
                  <dt className="text-sm text-slate-400">Nota en mi auditor IA</dt>
                  <dd className="titulo-display ig-degradado mt-1 text-5xl">92/100</dd>
                </div>
                <div className="cristal rounded-2xl p-5">
                  <dt className="text-sm text-slate-400">Escáner de Cloudflare</dt>
                  <dd className="mt-2 text-lg font-semibold text-white">Nivel 3 · «Agent-Readable»</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                <Link href="/proyectos/avances-campus" className="focus-premium rounded text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-lima-300">Ver el caso completo</Link>
                <a href="https://avancescampus.andresrendon.com" target="_blank" rel="noopener" className="focus-premium inline-flex items-center gap-1 rounded text-slate-300 transition hover:text-white">Ver la web <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS PROPIOS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl border-t border-[rgba(142,166,255,.14)] pt-10">
          <h2 className="titulo-display text-5xl text-white sm:text-7xl">Lo que construyo <span className="ig-degradado">para mí</span></h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-400">Además de webs para clientes, creo mis propias herramientas. Es la mejor forma de probar lo que vendo.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {productos.map((p) => {
              const contenido = (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-lima-300">Producto propio</p>
                  <h3 className="mt-2 flex items-center justify-between gap-2 text-2xl font-semibold text-white">{p.nombre} <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400" /></h3>
                  <p className="mt-3 leading-7 text-slate-400">{p.texto}</p>
                </>
              );
              return p.externo ? (
                <a key={p.nombre} href={p.href} target="_blank" rel="noopener" className="cristal cristal-hover focus-premium block rounded-3xl p-7">{contenido}</a>
              ) : (
                <Link key={p.nombre} href={p.href} className="cristal cristal-hover focus-premium block rounded-3xl p-7">{contenido}</Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="cristal mx-auto max-w-5xl rounded-[2rem] p-8 text-center md:p-14">
          <h2 className="titulo-display text-balance text-5xl text-white sm:text-6xl">¿Hablamos de <span className="ig-degradado">tu negocio</span>?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">Empieza por la auditoría gratis o escríbeme directamente. Te respondo yo, no un bot.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/auditoria-aeo?source=sobre-mi-final">Auditoría IA gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
            <ButtonLink href={WHATSAPP} variant="secondary">Escríbeme por WhatsApp</ButtonLink>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="focus-premium mt-8 inline-block rounded text-slate-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Sígueme en Instagram: @andresrendon.ai</a>
        </div>
      </section>
    </>
  );
}
