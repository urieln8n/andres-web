import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, CalendarCheck, CheckCircle2, Database, Globe2, LineChart, MessageSquare, Rocket, Search, Sparkles, Workflow } from "lucide-react";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { DashboardPreview } from "@/components/dashboard-preview";
import { FloatingSystem3D } from "@/components/three/FloatingSystem3D";
import { sectors, services } from "@/lib/site-data";

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

const serviceIcons = [Globe2, Workflow, MessageSquare, Search, Database, Rocket, LineChart, CalendarCheck];

const projects = [
  { title: "BarberíaOS", text: "SaaS vertical para barberías con reservas, clientes, caja, QR, dashboard, marketing y automatizaciones.", href: "/proyectos/barberiaos", main: true },
  { title: "Sistemas para negocios locales", text: "Webs y embudos para restaurantes, barberías, pizzerías, limpieza, clínicas y autónomos.", href: "/proyectos/web-premium-negocio-local" },
  { title: "Automatización IA", text: "Flujos para captar, responder, clasificar y hacer seguimiento de leads desde web y WhatsApp.", href: "/proyectos/automatizacion-whatsapp" },
  { title: "CRM visual", text: "Panel para controlar oportunidades, estados, valor estimado, servicios solicitados y próximos pasos.", href: "/proyectos/crm-leads-ia" },
];

const authorityItems = ["Auditoría gratis", "Webs premium", "SEO local", "Automatizaciones IA", "Software para negocios"];

const authorityMetrics = [
  { label: "Captación 24/7", text: "Páginas, formularios y rutas de conversión siempre activos." },
  { label: "SEO preparado", text: "Arquitectura pensada para servicios, nichos y búsquedas locales." },
  { label: "CRM conectado", text: "Cada lead entra con contexto, estado y próxima acción." },
];

const trustReasons = [
  { title: "Construyo producto real", text: "No vendo solo diseño: trabajo con flujos, datos, formularios, CRM, automatización y páginas que pueden medirse." },
  { title: "Pienso como operador", text: "Cada sección responde a una pregunta comercial: qué vendes, por qué confiar, qué hacer ahora y cómo no perder el lead." },
  { title: "SEO desde arquitectura", text: "Organizo servicios, nichos, Barcelona, casos y blog para capturar intención real sin depender solo de redes sociales." },
  { title: "IA con control humano", text: "Uso IA para acelerar respuesta y seguimiento, manteniendo derivación humana cuando el negocio necesita criterio." },
];

