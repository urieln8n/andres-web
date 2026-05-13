"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "./button-link";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/nichos", label: "Nichos" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-gold font-black text-ink">AR</span>
          <span className="leading-tight">
            <span className="block font-semibold text-white">Andrés Rendón</span>
            <span className="block text-xs text-slate-400">IA · Web · SEO · Sistemas</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white">{link.label}</Link>)}
        </div>
        <div className="hidden lg:block">
          <ButtonLink href="/auditoria-gratis" size="sm">Auditoría gratis</ButtonLink>
        </div>
        <button className="rounded-2xl border border-white/10 p-3 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl bg-white/[.04] px-4 py-3 text-slate-200">{link.label}</Link>)}
            <ButtonLink href="/auditoria-gratis">Auditoría gratis</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
