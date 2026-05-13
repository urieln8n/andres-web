import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, CalendarCheck, CheckCircle2, Database, Globe2, LineChart, MessageSquare, Rocket, Search, Sparkles, Workflow } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { DashboardPreview } from "@/components/dashboard-preview";
import { FloatingSystem3D } from "@/components/three/FloatingSystem3D";
import { niches, services } from "@/lib/site-data";

export const metadata = createMetadata({
  path: "/",
  title: "Andrés Rendón | IA, SEO, automatización y sistemas digitales",
  description: "Web personal premium de Andrés Rendón: webs premium, SEO local, CRM, chatbots, dashboards, automatización con IA y sistemas de captación para negocios.",
});

const pains = [
  "Webs que se ven correctas, pero no convierten visitas en contactos.",
  "Instagram sin sistema comercial, sin seguimiento y sin medición.",
  "WhatsApp saturado con preguntas repetidas y leads que se enfrían.",
  "Sin SEO local, sin dashboard y sin automatización para escalar.",
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
  { title: "BarberíaOS", text: "SaaS vertical para barberías con reservas, agenda, clientes, caja, QR, dashboard, marketing y automatizaciones.", href: "/nichos/software-para-barberias", main: true },
  { title: "CRM de leads", text: "Pipeline comercial para auditar, priorizar y cerrar oportunidades de servicios digitales.", href: "/dashboard" },
  { title: "Demos premium", text: "Experiencias comerciales para restaurantes, barberías, pizzerías y empresas locales.", href: "/proyectos" },
  { title: "Automatizaciones IA", text: "Conexión entre web, WhatsApp, formularios, n8n, Supabase y seguimiento.", href: "/servicios/automatizacion-con-inteligencia-artificial" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-glow backdrop-blur">
              <Sparkles className="h-4 w-4 text-gold" />
              Web personal premium + IA + SEO + automatización
            </div>
            <h1 className="text-balance max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Construyo sistemas digitales con IA para negocios que quieren captar más clientes.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Webs premium, automatizaciones, SEO, dashboards, chatbots y sistemas de captación para convertir visitantes en clientes reales.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis">Solicitar auditoría gratis</ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver proyectos <ArrowRight className="h-4 w-4" /></ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {["Barcelona, España", "IA aplicada a ventas", "SEO + CRM + leads"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {item}
                </div>
              ))}
            </div>
          </div>
          <FloatingSystem3D />
        </div>
      </section>

      <Section eyebrow="El problema" title="Muchos negocios tienen presencia online, pero no tienen un sistema.">
        <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
          Publican, responden mensajes y esperan resultados. Yo construyo la infraestructura para captar, ordenar y convertir oportunidades.
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pains.map((item) => <PremiumCard key={item}><p className="text-slate-200">{item}</p></PremiumCard>)}
        </div>
      </Section>

      <Section eyebrow="Método Sistema Digital 360" title="Una infraestructura comercial completa, no una página aislada.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {method.map((item) => (
            <PremiumCard key={item.title} className="transition duration-300 hover:-translate-y-1">
              <item.icon className="mb-5 h-8 w-8 text-cyan-300" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold text-gold">{item.benefit}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Servicios" title="Servicios para transformar presencia digital en captación y ventas.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Link key={service.slug} href={`/servicios/${service.slug}`} className="group">
                <PremiumCard className="h-full transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/[.08]">
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

      <Section eyebrow="Nichos" title="Sistemas comerciales para negocios locales con intención real de compra.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {niches.map((niche) => (
            <Link key={niche.slug} href={`/nichos/${niche.slug}`} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 transition hover:-translate-y-0.5 hover:bg-white/[.08]">
              <p className="text-sm text-cyan-200">{niche.eyebrow}</p>
              <h3 className="mt-2 font-semibold text-white">{niche.h1}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proyectos" title="BarberíaOS y sistemas digitales preparados para vender servicios de alto valor.">
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.title} href={project.href} className={project.main ? "lg:row-span-2" : ""}>
              <PremiumCard className={`h-full transition hover:-translate-y-1 ${project.main ? "bg-cyan-300/[.08]" : ""}`}>
                <p className="text-sm font-semibold text-gold">{project.main ? "Proyecto destacado" : "Sistema digital"}</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 text-slate-300">{project.text}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Ver proyecto <ArrowRight className="h-4 w-4" /></span>
              </PremiumCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="CRM visual" title="Un panel comercial para saber qué oportunidades existen y cómo avanzan.">
        <DashboardPreview />
      </Section>

      <Section eyebrow="Oferta premium" title="Tu web no debe ser un folleto. Debe ser un sistema comercial.">
        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <PremiumCard>
            <Bot className="h-9 w-9 text-cyan-300" />
            <h3 className="mt-5 text-3xl font-semibold text-white">De auditoría gratis a sistema digital completo.</h3>
            <p className="mt-4 text-slate-300">Estrategia, diseño, desarrollo, SEO, automatización, CRM, dashboard, captación, analítica y optimización continua.</p>
          </PremiumCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Auditoría digital gratis", "Web premium + SEO", "Sistema digital completo", "Automatización avanzada", "SaaS o sistema privado", "Dashboard CRM comercial"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 text-slate-200">{item}</div>
            ))}
          </div>
        </div>
      </Section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="premium-border mx-auto max-w-6xl rounded-[2rem] bg-white/[.06] p-8 text-center shadow-premium backdrop-blur md:p-14">
          <p className="premium-kicker text-sm">Auditoría gratis</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Solicita una auditoría gratis de tu negocio.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Analizaré tu web, Instagram, WhatsApp, SEO y oportunidades de automatización para decirte cómo convertir tu presencia digital en un sistema de captación.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/auditoria-gratis">Quiero mi auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
