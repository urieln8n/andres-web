import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site-data";
import { ButtonLink } from "@/components/button-link";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return createMetadata({ title: post.title, description: post.description, path: `/blog/${post.slug}` });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) notFound();
  return (
    <article className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">{post.reading}</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{post.description}</p>
        <div className="prose prose-invert mt-10 max-w-none rounded-[2rem] border border-white/10 bg-white/[.04] p-8 text-slate-300">
          <p>Este artículo está preparado como base SEO. Codex puede ampliar el contenido a 1.200–1.800 palabras manteniendo intención comercial, ejemplos y CTA.</p>
          <h2>Idea principal</h2>
          <p>Una presencia digital profesional debe combinar confianza, velocidad, claridad, SEO y seguimiento comercial.</p>
          <h2>Qué implementar primero</h2>
          <p>Empieza por una propuesta de valor clara, páginas por servicio, formulario de auditoría y un CRM simple.</p>
        </div>
          <div className="mt-8"><ButtonLink href="/auditoria-gratis">Auditoría gratis</ButtonLink></div>
      </div>
    </article>
  );
}
