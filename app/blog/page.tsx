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
    <Section eyebrow="Blog" title="Contenido para atraer tráfico y educar clientes antes de vender.">
      <div className="grid gap-5 md:grid-cols-3">
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
