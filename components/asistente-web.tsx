"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import type { AccionAsistente, MensajeChat } from "@/lib/ai/asistente";

const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

const sugerencias = ["¿Cuánto cuesta una web?", "¿Qué es el AEO?", "Quiero este asistente en mi web", "Enséñame proyectos"];

const saludo: MensajeChat = {
  role: "assistant",
  content: "Hola, soy el asistente de Andrés. Te cuento precios, cómo trabaja o qué puede hacer por tu negocio. ¿Qué necesitas?",
};

type Mensaje = MensajeChat & { accion?: AccionAsistente };

export function AsistenteWeb() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([saludo]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const [formulario, setFormulario] = useState(false);
  const [estadoLead, setEstadoLead] = useState<"" | "enviando" | "ok" | "error">("");
  const lista = useRef<HTMLDivElement>(null);
  const entrada = useRef<HTMLInputElement>(null);

  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: "smooth" });
  }, [mensajes, pensando, formulario]);

  useEffect(() => {
    const abrir = () => setAbierto(true);
    window.addEventListener("abrir-asistente", abrir);
    return () => window.removeEventListener("abrir-asistente", abrir);
  }, []);

  useEffect(() => {
    if (abierto) entrada.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [abierto]);

  async function enviar(contenido: string) {
    const limpio = contenido.trim().slice(0, 600);
    if (!limpio || pensando) return;
    const nuevos: Mensaje[] = [...mensajes, { role: "user", content: limpio }];
    setMensajes(nuevos);
    setTexto("");
    setPensando(true);
    try {
      const res = await fetch("/api/asistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: nuevos.filter((m) => m !== saludo).map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json();
      setMensajes((m) => [...m, { role: "assistant", content: data.respuesta, accion: data.accion }]);
      if (data.accion === "contacto") setFormulario(true);
    } catch {
      setMensajes((m) => [...m, { role: "assistant", content: "No he podido responder ahora. Escríbele a Andrés por WhatsApp y te contesta él.", accion: "whatsapp" }]);
    } finally {
      setPensando(false);
    }
  }

  function enlaceWhatsApp() {
    const ultima = [...mensajes].reverse().find((m) => m.role === "user")?.content;
    const t = `Hola Andrés, vengo del asistente de tu web.${ultima ? ` Te preguntaba: ${ultima}` : ""}`;
    return WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}` : `/whatsapp?texto=${encodeURIComponent(t)}`;
  }

  async function enviarLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const preguntas = mensajes.filter((m) => m.role === "user").map((m) => m.content);
    setEstadoLead("enviando");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.get("nombre"),
          business_name: d.get("negocio"),
          sector: d.get("negocio"),
          whatsapp: d.get("whatsapp"),
          main_problem: preguntas.at(-1) || "Contacto desde el asistente web",
          service: "Consulta desde el asistente web",
          message: preguntas.join(" | ").slice(0, 1500),
          source: "asistente-web",
        }),
      });
      setEstadoLead(res.ok ? "ok" : "error");
    } catch {
      setEstadoLead("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-expanded={abierto}
        aria-controls="asistente-panel"
        className="focus-premium fixed bottom-5 right-5 z-50 flex items-center gap-2.5 btn-ia rounded-full py-3 pl-3.5 pr-5 text-sm font-semibold transition hover:-translate-y-0.5"
      >
        {abierto ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {abierto ? "Cerrar" : "Pregúntame"}
      </button>

      {abierto && (
        <section
          id="asistente-panel"
          aria-label="Asistente de Andrés"
          className="fixed inset-x-3 bottom-20 z-50 flex max-h-[min(36rem,calc(100svh-7rem))] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#0c0c0e]/95 shadow-[0_40px_120px_rgba(0,0,0,.7)] backdrop-blur-2xl sm:inset-x-auto sm:right-5 sm:w-[24rem]"
        >
          <header className="border-b border-white/10 px-5 py-4">
            <p className="font-semibold text-white">Asistente de Andrés</p>
            <p className="mt-0.5 text-xs text-slate-400">Responde con IA. Para algo concreto, te paso con Andrés.</p>
          </header>

          <div ref={lista} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {mensajes.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-6 ${m.role === "user" ? "bg-lima-300 text-ink" : "bg-white/[.06] text-slate-100"}`}>{m.content}</p>
                {m.role === "assistant" && m.accion && m.accion !== "contacto" && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.accion === "auditoria" && <Link href="/auditoria-gratis?source=asistente-web" className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10">Pedir la auditoría gratis</Link>}
                    {m.accion === "proyectos" && <Link href="/proyectos" onClick={() => setAbierto(false)} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10">Ver proyectos</Link>}
                    <a href={enlaceWhatsApp()} target="_blank" rel="noopener" className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10">Hablar por WhatsApp</a>
                    {!formulario && <button type="button" onClick={() => setFormulario(true)} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10">Que me escriba Andrés</button>}
                  </div>
                )}
              </div>
            ))}
            {pensando && <p className="w-16 animate-pulse rounded-2xl bg-white/[.06] px-4 py-2.5 text-sm text-slate-400">···</p>}

            {mensajes.length === 1 && !pensando && (
              <div className="flex flex-wrap gap-2 pt-1">
                {sugerencias.map((s) => (
                  <button key={s} type="button" onClick={() => enviar(s)} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-slate-200 hover:bg-white/10">{s}</button>
                ))}
              </div>
            )}

            {formulario && (
              estadoLead === "ok" ? (
                <p className="rounded-2xl bg-white/[.06] px-4 py-3 text-sm text-slate-100">Hecho. Andrés te escribirá por WhatsApp.</p>
              ) : (
                <form onSubmit={enviarLead} className="space-y-2 rounded-2xl border border-white/10 p-3">
                  <p className="text-sm text-slate-200">Déjame tus datos y Andrés te escribe por WhatsApp.</p>
                  <input name="nombre" required minLength={2} placeholder="Tu nombre" autoComplete="name" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-3 py-2 text-sm text-white placeholder:text-slate-500" />
                  <input name="negocio" required minLength={2} placeholder="Tu negocio (por ejemplo, barbería en Gràcia)" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-3 py-2 text-sm text-white placeholder:text-slate-500" />
                  <input name="whatsapp" required inputMode="tel" pattern="[0-9+ ]{9,16}" placeholder="Tu WhatsApp" autoComplete="tel" className="w-full rounded-xl border border-white/15 bg-white/[.04] px-3 py-2 text-sm text-white placeholder:text-slate-500" />
                  <button type="submit" disabled={estadoLead === "enviando"} className="w-full rounded-xl bg-lima-300 py-2 text-sm font-semibold text-ink disabled:opacity-60">{estadoLead === "enviando" ? "Enviando…" : "Enviar mis datos"}</button>
                  {estadoLead === "error" && <p className="text-xs text-red-300">No se han podido enviar. Escríbele por WhatsApp desde el botón de arriba.</p>}
                  <p className="text-[11px] leading-4 text-slate-500">Solo para responderte. Más en la <Link href="/politica-privacidad" className="underline">política de privacidad</Link>.</p>
                </form>
              )
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); enviar(texto); }} className="flex items-center gap-2 border-t border-white/10 p-3">
            <input
              ref={entrada}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={600}
              placeholder="Escribe tu pregunta"
              aria-label="Escribe tu pregunta"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-lima-300 focus:outline-none"
            />
            <button type="submit" disabled={!texto.trim() || pensando} aria-label="Enviar" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lima-300 text-ink disabled:opacity-40">
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
