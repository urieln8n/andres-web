import Link from "next/link";
import { ArrowRight, ArrowUpRight, BrainCircuit, Check, Database, Globe2, LineChart, MessageSquare, Plus, Search, Sparkles } from "lucide-react";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { GrowthEngineLoader } from "@/components/three/GrowthEngineLoader";
import { projectStudies, sectors, services } from "@/lib/site-data";

export const metadata = createMetadata({
  path: "/",
  title: "Andrés Fabián Rendón Ramírez | IA, webs premium, SEO local y software",
  description: "Convierto negocios locales en sistemas digitales que captan clientes, automatizan procesos y venden más con IA, webs premium, SEO local y software.",
});

const pains = [
  "La web transmite presencia, pero no genera una razón clara para contactar.",
  "Los leads llegan dispersos por Instagram, WhatsApp y formularios sin seguimiento real.",
  "Cada oportunidad depende de memoria, mensajes manuales y respuestas repetidas.",
  "No existe una capa de SEO, CRM y automatización que convierta la atención en ventas.",
];

const method = [
  { icon: Globe2, title: "Presencia premium", benefit: "Confianza inmediata", text: "Diseño, copy y estructura para que el negocio parezca fuerte desde el primer vistazo." },
  { icon: Search, title: "Captación SEO", benefit: "Demanda cualificada", text: "Arquitectura por servicios, nichos y ciudad para atraer búsquedas con intención comercial." },
  { icon: BrainCircuit, title: "Automatización IA", benefit: "Respuesta rápida", text: "Flujos para formularios, WhatsApp, clasificación de leads y tareas repetitivas." },
  { icon: Database, title: "CRM y seguimiento", benefit: "Cero oportunidades perdidas", text: "Pipeline visual para saber quién pidió qué, cuánto vale y cuál es el siguiente paso." },
  { icon: LineChart, title: "Mejora continua", benefit: "Más conversión", text: "Medición, iteración y optimización para convertir la web en infraestructura comercial." },
];

const trustReasons = [
  { title: "Construyo producto real", text: "No vendo solo diseño: trabajo con flujos, datos, formularios, CRM, automatización y páginas que pueden medirse." },
  { title: "Pienso como operador", text: "Cada sección responde a una pregunta comercial: qué vendes, por qué confiar, qué hacer ahora y cómo no perder el lead." },
  { title: "SEO desde arquitectura", text: "Organizo servicios, nichos, Barcelona, casos y blog para capturar intención real sin depender solo de redes sociales." },
  { title: "IA con control humano", text: "Uso IA para acelerar respuesta y seguimiento, manteniendo derivación humana cuando el negocio necesita criterio." },
];

const beforeAfter = [
  ["Antes", "Web bonita sin captación", "Visitas sin contexto, WhatsApp desordenado, SEO invisible y leads que se enfrían."],
  ["Después", "Sistema digital con SEO, CRM, WhatsApp e IA", "Cada búsqueda, visita y mensaje entra en una ruta de conversión y seguimiento."],
];

const workProcess = [
  "Auditoría de oferta, web, SEO, WhatsApp e Instagram",
  "Mapa de captación por servicio, nicho y ciudad",
  "Diseño premium orientado a confianza y conversión",
  "Implementación con formulario, CRM, dashboard o automatización",
  "Medición y priorización de mejoras",
];

const packages = [
  {
    name: "Auditoría IA Express",
    price: "Gratis",
    label: "Punto de entrada",
    description: "Revisión de web, SEO, WhatsApp e Instagram con diagnóstico claro y prioridades accionables.",
    features: ["Diagnóstico web completo", "Revisión SEO", "Análisis WhatsApp", "Oportunidades rápidas", "Plan de mejora"],
    cta: "Solicitar ahora",
    href: "/auditoria-gratis",
    featured: false,
  },
  {
    name: "Demo Growth",
    price: "desde 149€",
    label: "Validación rápida",
    description: "Demo visual de tu sistema digital: web, automatización o CRM para validar antes de invertir.",
    features: ["Demo interactiva", "Copy comercial", "Estructura SEO básica", "CTA optimizados", "Revisión mobile"],
    cta: "Solicitar auditoría",
    href: "/auditoria-gratis",
    featured: false,
  },
  {
    name: "Web Premium Local",
    price: "desde 790€",
    label: "Presencia fuerte",
    description: "Web premium mobile-first con SEO local, formulario de captación y WhatsApp integrado.",
    features: ["Diseño premium", "SEO técnico completo", "Formulario de leads", "WhatsApp integrado", "Mobile-first"],
    cta: "Solicitar auditoría",
    href: "/auditoria-gratis",
    featured: false,
  },
  {
    name: "Sistema Digital 360 IA",
    price: "desde 1.500€",
    label: "Más completo",
    description: "Sistema completo: web, WhatsApp IA, automatizaciones, CRM, SEO local y dashboard comercial.",
    features: ["Web + SEO local", "WhatsApp con IA", "CRM y pipeline", "Automatizaciones", "Dashboard comercial", "Seguimiento de oportunidades"],
    cta: "Solicitar auditoría",
    href: "/auditoria-gratis",
    featured: true,
  },
  {
    name: "Mantenimiento IA",
    price: "desde 97€/mes",
    label: "Continuidad",
    description: "Seguimiento mensual, mejoras continuas, soporte técnico y automatizaciones activas.",
    features: ["Soporte técnico", "Mejoras continuas", "Monitorización", "Automatizaciones activas", "Informe mensual"],
    cta: "Solicitar auditoría",
    href: "/auditoria-gratis",
    featured: false,
  },
];

