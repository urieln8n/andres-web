export type LeadStatus =
  | "new"
  | "contacted"
  | "audit_generated"
  | "proposal_sent"
  | "won"
  | "lost"
  | "follow_up";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  audit_generated: "Auditoría generada",
  proposal_sent: "Propuesta enviada",
  won: "Ganado",
  lost: "Perdido",
  follow_up: "Seguimiento",
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-cyan-300/15 text-cyan-200 border-cyan-300/20",
  contacted: "bg-blue-300/15 text-blue-200 border-blue-300/20",
  audit_generated: "bg-violet-300/15 text-violet-200 border-violet-300/20",
  proposal_sent: "bg-amber-300/15 text-amber-200 border-amber-300/20",
  won: "bg-emerald-300/15 text-emerald-200 border-emerald-300/20",
  lost: "bg-red-300/15 text-red-300 border-red-300/20",
  follow_up: "bg-orange-300/15 text-orange-200 border-orange-300/20",
};

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  business_name: string;
  website: string | null;
  instagram_url: string | null;
  sector: string | null;
  city: string | null;
  main_problem: string | null;
  goal: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  internal_notes: string | null;
  status: string;
  source: string | null;
  estimated_value: number | null;
  created_at: string;
  updated_at: string;
}

export interface Audit {
  id: string;
  lead_id: string;
  score: number | null;
  diagnosis: string | null;
  weaknesses: string[] | null;
  opportunities: string[] | null;
  recommended_offer: string | null;
  ai_summary: string | null;
  whatsapp_message: string | null;
  seven_day_plan: string[] | null;
  created_at: string;
}

export interface Proposal {
  id: string;
  lead_id: string;
  title: string | null;
  price: string | null;
  package_type: string | null;
  proposal_text: string | null;
  status: string;
  created_at: string;
}

export interface Followup {
  id: string;
  lead_id: string;
  channel: string;
  message: string | null;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface LeadStats {
  total: number;
  new_count: number;
  audits_count: number;
  proposals_open: number;
  won_count: number;
  follow_up_count: number;
}
