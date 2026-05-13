import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { localPages } from "@/lib/site-data";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Servicios digitales en Barcelona | Web, IA y SEO local",
  description: "Diseño web premium, automatización IA y SEO local para negocios en Barcelona.",
  path: "/barcelona",
});

export default function BarcelonaPage() {
  return (
    <Section eyebrow="Barcelona" title="Páginas locales para captar demanda en Barcelona.">
      <div className="grid gap-5 md:grid-cols-3">
        {localPages.map((page) => (
          <Link key={page.slug} href={`/barcelona/${page.slug}`}>
            <PremiumCard className="h-full transition hover:-translate-y-1">
              <p className="text-sm text-gold">{page.eyebrow}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{page.h1}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{page.description}</p>
            </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
