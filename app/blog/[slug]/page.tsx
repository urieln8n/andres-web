import { notFound } from "next/navigation";
import Link from "next/link";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])),
        }}
      />
    <article className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-gold">{post.reading} · {post.date}</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">{post.description}</p>
        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[.04] p-6 text-slate-300 shadow-premium md:p-8">
          <p className="text-lg leading-8 text-slate-200">{post.intro}</p>
          <div className="mt-10 grid gap-9">
            {post.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <div className="mt-4 grid gap-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-7">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-cyan-200/15 bg-cyan-200/[.06] p-5">
            <h2 className="text-xl font-semibold text-white">Siguiente paso recomendado</h2>
            <p className="mt-3 leading-7">Si quieres aplicar esto a tu negocio, empieza por una auditoría gratis. Revisaré claridad de oferta, SEO, WhatsApp, mobile, velocidad y oportunidades de automatización.</p>
            <div className="mt-5"><ButtonLink href="/auditoria-gratis?source=blog-post">Solicitar auditoría gratis</ButtonLink></div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {post.related.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full border border-white/10 bg-white/[.05] px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/30 hover:bg-white/[.09]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
