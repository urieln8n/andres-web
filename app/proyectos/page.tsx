import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";
import { projectStudies } from "@/lib/site-data";

export const metadata = createMetadata({
  title: "Proyectos y sistemas digitales | Andrés Rendón",
  description: "Proyectos de software, BarberíaOS, demos premium, automatizaciones y sistemas digitales para negocios.",
  path: "/proyectos",
});

export default function ProjectsPage() {
  return (
    <Section eyebrow="Proyectos" title="Casos de estudio y prototipos comerciales de sistemas digitales.">
      <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
        Proyectos pensados para demostrar cómo una web, un CRM, una automatización o un SaaS pueden convertirse en infraestructura comercial. Cuando no hay métricas reales, se indica como caso demostrativo o resultado esperado.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {projectStudies.map((project) => (
          <Link key={project.slug} href={`/proyectos/${project.slug}`}>
            <PremiumCard className="h-full transition hover:-translate-y-1 hover:bg-white/[.08]">
            <p className="text-sm text-gold">{project.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
            <p className="mt-4 text-slate-300">{project.description}</p>
          </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
