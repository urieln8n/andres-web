"use client";

import { useState, useTransition } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { generateAuditForLead } from "@/app/dashboard/actions";

export function AuditGeneratorButton({ leadId, hasAudit }: { leadId: string; hasAudit: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleGenerate = () => {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const res = await generateAuditForLead(leadId);
      if (res?.error) {
        setError(res.error);
      } else {
        setMessage(res.message ?? "Auditoría generada con IA");
      }
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-violet-300/10 px-4 py-2.5 text-sm font-medium text-violet-200 ring-1 ring-violet-300/20 transition hover:bg-violet-300/20 disabled:opacity-60"
      >
        {isPending ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generando auditoría IA
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {hasAudit ? "Regenerar auditoría" : "Generar auditoría IA"}
          </>
        )}
      </button>
      {error && <p className="max-w-xs text-xs leading-5 text-red-300">{error}</p>}
      {message && (
        <p className={`max-w-xs text-xs leading-5 ${message.includes("OPENAI_API_KEY") ? "text-amber-300" : "text-emerald-300"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
