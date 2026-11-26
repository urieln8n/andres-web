"use client";

import { CompartirNota } from "@/components/compartir-nota";
import { SelloEmbed } from "@/components/sello-embed";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Lock, MessageCircle, ShieldAlert } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34645466308";

interface Eje { id: string; nombre: string; peso: number; nota: number }
interface Principal { severidad: "critico" | "alto" | "medio" | "bajo"; titulo: string; detalle: string }
interface Comprobacion { url: string; dominio: string | null; nota: number; nivel: string; ejes: Eje[]; principales: Principal[]; total: number }
type Datos = { negocio: string; nombre: string; email: string; whatsapp: string };

const COLOR_NIVEL: Record<string, string> = { excelente: "#34d399", bueno: "#8ea6ff", mejorable: "#8ea6ff", critico: "#f87171" };
const TEXTO_NIVEL: Record<string, string> = { excelente: "Excelente", bueno: "Bueno", mejorable: "Mejorable", critico: "Crítico" };
const ETIQUETA_SEV: Record<string, string> = { critico: "Crítico", alto: "Alto", medio: "Medio", bajo: "Bajo" };
const COLOR_SEV: Record<string, string> = { critico: "bg-red-400/15 text-red-300 border-red-400/30", alto: "bg-orange-400/15 text-orange-200 border-orange-300/30", medio: "bg-gold/15 text-gold border-gold/30", bajo: "bg-white/5 text-slate-300 border-white/10" };
const ANALIZANDO = ["Comprobando si los buscadores de IA pueden entrar…", "Leyendo tu web sin JavaScript, como ChatGPT…", "Buscando tus datos estructurados…", "Revisando si respondes a las preguntas de tus clientes…", "Calculando tu nota…"];

const webValida = (v: string) => /^(https?:\/\/)?[^\s/]+\.[^\s]{2,}/i.test(v.trim());