const homeFaqs = [
  ["¿Trabajas solo con Barcelona?", "La base local está en Barcelona, pero puedo construir sistemas digitales para negocios de cualquier ciudad si el proyecto tiene sentido."],
  ["¿La auditoría gratis vende algo desde el primer minuto?", "No. Primero detecto qué falla y qué mejorar. Si hay oportunidad clara, propongo el siguiente paso."],
  ["¿BarberíaOS ya es un producto real?", "Es un SaaS vertical y caso demostrativo en construcción para mostrar cómo una barbería puede controlar reservas, clientes, caja, QR, marketing y automatización."],
];

const bento = [
  { slug: "webs-premium-para-negocios", icon: Globe2, titulo: "Webs premium y 3D", grande: true },
  { slug: "chatbot-whatsapp-ia", icon: MessageSquare, titulo: "WhatsApp con IA" },
  { slug: "seo-local-para-negocios", icon: Search, titulo: "SEO local + AEO" },
  { slug: "automatizacion-con-inteligencia-artificial", icon: BrainCircuit, titulo: "Automatización IA" },
  { slug: "crm-para-negocios-locales", icon: Database, titulo: "CRM y pipeline" },
  { slug: "software-saas-para-empresas", icon: LineChart, titulo: "Software a medida" },
];

const marquesina = ["Webs 3D", "IA", "AEO", "SEO local", "WhatsApp", "CRM", "Automatización", "Software"];

