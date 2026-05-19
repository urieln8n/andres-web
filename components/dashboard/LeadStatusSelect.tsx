"use client";

import { useState, useTransition } from "react";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/dashboard/types";
import { updateLeadStatus } from "@/app/dashboard/actions";

const ALL_STATUSES = Object.entries(LEAD_STATUS_LABELS) as [LeadStatus, string][];

export function LeadStatusSelect({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: LeadStatus) => {
    setStatus(value);
    setError(null);
    startTransition(async () => {
      const res = await updateLeadStatus(leadId, value);
      if (res?.error) setError(res.error);
    });
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-medium uppercase tracking-widest text-slate-500">Estado</label>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as LeadStatus)}
        disabled={isPending}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-300/50 disabled:opacity-60"
      >
        {ALL_STATUSES.map(([val, label]) => (
          <option key={val} value={val} className="bg-[#07091a]">
            {label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
