"use client";

import { useState, useTransition } from "react";
import { FileText, RefreshCw } from "lucide-react";
import { generateProposalForLead } from "@/app/dashboard/actions";
import { CopyWhatsAppButton } from "./CopyWhatsAppButton";

export function GenerateProposalButton({
  leadId,
  leadPhone,
  hasProposal,
}: {
  leadId: string;
  leadPhone?: string | null;
  hasProposal: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [waMessage, setWaMessage] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState<boolean | null>(null);

  const handleGenerate = () => {
    setError(null);
    setWaMessage(null);
    setIsDemo(null);
    startTransition(async () => {
      const res = await generateProposalForLead(leadId);
      if (res?.error) setError(res.error);
      else {
        setIsDemo(res.isDemo ?? false);
        setWaMessage(res.whatsappMessage ?? null);
      }
    });
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-amber-300/10 px-4 py-2.5 text-sm font-medium text-amber-300 transition hover:bg-amber-300/20 disabled:opacity-60"
      >
        {isPending ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Generando propuesta…
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            {hasProposal ? "Generar nueva propuesta" : "Generar propuesta IA"}
          </>
        )}
      </button>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {isDemo === true && (
        <p className="text-xs text-amber-400">Propuesta demo (sin OPENAI_API_KEY activa)</p>
      )}
      {isDemo === false && (
        <p className="text-xs text-emerald-400">Propuesta generada con IA</p>
      )}
      {waMessage && (
        <div className="mt-2 flex flex-wrap gap-2">
          <CopyWhatsAppButton message={waMessage} label="Copiar mensaje WA" />
          {leadPhone && (
            <CopyWhatsAppButton message={waMessage} phone={leadPhone} variant="open" />
          )}
        </div>
      )}
    </div>
  );
}
