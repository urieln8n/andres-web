import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createMetadata, faqJsonLd, INSTAGRAM_URL } from "@/lib/seo";
import { ButtonLink } from "@/components/button-link";
import { HeroAbanico } from "@/components/home/hero-abanico";
import { projectStudies } from "@/lib/site-data";

export const metadata = createMetadata({
  path: "/",
  title: "Andrés Rendón | Webs 3D para negocios de Barcelona",
  description: "Diseño y construyo webs 3D para negocios de Barcelona, preparadas para que te encuentren Google y ChatGPT y para que el cliente te escriba por WhatsApp.",
});

const etiqueta = { real: "Cliente", propuesta: "Propuesta", producto: "Producto propio", demo: "Demo" } as const;

const queHago = [
  { titulo: "Webs que se recuerdan", texto: "Webs 3D o editoriales, rápidas y pensadas primero para el móvil. Tu producto, tu local o tu oficio en el centro." },
  { titulo: "Que te encuentren", texto: "SEO local y AEO: tu negocio bien explicado para Google, Maps y las respuestas de ChatGPT, Perplexity o Gemini." },
  { titulo: "Que te escriban", texto: "Un asistente con IA en tu web, como el de abajo a la derecha, y WhatsApp con el mensaje ya escrito. Cada contacto, ordenado en un CRM." },
];

const precios = [
  { nombre: "Web premium", detalle: "Web a medida con SEO local, WhatsApp y formulario", precio: "desde 790 €" },
  { nombre: "Sistema completo", detalle: "Web, asistente o WhatsApp con IA, CRM y automatizaciones", precio: "desde 1.500 €" },
  { nombre: "Mantenimiento", detalle: "Cambios, mejoras y soporte cada mes", precio: "desde 97 €/mes" },
];

const preguntas = [
  { question: "¿Trabajas solo en Barcelona?", answer: "Trabajo sobre todo con negocios de Barcelona y alrededores, pero todo se puede hacer en remoto." },
  { question: "¿Qué incluye la auditoría gratis?", answer: "Reviso tu web, tu ficha de Google, tu WhatsApp y cómo te ven los asistentes de IA, y te digo qué cambiar primero." },
  { question: "¿Cuánto tarda una web?", answer: "Depende del alcance. Antes de empezar te enseño una demo de tu propia web para que decidas con algo real delante." },
];

