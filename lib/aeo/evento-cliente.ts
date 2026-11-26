// Estadísticas desde el navegador: sin cookies ni datos personales.
// El canal sale de ?o= en la dirección (tarjeta, whatsapp, instagram…). No se guarda nada en el dispositivo.
export function canalActual(): string {
  if (typeof window === "undefined") return "directo";
  const o = new URLSearchParams(window.location.search).get("o");
  return o && /^[a-z0-9-]{1,24}$/i.test(o) ? o.toLowerCase() : "directo";
}

export function enviarEvento(tipo: "visita" | "whatsapp" | "compartir" | "sello", pagina: string) {
  try {
    const cuerpo = JSON.stringify({ tipo, pagina, canal: canalActual() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/nota-ia/evento", new Blob([cuerpo], { type: "application/json" }));
    else fetch("/api/nota-ia/evento", { method: "POST", headers: { "content-type": "application/json" }, body: cuerpo, keepalive: true });
  } catch {
    /* nunca molesta */
  }
}
