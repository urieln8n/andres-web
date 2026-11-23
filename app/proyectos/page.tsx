import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";
import { projectStudies } from "@/lib/site-data";

export const metadata = createMetadata({
  title: "Proyectos y sistemas digitales | Andrés Rendón",
  description: "Webs 3D publicadas para negocios de Barcelona (La Casa de Jenni, Avancés Campus), propuestas, la app Lumbrera, BarberíaOS y sistemas digitales para negocios.",
  path: "/proyectos",
});

const etiquetas = { real: "Cliente", propuesta: "Propuesta", producto: "Producto propio", demo: "Demo" } as const;

export default function ProjectsPage() {
  return (
    <Section eyebrow="Proyectos" title="Webs publicadas, propuestas y prototipos de sistemas digitales.">
      <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
        Webs publicadas para negocios reales, propuestas enseñadas a negocios, productos propios y prototipos. Cada proyecto dice qué es: no presento una propuesta como cliente ni invento métricas.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {projectStudies.map((project) => (
          <Link key={project.slug} href={`/proyectos/${project.slug}`}>
            <PremiumCard className="h-full transition hover:-translate-y-1 hover:bg-white/[.08]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[.14em] text-slate-300">{etiquetas[project.status ?? (project.url ? "real" : "demo")]}</span>
              <p className="text-sm text-gold">{project.eyebrow}</p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
            <p className="mt-4 text-slate-300">{project.description}</p>
          </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
