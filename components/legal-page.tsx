import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { PremiumCard } from "@/components/premium-card";

export const legalUpdatedAt = "13 de mayo de 2026";

export const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/politica-privacidad", label: "Privacidad" },
  { href: "/politica-cookies", label: "Cookies" },
  { href: "/terminos-condiciones", label: "Términos" },
];

export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
  ctaHref = "/contacto",
  ctaLabel = "Contactar",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <article className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        <p className="premium-kicker text-sm">{eyebrow}</p>
        <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-white md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{intro}</p>
        <p className="mt-4 text-sm text-slate-500">Última actualización: {legalUpdatedAt}</p>

        <PremiumCard className="mt-10">
          <div className="legal-content grid gap-9 text-slate-300">{children}</div>
        </PremiumCard>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-3">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="focus-premium rounded-full border border-white/10 bg-white/[.045] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-200/30 hover:bg-white/[.08]">
                {item.label}
              </Link>
            ))}
          </div>
          <ButtonLink href={ctaHref} variant="secondary">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
