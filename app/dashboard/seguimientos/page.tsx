import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllFollowups } from "@/lib/dashboard/queries";

export const metadata = {
  title: "Seguimientos · Dashboard",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  sent: "Enviado",
  done: "Hecho",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-slate-300/10 text-slate-400",
  sent: "bg-amber-300/10 text-amber-300",
  done: "bg-emerald-300/10 text-emerald-300",
};

export default async function SeguimientosPage() {
  const followups = await getAllFollowups();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Seguimientos</h1>
        <p className="mt-1 text-sm text-slate-500">
          {followups.length} seguimiento{followups.length !== 1 ? "s" : ""}
        </p>
      </div>

      {followups.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/[.03] py-16 text-center">
          <p className="text-slate-500">No hay seguimientos programados.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">Negocio</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 sm:table-cell">Canal</th>
                <th className="px-4 py-3 font-medium text-slate-500">Mensaje</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 md:table-cell">Programado</th>
                <th className="px-4 py-3 font-medium text-slate-500">Estado</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {followups.map((f, i) => {
                const colorClass = STATUS_COLORS[f.status] ?? STATUS_COLORS.pending;
                const label = STATUS_LABELS[f.status] ?? f.status;
                return (
                  <tr key={f.id} className={i % 2 === 0 ? "bg-white/[.015]" : ""}>
                    <td className="px-4 py-3 font-medium text-white">{f.lead_business}</td>
                    <td className="hidden px-4 py-3 text-orange-300 sm:table-cell">{f.channel}</td>
                    <td className="max-w-xs px-4 py-3 text-slate-400">
                      <span className="line-clamp-1">{f.message ?? "—"}</span>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-500 md:table-cell">
                      {f.scheduled_at
                        ? new Date(f.scheduled_at).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${f.lead_id}`}
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
