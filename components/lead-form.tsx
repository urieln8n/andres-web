"use client";

import { useState } from "react";

const services = [
  "Web premium",
  "Automatización IA",
  "Chatbot WhatsApp",
  "SEO local",
  "CRM y dashboards",
  "Sistema de reservas",
  "Software SaaS",
  "Auditoría digital",
];

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source: "auditoria-gratis" }),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      setError(payload.error || "No se pudo enviar. Revisa los datos.");
      setStatus("error");
      return;
    }
    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="premium-border glass-panel rounded-[2rem] p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">Nombre<input name="name" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Email<input name="email" type="email" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Teléfono / WhatsApp<input name="phone" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Negocio<input name="businessName" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Web o Instagram<input name="website" placeholder="https://... o @usuario" className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Sector<input name="sector" required placeholder="Barbería, restaurante, clínica..." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">Objetivo principal<input name="goal" required placeholder="Captar más leads, automatizar WhatsApp, mejorar SEO..." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300">Servicio
          <select name="service" required className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300">
            <option value="">Selecciona una opción</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-slate-300">Presupuesto aproximado<input name="budget" placeholder="Ej: 1.500 €, 3.000 €, 10.000 €..." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
        <label className="grid gap-2 text-sm text-slate-300 md:col-span-2">Mensaje<textarea name="message" rows={5} placeholder="Cuéntame qué quieres mejorar y qué problema quieres resolver." className="focus-premium rounded-2xl border border-white/10 bg-ink/60 px-4 py-3 text-white outline-none focus:border-cyan-300" /></label>
      </div>
      <button disabled={status === "loading"} className="focus-premium mt-6 w-full rounded-full bg-white px-6 py-4 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-100 disabled:opacity-50">
        {status === "loading" ? "Enviando..." : "Auditoría gratis"}
      </button>
      {status === "success" && <p className="mt-4 rounded-2xl bg-emerald-400/10 p-4 text-sm text-emerald-200">Gracias. He recibido tu solicitud. Revisaré tu negocio y te contactaré para ayudarte a detectar oportunidades de mejora.</p>}
      {status === "error" && <p className="mt-4 rounded-2xl bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
    </form>
  );
}
