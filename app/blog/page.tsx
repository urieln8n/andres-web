import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site-data";
import { Section } from "@/components/section";
import { PremiumCard } from "@/components/premium-card";

export const metadata = createMetadata({
  title: "Blog SEO | IA, webs premium y automatización",
  description: "Guías sobre webs premium, SEO local, automatización IA y captación para negocios.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <Section eyebrow="Blog" title="Guías prácticas sobre captación, IA, SEO local y sistemas digitales.">
      <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
        Contenido pensado para responder dudas comerciales reales antes de vender: webs premium, WhatsApp, CRM, SEO local, IA y automatización para negocios.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <PremiumCard className="h-full transition hover:-translate-y-1">
              <p className="text-sm text-gold">{post.reading} · {post.date}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">{post.description}</p>
            </PremiumCard>
          </Link>
        ))}
      </div>
    </Section>
  );
}
