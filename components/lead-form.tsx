"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

const serviceOptions = [
  "Web premium",
  "Automatización IA",
  "Recepcionista IA WhatsApp",
  "SEO local",
  "CRM y dashboards",
  "Sistema de reservas",
  "Software SaaS / BarberíaOS",
  "Sistema Digital 360 IA",
  "Auditoría digital",
];

const budgetOptions = [
  "No lo sé todavía",
  "Menos de 500€",
  "500€ – 1.500€",
  "1.500€ – 5.000€",
  "Más de 5.000€",
  "Mensual / mantenimiento",
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000";

export function LeadForm({ source = "auditoria-gratis" }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());

    const payload = {
      name: raw.name,
      email: raw.email,
      phone: raw.whatsapp,
      whatsapp: raw.whatsapp,
      businessName: raw.businessName,
      website: raw.website || "",
      instagramUrl: raw.instagramUrl || "",
      sector: raw.sector,
      city: raw.city || "",
      goal: raw.mainProblem,
      mainProblem: raw.mainProblem,
      service: raw.service,
      budget: raw.budget || "",
      message: raw.message || "",
      source,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "No se pudo enviar. Revisa los datos e inténtalo de nuevo.");
      setStatus("error");
      return;
    }

    setSubmittedName(String(raw.name).split(" ")[0]);
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    const waText = `Hola Andrés, acabo de solicitar la auditoría gratis para mi negocio. Me llamo ${submittedName}.`;
    const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`;
    return (
      <div className="premium-border glass-panel rounded-[2rem] p-8 text-center md:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-300" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-white">
          {submittedName ? `¡Gracias, ${submittedName}!` : "¡Solicitud recibida!"}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-300">
          He recibido los datos de tu negocio. Revisaré tu caso y te contactaré con un diagnóstico claro y las primeras oportunidades de mejora.
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Si quieres agilizar el proceso, escríbeme directamente por WhatsApp.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#22c55e]"
        >
          <MessageCircle className="h-5 w-5" />
          Escribir por WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 w-full rounded-full border border-white/10 bg-white/[.04] px-6 py-3 text-sm text-slate-400 transition hover:bg-white/[.08] hover:text-white"
        >
          Enviar otro formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="premium-border glass-panel rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Nombre *
          <input name="name" required placeholder="Tu nombre completo" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Email *
          <input name="email" type="email" required placeholder="tu@email.com" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          WhatsApp *
          <input name="whatsapp" required placeholder="+34 600 000 000" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Nombre del negocio *
          <input name="businessName" required placeholder="Nombre de tu empresa o negocio" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Web actual
          <input name="website" type="url" placeholder="https://tunegocio.com" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Instagram
          <input name="instagramUrl" placeholder="@tunegocio o URL completa" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Sector *
          <input name="sector" required placeholder="Barbería, restaurante, clínica..." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Ciudad
          <input name="city" placeholder="Barcelona, Madrid, Valencia..." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">
          Problema principal *
          <input name="mainProblem" required placeholder="¿Qué es lo que más te cuesta en tu captación digital ahora mismo?" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          ¿Qué te interesa? *
          <select name="service" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300">
            <option value="">Selecciona una opción</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Presupuesto aproximado
          <select name="budget" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300">
            <option value="">Opcional</option>
            {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">
          Mensaje adicional
          <textarea name="message" rows={4} placeholder="Cuéntame cualquier detalle extra que quieras que tenga en cuenta al revisar tu caso." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-cyan-300" />
        </label>
      </div>
      <button
        disabled={status === "loading"}
        className="focus-premium mt-6 w-full rounded-full bg-white px-6 py-4 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:opacity-50"
      >
        {status === "loading" ? "Enviando solicitud..." : "Solicitar auditoría gratis →"}
      </button>
      {status === "error" && (
        <p className="mt-4 rounded-2xl bg-red-400/10 p-4 text-sm text-red-200">{error}</p>
      )}
      <p className="mt-4 text-center text-xs text-slate-500">
        Tus datos se usan exclusivamente para revisar tu negocio. Sin spam, sin compromiso.
      </p>
    </form>
  );
}
