import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Lead } from "@/lib/dashboard/types";
import { LeadStatusBadge } from "./LeadStatusBadge";

export function LeadTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-white/8 bg-white/[.03] py-16 text-center">
        <p className="text-slate-500">No hay leads todavía.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/8">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8 text-left">
            <th className="px-4 py-3 font-medium text-slate-500">Nombre</th>
            <th className="px-4 py-3 font-medium text-slate-500">Negocio</th>
            <th className="hidden px-4 py-3 font-medium text-slate-500 md:table-cell">Sector</th>
            <th className="hidden px-4 py-3 font-medium text-slate-500 sm:table-cell">Estado</th>
            <th className="hidden px-4 py-3 font-medium text-slate-500 lg:table-cell">Fecha</th>
            <th className="w-10 px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr
              key={lead.id}
              className={i % 2 === 0 ? "bg-white/[.015]" : ""}
            >
              <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
              <td className="px-4 py-3 text-slate-300">{lead.business_name}</td>
              <td className="hidden px-4 py-3 text-slate-400 md:table-cell">
                {lead.sector ?? "—"}
              </td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                {new Date(lead.created_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/dashboard/leads/${lead.id}`}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/8 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
