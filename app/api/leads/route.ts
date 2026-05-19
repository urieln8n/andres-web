import { NextResponse } from "next/server";
import { leadSchema, normalizeLeadInsertInput, type LeadInsertInput } from "@/lib/lead-schema";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos no válidos" }, { status: 400 });
  }

  let lead: LeadInsertInput;
  try {
    lead = normalizeLeadInsertInput(parsed.data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Datos no válidos" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error("[leads] Supabase admin client not configured", {
      hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
    return NextResponse.json(
      { error: "No se pudo guardar el lead. Configuración temporalmente no disponible." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      whatsapp: lead.whatsapp,
      business_name: lead.business_name,
      website: lead.website,
      website_url: lead.website_url,
      instagram_url: lead.instagram_url,
      sector: lead.sector,
      city: lead.city,
      goal: lead.goal,
      main_problem: lead.main_problem,
      service: lead.service,
      service_interest: lead.service_interest,
      budget: lead.budget,
      message: lead.message,
      source: lead.source,
      status: lead.status,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[leads] Supabase insert error", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json({ error: "Error al guardar el lead. Inténtalo de nuevo." }, { status: 500 });
  }

  if (!data?.id) {
    console.error("[leads] Supabase insert returned no id");
    return NextResponse.json({ error: "Error al guardar el lead. Inténtalo de nuevo." }, { status: 500 });
  }

  console.info("[leads] Lead created", { id: data.id });

  // Webhook n8n opcional — no rompe si la variable no existe
  const webhookUrl = process.env.N8N_NEW_LEAD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
        business_name: lead.business_name,
        website_url: lead.website_url,
        instagram_url: lead.instagram_url,
        sector: lead.sector,
        city: lead.city,
        main_problem: lead.main_problem,
        service_interest: lead.service_interest,
        budget: lead.budget,
        message: lead.message,
        source: lead.source,
        lead_id: data.id,
        created_at: new Date().toISOString(),
      }),
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true, id: data.id });
}