export default function HomePage() {
  const servicioPorSlug = new Map(services.map((s) => [s.slug, s]));
  const proyectos = projectStudies.slice(0, 3);

  return (
    <>
      <GrowthEngineLoader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd("Auditoría gratis de sistemas digitales", "Auditoría gratis para negocios locales que quieren mejorar captación, automatización, SEO local y software a medida.", "/auditoria-gratis")),
        }}
      />

      {/* HERO */}
      <section className="relative px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-14 lg:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[.14em] text-slate-300 backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lima-300 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-lima-300" /></span>
              Barcelona · IA aplicada a ventas
            </p>
            <h1 className="titulo-display text-balance mt-7 text-[3.1rem] text-white sm:text-7xl lg:text-[6.4rem]">
              Sistemas digitales <span className="text-lima-300">con IA</span> que <span className="contorno">venden</span> por ti.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Webs premium, WhatsApp con IA, SEO local, AEO y CRM para negocios locales que quieren convertir visitas de Google, Instagram y ChatGPT en clientes reales.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-aeo">¿Te ve ChatGPT? Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver proyectos</ButtonLink>
            </div>
          </div>

          <div className="relative h-[280px] sm:h-[380px] lg:h-full lg:min-h-[520px]">
            <a href="/auditoria-aeo" className="group absolute right-0 top-2 rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 backdrop-blur-md transition hover:border-lima-300/50 lg:right-4 lg:top-8">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-slate-400">Mi web · auditoría AEO</p>
              <p className="mt-1 flex items-baseline gap-1 text-4xl font-semibold tracking-tight text-white">88<span className="text-base text-slate-500">/100</span><ArrowUpRight className="ml-1 h-4 w-4 self-center text-lima-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></p>
            </a>
            <div className="absolute bottom-2 left-0 rounded-2xl border border-white/10 bg-ink/60 px-5 py-4 backdrop-blur-md lg:bottom-10 lg:left-4">
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-lima-300">Motor de crecimiento</p>
              <p className="mt-1 text-sm text-slate-200">Web · IA · AEO · SEO · WhatsApp · CRM</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            ["01", "Te encuentran", "Google, mapas y respuestas de ChatGPT."],
            ["02", "Te escriben", "Web y WhatsApp que responden al momento."],
            ["03", "Te compran", "Cada lead en el CRM con su siguiente paso."],
          ].map(([n, t, d]) => (
            <div key={n} className="bg-ink/85 p-5 backdrop-blur">
              <p className="font-mono text-xs text-lima-300">{n}</p>
              <p className="mt-2 font-semibold tracking-tight text-white">{t}</p>
              <p className="mt-1 text-sm text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUESINA */}
      <div aria-hidden="true" className="relative overflow-hidden border-y border-white/10 bg-ink/60 py-6 backdrop-blur">
        <div className="flex w-max animate-marquesina items-center gap-10 whitespace-nowrap">
          {[...marquesina, ...marquesina].map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-5xl font-semibold tracking-tighter sm:text-7xl">
              <span className={i % 2 ? "contorno" : "text-white"}>{m}</span>
              <Sparkles className="h-7 w-7 text-lima-300" />
            </span>
          ))}
        </div>
      </div>

      {/* PROBLEMA */}
      <Section numero="01" eyebrow="El problema" title="No necesitas más ruido. Necesitas un sistema que convierta.">
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
          <div />
          <div>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              Publicas, respondes mensajes y esperas resultados. Yo construyo la infraestructura para que cada visita, búsqueda y conversación tenga una ruta comercial clara.
            </p>
            <ol className="mt-12 border-b border-white/10">
              {pains.map((item, index) => (
                <li key={item} className="group grid gap-3 border-t border-white/10 py-7 transition sm:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-slate-500 transition group-hover:text-lima-300">0{index + 1}</span>
                  <span className="text-xl leading-snug tracking-tight text-slate-200 transition group-hover:text-white sm:text-2xl">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* SERVICIOS · BENTO */}
      <Section numero="02" eyebrow="Servicios" title="Piezas conectadas que trabajan como un equipo comercial.">
        <div className="grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bento.map((b) => {
            const s = servicioPorSlug.get(b.slug);
            if (!s) return null;
            return (
              <Link
                key={b.slug}
                href={`/servicios/${b.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border p-7 transition duration-500 hover:-translate-y-1 ${
                  b.grande ? "border-lima-300/40 bg-lima-300 text-ink md:col-span-2 md:row-span-2" : "border-white/[.08] bg-[#0f0f0f]/90 text-white hover:border-lima-300/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <b.icon className={`h-7 w-7 ${b.grande ? "text-ink" : "text-lima-300"}`} />
                  <ArrowUpRight className={`h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${b.grande ? "text-ink" : "text-slate-500 group-hover:text-lima-300"}`} />
                </div>
                <div>
                  <p className={`font-mono text-[11px] uppercase tracking-[.14em] ${b.grande ? "text-ink/60" : "text-slate-500"}`}>{s.eyebrow}</p>
                  <h3 className={`mt-3 font-semibold tracking-tight ${b.grande ? "titulo-display text-5xl sm:text-6xl" : "text-2xl"}`}>{b.titulo}</h3>
                  <p className={`mt-4 leading-relaxed ${b.grande ? "max-w-md text-lg text-ink/75" : "text-sm text-slate-400"}`}>{s.pain}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* PROYECTOS */}
      <Section numero="03" eyebrow="Proyectos" title="Construyo, pruebo y publico sistemas reales.">
        <div className="grid gap-4 lg:grid-cols-3">
          {proyectos.map((p, i) => (
            <Link key={p.slug} href={`/proyectos/${p.slug}`} className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/[.08] bg-[#0f0f0f]/90 p-7 transition duration-500 hover:-translate-y-1 hover:border-lima-300/40 ${i === 0 ? "lg:col-span-2" : ""}`}>
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lima-300/[.06] blur-3xl transition duration-700 group-hover:bg-lima-300/[.14]" />
              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[.14em] text-slate-400">{p.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-lima-300" />
              </div>
              <div className="relative">
                <h3 className={`titulo-display text-white ${i === 0 ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"}`}>{p.h1}</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">{p.solution}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.slice(0, 4).map((t) => <span key={t} className="rounded-full bg-white/[.05] px-3 py-1 text-xs text-slate-300">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* MÉTODO */}
      <Section numero="04" eyebrow="Método 360" title="De diagnóstico a sistema digital medible.">
        <div className="border-b border-white/10">
          {method.map((m, i) => (
            <div key={m.title} className="group grid items-start gap-4 border-t border-white/10 py-8 transition md:grid-cols-[14rem_1fr_1fr] md:gap-10">
              <span className="titulo-display text-6xl text-white/10 transition duration-500 group-hover:text-lima-300 md:text-7xl">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{m.title}</h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[.14em] text-lima-300">{m.benefit}</p>
              </div>
              <p className="leading-relaxed text-slate-400 md:pt-1">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ANTES / DESPUÉS */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          {beforeAfter.map(([label, title, text]) => {
            const despues = label === "Después";
            return (
              <div key={label} className={`rounded-[1.75rem] p-8 sm:p-12 ${despues ? "bg-lima-300 text-ink" : "border border-white/[.08] bg-[#0f0f0f]/90 text-white"}`}>
                <p className={`font-mono text-xs uppercase tracking-[.16em] ${despues ? "text-ink/60" : "text-slate-500"}`}>{label}</p>
                <h3 className={`titulo-display mt-6 text-4xl sm:text-5xl ${despues ? "" : "text-slate-300 line-through decoration-white/20 decoration-2"}`}>{title}</h3>
                <p className={`mt-6 max-w-lg leading-relaxed ${despues ? "text-ink/75" : "text-slate-500"}`}>{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* POR QUÉ */}
      <Section numero="05" eyebrow="Por qué confiar" title="No trabajo la web como escaparate. La trabajo como infraestructura.">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {trustReasons.map((t) => (
            <div key={t.title} className="bg-ink/90 p-7 backdrop-blur">
              <Check className="h-5 w-5 text-lima-300" />
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PRECIOS */}
      <Section numero="06" eyebrow="Precios" title="Elige el sistema que encaja con tu momento.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`flex flex-col rounded-[1.75rem] p-7 transition duration-500 hover:-translate-y-1 ${pkg.featured ? "bg-lima-300 text-ink lg:row-span-2" : "border border-white/[.08] bg-[#0f0f0f]/90 text-white hover:border-white/20"}`}>
              <div className="flex items-center justify-between gap-2">
                <p className={`font-mono text-[11px] uppercase tracking-[.14em] ${pkg.featured ? "text-ink/60" : "text-slate-500"}`}>{pkg.label}</p>
                {pkg.featured && <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-lima-300">Recomendado</span>}
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{pkg.name}</h3>
              <p className="titulo-display mt-2 text-5xl">{pkg.price}</p>
              <p className={`mt-4 text-sm leading-relaxed ${pkg.featured ? "text-ink/75" : "text-slate-400"}`}>{pkg.description}</p>
              <ul className="mt-6 grid gap-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${pkg.featured ? "text-ink/85" : "text-slate-300"}`}>
                    <Check className={`h-4 w-4 shrink-0 ${pkg.featured ? "text-ink" : "text-lima-300"}`} />{f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                {pkg.featured ? (
                  <Link href={`${pkg.href}?paquete=${encodeURIComponent(pkg.name)}`} className="focus-premium inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white transition hover:bg-black">
                    {pkg.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <ButtonLink href={`${pkg.href}?paquete=${encodeURIComponent(pkg.name)}`} variant="secondary" className="w-full">
                    {pkg.cta} <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[.14em] text-slate-500">Precios orientativos · el presupuesto final se define tras la auditoría gratuita</p>
      </Section>

      {/* SECTORES + FAQ */}
      <Section numero="07" eyebrow="Sectores y dudas" title="Para negocios donde cada lead puede convertirse en caja.">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-wrap content-start gap-2.5">
            {sectors.map((sector) => (
              <Link key={sector.slug} href={`/sectores/${sector.slug}`} className="rounded-full border border-white/10 bg-white/[.03] px-4 py-2.5 text-sm text-slate-300 transition hover:border-lima-300/50 hover:text-white">
                {sector.eyebrow}
              </Link>
            ))}
          </div>
          <div className="border-b border-white/10">
            {homeFaqs.map(([q, a]) => (
              <details key={q} className="group border-t border-white/10 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight text-white [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-lima-300 transition duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-4 max-w-xl leading-relaxed text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <section className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0c0c]/90 px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="pointer-events-none absolute left-1/2 top-full h-[30rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lima-300/[.12] blur-3xl" />
          <p className="premium-kicker relative text-xs">Auditoría gratis</p>
          <h2 className="titulo-display relative mx-auto mt-6 max-w-4xl text-5xl text-white sm:text-7xl lg:text-8xl">
            ¿Hablamos de tu <span className="text-lima-300">próximo cliente</span>?
          </h2>
          <p className="relative mx-auto mt-6 max-w-xl text-slate-400">
            Analizo tu web, Instagram, WhatsApp, SEO y cómo te ve ChatGPT, y te digo qué cambiar para captar más.
          </p>
          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/auditoria-aeo">Auditoría AEO al instante <ArrowRight className="h-4 w-4" /></ButtonLink>
            <ButtonLink href="/auditoria-gratis" variant="secondary">Auditoría completa</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
