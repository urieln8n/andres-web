// Alta de contactos en Brevo. La clave vive solo en el servidor (variable BREVO_API_KEY en Vercel).
// Si falta la configuración, no rompe el formulario: el lead se guarda igual en Supabase.

export interface ContactoBrevo {
  email: string;
  nombre: string;
  negocio: string;
  web: string;
  whatsapp: string;
  notaAeo: number;
  nivelAeo: string;
  problemas: string[];
  origen: string;
}

// Lee la clave tolerando errores típicos al pegarla (espacios, comillas o "BREVO_API_KEY=" delante).
function claveBrevo(): string | undefined {
  const bruta = process.env.BREVO_API_KEY;
  if (!bruta) return undefined;
  return bruta.trim().replace(/^BREVO_API_KEY\s*=\s*/i, "").replace(/^["']|["']$/g, "").trim() || undefined;
}

// Diagnóstico sin exponer la clave: solo su tipo (prefijo público de Brevo) y su longitud.
function pistaClave(clave: string) {
  return `tipo=${clave.slice(0, 8)} longitud=${clave.length}`;
}

export function brevoConfigurado() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

export async function guardarEnBrevo(c: ContactoBrevo): Promise<{ ok: boolean; motivo?: string }> {
  const clave = claveBrevo();
  const lista = Number(process.env.BREVO_LIST_ID);
  if (!clave || !lista) return { ok: false, motivo: "brevo-no-configurado" };

  const atributos: Record<string, string> = {
    NOMBRE: c.nombre,
    NEGOCIO: c.negocio,
    WEB: c.web,
    WA_NUMERO: c.whatsapp,
    NOTA_AEO: String(c.notaAeo),
    NIVEL_AEO: c.nivelAeo,
    PROBLEMA_1: c.problemas[0] || "",
    PROBLEMA_2: c.problemas[1] || "",
    PROBLEMA_3: c.problemas[2] || "",
    ORIGEN: c.origen,
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": clave, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ email: c.email, attributes: atributos, listIds: [lista], updateEnabled: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok || res.status === 204) return { ok: true };
    const detalle = await res.text().catch(() => "");
    console.error("[brevo] Error al crear contacto", res.status, pistaClave(clave), detalle.slice(0, 300));
    return { ok: false, motivo: `brevo-${res.status}` };
  } catch (error) {
    console.error("[brevo] Sin respuesta", error instanceof Error ? error.message : error);
    return { ok: false, motivo: "brevo-sin-respuesta" };
  }
}

// Envío transaccional (el informe que la persona ha pedido). Remitente verificado en Brevo.
export async function enviarEmailBrevo(m: { para: string; nombre: string; asunto: string; html: string; etiqueta: string }): Promise<{ ok: boolean; motivo?: string }> {
  const clave = claveBrevo();
  if (!clave) return { ok: false, motivo: "brevo-no-configurado" };
  const remitente = process.env.BREVO_SENDER_EMAIL || "hola@andresrendon.com";
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": clave, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Andrés Rendón", email: remitente },
        to: [{ email: m.para, name: m.nombre }],
        replyTo: { email: remitente, name: "Andrés Rendón" },
        subject: m.asunto, htmlContent: m.html, tags: [m.etiqueta],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return { ok: true };
    console.error("[brevo] Error al enviar email", res.status, pistaClave(clave), (await res.text().catch(() => "")).slice(0, 300));
    return { ok: false, motivo: `brevo-${res.status}` };
  } catch (error) {
    console.error("[brevo] Email sin respuesta", error instanceof Error ? error.message : error);
    return { ok: false, motivo: "brevo-sin-respuesta" };
  }
}
