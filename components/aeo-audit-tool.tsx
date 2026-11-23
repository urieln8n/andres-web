"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, MessageCircle, ShieldAlert } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34600000000";

type Campo = "web" | "negocio" | "nombre" | "email" | "whatsapp";
const PASOS: { campo: Campo; titulo: string; ayuda: string; tipo: string; placeholder: string; autoComplete: string }[] = [
  { campo: "web", titulo: "¿Cuál es la dirección de tu web?", ayuda: "La leemos como la lee ChatGPT: sin ejecutar JavaScript.", tipo: "url", placeholder: "tunegocio.com", autoComplete: "url" },
  { campo: "negocio", titulo: "¿Cómo se llama tu negocio?", ayuda: "Para personalizar el informe.", tipo: "text", placeholder: "Barbería Gràcia", autoComplete: "organization" },
  { campo: "nombre", titulo: "¿Y tú cómo te llamas?", ayuda: "Solo tu nombre.", tipo: "text", placeholder: "Laura", autoComplete: "given-name" },
  { campo: "email", titulo: "¿A qué email te envío el informe completo?", ayuda: "Recibirás el detalle de cada punto y cómo arreglarlo.", tipo: "email", placeholder: "laura@tunegocio.com", autoComplete: "email" },
  { campo: "whatsapp", titulo: "¿Tu WhatsApp, por si quieres que te lo explique?", ayuda: "Solo te escribo si respondes al informe o me lo pides.", tipo: "tel", placeholder: "+34 600 123 456", autoComplete: "tel" },
];

interface Eje { id: string; nombre: string; peso: number; nota: number }
interface Hallazgo { severidad: "critico" | "alto" | "medio" | "bajo"; titulo: string; detalle: string; esfuerzo: string }
interface Respuesta {
  resultado: { url: string; nota: number; nivel: string; ejes: Eje[]; hallazgos: Hallazgo[] };
  revisionManual: boolean;
  guardado?: { panel: boolean; brevo: boolean; email?: boolean };
}

const COLOR_NIVEL: Record<string, string> = { excelente: "#34d399", bueno: "#22d3ee", mejorable: "#D6B25E", critico: "#f87171" };
const TEXTO_NIVEL: Record<string, string> = { excelente: "Excelente", bueno: "Bueno", mejorable: "Mejorable", critico: "Crítico" };
const ETIQUETA_SEV: Record<string, string> = { critico: "Crítico", alto: "Alto", medio: "Medio", bajo: "Bajo" };
const COLOR_SEV: Record<string, string> = { critico: "bg-red-400/15 text-red-300 border-red-400/30", alto: "bg-orange-400/15 text-orange-200 border-orange-300/30", medio: "bg-gold/15 text-gold border-gold/30", bajo: "bg-white/5 text-slate-300 border-white/10" };
const ANALIZANDO = ["Comprobando si los buscadores de IA pueden entrar…", "Leyendo tu web sin JavaScript, como ChatGPT…", "Buscando tus datos estructurados…", "Revisando si respondes a las preguntas de tus clientes…", "Calculando tu nota…"];

