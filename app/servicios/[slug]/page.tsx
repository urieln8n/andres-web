import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { services } from "@/lib/site-data";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props) {
  const page = services.find((item) => item.slug === params.slug);
  if (!page) return {};
  return createMetadata({ title: page.title, description: page.description, path: `/servicios/${page.slug}` });
}

export default function SeoDynamicPage({ params }: Props) {
  const page = services.find((item) => item.slug === params.slug);
  if (!page) notFound();
  const faqs = [
    { question: `¿Para quién es ${page.eyebrow}?`, answer: "Para negocios locales, autónomos y empresas que quieren captar mejor, ordenar sus leads y vender con una presencia digital más profesional." },
    { question: "¿Incluye estrategia y seguimiento?", answer: "Sí. La solución se plantea como sistema: presencia, captación, automatización, CRM y mejora continua según el alcance del proyecto." },
    { question: "¿Cómo empiezo?", answer: "El primer paso recomendado es solicitar una auditoría gratis para detectar prioridades reales antes de invertir." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page.title, page.description, `/servicios/${page.slug}`)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">{page.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white md:text-6xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis">{page.cta}</ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver proyectos <ArrowRight className="h-4 w-4" /></ButtonLink>
            </div>
          </div>
          <PremiumCard>
            <p className="text-sm text-slate-400">Diagnóstico rápido</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{page.pain}</h2>
            <p className="mt-5 text-slate-300">{page.solution}</p>
            {page.priceAnchor && <p className="mt-5 rounded-2xl bg-gold/10 p-4 text-sm text-gold">{page.priceAnchor}</p>}
          </PremiumCard>
        </div>
      </section>
      <Section eyebrow="Beneficios" title="Qué gana el negocio con esta solución">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {page.benefits.map((item) => (
            <div key={item} className="flex gap-3 rounded-3xl border border-white/10 bg-white/[.045] p-5 text-slate-200">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Entregables" title="Una entrega profesional, clara y preparada para crecer">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {page.deliverables.map((item) => <PremiumCard key={item}><h3 className="text-xl font-semibold text-white">{item}</h3></PremiumCard>)}
        </div>
      </Section>
      <Section eyebrow="Proceso" title="Cómo se convierte la idea en un sistema digital">
        <div className="grid gap-5 md:grid-cols-4">
          {["Auditoría", "Estrategia", "Implementación", "Optimización"].map((item) => <PremiumCard key={item}><h3 className="text-xl font-semibold text-white">{item}</h3><p className="mt-3 text-sm text-slate-300">Paso orientado a reducir riesgo, mejorar conversión y avanzar con prioridades claras.</p></PremiumCard>)}
        </div>
      </Section>
      <Section eyebrow="FAQs" title="Preguntas frecuentes">
        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((faq) => <PremiumCard key={faq.question}><h3 className="font-semibold text-white">{faq.question}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p></PremiumCard>)}
        </div>
      </Section>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[.06] p-8 text-center shadow-premium md:p-12">
          <h2 className="text-3xl font-semibold text-white">¿Quieres ver cómo se aplicaría a tu negocio?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Pide una auditoría gratis y recibirás una ruta clara para mejorar presencia digital, captación y automatización.</p>
          <div className="mt-7 flex justify-center"><ButtonLink href="/auditoria-gratis">Solicitar auditoría gratis</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
