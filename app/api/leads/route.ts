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
      whatsapp: lead.whatsapp || lead.phone || null,
      business_name: lead.businessName,
      website: lead.website || null,
      instagram_url: lead.instagramUrl || null,
      sector: lead.sector,
      city: lead.city || null,
      goal: lead.goal,
      main_problem: lead.mainProblem || lead.goal || null,
      service: lead.service,
      budget: lead.budget || null,
      message: lead.message || null,
      source: lead.source || "web",
      status: "nuevo",
    });

    if (error) {
      console.error("[leads] Supabase insert error:", error.message);
      return NextResponse.json({ error: "Error al guardar el lead. Inténtalo de nuevo." }, { status: 500 });
    }
  }

  // Webhook n8n opcional — no rompe si la variable no existe
  const webhookUrl = process.env.N8N_NEW_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp || lead.phone,
        business_name: lead.businessName,
        website_url: lead.website,
        instagram_url: lead.instagramUrl,
        sector: lead.sector,
        city: lead.city,
        main_problem: lead.mainProblem || lead.goal,
        source: lead.source || "andresrendon.com",
        created_at: new Date().toISOString(),
      }),
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true });
}
