const metrics = [
  ["Leads nuevos", "24", "+18%", "Entradas cualificadas"],
  ["Valor estimado", "38.400 €", "+7.200 €", "Pipeline comercial"],
  ["Conversión", "31%", "últimos 30 días", "Auditoría a propuesta"],
  ["Automatizaciones", "9", "activas", "Respuesta y seguimiento"],
];

const opportunities = [
  ["Barbería Premium", "Web + reservas", "4.500 €", "nuevo"],
  ["Pizzería Centro", "Carta digital + SEO", "3.200 €", "contactado"],
  ["Limpieza Pro", "SEO + CRM", "6.800 €", "auditoría enviada"],
  ["Clínica Estética", "Chatbot IA", "2.900 €", "propuesta enviada"],
  ["Restaurante Born", "Sistema completo", "9.500 €", "negociación"],
  ["Gimnasio Local", "Automatización", "1.800 €", "cerrado"],
];

const pipeline = [
  ["Nuevo", 24, "bg-cyan-300"],
  ["Contactado", 18, "bg-blue-300"],
  ["Auditoría", 11, "bg-violet-300"],
  ["Propuesta", 7, "bg-gold"],
  ["Cierre", 3, "bg-emerald-300"],
];

const automations = [
  "Formulario -> CRM -> WhatsApp",
  "Lead scoring por servicio",
  "Recordatorio de seguimiento",
  "Aviso de oportunidad caliente",
];

const statusStyles: Record<string, string> = {
  nuevo: "bg-cyan-300/10 text-cyan-200",
  contactado: "bg-blue-300/10 text-blue-200",
  "auditoría enviada": "bg-violet-300/10 text-violet-200",
  "propuesta enviada": "bg-gold/10 text-gold",
  negociación: "bg-orange-300/10 text-orange-200",
  cerrado: "bg-emerald-300/10 text-emerald-200",
  perdido: "bg-red-300/10 text-red-200",
};

export function DashboardPreview() {
  return (
    <div className="premium-border spotlight-panel overflow-hidden rounded-[2rem] bg-white/[.06] shadow-premium backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">Dashboard CRM de Andrés Rendón</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">Pipeline comercial, leads y acciones</h3>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">Datos demostrativos para visualizar el sistema CRM. Los leads reales requieren Supabase conectado y autenticación.</p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">Demo visual</div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-4">
        {metrics.map(([label, value, change, context]) => (
          <div key={label} className="rounded-[1.35rem] border border-white/10 bg-ink/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <span className="text-cyan-200">{change}</span>
              <span className="text-slate-500">{context}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 px-6 pb-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-ink/40 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
          <div className="border-b border-white/10 p-4">
            <p className="font-semibold text-white">Oportunidades</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-slate-400">
                <tr><th className="px-4 py-3">Negocio</th><th>Servicio</th><th>Valor</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {opportunities.map((lead) => (
                  <tr key={lead[0]} className="border-t border-white/10 text-slate-200 transition hover:bg-white/[.035]">
                    <td className="px-4 py-4 font-medium text-white">{lead[0]}</td>
                    <td>{lead[1]}</td>
                    <td>{lead[2]}</td>
                    <td><span className={`rounded-full px-3 py-1 text-xs ${statusStyles[lead[3]]}`}>{lead[3]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-white/10 bg-ink/40 p-5">
            <p className="font-semibold text-white">Pipeline comercial</p>
            <div className="mt-5 grid gap-3">
              {pipeline.map(([stage, count, color]) => (
                <div key={stage} className="grid grid-cols-[90px_1fr_32px] items-center gap-3 text-sm">
                  <span className="text-slate-400">{stage}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-white/10">
                    <span className={`block h-full rounded-full ${color}`} style={{ width: `${Number(count) * 3}%` }} />
                  </span>
                  <span className="text-right text-slate-200">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-ink/40 p-5">
            <p className="font-semibold text-white">Servicios más solicitados</p>
            {["Web premium + SEO", "Chatbot WhatsApp", "CRM y dashboards"].map((item, index) => (
              <div key={item} className="mt-4">
                <div className="flex justify-between text-sm text-slate-300"><span>{item}</span><span>{[42, 28, 19][index]}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{ width: `${[42, 28, 19][index]}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.35rem] border border-white/10 bg-ink/40 p-5">
              <p className="font-semibold text-white">Automatizaciones activas</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                {automations.map((item) => <p key={item} className="rounded-2xl bg-white/[.04] px-3 py-2">{item}</p>)}
              </div>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-ink/40 p-5">
              <p className="font-semibold text-white">Próximas acciones</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <p>Enviar auditoría SEO a Limpieza Pro</p>
                <p>Revisar propuesta Barbería Premium</p>
                <p>Activar automatización Restaurante Born</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
