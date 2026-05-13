import type { MetadataRoute } from "next";
import { allSeoPages, blogPosts, projectStudies } from "@/lib/site-data";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/servicios", "/nichos", "/sectores", "/barcelona", "/proyectos", "/sobre-mi", "/auditoria-gratis", "/contacto", "/blog"];
  const legalRoutes = ["/aviso-legal", "/politica-privacidad", "/politica-cookies", "/terminos-condiciones"];
  return [
    ...staticRoutes.map((route) => ({ url: siteUrl(route), lastModified: now, changeFrequency: "weekly" as const, priority: route === "/" ? 1 : 0.8 })),
    ...legalRoutes.map((route) => ({ url: siteUrl(route), lastModified: now, changeFrequency: "yearly" as const, priority: 0.25 })),
    ...allSeoPages.map((page) => ({ url: siteUrl(page.href), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...projectStudies.map((project) => ({ url: siteUrl(`/proyectos/${project.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...blogPosts.map((post) => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
