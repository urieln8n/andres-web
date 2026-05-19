import { getLeads } from "@/lib/dashboard/queries";
import { LeadTable } from "@/components/dashboard/LeadTable";

export const metadata = {
  title: "Leads · Dashboard",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-1 text-sm text-slate-500">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} registrado{leads.length !== 1 ? "s" : ""}
        </p>
      </div>
      <LeadTable leads={leads} />
    </div>
  );
}
