import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllProposals } from "@/lib/dashboard/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Propuestas · Dashboard",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Borrador",
  sent: "Enviada",
  accepted: "Aceptada",
  rejected: "Rechazada",
};

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-300/10 text-slate-400",
  sent: "bg-amber-300/10 text-amber-300",
  accepted: "bg-emerald-300/10 text-emerald-300",
  rejected: "bg-red-300/10 text-red-400",
};

export default async function PropuestasPage() {
  const proposals = await getAllProposals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Propuestas</h1>
        <p className="mt-1 text-sm text-slate-500">
          {proposals.length} propuesta{proposals.length !== 1 ? "s" : ""}
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/[.03] py-16 text-center">
          <p className="text-slate-500">No hay propuestas todavía.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">Título</th>
                <th className="px-4 py-3 font-medium text-slate-500">Negocio</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 sm:table-cell">Paquete</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 md:table-cell">Precio</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 sm:table-cell">Estado</th>
                <th className="hidden px-4 py-3 font-medium text-slate-500 lg:table-cell">Fecha</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {proposals.map((p, i) => {
                const colorClass = STATUS_COLORS[p.status] ?? STATUS_COLORS.draft;
                const label = STATUS_LABELS[p.status] ?? p.status;
                return (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white/[.015]" : ""}>
                    <td className="px-4 py-3 font-medium text-white">{p.title ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-400">{p.lead_business}</td>
                    <td className="hidden px-4 py-3 text-slate-300 sm:table-cell">
                      {p.package_type ?? "—"}
                    </td>
                    <td className="hidden px-4 py-3 font-semibold text-gold md:table-cell">
                      {p.price ?? "—"}
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
                        {label}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-500 lg:table-cell">
                      {new Date(p.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/leads/${p.lead_id}`}
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
