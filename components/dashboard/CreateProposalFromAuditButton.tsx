"use client";

import { useState, useTransition } from "react";
import { FileText, RefreshCw } from "lucide-react";
import { createProposalFromAudit } from "@/app/dashboard/actions";
import { CopyWhatsAppButton } from "./CopyWhatsAppButton";

export function CreateProposalFromAuditButton({
  auditId,
  leadPhone,
}: {
  auditId: string;
  leadPhone?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [waMessage, setWaMessage] = useState<string | null>(null);

  const handleClick = () => {
    setError(null);
    setWaMessage(null);
    startTransition(async () => {
      const res = await createProposalFromAudit(auditId);
      if (res?.error) {
        setError(res.error);
      } else {
        setWaMessage(res.whatsappMessage ?? null);
      }
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-60"
      >
        {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Crear propuesta desde auditoría
      </button>
      {error && <p className="text-xs text-red-300">{error}</p>}
      {waMessage && (
        <div className="flex flex-wrap gap-2">
          <CopyWhatsAppButton message={waMessage} />
          {leadPhone && <CopyWhatsAppButton message={waMessage} phone={leadPhone} variant="open" />}
        </div>
      )}
    </div>
  );
}
