"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";
import { updateLeadNotes } from "@/app/dashboard/actions";

export function LeadNotesEditor({
  leadId,
  initialNotes,
}: {
  leadId: string;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await updateLeadNotes(leadId, notes);
      if (res?.error) setError(res.error);
      else setSaved(true);
    });
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
        Notas internas
      </label>
      <textarea
        value={notes}
        onChange={(e) => { setNotes(e.target.value); setSaved(false); }}
        rows={5}
        placeholder="Observaciones privadas sobre este lead…"
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-300/50"
      />
      <div className="flex items-center justify-between">
        {error && <p className="text-xs text-red-400">{error}</p>}
        {saved && !error && <p className="text-xs text-emerald-400">Guardado</p>}
        {!error && !saved && <span />}
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-300/20 disabled:opacity-60"
        >
          <Save className="h-3.5 w-3.5" />
          {isPending ? "Guardando…" : "Guardar notas"}
        </button>
      </div>
    </div>
  );
}
