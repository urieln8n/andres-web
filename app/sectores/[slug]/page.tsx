import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { sectors, services } from "@/lib/site-data";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

type Props = { params: { slug: string } };

const relatedServices = [
  services.find((service) => service.slug === "webs-premium-para-negocios"),
  services.find((service) => service.slug === "automatizacion-con-inteligencia-artificial"),
  services.find((service) => service.slug === "seo-local-para-negocios"),
  services.find((service) => service.slug === "software-saas-para-empresas"),
].filter(Boolean) as typeof services;

export function generateStaticParams() {
  return sectors.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props) {
  const page = sectors.find((item) => item.slug === params.slug);
  if (!page) return {};
  return createMetadata({ title: page.title, description: page.description, path: `/sectores/${page.slug}` });
}

export default function SectorPage({ params }: Props) {
  const page = sectors.find((item) => item.slug === params.slug);
  if (!page) notFound();

  const faqs = [
    { question: `¿Qué incluye el sistema digital para ${page.eyebrow.toLowerCase()}?`, answer: "Incluye una base de web premium, SEO local, rutas de captación, CTA hacia auditoría gratis y opciones de automatización según el funcionamiento real del negocio." },
    { question: "¿Se puede empezar por una auditoría?", answer: "Sí. La auditoría gratis es el primer paso para detectar bloqueos, oportunidades rápidas y prioridades antes de invertir en una implementación completa." },
    { question: "¿Qué diferencia hay entre web y sistema digital?", answer: "Una web muestra el negocio. Un sistema digital conecta propuesta, SEO, formularios, WhatsApp, seguimiento y automatización para convertir mejor." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page.title, page.description, `/sectores/${page.slug}`)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Sectores", path: "/sectores" }, { name: page.eyebrow, path: `/sectores/${page.slug}` }])),
        }}
      />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="premium-kicker text-sm">{page.eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis">Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver sistemas digitales</ButtonLink>
            </div>
          </div>
          <PremiumCard>
            <p className="text-sm text-slate-400">Diagnóstico del sector</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{page.pain}</h2>
            <p className="mt-5 text-slate-300">{page.solution}</p>
          </PremiumCard>
        </div>
      </section>

      <Section eyebrow="Beneficios" title="Qué cambia cuando el negocio deja de depender solo de mensajes manuales">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.benefits.map((item) => (
            <div key={item} className="flex gap-3 rounded-3xl border border-white/10 bg-white/[.045] p-5 text-slate-200">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Servicios conectados" title="Las piezas que suelen formar el sistema">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((service) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`}>
              <PremiumCard className="h-full transition hover:-translate-y-1 hover:bg-white/[.08]">
                <p className="text-sm text-gold">{service.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{service.h1}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{service.description}</p>
              </PremiumCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proceso" title="De auditoría gratis a sistema digital medible">
        <div className="grid gap-5 md:grid-cols-4">
          {["Auditoría gratis", "Mapa de captación", "Implementación", "Optimización"].map((item) => (
            <PremiumCard key={item}>
              <h3 className="text-xl font-semibold text-white">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">Trabajo orientado a captar clientes, automatizar procesos y vender más con prioridades claras.</p>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQs" title="Preguntas frecuentes">
        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((faq) => (
            <PremiumCard key={faq.question}>
              <h3 className="font-semibold text-white">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p>
            </PremiumCard>
          ))}
        </div>
      </Section>
    </>
  );
}
