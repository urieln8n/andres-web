const metrics = [
  ["Leads nuevos", "24", "+18%"],
  ["Valor pipeline", "38.400 €", "+7.200 €"],
  ["Conversión", "31%", "últimos 30 días"],
  ["Automatizaciones", "9", "activas"],
];

const opportunities = [
  ["Barbería Premium", "Web + reservas", "4.500 €", "nuevo"],
  ["Pizzería Centro", "Carta digital + SEO", "3.200 €", "contactado"],
  ["Limpieza Pro", "SEO + CRM", "6.800 €", "auditoría enviada"],
  ["Clínica Estética", "Chatbot IA", "2.900 €", "propuesta enviada"],
  ["Restaurante Born", "Sistema completo", "9.500 €", "negociación"],
  ["Gimnasio Local", "Automatización", "1.800 €", "cerrado"],
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
    <div className="premium-border overflow-hidden rounded-[2rem] bg-white/[.06] shadow-premium backdrop-blur">
      <div className="flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-400">Dashboard CRM de Andrés Rendón</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">Pipeline comercial y captación</h3>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">Sistema activo</div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-4">
        {metrics.map(([label, value, change]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-ink/50 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-xs text-cyan-200">{change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 px-6 pb-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink/40">
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
                  <tr key={lead[0]} className="border-t border-white/10 text-slate-200">
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
          <div className="rounded-3xl border border-white/10 bg-ink/40 p-5">
            <p className="font-semibold text-white">Servicios más solicitados</p>
            {["Web premium + SEO", "Chatbot WhatsApp", "CRM y dashboards"].map((item, index) => (
              <div key={item} className="mt-4">
                <div className="flex justify-between text-sm text-slate-300"><span>{item}</span><span>{[42, 28, 19][index]}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-cyan-300" style={{ width: `${[42, 28, 19][index]}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink/40 p-5">
            <p className="font-semibold text-white">Próximos seguimientos</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <p>Enviar auditoría SEO a Limpieza Pro</p>
              <p>Revisar propuesta Barbería Premium</p>
              <p>Activar automatización Restaurante Born</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
