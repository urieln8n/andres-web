import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Nota IA · Dashboard", robots: { index: false, follow: false } };

interface Evento { creado: string; tipo: string; pagina: string | null; canal: string | null; dominio: string | null; nota: number | null }

const PASOS = [
  { tipo: "visita", nombre: "Visitas" },
  { tipo: "comprobacion", nombre: "Comprobaciones" },
  { tipo: "informe", nombre: "Informes pedidos" },
  { tipo: "whatsapp", nombre: "Clics en WhatsApp" },
] as const;

const pct = (a: number, b: number) => (b > 0 ? `${Math.round((a / b) * 1000) / 10} %` : "—");

async function cargar(): Promise<{ eventos: Evento[]; error: string | null }> {
  const db = getSupabaseAdmin();
  if (!db) return { eventos: [], error: "Falta la conexión con Supabase." };
  const desde = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const { data, error } = await db.from("nota_ia_eventos").select("creado,tipo,pagina,canal,dominio,nota").gte("creado", desde).order("creado", { ascending: false }).limit(10_000);
  if (error) return { eventos: [], error: /nota_ia_eventos/.test(error.message) ? "La tabla de estadísticas aún no existe en Supabase: hay que crearla una vez." : error.message };
  return { eventos: (data as Evento[]) || [], error: null };
}

export default async function NotaIaStats() {
  const { eventos, error } = await cargar();
  const hace7 = Date.now() - 7 * 86_400_000;
  const contar = (tipo: string, solo7 = false) => eventos.filter((e) => e.tipo === tipo && (!solo7 || new Date(e.creado).getTime() >= hace7)).length;
  const canales = new Map<string, number>();
  for (const e of eventos) if (e.tipo === "visita") canales.set(e.canal || "directo", (canales.get(e.canal || "directo") || 0) + 1);
  const comprobaciones = eventos.filter((e) => e.tipo === "comprobacion").slice(0, 25);
  const extras = [
    { nombre: "Compartidos", n: contar("compartir") },
    { nombre: "Sellos copiados", n: contar("sello") },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Nota IA</h1>
        <p className="mt-1 text-sm text-slate-500">Estadísticas de «¿Te ve ChatGPT?» (andresrendon.com/nota-ia y /auditoria-aeo). Sin cookies ni datos personales.</p>
      </div>

      {error && <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">{error}</div>}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">El embudo</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => {
            const n30 = contar(p.tipo);
            const anterior = i > 0 ? contar(PASOS[i - 1].tipo) : 0;
            return (
              <div key={p.tipo} className="rounded-2xl border border-white/8 bg-white/[.03] p-4">
                <p className="text-sm text-slate-400">{p.nombre}</p>
                <p className="mt-1 text-3xl font-bold text-white">{n30}</p>
                <p className="mt-1 text-xs text-slate-500">30 días · {contar(p.tipo, true)} en 7 días</p>
                {i > 0 && <p className="mt-2 text-sm font-semibold text-cyan-300">{pct(n30, anterior)} del paso anterior</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">Los porcentajes del embudo son los que van en tu calculadora de «Cuánto puedo ganar».</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">De dónde vienen (visitas, 30 días)</h2>
          <ul className="mt-3 divide-y divide-white/5 rounded-2xl border border-white/8">
            {canales.size === 0 && <li className="px-4 py-3 text-sm text-slate-500">Aún no hay visitas.</li>}
            {[...canales.entries()].sort((a, b) => b[1] - a[1]).map(([canal, n]) => (
              <li key={canal} className="flex justify-between px-4 py-3 text-sm"><span className="text-slate-300">{canal}</span><span className="font-semibold text-white">{n}</span></li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-500">Añade ?o=tarjeta, ?o=whatsapp o ?o=instagram al enlace para saber qué canal funciona.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">Otros (30 días)</h2>
          <ul className="mt-3 divide-y divide-white/5 rounded-2xl border border-white/8">
            {extras.map((x) => <li key={x.nombre} className="flex justify-between px-4 py-3 text-sm"><span className="text-slate-300">{x.nombre}</span><span className="font-semibold text-white">{x.n}</span></li>)}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">Últimas webs comprobadas</h2>
        <p className="mt-1 text-xs text-slate-500">Para tus números, no para escribirles: no te han dado permiso para contactarles.</p>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/8 text-left"><th className="px-4 py-3 font-medium text-slate-500">Web</th><th className="px-4 py-3 font-medium text-slate-500">Nota</th><th className="px-4 py-3 font-medium text-slate-500">Canal</th><th className="px-4 py-3 font-medium text-slate-500">Cuándo</th></tr></thead>
            <tbody>
              {comprobaciones.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-slate-500">Aún no hay comprobaciones.</td></tr>}
              {comprobaciones.map((e, i) => (
                <tr key={`${e.creado}-${i}`} className={i % 2 === 0 ? "bg-white/[.015]" : ""}>
                  <td className="px-4 py-3 text-white">{e.dominio || "—"}</td>
                  <td className={`px-4 py-3 font-semibold ${(e.nota ?? 0) >= 70 ? "text-emerald-300" : (e.nota ?? 0) >= 50 ? "text-amber-300" : "text-red-400"}`}>{e.nota ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-400">{e.canal || "directo"}</td>
                  <td className="px-4 py-3 text-slate-400">{new Date(e.creado).toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
