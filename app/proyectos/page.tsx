import { createMetadata } from "@/lib/seo";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Proyectos y sistemas digitales | Andrés Rendón",
  description: "Proyectos de software, BarberíaOS, demos premium, automatizaciones y sistemas digitales para negocios.",
  path: "/proyectos",
});

const projects = [
  { title: "BarberíaOS", tag: "SaaS vertical", text: "Sistema para barberías con reservas, clientes, barberos, caja, QR, marketing y dashboard." },
  { title: "Demos premium para negocios", tag: "Ventas B2B", text: "Webs HTML/Next.js para presentar propuestas de alto valor a restaurantes, pizzerías y servicios locales." },
  { title: "Automatizaciones IA", tag: "Operaciones", text: "Flujos con WhatsApp, CRM, formularios, webhooks y seguimiento comercial." },
];

export default function ProjectsPage() {
  return (
    <Section eyebrow="Proyectos" title="Sistemas y demos pensados para vender soluciones reales.">
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <PremiumCard key={project.title}>
            <p className="text-sm text-gold">{project.tag}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{project.title}</h2>
            <p className="mt-4 text-slate-300">{project.text}</p>
          </PremiumCard>
        ))}
      </div>
    </Section>
  );
}
