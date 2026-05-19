import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllAudits } from "@/lib/dashboard/queries";

export const metadata = {
  title: "Auditorías · Dashboard",
  robots: { index: false, follow: false },
};

export default async function AuditoriasPage() {
  const audits = await getAllAudits();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Auditorías</h1>
        <p className="mt-1 text-sm text-slate-500">
          {audits.length} auditoría{audits.length !== 1 ? "s" : ""} generada{audits.length !== 1 ? "s" : ""}
        </p>
      </div>

      {audits.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/[.03] py-16 text-center">
          <p className="text-slate-500">No hay auditorías todavía.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">Negocio</th>
                <th className="px-4 py-3 font-medium text-slate-500">Contacto</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 sm:table-cell">Score</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 md:table-cell">Oferta recomendada</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 lg:table-cell">Fecha</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {audits.map((audit, i) => {
                const score = audit.score ?? 0;
                const scoreColor =
                  score >= 70 ? "text-emerald-300" : score >= 40 ? "text-amber-300" : "text-red-400";
                return (
                  <tr key={audit.id} className={i % 2 === 0 ? "bg-white/[.015]" : ""}>
                    <td className="px-4 py-3 font-medium text-white">{audit.lead_business}</td>
                    <td className="px-4 py-3 text-slate-400">{audit.lead_name}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={`font-bold tabular-nums ${scoreColor}`}>{score}/100</span>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-300 md:table-cell">
                      {audit.recommended_offer ?? "—"}
                    </td>
                    <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                      {new Date(audit.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${audit.lead_id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/8 hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
