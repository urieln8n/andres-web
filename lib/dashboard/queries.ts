import { getSupabaseAdmin } from "@/lib/supabase-admin";
import type { Audit, Followup, Lead, LeadStats, Proposal } from "./types";

const LEAD_SELECT = [
  "id",
  "name",
  "email",
  "phone",
  "whatsapp",
  "business_name",
  "website",
  "website_url",
  "instagram_url",
  "sector",
  "city",
  "main_problem",
  "goal",
  "service",
  "service_interest",
  "budget",
  "message",
  "internal_notes",
  "status",
  "source",
  "estimated_value",
  "created_at",
  "updated_at",
].join(",");

const VALID_LEAD_STATUSES = new Set([
  "new",
  "contacted",
  "audit_generated",
  "proposal_sent",
  "won",
  "lost",
  "follow_up",
]);

function db() {
  return getSupabaseAdmin();
}

function normalizeLead(row: Lead): Lead {
  return {
    ...row,
    status: VALID_LEAD_STATUSES.has(row.status) ? row.status : "new",
    website: row.website ?? row.website_url,
    website_url: row.website_url ?? row.website,
    service: row.service ?? row.service_interest,
    service_interest: row.service_interest ?? row.service,
    main_problem: row.main_problem ?? row.goal,
    goal: row.goal ?? row.main_problem,
  };
}

function partialSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname.slice(0, 8)}...`;
  } catch {
    return `${url.slice(0, 16)}...`;
  }
}

export interface LeadQueryDiagnostics {
  total: number;
  error: string | null;
  hasAdminClient: boolean;
  supabaseUrl: string | null;
}

export interface LeadQueryResult {
  leads: Lead[];
  diagnostics: LeadQueryDiagnostics;
}

export async function getLeadStats(): Promise<LeadStats> {
  const supabase = db();
  if (!supabase) return { total: 0, new_count: 0, audits_count: 0, proposals_open: 0, won_count: 0, follow_up_count: 0 };

  const [leadsRes, auditsRes, proposalsRes] = await Promise.all([
    supabase.from("leads").select("status"),
    supabase.from("audits").select("id", { count: "exact", head: true }),
    supabase.from("proposals").select("status").in("status", ["draft", "sent"]),
  ]);

  if (leadsRes.error) console.error("[getLeadStats:leads]", leadsRes.error.message);
  if (auditsRes.error) console.error("[getLeadStats:audits]", auditsRes.error.message);
  if (proposalsRes.error) console.error("[getLeadStats:proposals]", proposalsRes.error.message);

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

export async function getLeadsWithDiagnostics(): Promise<LeadQueryResult> {
  const supabase = db();
  if (!supabase) {
    const error = "Supabase admin client no configurado";
    console.error("[getLeads]", {
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
    return {
      leads: [],
      diagnostics: {
        total: 0,
        error,
        hasAdminClient: false,
        supabaseUrl: partialSupabaseUrl(),
      },
    };
  }

  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getLeads]", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return {
      leads: [],
      diagnostics: {
        total: 0,
        error: error.message,
        hasAdminClient: true,
        supabaseUrl: partialSupabaseUrl(),
      },
    };
  }

  const leads = ((data ?? []) as unknown as Lead[]).map(normalizeLead);
  return {
    leads,
    diagnostics: {
      total: leads.length,
      error: null,
      hasAdminClient: true,
      supabaseUrl: partialSupabaseUrl(),
    },
  };
}

export async function getLeads(): Promise<Lead[]> {
  const result = await getLeadsWithDiagnostics();
  return result.leads;
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const supabase = db();
  if (!supabase) return null;
  const { data, error } = await supabase.from("leads").select(LEAD_SELECT).eq("id", id).single();
  if (error) {
    console.error("[getLeadById]", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return null;
  }
  return normalizeLead(data as unknown as Lead);
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