export default function HomePage() {
  const destacados = projectStudies.filter((p) => p.image && p.url);
  const abanico = destacados.map((p) => ({ src: p.image!, alt: p.title, movil: p.imageKind === "movil" }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(preguntas)) }} />

      {/* PORTADA */}
      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-slate-400">Andrés Rendón, Barcelona</p>
          <h1 className="titulo-display mt-5 max-w-5xl text-balance text-[3.4rem] text-white sm:text-8xl lg:text-[7.4rem]">
            Webs que tus clientes recuerdan.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Diseño y construyo webs 3D para negocios de Barcelona. Las preparo para que te encuentren Google y ChatGPT, y para que el cliente te escriba por WhatsApp en un toque.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#proyectos">Ver proyectos</ButtonLink>
              <ButtonLink href="/auditoria-gratis" variant="secondary">Auditoría gratis</ButtonLink>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-8">
          <HeroAbanico piezas={abanico} />
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-10">
            <h2 className="titulo-display text-5xl text-white sm:text-7xl">Proyectos <span className="text-slate-600">{destacados.length}</span></h2>
            <p className="max-w-md text-slate-400">Webs publicadas para negocios reales, propuestas y productos propios. Cada uno dice lo que es.</p>
          </div>

          <div className="mt-16 grid gap-24 lg:gap-0">
            {destacados.map((p, i) => {
              const estado = p.status ?? "real";
              const movil = p.imageKind === "movil";
              return (
                <article key={p.slug} className="pila__carta">
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                  <a href={p.url} target="_blank" rel="noopener" className={`group block ${i % 2 ? "lg:order-2" : ""} ${movil ? "lg:col-span-5 justify-self-center" : "lg:col-span-8"}`} aria-label={`Abrir la web de ${p.h1.split(":")[0]}`}>
                    {movil ? (
                      <div className="marco-movil relative aspect-[9/16] w-56 transition duration-500 group-hover:-translate-y-1 sm:w-64">
                        <Image src={p.image!} alt="" fill sizes="16rem" className="object-cover object-top" />
                      </div>
                    ) : (
                      <div className="marco transition duration-500 group-hover:-translate-y-1">
                        <div className="marco__barra"><span /><span /><span /></div>
                        <div className="relative aspect-[16/10]">
                          <Image src={p.image!} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-top" />
                        </div>
                      </div>
                    )}
                  </a>
                  <div className={`${movil ? "lg:col-span-7" : "lg:col-span-4"}`}>
                    <p className="text-sm text-lima-300">{etiqueta[estado]}</p>
                    <h3 className="titulo-display mt-3 text-4xl text-white sm:text-5xl">{p.h1.split(":")[0]}</h3>
                    <p className="mt-4 leading-7 text-slate-400">{p.h1.includes(":") ? p.h1.split(":").slice(1).join(":").trim().replace(/^./, (c) => c.toUpperCase()) + "." : p.description}</p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                      <Link href={`/proyectos/${p.slug}`} className="focus-premium rounded text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-lima-300">Ver el caso</Link>
                      <a href={p.url} target="_blank" rel="noopener" className="focus-premium inline-flex items-center gap-1 rounded text-slate-300 transition hover:text-white">
                        {estado === "producto" ? "Abrir" : "Ver la web"} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-20">
            <Link href="/proyectos" className="focus-premium rounded text-slate-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Todos los proyectos y prototipos</Link>
          </div>
        </div>
      </section>

      {/* QUÉ HAGO */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-10">
          <h2 className="titulo-display text-5xl text-white sm:text-7xl">Qué hago</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {queHago.map((q) => (
              <div key={q.titulo}>
                <h3 className="text-2xl font-semibold tracking-tight text-white">{q.titulo}</h3>
                <p className="mt-3 leading-7 text-slate-400">{q.texto}</p>
              </div>
            ))}
          </div>
          <Link href="/servicios" className="focus-premium mt-12 inline-block rounded text-slate-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Ver todos los servicios</Link>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="titulo-display text-5xl text-white sm:text-7xl">Precios</h2>
            <p className="mt-5 max-w-sm leading-7 text-slate-400">Orientativos. El presupuesto final sale de la auditoría, que es gratis.</p>
          </div>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {precios.map((p) => (
              <div key={p.nombre} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                <dt>
                  <span className="block text-xl font-semibold text-white">{p.nombre}</span>
                  <span className="mt-1 block text-sm text-slate-400">{p.detalle}</span>
                </dt>
                <dd className="titulo-display text-3xl text-white sm:text-4xl">{p.precio}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PREGUNTAS */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y divide-white/10 border-y border-white/10">
          {preguntas.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="focus-premium flex cursor-pointer list-none items-center justify-between gap-6 rounded text-lg font-medium text-white">
                {f.question}
                <span className="text-2xl font-light text-slate-500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-slate-400">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CIERRE */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <h2 className="titulo-display max-w-5xl text-balance text-6xl text-white sm:text-8xl lg:text-[8rem]">¿Tu negocio es el siguiente?</h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">Te reviso la web, la ficha de Google y cómo te ve ChatGPT, y te enseño qué cambiaría. Gratis y sin compromiso.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/auditoria-gratis">Pedir la auditoría gratis</ButtonLink>
            <ButtonLink href="/contacto" variant="secondary">Escribirme</ButtonLink>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="focus-premium mt-8 inline-block rounded text-slate-300 underline decoration-white/30 underline-offset-4 transition hover:text-white">Sígueme en Instagram: @andresrendon.ai</a>
        </div>
      </section>
    </>
  );
}
