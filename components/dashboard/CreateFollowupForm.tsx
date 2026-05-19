"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { createFollowup } from "@/app/dashboard/actions";

const CHANNELS = ["WhatsApp", "Email", "Llamada", "Instagram", "LinkedIn", "Otro"];

export function CreateFollowupForm({ leadId }: { leadId: string }) {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState("WhatsApp");
  const [message, setMessage] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) { setError("El mensaje es obligatorio."); return; }
    setError(null);
    startTransition(async () => {
      const res = await createFollowup(leadId, {
        channel,
        message: message.trim(),
        scheduledAt: scheduledAt || undefined,
      });
      if (res?.error) setError(res.error);
      else { setOpen(false); setMessage(""); setScheduledAt(""); }
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-orange-300/10 px-4 py-2.5 text-sm font-medium text-orange-300 transition hover:bg-orange-300/20"
      >
        <Plus className="h-4 w-4" />
        Crear seguimiento
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-white/4 p-4 space-y-3">
      <p className="text-sm font-semibold text-white">Nuevo seguimiento</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs text-slate-500">Canal</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
          >
            {CHANNELS.map((c) => (
              <option key={c} value={c} className="bg-[#07091a]">{c}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-500">Fecha programada (opcional)</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300/50"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-slate-500">Mensaje</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Mensaje para este seguimiento…"
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-300/50"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-orange-300/10 px-4 py-2 text-sm font-medium text-orange-300 hover:bg-orange-300/20 disabled:opacity-60"
        >
          {isPending ? "Guardando…" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl px-4 py-2 text-sm text-slate-500 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
