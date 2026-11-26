import { clientes, enlaces, urlEnlace, urlPanel } from "@/lib/panel/datos";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { borrarEnlace, cambiarActivo, crearCliente, crearEnlace } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { title: "Clientes · Dashboard", robots: { index: false, follow: false } };

const campo = "w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm text-white placeholder:text-slate-500";
const boton = "rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#050816]";

export default async function ClientesPage() {
  const lista = await clientes();
  const todos = await enlaces();
  const desde = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const { data: clics30, error } = (await getSupabaseAdmin()?.from("panel_clics").select("cliente").gte("creado", desde).limit(50_000)) || { data: null, error: null };
  const cuenta = new Map<string, number>();
  for (const c of (clics30 as { cliente: string }[] | null) || []) cuenta.set(c.cliente, (cuenta.get(c.cliente) || 0) + 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Clientes</h1>
        <p className="mt-1 text-sm text-slate-500">QR y enlaces con seguimiento, y el panel privado de cada cliente.</p>
      </div>

      {error && <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">Las tablas del panel aún no existen en Supabase.</div>}

      <form action={crearCliente} className="grid gap-3 rounded-2xl border border-white/8 bg-white/[.03] p-5 sm:grid-cols-4">
        <p className="text-sm font-semibold text-white sm:col-span-4">Nuevo cliente</p>
        <input name="nombre" required placeholder="Nombre (Peluquería Lola)" className={campo} />
        <input name="slug" placeholder="Identificador (peluqueria-lola)" className={campo} />
        <input name="dominio" placeholder="Su web (peluquerialola.es)" className={campo} />
        <button className={boton}>Crear cliente</button>
      </form>

      {lista.length === 0 && <p className="text-sm text-slate-500">Aún no tienes clientes en el panel.</p>}

      {lista.map((c) => {
        const suyos = todos.filter((e) => e.cliente === c.slug);
        return (
          <section key={c.slug} className="space-y-4 rounded-2xl border border-white/8 bg-white/[.02] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">{c.nombre} {!c.activo && <span className="ml-2 rounded-full bg-red-400/15 px-2 py-0.5 text-xs text-red-300">desactivado</span>}</h2>
                <p className="text-sm text-slate-500">{c.slug}{c.dominio ? ` · ${c.dominio}` : ""} · {cuenta.get(c.slug) || 0} escaneos en 30 días</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={urlPanel(c.token)} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white">Abrir su panel</a>
                <form action={cambiarActivo}>
                  <input type="hidden" name="slug" value={c.slug} />
                  <input type="hidden" name="activo" value={c.activo ? "false" : "true"} />
                  <button className="rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-300">{c.activo ? "Desactivar" : "Activar"}</button>
                </form>
              </div>
            </div>
            <p className="break-all rounded-xl bg-black/30 px-3 py-2 text-xs text-slate-400">Enlace de su panel (pásaselo al cliente): {urlPanel(c.token)}</p>

            <ul className="divide-y divide-white/5 rounded-xl border border-white/8">
              {suyos.length === 0 && <li className="px-4 py-3 text-sm text-slate-500">Sin enlaces todavía.</li>}
              {suyos.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{e.etiqueta || e.canal}</p>
                    <p className="break-all text-xs text-slate-500">{urlEnlace(e.cliente, e.canal)} → {e.destino}</p>
                  </div>
                  <form action={borrarEnlace}><input type="hidden" name="id" value={e.id} /><button className="text-xs text-red-300 underline">Quitar</button></form>
                </li>
              ))}
            </ul>

            <form action={crearEnlace} className="grid gap-3 sm:grid-cols-4">
              <input type="hidden" name="cliente" value={c.slug} />
              <input name="etiqueta" required placeholder="Nombre del QR (Cartel de la mesa)" className={campo} />
              <input name="canal" placeholder="Canal (mesa)" className={campo} />
              <input name="destino" required placeholder="Destino (wa.me/34…, su web…)" className={campo} />
              <button className={boton}>Añadir o cambiar QR</button>
            </form>
          </section>
        );
      })}
    </div>
  );
}