export function AeoAuditTool({ origen = "auditoria-aeo", compacto = false }: { origen?: string; compacto?: boolean }) {
  const [web, setWeb] = useState("");
  const [estado, setEstado] = useState<"inicio" | "analizando" | "resultado" | "bloqueada">("inicio");
  const [error, setError] = useState("");
  const [frase, setFrase] = useState(0);
  const [comp, setComp] = useState<Comprobacion | null>(null);
  const [bloqueo, setBloqueo] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (estado !== "analizando") return;
    const t = setInterval(() => setFrase((f) => Math.min(f + 1, ANALIZANDO.length - 1)), 1600);
    return () => clearInterval(t);
  }, [estado]);

  async function comprobar() {
    if (!webValida(web)) { setError("Escribe una dirección como tunegocio.com"); input.current?.focus(); return; }
    setError(""); setEstado("analizando"); setFrase(0);
    try {
      const res = await fetch("/api/comprobar-aeo", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ web }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "No he podido analizar tu web. Inténtalo de nuevo.");
      if (json.bloqueada) { setBloqueo(json.bloqueada); setEstado("bloqueada"); }
      else { setComp(json); setEstado("resultado"); }
      window.scrollTo({ top: (document.getElementById("auditoria-aeo")?.offsetTop || 0) - 90, behavior: "smooth" });
    } catch (e) {
      setEstado("inicio");
      setError(e instanceof Error ? e.message : "Algo ha fallado. Inténtalo de nuevo.");
    }
  }

  if (estado === "analizando") {
    return (
      <Marco>
        <div className="flex min-h-[320px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-300" />
          <p className="mt-6 text-lg font-semibold text-white">{ANALIZANDO[frase]}</p>
          <p className="mt-2 break-all text-sm text-slate-400">{web}</p>
        </div>
      </Marco>
    );
  }

  if (estado === "bloqueada") {
    return (
      <Marco>
        <div className="flex items-start gap-4">
          <ShieldAlert className="h-10 w-10 shrink-0 text-gold" />
          <div>
            <p className="text-xl font-semibold text-white">Tu web no nos ha dejado entrar (error {bloqueo})</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Si tu protección anti-bots trata igual a los buscadores de IA, tampoco pueden leerte. Déjame tus datos y la reviso a mano.</p>
          </div>
        </div>
        <PedirInforme web={web} origen={origen} nota={null} />
        <Volver onClick={() => { setEstado("inicio"); setComp(null); }} />
      </Marco>
    );
  }

  if (estado === "resultado" && comp) {
    const color = COLOR_NIVEL[comp.nivel] || "#8ea6ff";
    const ocultos = Math.max(0, comp.total - comp.principales.length);
    return (
      <Marco>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${comp.nota * 3.6}deg, rgba(255,255,255,.08) 0)` }}>
            <div className="grid h-28 w-28 place-items-center rounded-full bg-ink text-center">
              <div><span className="text-4xl font-semibold text-white">{comp.nota}</span><span className="block text-xs text-slate-400">de 100</span></div>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[.2em]" style={{ color }}>{TEXTO_NIVEL[comp.nivel]}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{comp.nota >= 70 ? "La IA puede leerte. Queda afinar para que te cite." : comp.nota >= 50 ? "La IA te lee a medias: estás perdiendo respuestas." : "Para ChatGPT y Perplexity, tu web casi no existe."}</p>
            <p className="mt-2 break-all text-sm text-slate-400">{comp.url}</p>
          </div>
        </div>
        {comp.dominio && <CompartirNota dominio={comp.dominio} nota={comp.nota} />}

        <div className="mt-8 grid gap-3">
          {comp.ejes.map((e) => (
            <div key={e.id}>
              <div className="flex justify-between text-sm text-slate-300"><span>{e.nombre}</span><span className="font-semibold text-white">{e.nota}</span></div>
              <div className="mt-1 h-2 rounded-full bg-white/[.07]"><div className="h-2 rounded-full" style={{ width: `${e.nota}%`, background: e.nota >= 50 ? "#8ea6ff" : "#f87171" }} /></div>
            </div>
          ))}
        </div>

        {comp.principales.length > 0 && (
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-gold">Lo primero que arreglaría</p>
            <ul className="mt-4 grid gap-3">
              {comp.principales.map((h) => (
                <li key={h.titulo} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${COLOR_SEV[h.severidad]}`}>{ETIQUETA_SEV[h.severidad]}</span>
                    <span className="font-semibold text-white">{h.titulo}</span>
                  </div>
                  {h.detalle && <p className="mt-2 text-sm leading-6 text-slate-300">{h.detalle}</p>}
                </li>
              ))}
            </ul>
            {ocultos > 0 && <p className="mt-3 flex items-center gap-2 text-sm text-slate-400"><Lock className="h-4 w-4" /> {ocultos} puntos más y cómo arreglar cada uno, en el informe completo.</p>}
          </div>
        )}

        {comp.dominio && comp.nota >= 70 && <SelloEmbed dominio={comp.dominio} />}
        <PedirInforme web={comp.url} origen={origen} nota={comp.nota} />
        <p className="mt-4 text-xs leading-5 text-slate-500">Análisis automático de la página que nos diste, sin ejecutar JavaScript. Mide las condiciones para que la IA te lea y te cite; nadie puede garantizar que un modelo concreto te cite.</p>
        <Volver onClick={() => { setEstado("inicio"); setComp(null); setWeb(""); }} />
      </Marco>
    );
  }

  return (
    <Marco>
      <form onSubmit={(e) => { e.preventDefault(); comprobar(); }} noValidate>
        {compacto ? (
          <label htmlFor="aeo-web" className="block text-base font-semibold text-white">Escribe la dirección de tu web</label>
        ) : (
          <>
            <label htmlFor="aeo-web" className="block text-2xl font-semibold text-white md:text-3xl">¿Te ve ChatGPT? Pega tu web.</label>
            <p className="mt-2 text-sm text-slate-400">La leemos como la lee la IA: sin ejecutar JavaScript. Sin registrarte.</p>
          </>
        )}
        <div className={`${compacto ? "mt-3" : "mt-6"} flex flex-col gap-3 sm:flex-row`}>
          <input
            ref={input} id="aeo-web" name="web" type="url" inputMode="url" autoComplete="url" placeholder="tunegocio.com" value={web}
            onChange={(e) => { setWeb(e.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby="aeo-error"
            className="focus-premium min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/[.05] px-5 py-4 text-lg text-white placeholder:text-slate-500"
          />
          <button type="submit" className="focus-premium inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-50">
            Ver mi nota <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p id="aeo-error" className="mt-3 min-h-[1.25rem] text-sm text-red-300" role="alert">{error}</p>
      </form>
      {!compacto && <ul className="mt-6 grid gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:grid-cols-3">
        {["Gratis y sin registro", "Tu nota de 0 a 100 al momento", "Sin llamadas comerciales"].map((t) => (
          <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> {t}</li>
        ))}
      </ul>}
    </Marco>
  );
}

function PedirInforme({ web, origen, nota }: { web: string; origen: string; nota: number | null }) {
  const [d, setD] = useState<Datos>({ negocio: "", nombre: "", email: "", whatsapp: "" });
  const [consentimiento, setConsentimiento] = useState(false);
  const [estado, setEstado] = useState<"form" | "enviando" | "enviado">("form");
  const [enviadoYa, setEnviadoYa] = useState(false);
  const [error, setError] = useState("");
  const trampa = useRef<HTMLInputElement>(null);

  async function enviar() {
    if (d.negocio.trim().length < 2) return setError("Escribe el nombre de tu negocio");
    if (d.nombre.trim().length < 2) return setError("Escribe tu nombre");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) return setError("Revisa tu email");
    if (d.whatsapp.trim() && !/^[+\d][\d\s().-]{7,20}$/.test(d.whatsapp.trim())) return setError("Revisa el número (con prefijo si no es de España)");
    if (!consentimiento) return setError("Marca la casilla para que pueda enviarte el informe");
    setError(""); setEstado("enviando");
    try {
      const res = await fetch("/api/auditoria-aeo", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ web, ...d, whatsapp: d.whatsapp.trim(), consentimiento: true, empresa_web: trampa.current?.value || "", origen }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "No he podido enviarte el informe. Inténtalo de nuevo.");
      setEnviadoYa(Boolean(json.guardado?.email)); setEstado("enviado");
    } catch (e) {
      setEstado("form"); setError(e instanceof Error ? e.message : "Algo ha fallado. Inténtalo de nuevo.");
    }
  }

  const mensaje = encodeURIComponent(`Hola Andrés, he comprobado ${web} en tu auditor${nota != null ? ` y me ha salido ${nota}/100` : ""}. ¿Me explicas cómo mejorarla?`);
  const botonWa = (
    <a href={`https://wa.me/${WHATSAPP}?text=${mensaje}`} target="_blank" rel="noopener noreferrer" className="focus-premium mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5">
      <MessageCircle className="h-4 w-4" /> Explícamelo por WhatsApp
    </a>
  );

  if (estado === "enviado") {
    return (
      <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-5">
        <p className="font-semibold text-white">{enviadoYa ? `${d.nombre}, te acabo de enviar el informe completo a ${d.email}.` : `${d.nombre}, te enviaré el informe completo a ${d.email} en menos de 24 horas.`}</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">Si prefieres que te lo explique en 10 minutos, escríbeme por WhatsApp.</p>
        {botonWa}
      </div>
    );
  }

  const campo = "focus-premium w-full rounded-xl border border-white/12 bg-white/[.05] px-4 py-3 text-base text-white placeholder:text-slate-500";
  return (
    <form onSubmit={(e) => { e.preventDefault(); enviar(); }} noValidate className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-5">
      <p className="font-semibold text-white">Recibe el informe completo, con cómo arreglar cada punto</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">Gratis, a tu correo, en un minuto.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input aria-label="Nombre de tu negocio" placeholder="Nombre de tu negocio" autoComplete="organization" value={d.negocio} onChange={(e) => { setD({ ...d, negocio: e.target.value }); setError(""); }} className={campo} />
        <input aria-label="Tu nombre" placeholder="Tu nombre" autoComplete="given-name" value={d.nombre} onChange={(e) => { setD({ ...d, nombre: e.target.value }); setError(""); }} className={campo} />
        <input aria-label="Tu email" type="email" placeholder="tu@email.com" autoComplete="email" value={d.email} onChange={(e) => { setD({ ...d, email: e.target.value }); setError(""); }} className={campo} />
        <input aria-label="Tu WhatsApp (opcional)" type="tel" inputMode="tel" placeholder="WhatsApp (opcional)" autoComplete="tel" value={d.whatsapp} onChange={(e) => { setD({ ...d, whatsapp: e.target.value }); setError(""); }} className={campo} />
      </div>
      <input ref={trampa} name="empresa_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input type="checkbox" checked={consentimiento} onChange={(e) => { setConsentimiento(e.target.checked); setError(""); }} className="mt-1 h-4 w-4 accent-cyan-300" />
        <span>Acepto la <Link href="/politica-privacidad" className="text-cyan-200 underline">política de privacidad</Link> y recibir por email el informe y consejos relacionados. Puedes darte de baja cuando quieras.</span>
      </label>
      <p className="mt-2 min-h-[1.25rem] text-sm text-red-300" role="alert">{error}</p>
      <button type="submit" disabled={estado === "enviando"} className="focus-premium mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 disabled:opacity-60">
        {estado === "enviando" ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparando tu informe…</> : <>Enviarme el informe <ArrowRight className="h-4 w-4" /></>}
      </button>
    </form>
  );
}

function Volver({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="focus-premium mt-4 text-sm text-cyan-200 underline">Comprobar otra web</button>;
}

function Marco({ children }: { children: React.ReactNode }) {
  return <div id="auditoria-aeo" className="premium-border glass-panel relative rounded-[1.75rem] p-6 shadow-premium md:p-9">{children}</div>;
}
