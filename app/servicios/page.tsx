import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { services } from "@/lib/site-data";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Servicios digitales con IA, SEO y webs premium | Andrés Rendón",
  description: "Servicios de diseño web premium, automatización IA, chatbots WhatsApp, SEO local, SaaS y auditoría digital.",
  path: "/servicios",
});

export default function ServicesPage() {
  return (
    <Section eyebrow="Servicios" title="Soluciones para convertir negocios en sistemas digitales de captación.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service.slug} href={`/servicios/${service.slug}`} className="group">
            <PremiumCard className="h-full transition group-hover:-translate-y-1">
              <p className="text-sm text-gold">{service.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{service.h1}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{service.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">Ver página SEO <ArrowRight className="h-4 w-4" /></span>
            </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
