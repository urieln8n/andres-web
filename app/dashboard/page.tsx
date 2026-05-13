import { createMetadata } from "@/lib/seo";
import { DashboardPreview } from "@/components/dashboard-preview";
import { Section } from "@/components/section";

export const metadata = createMetadata({
  title: "Dashboard CRM | Andrés Rendón",
  description: "Dashboard privado visual para gestionar leads y oportunidades comerciales.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <Section eyebrow="CRM privado" title="Panel profesional para leads, pipeline, seguimiento y automatizaciones.">
      <DashboardPreview />
      <p className="mt-6 text-sm text-slate-400">Versión visual preparada para conectarse a Supabase Auth y a la tabla leads sin exponer claves privadas en cliente.</p>
    </Section>
  );
}
