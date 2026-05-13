import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { sectors } from "@/lib/site-data";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Sectores para IA, webs premium, SEO y software | Andrés Fabián Rendón Ramírez",
  description: "Sistemas digitales para barberías, restaurantes, empresas de limpieza y clínicas que quieren captar clientes, automatizar procesos y vender más.",
  path: "/sectores",
});

export default function SectorsPage() {
  return (
    <Section eyebrow="Sectores" title="Sistemas digitales adaptados a negocios locales con intención real de compra.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {sectors.map((sector) => (
          <Link key={sector.slug} href={`/sectores/${sector.slug}`} className="group">
            <PremiumCard className="h-full transition group-hover:-translate-y-1 group-hover:bg-white/[.08]">
              <p className="text-sm font-medium text-cyan-200">{sector.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{sector.h1}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{sector.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                Ver sector <ArrowRight className="h-4 w-4" />
              </span>
            </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
