import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { projectStudies } from "@/lib/site-data";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";
import { Section } from "@/components/section";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projectStudies.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = projectStudies.find((item) => item.slug === params.slug);
  if (!project) return {};
  return createMetadata({ title: project.title, description: project.description, path: `/proyectos/${project.slug}` });
}

export default function ProjectStudyPage({ params }: Props) {
  const project = projectStudies.find((item) => item.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Proyectos", path: "/proyectos" }, { name: project.title, path: `/proyectos/${project.slug}` }])),
        }}
      />
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="premium-kicker text-sm">{project.eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">{project.h1}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{project.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auditoria-gratis?source=project-study">Solicitar auditoría gratis <ArrowRight className="h-4 w-4" /></ButtonLink>
              <ButtonLink href="/servicios" variant="secondary">Ver servicios relacionados</ButtonLink>
            </div>
          </div>
          <div className="premium-border spotlight-panel rounded-[2rem] bg-white/[.055] p-5 shadow-premium">
            <div className="rounded-[1.5rem] border border-white/10 bg-ink/55 p-5">
              <div className="grid gap-3">
                {["Lead", "Sistema", "CRM", "Seguimiento"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
                    <span className="text-sm font-semibold text-white">{item}</span>
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-gold">{project.note}</div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Problema" title="El bloqueo comercial que resuelve">
        <PremiumCard><p className="text-lg leading-8 text-slate-200">{project.problem}</p></PremiumCard>
      </Section>

      <Section eyebrow="Solución" title="Sistema propuesto">
        <PremiumCard><p className="text-lg leading-8 text-slate-200">{project.solution}</p></PremiumCard>
      </Section>

      <Section eyebrow="Stack" title="Tecnología y piezas del sistema">
        <div className="grid gap-4 md:grid-cols-3">
          {project.stack.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/[.045] p-5 text-slate-200">{item}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Módulos" title="Módulos creados o preparados">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.modules.map((item) => (
            <PremiumCard key={item}>
              <CheckCircle2 className="mb-4 h-6 w-6 text-cyan-300" />
              <h2 className="text-xl font-semibold text-white">{item}</h2>
            </PremiumCard>
          ))}
        </div>
      </Section>

      <Section eyebrow="Resultado esperado" title="Qué debería mejorar si se implementa en un negocio real">
        <PremiumCard><p className="text-lg leading-8 text-slate-200">{project.expectedResult}</p></PremiumCard>
      </Section>

      <Section eyebrow="Enlaces internos" title="Servicios relacionados con este caso">
        <div className="grid gap-4 md:grid-cols-3">
          {project.relatedServices.map((href) => (
            <Link key={href} href={href} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-white/[.08]">
              {href.replace("/", "").replaceAll("-", " / ")}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
