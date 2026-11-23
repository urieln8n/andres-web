// Email 1 del embudo: el informe AEO completo que la persona pidió (transaccional).
import type { ResultadoAeo } from "@/lib/aeo/analizar";
import { SITE_URL } from "@/lib/utils";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const COLOR_SEV: Record<string, string> = { critico: "#dc2626", alto: "#ea580c", medio: "#b7892f", bajo: "#64748b" };
const TEXTO_SEV: Record<string, string> = { critico: "Crítico", alto: "Alto", medio: "Medio", bajo: "Bajo" };
const TEXTO_NIVEL: Record<string, string> = { excelente: "Excelente", bueno: "Bueno", mejorable: "Mejorable", critico: "Crítico" };

export function asuntoInforme(r: ResultadoAeo, negocio: string, revisionManual: boolean) {
  return revisionManual ? `${negocio}: tu web no deja entrar a los buscadores automáticos` : `${negocio}: tu nota AEO es ${r.nota}/100`;
}

export function htmlInforme(r: ResultadoAeo, d: { nombre: string; negocio: string }, revisionManual: boolean) {
  const whatsapp = `${SITE_URL}/whatsapp?texto=${encodeURIComponent(`Hola Andrés, he recibido el informe AEO de ${d.negocio} (${r.nota}/100). ¿Me explicas cómo mejorarlo?`)}`;
  const color = r.nota >= 70 ? "#0e7490" : r.nota >= 50 ? "#b7892f" : "#dc2626";
  const ejes = r.ejes.map((e) => `
      <tr><td style="padding:6px 0;font-size:14px;color:#334155">${esc(e.nombre)}</td>
      <td style="padding:6px 0;font-size:14px;font-weight:700;color:${e.nota >= 70 ? "#0e7490" : e.nota >= 50 ? "#b7892f" : "#dc2626"};text-align:right">${e.nota}</td></tr>`).join("");
  const hallazgos = r.hallazgos.map((h, i) => `
      <tr><td style="padding:14px 0;border-top:1px solid #e2e8f0">
        <p style="margin:0;font-size:12px;font-weight:700;color:${COLOR_SEV[h.severidad]};text-transform:uppercase;letter-spacing:.06em">${i + 1}. ${TEXTO_SEV[h.severidad]}</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#0f172a">${esc(h.titulo)}</p>
        <p style="margin:6px 0 0;font-size:14px;line-height:1.55;color:#334155">${esc(h.detalle)}</p>
        <p style="margin:6px 0 0;font-size:12px;color:#64748b">Esfuerzo estimado: ${esc(h.esfuerzo)}</p>
      </td></tr>`).join("");

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Tu informe AEO</title></head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
  <tr><td style="background:#050816;padding:22px 28px"><p style="margin:0;font-size:13px;letter-spacing:.2em;color:#D6B25E;text-transform:uppercase">Auditoría AEO</p>
    <p style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff">Andrés Rendón</p></td></tr>
  <tr><td style="padding:28px">
    <p style="margin:0;font-size:16px;color:#0f172a">Hola ${esc(d.nombre)},</p>
    ${revisionManual
      ? `<p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#334155">He intentado analizar <a href="${esc(r.url)}" style="color:#0e7490">${esc(r.url)}</a> y la web ha rechazado la visita automática. Puede ser una protección anti-bots que también deja fuera a ChatGPT y Perplexity. Lo reviso a mano y te escribo con lo que encuentre.</p>`
      : `<p style="margin:12px 0 0;font-size:15px;line-height:1.6;color:#334155">Aquí tienes el informe completo de <a href="${esc(r.url)}" style="color:#0e7490">${esc(r.url)}</a>. He leído tu web igual que la leen ChatGPT, Perplexity y Claude: sin ejecutar JavaScript.</p>
    <table role="presentation" width="100%" style="margin:22px 0;background:#f8fafc;border-radius:12px"><tr>
      <td style="padding:18px 20px;width:110px"><p style="margin:0;font-size:44px;font-weight:700;color:${color}">${r.nota}</p><p style="margin:0;font-size:12px;color:#64748b">de 100</p></td>
      <td style="padding:18px 20px"><p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.12em;color:${color};text-transform:uppercase">${TEXTO_NIVEL[r.nivel] || r.nivel}</p>
      <p style="margin:6px 0 0;font-size:15px;line-height:1.5;color:#0f172a">${r.nota >= 70 ? "La IA puede leerte. Queda afinar para que te cite." : r.nota >= 50 ? "La IA te lee a medias: estás perdiendo respuestas." : "Para ChatGPT y Perplexity, tu web casi no existe."}</p></td></tr></table>
    <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.1em">Nota por punto</p>
    <table role="presentation" width="100%">${ejes}</table>`}
    ${r.hallazgos.length ? `<p style="margin:26px 0 0;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.1em">Qué arreglaría, por orden</p>
    <table role="presentation" width="100%">${hallazgos}</table>` : ""}
    <table role="presentation" width="100%" style="margin-top:24px;background:#fdf6e3;border-radius:12px"><tr><td style="padding:20px">
      <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a">¿Te lo explico en 10 minutos?</p>
      <p style="margin:6px 0 14px;font-size:14px;line-height:1.55;color:#334155">Te digo qué puedes arreglar tú mismo y qué conviene que haga yo. Sin compromiso.</p>
      <a href="${whatsapp}" style="display:inline-block;background:#10b981;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:999px">Escribirme por WhatsApp</a>
    </td></tr></table>
    <p style="margin:24px 0 0;font-size:15px;color:#0f172a">Un saludo,<br>Andrés Rendón</p>
    <p style="margin:18px 0 0;font-size:12px;line-height:1.5;color:#94a3b8">Análisis automático de la página indicada, sin ejecutar JavaScript. Mide las condiciones para que la IA te lea y te cite; nadie puede garantizar que un modelo concreto te cite.</p>
  </td></tr>
  <tr><td style="background:#f8fafc;padding:16px 28px;font-size:12px;line-height:1.5;color:#94a3b8">Recibes este email porque pediste la auditoría AEO en <a href="${SITE_URL}/auditoria-aeo" style="color:#64748b">andresrendon.com</a>. <a href="${SITE_URL}/politica-privacidad" style="color:#64748b">Privacidad</a>.</td></tr>
</table></td></tr></table></body></html>`;
}

// Versión en texto plano del mismo informe. Enviar HTML + texto mejora la entrega (Outlook/Hotmail penaliza solo-HTML).
export function textoInforme(r: ResultadoAeo, d: { nombre: string; negocio: string }, revisionManual: boolean) {
  const whatsapp = `${SITE_URL}/whatsapp?texto=${encodeURIComponent(`Hola Andrés, he recibido el informe AEO de ${d.negocio} (${r.nota}/100). ¿Me explicas cómo mejorarlo?`)}`;
  if (revisionManual) {
    return [
      `Hola ${d.nombre},`,
      "",
      `He intentado analizar ${r.url} y la web ha rechazado la visita automática. Puede ser una protección anti-bots que también deja fuera a ChatGPT y Perplexity. Lo reviso a mano y te escribo con lo que encuentre.`,
      "",
      `Si quieres adelantarlo, escríbeme por WhatsApp: ${whatsapp}`,
      "",
      "Un saludo,",
      "Andrés Rendón",
    ].join("\n");
  }
  const lineas = [
    `Hola ${d.nombre},`,
    "",
    `Aquí tienes el informe completo de ${r.url}. He leído tu web igual que la leen ChatGPT, Perplexity y Claude: sin ejecutar JavaScript.`,
    "",
    `Nota: ${r.nota} de 100 (${TEXTO_NIVEL[r.nivel] || r.nivel})`,
    "",
    "Nota por punto:",
    ...r.ejes.map((e) => `- ${e.nombre}: ${e.nota}`),
  ];
  if (r.hallazgos.length) {
    lineas.push("", "Qué arreglaría, por orden:");
    r.hallazgos.forEach((h, i) => lineas.push("", `${i + 1}. ${TEXTO_SEV[h.severidad]}: ${h.titulo}`, h.detalle, `Esfuerzo estimado: ${h.esfuerzo}`));
  }
  lineas.push(
    "",
    "¿Te lo explico en 10 minutos? Te digo qué puedes arreglar tú mismo y qué conviene que haga yo. Sin compromiso.",
    `WhatsApp: ${whatsapp}`,
    "",
    "Un saludo,",
    "Andrés Rendón",
    "",
    `Recibes este email porque pediste la auditoría AEO en ${SITE_URL}.`,
  );
  return lineas.join("\n");
}
