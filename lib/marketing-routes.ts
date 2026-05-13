const marketingAuditCtaExactRoutes = new Set([
  "/",
  "/servicios",
  "/nichos",
  "/barcelona",
  "/proyectos",
  "/casos/barberiaos",
  "/sobre-mi",
  "/blog",
]);

const marketingAuditCtaDynamicPrefixes = [
  "/servicios/",
  "/nichos/",
  "/barcelona/",
  "/proyectos/",
  "/casos/",
  "/blog/",
];

const excludedAuditCtaPrefixes = ["/dashboard", "/auditoria-gratis"];

export function normalizePathname(pathname: string | null) {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function shouldShowMarketingAuditCta(pathname: string | null) {
  const normalizedPathname = normalizePathname(pathname);

  if (excludedAuditCtaPrefixes.some((prefix) => normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`))) {
    return false;
  }

  return (
    marketingAuditCtaExactRoutes.has(normalizedPathname) ||
    marketingAuditCtaDynamicPrefixes.some((prefix) => normalizedPathname.startsWith(prefix))
  );
}
