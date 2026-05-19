import { getLeadsWithDiagnostics } from "@/lib/dashboard/queries";
import { LeadTable } from "@/components/dashboard/LeadTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Leads · Dashboard",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  const { leads, diagnostics } = await getLeadsWithDiagnostics();
  const showDiagnostics = process.env.NODE_ENV !== "production";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <p className="mt-1 text-sm text-slate-500">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} registrado{leads.length !== 1 ? "s" : ""}
        </p>
      </div>

      {showDiagnostics && (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4 text-xs leading-5 text-amber-100">
          <p className="font-semibold">Diagnóstico desarrollo</p>
          <p>Supabase URL: {diagnostics.supabaseUrl ?? "no configurada"}</p>
          <p>Admin client: {diagnostics.hasAdminClient ? "sí" : "no"}</p>
          <p>Total leads leído: {diagnostics.total}</p>
          <p>Error query: {diagnostics.error ?? "ninguno"}</p>
        </div>
      )}

      {diagnostics.error && (
        <div className="rounded-2xl border border-red-300/20 bg-red-300/8 p-4 text-sm text-red-100">
          No se pudieron cargar los leads. Revisa los logs del servidor.
        </div>
      )}

      <LeadTable leads={leads} />
    </div>
  );
}
