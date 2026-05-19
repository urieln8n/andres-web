"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { getLeadById, getLeadAudit } from "@/lib/dashboard/queries";
import { generateAudit } from "@/lib/ai/generate-audit";
import { generateProposal } from "@/lib/ai/generate-proposal";
import type { LeadStatus } from "@/lib/dashboard/types";

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function logoutAction() {
  cookies().delete("dashboard_auth");
  redirect("/dashboard/login");
}

// ─── Lead mutations ──────────────────────────────────────────────────────────

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const { error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) return { error: error.message };
  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateLeadNotes(leadId: string, notes: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const { error } = await supabase
    .from("leads")
    .update({ internal_notes: notes, updated_at: new Date().toISOString() })
    .eq("id", leadId);

  if (error) return { error: error.message };
  revalidatePath(`/dashboard/leads/${leadId}`);
  return { success: true };
}

// ─── Audit generation ────────────────────────────────────────────────────────

export async function generateAuditForLead(leadId: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const lead = await getLeadById(leadId);
  if (!lead) return { error: "Lead no encontrado" };

  const result = await generateAudit({
    name: lead.name,
    businessName: lead.business_name,
    sector: lead.sector ?? "No especificado",
    city: lead.city ?? undefined,
    website: lead.website ?? undefined,
    instagramUrl: lead.instagram_url ?? undefined,
    mainProblem: lead.main_problem ?? lead.goal ?? undefined,
    service: lead.service ?? undefined,
    budget: lead.budget ?? undefined,
  });

  const { error: insertError } = await supabase.from("audits").insert({
    lead_id: leadId,
    score: result.score,
    diagnosis: result.diagnosis,
    weaknesses: result.weaknesses,
    opportunities: result.opportunities,
    recommended_offer: result.recommendedOffer,
    ai_summary: result.aiSummary,
    whatsapp_message: result.whatsappMessage,
    seven_day_plan: result.sevenDayPlan,
  });

  if (insertError) return { error: insertError.message };

  // Update lead status
  await supabase
    .from("leads")
    .update({ status: "audit_generated", updated_at: new Date().toISOString() })
    .eq("id", leadId);

  // Optional n8n webhook
  const webhookUrl = process.env.N8N_AUDIT_GENERATED_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, lead, audit: result }),
      });
    } catch {
      // Non-fatal
    }
  }

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/auditorias");
  revalidatePath("/dashboard");
  return { success: true, isDemo: result.isDemo };
}

// ─── Proposal generation ─────────────────────────────────────────────────────

export async function generateProposalForLead(leadId: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const [lead, audit] = await Promise.all([getLeadById(leadId), getLeadAudit(leadId)]);
  if (!lead) return { error: "Lead no encontrado" };

  const auditResult = audit
    ? {
        score: audit.score ?? 0,
        diagnosis: audit.diagnosis ?? "",
        weaknesses: audit.weaknesses ?? [],
        opportunities: audit.opportunities ?? [],
        recommendedOffer: audit.recommended_offer ?? "",
        aiSummary: audit.ai_summary ?? "",
        whatsappMessage: audit.whatsapp_message ?? "",
        sevenDayPlan: audit.seven_day_plan ?? [],
      }
    : null;

  const result = await generateProposal(lead, auditResult);

  const { error: insertError } = await supabase.from("proposals").insert({
    lead_id: leadId,
    title: result.title,
    price: result.price,
    package_type: result.packageType,
    proposal_text: result.proposalText,
    status: "draft",
  });

  if (insertError) return { error: insertError.message };

  // Update lead status
  await supabase
    .from("leads")
    .update({ status: "proposal_sent", updated_at: new Date().toISOString() })
    .eq("id", leadId);

  // Optional n8n webhook
  const webhookUrl = process.env.N8N_PROPOSAL_CREATED_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, lead, proposal: result }),
      });
    } catch {
      // Non-fatal
    }
  }

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/propuestas");
  revalidatePath("/dashboard");
  return { success: true, isDemo: result.isDemo, whatsappMessage: result.whatsappMessage };
}

// ─── Followup ────────────────────────────────────────────────────────────────

export async function createFollowup(
  leadId: string,
  data: { channel: string; message: string; scheduledAt?: string }
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const { error } = await supabase.from("followups").insert({
    lead_id: leadId,
    channel: data.channel,
    message: data.message,
    scheduled_at: data.scheduledAt ?? null,
    status: "pending",
  });

  if (error) return { error: error.message };

  await supabase
    .from("leads")
    .update({ status: "follow_up", updated_at: new Date().toISOString() })
    .eq("id", leadId);

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/seguimientos");
  return { success: true };
}

export async function updateFollowupStatus(followupId: string, status: "pending" | "sent" | "done") {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase no configurado" };

  const updates: Record<string, unknown> = { status };
  if (status === "sent") updates.sent_at = new Date().toISOString();

  const { error } = await supabase.from("followups").update(updates).eq("id", followupId);
  if (error) return { error: error.message };

  revalidatePath("/dashboard/seguimientos");
  return { success: true };
}