export function AeoAuditTool({ origen = "auditoria-aeo" }: { origen?: string }) {
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState<Record<Campo, string>>({ web: "", negocio: "", nombre: "", email: "", whatsapp: "" });
  const [consentimiento, setConsentimiento] = useState(false);
  const [error, setError] = useState("");
  const [estado, setEstado] = useState<"form" | "analizando" | "listo">("form");
  const [frase, setFrase] = useState(0);
  const [respuesta, setRespuesta] = useState<Respuesta | null>(null);
  const trampa = useRef<HTMLInputElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { if (estado === "form") input.current?.focus({ preventScroll: true }); }, [paso, estado]);
  useEffect(() => {
    if (estado !== "analizando") return;
    const t = setInterval(() => setFrase((f) => Math.min(f + 1, ANALIZANDO.length - 1)), 1600);
    return () => clearInterval(t);
  }, [estado]);

  const actual = PASOS[paso];
  const ultimo = paso === PASOS.length - 1;

  function validar(campo: Campo, valor: string) {
    const v = valor.trim();
    if (campo === "web") return /^(https?:\/\/)?[^\s/]+\.[^\s]{2,}/i.test(v) ? "" : "Escribe una dirección como tunegocio.com";
    if (campo === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "Revisa tu email";
    if (campo === "whatsapp") return /^[+\d][\d\s().-]{7,20}$/.test(v) ? "" : "Revisa el número (con prefijo si no es de España)";
    return v.length >= 2 ? "" : "Este dato es necesario";
  }

  async function avanzar() {
    const fallo = validar(actual.campo, datos[actual.campo]);
    if (fallo) return setError(fallo);
    if (!ultimo) { setError(""); return setPaso(paso + 1); }
    if (!consentimiento) return setError("Marca la casilla para que pueda enviarte el informe");
    setError(""); setEstado("analizando"); setFrase(0);
    try {
      const res = await fetch("/api/auditoria-aeo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...datos, consentimiento: true, empresa_web: trampa.current?.value || "", origen }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "No he podido analizar tu web. Inténtalo de nuevo.");
      setRespuesta(json); setEstado("listo");
      window.scrollTo({ top: (document.getElementById("auditoria-aeo")?.offsetTop || 0) - 90, behavior: "smooth" });
    } catch (e) {
      setEstado("form"); setPaso(0);
      setError(e instanceof Error ? e.message : "Algo ha fallado. Inténtalo de nuevo.");
    }
  }

  if (estado === "analizando") {
    return (
      <Marco>
        <div className="flex min-h-[360px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-300" />
          <p className="mt-6 text-lg font-semibold text-white">{ANALIZANDO[frase]}</p>
          <p className="mt-2 text-sm text-slate-400">Tarda unos segundos.</p>
        </div>
      </Marco>
    );
  }

  if (estado === "listo" && respuesta) {
    const { resultado, revisionManual, guardado } = respuesta;
    const color = COLOR_NIVEL[resultado.nivel] || "#D6B25E";
    const mensaje = encodeURIComponent(`Hola Andrés, he hecho la auditoría AEO de ${datos.negocio} (${resultado.url}) y me ha salido ${revisionManual ? "para revisión manual" : `${resultado.nota}/100`}. ¿Me explicas cómo mejorarla?`);
    return (
      <Marco>
        {revisionManual ? (
          <div className="flex items-start gap-4">
            <ShieldAlert className="h-10 w-10 shrink-0 text-gold" />
            <div>
              <p className="text-xl font-semibold text-white">Tu web no nos ha dejado entrar</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{resultado.hallazgos[0]?.detalle}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${resultado.nota * 3.6}deg, rgba(255,255,255,.08) 0)` }}>
              <div className="grid h-28 w-28 place-items-center rounded-full bg-ink text-center">
                <div><span className="text-4xl font-semibold text-white">{resultado.nota}</span><span className="block text-xs text-slate-400">de 100</span></div>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold uppercase tracking-[.2em]" style={{ color }}>{TEXTO_NIVEL[resultado.nivel]}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{resultado.nota >= 70 ? "La IA puede leerte. Queda afinar para que te cite." : resultado.nota >= 50 ? "La IA te lee a medias: estás perdiendo respuestas." : "Para ChatGPT y Perplexity, tu web casi no existe."}</p>
              <p className="mt-2 break-all text-sm text-slate-400">{resultado.url}</p>
            </div>
          </div>
        )}

        {!revisionManual && (
          <div className="mt-8 grid gap-3">
            {resultado.ejes.map((e) => (
              <div key={e.id}>
                <div className="flex justify-between text-sm text-slate-300"><span>{e.nombre}</span><span className="font-semibold text-white">{e.nota}</span></div>
                <div className="mt-1 h-2 rounded-full bg-white/[.07]"><div className="h-2 rounded-full" style={{ width: `${e.nota}%`, background: e.nota >= 70 ? "#22d3ee" : e.nota >= 50 ? "#D6B25E" : "#f87171" }} /></div>
              </div>
            ))}
          </div>
        )}

        {resultado.hallazgos.length > 0 && !revisionManual && (
          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-gold">Lo primero que arreglaría</p>
            <ul className="mt-4 grid gap-3">
              {resultado.hallazgos.slice(0, 4).map((h) => (
                <li key={h.titulo} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${COLOR_SEV[h.severidad]}`}>{ETIQUETA_SEV[h.severidad]}</span>
                    <span className="font-semibold text-white">{h.titulo}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{h.detalle}</p>
                  <p className="mt-1 text-xs text-slate-500">Arreglarlo: {h.esfuerzo}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/10 p-5">
          <p className="font-semibold text-white">{guardado?.email ? `${datos.nombre}, te acabo de enviar el informe completo a ${datos.email}.` : `${datos.nombre}, te enviaré el informe completo a ${datos.email} en menos de 24 horas.`}</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">Si prefieres que te lo explique en 10 minutos, escríbeme por WhatsApp.</p>
          <a href={`https://wa.me/${WHATSAPP}?text=${mensaje}`} target="_blank" rel="noopener noreferrer" className="focus-premium mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5">
            <MessageCircle className="h-4 w-4" /> Explícamelo por WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">Análisis automático y rápido de la página que nos diste, sin ejecutar JavaScript. Mide las condiciones para que la IA te lea y te cite; nadie puede garantizar que un modelo concreto te cite.</p>
      </Marco>
    );
  }

  return (
    <Marco>
      <div className="mb-6 h-1.5 rounded-full bg-white/[.07]" aria-hidden="true">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-gold transition-all duration-500" style={{ width: `${((paso + 1) / PASOS.length) * 100}%` }} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); avanzar(); }} noValidate>
        <p className="text-sm font-semibold text-cyan-200">{paso + 1} de {PASOS.length}</p>
        <label htmlFor={`aeo-${actual.campo}`} className="mt-2 block text-2xl font-semibold text-white md:text-3xl">{actual.titulo}</label>
        <p className="mt-2 text-sm text-slate-400">{actual.ayuda}</p>
        <input
          ref={input} id={`aeo-${actual.campo}`} name={actual.campo} type={actual.tipo} inputMode={actual.tipo === "tel" ? "tel" : undefined}
          autoComplete={actual.autoComplete} placeholder={actual.placeholder} value={datos[actual.campo]}
          onChange={(e) => { setDatos({ ...datos, [actual.campo]: e.target.value }); setError(""); }}
          aria-invalid={Boolean(error)} aria-describedby="aeo-error"
          className="focus-premium mt-6 w-full rounded-2xl border border-white/12 bg-white/[.05] px-5 py-4 text-lg text-white placeholder:text-slate-500"
        />
        {/* Campo trampa para robots: invisible para personas */}
        <input ref={trampa} name="empresa_web" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
        {ultimo && (
          <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-300">
            <input type="checkbox" checked={consentimiento} onChange={(e) => { setConsentimiento(e.target.checked); setError(""); }} className="mt-1 h-4 w-4 accent-cyan-300" />
            <span>Acepto la <Link href="/politica-privacidad" className="text-cyan-200 underline">política de privacidad</Link> y recibir por email el informe y consejos relacionados. Puedes darte de baja cuando quieras.</span>
          </label>
        )}
        <p id="aeo-error" className="mt-3 min-h-[1.25rem] text-sm text-red-300" role="alert">{error}</p>
        <div className="mt-4 flex items-center gap-3">
          {paso > 0 && (
            <button type="button" onClick={() => { setPaso(paso - 1); setError(""); }} className="focus-premium inline-flex items-center gap-1 rounded-full border border-white/12 px-4 py-3 text-sm text-slate-300 hover:text-white" aria-label="Pregunta anterior">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <button type="submit" className="focus-premium inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-cyan-50">
            {ultimo ? "Analizar mi web gratis" : "Continuar"} <ArrowRight className="h-4 w-4" />
          </button>
          <span className="hidden text-xs text-slate-500 sm:inline">o pulsa Intro</span>
        </div>
      </form>
      <ul className="mt-8 grid gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:grid-cols-3">
        {["Gratis y en 30 segundos", "Nota de 0 a 100 al momento", "Sin llamadas comerciales"].map((t) => (
          <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> {t}</li>
        ))}
      </ul>
    </Marco>
  );
}

function Marco({ children }: { children: React.ReactNode }) {
  return <div id="auditoria-aeo" className="premium-border glass-panel relative rounded-[1.75rem] p-6 shadow-premium md:p-9">{children}</div>;
}
