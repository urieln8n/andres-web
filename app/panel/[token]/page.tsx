import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QrSvg, qrDataUrl } from "@/components/qr-svg";
import { clientePorToken, clics, enlaces, resumir, urlEnlace } from "@/lib/panel/datos";
import { NIVEL_COLOR, NIVEL_TEXTO, notaPublica } from "@/lib/aeo/nota-publica";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tu panel · Andrés AI Studio", robots: { index: false, follow: false } };

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308";

export default async function PanelCliente({ params }: { params: { token: string } }) {
  const cliente = await clientePorToken(params.token);
  if (!cliente) notFound();

  if (!cliente.activo) {
    return (
      <main className="mx-auto max-w-xl px-5 pb-24 pt-28 text-center">
        <h1 className="font-display text-3xl font-semibold text-white">Panel desactivado</h1>
        <p className="mt-3 text-slate-400">El panel de {cliente.nombre} no está activo ahora mismo.</p>
        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Andrés, quiero reactivar el panel de ${cliente.nombre}`)}`} className="focus-premium mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">Hablar con Andrés</a>
      </main>
    );
  }

  const [lista, misEnlaces, nota] = await Promise.all([
    clics(cliente.slug),
    enlaces(cliente.slug),
    cliente.dominio ? notaPublica(cliente.dominio).catch(() => null) : Promise.resolve(null),
  ]);
  const r = resumir(lista);
  const cambio = r.mesPasado > 0 ? Math.round(((r.esteMes - r.mesPasado) / r.mesPasado) * 100) : null;
  const maxDia = Math.max(1, ...r.dias.map((d) => d.n));
  const maxCanal = Math.max(1, ...r.porCanal.map(([, n]) => n));
  const etiqueta = new Map(misEnlaces.map((e) => [e.canal, e.etiqueta || e.canal]));
  const qrs = await Promise.all(misEnlaces.map(async (e) => ({ ...e, url: urlEnlace(e.cliente, e.canal), png: await qrDataUrl(urlEnlace(e.cliente, e.canal)) })));
  const mes = new Date().toLocaleDateString("es-ES", { month: "long", timeZone: "Europe/Madrid" });

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-24 md:pt-28">
      <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-200">Tu panel</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-white">{cliente.nombre}</h1>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-sm text-slate-400">Escaneos y clics en {mes}</p>
          <p className="mt-1 text-4xl font-bold text-white">{r.esteMes}</p>
          <p className={`mt-1 text-sm font-semibold ${cambio == null ? "text-slate-500" : cambio >= 0 ? "text-emerald-300" : "text-red-300"}`}>
            {cambio == null ? `Mes anterior: ${r.mesPasado}` : `${cambio >= 0 ? "+" : ""}${cambio} % frente al mes anterior (${r.mesPasado})`}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-sm text-slate-400">Lo que más te trae este mes</p>
          <p className="mt-1 text-2xl font-bold text-white">{r.porCanal[0] ? etiqueta.get(r.porCanal[0][0]) || r.porCanal[0][0] : "—"}</p>
          <p className="mt-1 text-sm text-slate-500">{r.porCanal[0] ? `${r.porCanal[0][1]} escaneos o clics` : "Aún sin datos"}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="text-sm text-slate-400">¿Te ve ChatGPT?</p>
          {nota ? (
            <>
              <p className="mt-1 text-4xl font-bold text-white">{nota.nota}<span className="text-base font-normal text-slate-400"> / 100</span></p>
              <p className="mt-1 text-sm font-semibold" style={{ color: NIVEL_COLOR[nota.nivel] }}>{NIVEL_TEXTO[nota.nivel]}</p>
            </>
          ) : <p className="mt-1 text-sm text-slate-500">Sin web asociada</p>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">Últimos 30 días</h2>
        <div className="mt-3 flex h-32 items-end gap-[3px] rounded-2xl border border-white/10 bg-white/[.03] p-4" role="img" aria-label={`Escaneos por día en los últimos 30 días: ${r.dias.reduce((a, d) => a + d.n, 0)} en total`}>
          {r.dias.map((d) => (
            <div key={d.dia} title={`${d.dia}: ${d.n}`} className="flex-1 rounded-t bg-cyan-300/80" style={{ height: `${Math.max(3, (d.n / maxDia) * 100)}%`, opacity: d.n ? 1 : 0.25 }} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">De dónde vienen este mes</h2>
        <ul className="mt-3 grid gap-2">
          {r.porCanal.length === 0 && <li className="rounded-2xl border border-white/10 px-4 py-4 text-sm text-slate-500">Todavía no hay escaneos este mes.</li>}
          {r.porCanal.map(([canal, n]) => (
            <li key={canal} className="rounded-2xl border border-white/10 px-4 py-3">
              <div className="flex justify-between text-sm"><span className="text-slate-200">{etiqueta.get(canal) || canal}</span><span className="font-semibold text-white">{n}</span></div>
              <div className="mt-2 h-2 rounded-full bg-white/[.07]"><div className="h-2 rounded-full bg-cyan-300" style={{ width: `${(n / maxCanal) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[.15em] text-slate-400">Tus QR</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qrs.map((q) => (
            <div key={q.id} className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-5 text-center">
              <QrSvg texto={q.url} tam={150} />
              <p className="font-semibold text-white">{q.etiqueta || q.canal}</p>
              <a href={q.png} download={`qr-${q.cliente}-${q.canal}.png`} className="focus-premium rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">Descargar QR</a>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-xs leading-5 text-slate-500">Cuenta las veces que alguien escanea tus QR o pulsa tus enlaces. No guarda quién es: ni IP ni cookies. Hecho por Andrés AI Studio.</p>
    </main>
  );
}
