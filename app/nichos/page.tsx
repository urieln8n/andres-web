import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { niches } from "@/lib/site-data";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Nichos para webs, IA y automatización | Andrés Rendón",
  description: "Soluciones digitales para barberías, restaurantes, empresas de limpieza, autónomos y negocios locales.",
  path: "/nichos",
});

export default function NichesPage() {
  return (
    <Section eyebrow="Nichos" title="Páginas SEO por sector para atraer clientes con intención real.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {niches.map((niche) => (
          <Link key={niche.slug} href={`/nichos/${niche.slug}`}>
            <PremiumCard className="h-full transition hover:-translate-y-1 hover:bg-white/[.08]">
              <p className="text-sm text-cyan-200">{niche.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{niche.h1}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{niche.description}</p>
            </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
