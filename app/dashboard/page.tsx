import { Users, FileSearch, FileText, Trophy, CalendarClock, Inbox } from "lucide-react";
import { getLeadStats, getLeads } from "@/lib/dashboard/queries";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadTable } from "@/components/dashboard/LeadTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Resumen · Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([getLeadStats(), getLeads()]);
  const recent = leads.slice(0, 10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Resumen</h1>
        <p className="mt-1 text-sm text-slate-500">
          Visión general del sistema de captación
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Total leads" value={stats.total} icon={Users} accent="cyan" />
        <KpiCard label="Nuevos" value={stats.new_count} icon={Inbox} accent="violet" />
        <KpiCard label="Auditorías" value={stats.audits_count} icon={FileSearch} accent="violet" />
        <KpiCard label="Propuestas activas" value={stats.proposals_open} icon={FileText} accent="gold" />
        <KpiCard label="Ganados" value={stats.won_count} icon={Trophy} accent="emerald" />
        <KpiCard label="En seguimiento" value={stats.follow_up_count} icon={CalendarClock} accent="orange" />
      </div>

      {/* Recent leads */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Últimos leads</h2>
        <LeadTable leads={recent} />
      </div>
    </div>
  );
}
