"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import { ButtonLink } from "./button-link";
import { shouldShowMarketingAuditCta } from "@/lib/marketing-routes";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/nichos", label: "Nichos" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const showAuditCta = shouldShowMarketingAuditCta(pathname);

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/72 shadow-[0_1px_0_rgba(255,255,255,.04),0_18px_60px_rgba(0,0,0,.18)] backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/58">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link href="/" className="focus-premium flex items-center gap-3 rounded-full">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white text-xs font-black text-ink shadow-[0_0_32px_rgba(103,232,249,.14)] sm:h-10 sm:w-10 sm:text-sm">AR</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white">Andrés Rendón</span>
            <span className="block text-[11px] text-slate-400">IA · Web · SEO · Sistemas</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[.035] p-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="focus-premium rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[.07] hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        {showAuditCta && (
          <div className="hidden lg:block">
            <ButtonLink href="/auditoria-gratis?source=header" size="sm"><Sparkles className="h-4 w-4" />Auditoría gratis</ButtonLink>
          </div>
        )}
        <button className="focus-premium rounded-full border border-white/10 bg-white/[.05] p-2.5 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-5 shadow-premium backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="focus-premium rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-slate-200 transition hover:bg-white/[.08]">{link.label}</Link>)}
            {showAuditCta && <ButtonLink href="/auditoria-gratis?source=header">Auditoría gratis</ButtonLink>}
          </div>
        </div>
      )}
    </header>
  );
}
