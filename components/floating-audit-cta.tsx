"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingAuditCta() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setHasScrolled(window.scrollY > 360);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      <Link
        href="/auditoria-gratis?source=floating-cta"
        aria-label="Solicitar auditoría gratis para detectar oportunidades de captación"
        className={cn(
          "focus-premium group fixed bottom-6 right-6 z-40 hidden max-w-[20rem] items-center gap-4 rounded-2xl border border-white/12 bg-ink/75 px-5 py-4 text-left shadow-[0_24px_80px_rgba(0,0,0,.38),0_0_40px_rgba(103,232,249,.08),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-2xl transition duration-500 lg:flex",
          "hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[.08] hover:shadow-[0_28px_88px_rgba(0,0,0,.44),0_0_54px_rgba(103,232,249,.12),inset_0_1px_0_rgba(255,255,255,.14)]",
          hasScrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-cyan-100 shadow-[0_0_28px_rgba(103,232,249,.12)]">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-white">Auditoría gratis</span>
          <span className="mt-1 block text-xs leading-5 text-slate-300">Detecta oportunidades de captación</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-100" />
      </Link>

      <Link
        href="/auditoria-gratis?source=mobile-sticky"
        aria-label="Solicitar auditoría gratis para revisar tu web, SEO y WhatsApp"
        className={cn(
          "focus-premium fixed inset-x-4 z-40 flex items-center justify-between gap-3 rounded-full border border-white/12 bg-ink/88 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,.42),0_0_34px_rgba(103,232,249,.08),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-2xl transition duration-500 hover:border-cyan-200/25 hover:bg-white/[.08] md:hidden",
          hasScrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ bottom: "max(0.9rem, env(safe-area-inset-bottom))" }}
      >
        <span className="flex min-w-0 items-center gap-2.5 leading-tight">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/10 text-cyan-100">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">Auditoría gratis</span>
            <span className="mt-0.5 block truncate text-[11px] text-slate-300">Web, SEO y WhatsApp</span>
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_0_28px_rgba(103,232,249,.14)]">
          Solicitar
        </span>
      </Link>
    </>
  );
}
