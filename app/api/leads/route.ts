import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos no válidos" }, { status: 400 });
  }

  const lead = parsed.data;
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      email: lead.email || null,
      phone: lead.phone,
      business_name: lead.businessName,
      website: lead.website || null,
      sector: lead.sector,
      goal: lead.goal,
      service: lead.service,
      budget: lead.budget || null,
      message: lead.message || null,
      source: lead.source || "web",
      status: "nuevo",
    });

    if (error) {
      const fallbackLead = {
        ...lead,
        notes: `Sector: ${lead.sector}. Objetivo: ${lead.goal}. Mensaje: ${lead.message || ""}`,
      };
      const fallback = await supabase.from("leads").insert({
        name: fallbackLead.name,
        email: fallbackLead.email || null,
        phone: fallbackLead.phone,
        business_name: fallbackLead.businessName,
        website: fallbackLead.website || null,
        service: fallbackLead.service,
        budget: fallbackLead.budget || null,
        message: fallbackLead.notes,
        source: fallbackLead.source || "web",
        status: "nuevo",
      });
      if (fallback.error) return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }
  }

  if (process.env.LEAD_WEBHOOK_URL) {
    await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, createdAt: new Date().toISOString() }),
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
