import { ArrowRight, Bot, BrainCircuit, CheckCircle2, Database, Globe2, Search } from "lucide-react";
import { createMetadata, personJsonLd } from "@/lib/seo";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

export const metadata = createMetadata({
  title: "Sobre Andrés Fabián Rendón Ramírez | Consultor IA para negocios locales",
  description: "Quién es Andrés Fabián Rendón Ramírez: consultor IA, automatización, webs premium, SEO local, CRM, dashboards y BarberíaOS en Barcelona.",
  path: "/sobre-mi",
});

const pillars = [
  { icon: Globe2, title: "Webs premium", text: "Diseño interfaces claras, rápidas y elegantes que transmiten confianza y guían hacia contacto real." },
  { icon: Search, title: "SEO local", text: "Construyo arquitectura de páginas por servicio, nicho y ciudad para captar demanda con intención comercial." },
  { icon: BrainCircuit, title: "IA y automatización", text: "Uso IA para responder, clasificar, recordar y reducir trabajo manual sin perder control humano." },
  { icon: Database, title: "CRM y dashboards", text: "Ordeno oportunidades, estados, valor estimado, próximos pasos y métricas para vender con más control." },
];

const vision = [
  "Los negocios locales no compiten solo por precio: compiten por confianza, velocidad y seguimiento.",
  "Una web premium debe explicar la oferta, captar el lead y conectarse a una operación comercial.",
  "La IA tiene sentido cuando responde mejor, ordena datos y permite que el dueño tome decisiones con menos ruido.",
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="premium-kicker text-sm">Sobre mí</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Soy Andrés Fabián Rendón Ramírez y construyo sistemas digitales para negocios que quieren captar mejor.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Trabajo en la intersección entre diseño premium, SEO local, automatización con IA, CRM, dashboards y producto SaaS. Mi foco es ayudar a negocios locales, autónomos y empresas a dejar de depender de mensajes sueltos y convertir su presencia digital en un sistema comercial.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis?source=sobre-mi">Solicitar auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/casos/barberiaos" variant="secondary">Ver BarberíaOS</ButtonLink>
            </div>
          </div>
          <PremiumCard className="bg-cyan-300/[.06]">
            <Bot className="h-10 w-10 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-semibold text-white">Qué construyo</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Webs premium, sistemas de reservas, CRM visuales, automatizaciones WhatsApp, dashboards comerciales, páginas SEO y SaaS verticales como BarberíaOS.
            </p>
          </PremiumCard>
        </div>
      </section>

      <Section eyebrow="Por qué IA, web y SEO" title="Porque captar clientes ya no depende de una sola pieza.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item) => (
            <PremiumCard key={item.title}>
              <item.icon className="mb-5 h-8 w-8 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="BarberíaOS" title="Un SaaS vertical para demostrar cómo puede operar un negocio local con sistema propio.">
        <div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
          <PremiumCard>
            <h2 className="text-3xl font-semibold text-white">Qué es BarberíaOS</h2>
            <p className="mt-4 leading-7 text-slate-300">
              BarberíaOS es un sistema para barberías con reservas, clientes, caja, QR, dashboard, marketing y automatizaciones. Lo uso como prueba real de una tesis: un negocio local puede funcionar con tecnología propia, no solo con Instagram y WhatsApp.
            </p>
          </PremiumCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Reservas", "Clientes", "Caja", "QR", "Dashboard", "Automatizaciones"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[.045] p-5 text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Visión" title="Ayudar a negocios locales a competir con sistemas digitales, no con improvisación.">
        <div className="grid gap-5 md:grid-cols-3">
          {vision.map((item) => (
            <PremiumCard key={item}><p className="leading-7 text-slate-200">{item}</p></PremiumCard>
          ))}
        </div>
      </Section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="premium-border spotlight-panel mx-auto max-w-5xl rounded-[2rem] bg-white/[.06] p-8 text-center shadow-premium md:p-12">
          <p className="premium-kicker text-sm">Auditoría gratis</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">Te digo qué mejorar primero para captar más clientes sin gastar a ciegas.</h2>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/auditoria-gratis?source=sobre-mi-final">Solicitar auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
