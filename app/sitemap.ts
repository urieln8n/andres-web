import type { MetadataRoute } from "next";
import { allSeoPages, blogPosts } from "@/lib/site-data";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/servicios", "/nichos", "/barcelona", "/proyectos", "/sobre-mi", "/auditoria-gratis", "/contacto", "/blog", "/dashboard"];
  return [
    ...staticRoutes.map((route) => ({ url: siteUrl(route), lastModified: now, changeFrequency: "weekly" as const, priority: route === "/" ? 1 : 0.8 })),
    ...allSeoPages.map((page) => ({ url: siteUrl(page.href), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...blogPosts.map((post) => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
