import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Audit, Followup, Lead, LeadStats, Proposal } from "./types";

function db() {
  return getSupabaseAdmin();
}

export async function getLeadStats(): Promise<LeadStats> {
  const supabase = db();
  if (!supabase) return { total: 0, new_count: 0, audits_count: 0, proposals_open: 0, won_count: 0, follow_up_count: 0 };

  const [leadsRes, auditsRes, proposalsRes] = await Promise.all([
    supabase.from("leads").select("status"),
    supabase.from("audits").select("id", { count: "exact", head: true }),
    supabase.from("proposals").select("status").in("status", ["draft", "sent"]),
  ]);

  const leads = leadsRes.data ?? [];
  return {
    total: leads.length,
    new_count: leads.filter((l) => l.status === "new").length,
    audits_count: auditsRes.count ?? 0,
    proposals_open: proposalsRes.data?.length ?? 0,
    won_count: leads.filter((l) => l.status === "won").length,
    follow_up_count: leads.filter((l) => l.status === "follow_up").length,
  };
}

export async function getLeads(): Promise<Lead[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("[getLeads]", error.message); return []; }
  return (data ?? []) as Lead[];
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = db();
  if (!supabase) return null;
  const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
  if (error) { console.error("[getLeadById]", error.message); return null; }
  return data as Lead;
}

export async function getLeadAudit(leadId: string): Promise<Audit | null> {
  const supabase = db();
  if (!supabase) return null;
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as Audit) ?? null;
}

export async function getAuditsByLeadId(leadId: string): Promise<Audit[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  return (data ?? []) as Audit[];
}

export async function getLatestAuditForLead(leadId: string): Promise<Audit | null> {
  return getLeadAudit(leadId);
}

export async function getLeadProposals(leadId: string): Promise<Proposal[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("proposals")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  return (data ?? []) as Proposal[];
}

export async function getLeadFollowups(leadId: string): Promise<Followup[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("followups")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });
  return (data ?? []) as Followup[];
}

export async function getAllAudits(): Promise<(Audit & { lead_name: string; lead_business: string })[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("audits")
    .select("*, leads(name, business_name)")
    .order("created_at", { ascending: false });
  return ((data ?? []) as unknown[]).map((a) => {
    const row = a as Audit & { leads: { name: string; business_name: string } | null };
    return { ...row, lead_name: row.leads?.name ?? "—", lead_business: row.leads?.business_name ?? "—" };
  });
}

export async function getAllProposals(): Promise<(Proposal & { lead_name: string; lead_business: string })[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("proposals")
    .select("*, leads(name, business_name)")
    .order("created_at", { ascending: false });
  return ((data ?? []) as unknown[]).map((p) => {
    const row = p as Proposal & { leads: { name: string; business_name: string } | null };
    return { ...row, lead_name: row.leads?.name ?? "—", lead_business: row.leads?.business_name ?? "—" };
  });
}

export async function getAllFollowups(): Promise<(Followup & { lead_name: string; lead_business: string })[]> {
  const supabase = db();
  if (!supabase) return [];
  const { data } = await supabase
    .from("followups")
    .select("*, leads(name, business_name)")
    .order("scheduled_at", { ascending: true, nullsFirst: false });
  return ((data ?? []) as unknown[]).map((f) => {
    const row = f as Followup & { leads: { name: string; business_name: string } | null };
    return { ...row, lead_name: row.leads?.name ?? "—", lead_business: row.leads?.business_name ?? "—" };
  });
}
