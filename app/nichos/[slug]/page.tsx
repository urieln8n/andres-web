import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { allSeoPages, niches } from "@/lib/site-data";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return niches.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: Props) {
  const page = niches.find((item) => item.slug === params.slug);
  if (!page) return {};
  return createMetadata({ title: page.title, description: page.description, path: `/nichos/${page.slug}` });
}

export default function SeoDynamicPage({ params }: Props) {
  const page = niches.find((item) => item.slug === params.slug);
  if (!page) notFound();
  const faqs = [
    { question: `¿Esta solución sirve para ${page.eyebrow.toLowerCase()}?`, answer: "Sí. Está pensada para adaptar web, SEO, WhatsApp, reservas, CRM y automatización al funcionamiento real del negocio." },
    { question: "¿Se puede empezar solo con web?", answer: "Sí. La base puede ser una web premium y luego escalar hacia CRM, reservas, SEO o automatizaciones." },
    { question: "¿Cuál es el siguiente paso?", answer: "Solicitar una auditoría gratis para revisar situación actual, competencia y oportunidades de captación." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(page.title, page.description, `/nichos/${page.slug}`)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Nichos", path: "/nichos" }, { name: page.eyebrow, path: `/nichos/${page.slug}` }])),
        }}
      />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">{page.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white md:text-6xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{page.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis">Auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/proyectos" variant="secondary">Ver sistemas digitales</ButtonLink>
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
      <Section eyebrow="Proceso" title="Cómo se adapta al negocio">
        <div className="grid gap-5 md:grid-cols-4">
          {["Diagnóstico", "Oferta", "Sistema", "Seguimiento"].map((item) => <PremiumCard key={item}><h3 className="text-xl font-semibold text-white">{item}</h3><p className="mt-3 text-sm text-slate-300">Implementación práctica para captar, ordenar y convertir oportunidades.</p></PremiumCard>)}
        </div>
      </Section>
      <Section eyebrow="FAQs" title="Preguntas frecuentes">
        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((faq) => <PremiumCard key={faq.question}><h3 className="font-semibold text-white">{faq.question}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{faq.answer}</p></PremiumCard>)}
        </div>
      </Section>
      <Section eyebrow="Enlaces internos" title="Servicios y sectores conectados con esta oportunidad">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {allSeoPages.filter((item) => item.href !== `/nichos/${page.slug}`).slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 text-slate-200 transition hover:-translate-y-1 hover:bg-white/[.08]">
              <span className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">{item.group}</span>
              <span className="mt-3 block font-semibold text-white">{item.h1}</span>
            </Link>
          ))}
        </div>
      </Section>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[.06] p-8 text-center shadow-premium md:p-12">
          <h2 className="text-3xl font-semibold text-white">¿Quieres ver cómo se aplicaría a tu negocio?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Pide una auditoría gratis y recibirás una ruta clara para mejorar presencia digital, captación y automatización.</p>
          <div className="mt-7 flex justify-center"><ButtonLink href="/auditoria-gratis">Auditoría gratis</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