const proofMockups = [
  ["Landing premium", "Oferta clara, CTA visible, confianza y mobile-first."],
  ["CRM de leads", "Estados, valor estimado, servicio solicitado y próxima acción."],
  ["WhatsApp + IA", "Respuesta inicial, clasificación y seguimiento sin improvisar."],
  ["SEO local", "Páginas por servicio, nicho y zona con enlaces internos."],
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

const deliverables = [
  "Arquitectura SEO",
  "Copy de conversión",
  "Web premium",
  "Formulario de auditoría",
  "CRM visual",
  "Automatización IA",
  "Dashboard comercial",
  "Plan de mejora",
];

const notFor = [
  "Negocios que solo quieren una web decorativa sin medir captación.",
  "Proyectos que no quieren aclarar oferta, precios, proceso o seguimiento.",
  "Equipos que prefieren seguir perdiendo leads en mensajes sueltos.",
];

const homeFaqs = [
  ["¿Trabajas solo con Barcelona?", "La base local está en Barcelona, pero puedo construir sistemas digitales para negocios de cualquier ciudad si el proyecto tiene sentido."],
  ["¿La auditoría gratis vende algo desde el primer minuto?", "No. Primero detecto qué falla y qué mejorar. Si hay oportunidad clara, propongo el siguiente paso."],
  ["¿BarberíaOS ya es un producto real?", "Es un SaaS vertical y caso demostrativo en construcción para mostrar cómo una barbería puede controlar reservas, clientes, caja, QR, marketing y automatización."],
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd("Auditoría gratis de sistemas digitales", "Auditoría gratis para negocios locales que quieren mejorar captación, automatización, SEO local y software a medida.", "/auditoria-gratis")),
        }}
      />
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="absolute left-1/2 top-0 h-80 w-[min(52rem,92vw)] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[8%] top-32 hidden h-72 w-72 rounded-full bg-gold/10 blur-3xl lg:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-14">
          <div className="relative z-10">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3.5 py-2 text-xs font-medium text-cyan-100 shadow-glow backdrop-blur sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="truncate">Andrés Fabián Rendón Ramírez · IA aplicada a negocios locales</span>
            </div>
            <h1 className="text-balance max-w-4xl text-[2.7rem] font-semibold leading-[.96] tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Construyo sistemas digitales con IA</span>
              <span className="premium-gradient-text block">para negocios que quieren captar más clientes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-xl sm:leading-8">
              Webs premium, SEO, automatizaciones, CRM, dashboards y chatbots para convertir visitas en clientes reales.
            </p>
            <p className="mt-5 max-w-2xl border-l border-cyan-200/30 pl-4 text-sm leading-7 text-slate-200 sm:pl-5 sm:text-base">
              No creo páginas web decorativas. Diseño sistemas digitales que captan, ordenan y convierten oportunidades comerciales.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <ButtonLink href="/auditoria-gratis?source=home-hero">Solicitar auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver sistemas creados</ButtonLink>
            </div>
            <div className="mt-9 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-300 sm:mt-10 sm:grid-cols-3">
              {["Barcelona, España", "IA aplicada a ventas", "SEO + CRM + leads"].map((item) => (
                <div key={item} className="flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
          </div>
          <FloatingSystem3D />
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="premium-border spotlight-panel mx-auto max-w-7xl rounded-[1.75rem] bg-white/[.045] p-4 shadow-premium backdrop-blur md:p-5">
          <div className="relative z-10 grid gap-4 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
            <div className="flex flex-wrap gap-2">
              {authorityItems.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {authorityMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-ink/45 p-4">
                  <p className="text-sm font-semibold text-white">{metric.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{metric.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="El problema" title="La mayoría de negocios no necesita más ruido. Necesita un sistema que convierta.">
        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
          Publican, responden mensajes y esperan resultados. Yo construyo la infraestructura para que cada visita, búsqueda y conversación tenga una ruta comercial clara.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pains.map((item, index) => <PremiumCard key={item}><p className="mb-5 text-sm font-semibold text-cyan-200">0{index + 1}</p><p className="text-slate-200">{item}</p></PremiumCard>)}
        </div>
      </Section>

      <Section eyebrow="Por qué confiar en mí" title="No trabajo la web como escaparate. La trabajo como infraestructura comercial.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustReasons.map((item) => (
            <PremiumCard key={item.title}>
              <CheckCircle2 className="mb-5 h-7 w-7 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Antes y después" title="La diferencia entre una web bonita y un sistema que captura oportunidades.">
        <div className="grid gap-5 lg:grid-cols-2">
          {beforeAfter.map(([label, title, text]) => (
            <PremiumCard key={label} className={label === "Después" ? "bg-cyan-300/[.08]" : ""}>
              <p className="text-sm font-semibold text-gold">{label}</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">{title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Método Sistema Digital 360" title="Una infraestructura comercial completa, diseñada para parecer premium y vender mejor.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {method.map((item) => (
            <PremiumCard key={item.title}>
              <item.icon className="mb-5 h-8 w-8 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gold">{item.benefit}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Servicios" title="Piezas conectadas para que tu marca digital trabaje como un equipo comercial.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Link key={service.slug} href={`/servicios/${service.slug}`} className="group">
                <PremiumCard className="h-full group-hover:bg-white/[.08]">
                  <Icon className="h-7 w-7 text-cyan-300" />
                  <p className="mt-5 text-sm font-medium text-gold">{service.eyebrow}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{service.h1}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{service.pain}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Ver servicio <ArrowRight className="h-4 w-4" /></span>
                </PremiumCard>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Sectores" title="Sistemas comerciales para mercados donde cada lead puede convertirse en caja.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <Link key={sector.slug} href={`/sectores/${sector.slug}`} className="premium-lift rounded-[1.35rem] border border-white/10 bg-white/[.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur">
              <p className="text-sm font-medium text-cyan-200">{sector.eyebrow}</p>
              <h3 className="mt-2 font-semibold text-white">{sector.h1}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Autoridad personal" title="Construyo, pruebo y vendo sistemas digitales reales.">
        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
          Trabajo en BarberíaOS, webs premium para negocios locales, automatizaciones con IA, CRM de leads, dashboards comerciales, sistemas de reservas y SEO local para captación.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.title} href={project.href} className={project.main ? "lg:row-span-2" : ""}>
              <PremiumCard className={`h-full ${project.main ? "bg-cyan-300/[.08]" : ""}`}>
                <p className="text-sm font-semibold text-gold">{project.main ? "Proyecto destacado" : "Sistema digital"}</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-slate-300">{project.text}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Ver proyecto <ArrowRight className="h-4 w-4" /></span>
              </PremiumCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Sistemas reales que estoy construyendo" title="BarberíaOS es la prueba de una idea: los negocios locales necesitan software, no solo presencia.">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <PremiumCard className="bg-cyan-300/[.08]">
            <p className="premium-kicker text-sm">BarberíaOS</p>
            <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white">Reservas, clientes, caja, QR, dashboard, marketing y automatización para barberías.</h3>
            <p className="mt-5 leading-7 text-slate-300">
              Un SaaS vertical para demostrar cómo un negocio local puede pasar de mensajes sueltos a un sistema operativo comercial con agenda, datos y seguimiento.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/casos/barberiaos">Ver caso BarberíaOS <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/nichos/software-para-barberias" variant="secondary">Software para barberías</ButtonLink>
            </div>
          </PremiumCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofMockups.map(([title, text]) => (
              <div key={title} className="premium-lift rounded-[1.35rem] border border-white/10 bg-white/[.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
                <p className="text-sm font-semibold text-cyan-200">{title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Proceso de trabajo" title="De diagnóstico a sistema digital medible.">
        <div className="grid gap-4 md:grid-cols-5">
          {workProcess.map((item, index) => (
            <PremiumCard key={item}>
              <p className="text-sm font-semibold text-cyan-200">0{index + 1}</p>
              <h3 className="mt-4 text-lg font-semibold text-white">{item}</h3>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Entregables" title="Lo que puede formar parte de un sistema serio de captación.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/[.045] p-5 font-semibold text-white">{item}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Para quién NO es" title="Prefiero proyectos con intención real de mejorar captación, no solo apariencia.">
        <div className="grid gap-5 md:grid-cols-3">
          {notFor.map((item) => (
            <PremiumCard key={item}><p className="leading-7 text-slate-200">{item}</p></PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Preguntas frecuentes" title="Dudas antes de pedir una auditoría gratis.">
        <div className="grid gap-5 md:grid-cols-3">
          {homeFaqs.map(([question, answer]) => (
            <PremiumCard key={question}>
              <h3 className="font-semibold text-white">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="CRM visual" title="Un panel comercial para saber qué oportunidades existen y cómo avanzan.">
        <DashboardPreview />
      </Section>

      <Section eyebrow="Oferta premium" title="Tu web no debe parecer un folleto. Debe comportarse como un sistema comercial.">
        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <PremiumCard>
            <Bot className="h-9 w-9 text-cyan-300" />
            <h3 className="mt-5 text-3xl font-semibold text-white">De auditoría gratis a sistema digital completo.</h3>
            <p className="mt-4 text-slate-300">Estrategia, diseño, desarrollo, SEO, automatización, CRM, dashboard, captación, analítica y optimización continua con criterio de negocio.</p>
          </PremiumCard>
          <div className="grid gap-4 sm:grid-cols-2">
          {["Auditoría gratis", "Web premium + SEO", "Sistema digital completo", "Automatización avanzada", "BarberíaOS", "Dashboard CRM comercial"].map((item) => (
              <div key={item} className="premium-lift rounded-[1.35rem] border border-white/10 bg-white/[.04] p-5 text-slate-200 backdrop-blur">{item}</div>
            ))}
          </div>
        </div>
      </Section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="premium-border spotlight-panel mx-auto max-w-6xl rounded-[2rem] bg-white/[.06] p-8 text-center shadow-premium backdrop-blur md:p-14">
          <p className="premium-kicker text-sm">Auditoría gratis</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Solicita una auditoría gratis de tu negocio.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Analizaré tu web, Instagram, WhatsApp, SEO y oportunidades de automatización para decirte cómo convertir tu presencia digital en un sistema de captación.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/auditoria-gratis">Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
