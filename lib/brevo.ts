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

export function brevoConfigurado() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

export async function guardarEnBrevo(c: ContactoBrevo): Promise<{ ok: boolean; motivo?: string }> {
  const clave = process.env.BREVO_API_KEY;
  const lista = Number(process.env.BREVO_LIST_ID);
  if (!clave || !lista) return { ok: false, motivo: "brevo-no-configurado" };

  const atributos: Record<string, string | number> = {
    NOMBRE: c.nombre,
    NEGOCIO: c.negocio,
    WEB: c.web,
    WHATSAPP: c.whatsapp,
    NOTA_AEO: c.notaAeo,
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
    console.error("[brevo] Error al crear contacto", res.status, detalle.slice(0, 300));
    return { ok: false, motivo: `brevo-${res.status}` };
  } catch (error) {
    console.error("[brevo] Sin respuesta", error instanceof Error ? error.message : error);
    return { ok: false, motivo: "brevo-sin-respuesta" };
  }
}
