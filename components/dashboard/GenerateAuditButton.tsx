"use client";

import { useState, useTransition } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { generateAuditForLead } from "@/app/dashboard/actions";

export function GenerateAuditButton({
  leadId,
  hasAudit,
}: {
  leadId: string;
  hasAudit: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean | null>(null);

  const handleGenerate = () => {
    setError(null);
    setIsDemo(null);
    startTransition(async () => {
      const res = await generateAuditForLead(leadId);
      if (res?.error) setError(res.error);
      else setIsDemo(res.isDemo ?? false);
    });
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-violet-300/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition hover:bg-violet-300/20 disabled:opacity-60"
      >
        {isPending ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generando auditoría…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            {hasAudit ? "Regenerar auditoría IA" : "Generar auditoría IA"}
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {isDemo === true && (
        <p className="text-xs text-amber-400">
          Auditoría demo (sin OPENAI_API_KEY activa)
        </p>
      )}
      {isDemo === false && (
        <p className="text-xs text-emerald-400">Auditoría generada con IA</p>
      )}
    </div>
  );
}
