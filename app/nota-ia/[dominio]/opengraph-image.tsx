import { ImageResponse } from "next/og";
import { limpiarDominio, NIVEL_COLOR, NIVEL_TEXTO, notaPublica, UMBRAL_SELLO } from "@/lib/aeo/nota-publica";

export const runtime = "nodejs";
export const maxDuration = 60;
export const alt = "Nota de una web para ChatGPT y los buscadores con IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Imagen({ params }: { params: { dominio: string } }) {
  const dominio = limpiarDominio(params.dominio) || "tu web";
  const n = dominio === "tu web" ? null : await notaPublica(dominio).catch(() => null);
  const color = n ? NIVEL_COLOR[n.nivel] || "#8ea6ff" : "#8EA6FF";
  const frase = !n ? "Comprueba si la IA puede leer tu web" : n.nota >= UMBRAL_SELLO ? "La IA puede leer esta web" : n.nota >= 50 ? "La IA lee esta web a medias" : "Para la IA, esta web casi no existe";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg, #0F1440 0%, #080808 70%)", color: "white", flexDirection: "column", padding: 64, position: "relative" }}>
        <div style={{ display: "flex", position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 90% 0%, rgba(142,166,255,.16), transparent 70%)" }} />
        <div style={{ display: "flex", fontSize: 30, color: "#8EA6FF", letterSpacing: 4, fontWeight: 700 }}>¿TE VE CHATGPT?</div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 64 }}>
          <div style={{ display: "flex", width: 300, height: 300, borderRadius: 300, border: `22px solid ${color}`, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", fontSize: 120, fontWeight: 800, lineHeight: 1 }}>{n ? n.nota : "?"}</div>
            <div style={{ display: "flex", fontSize: 30, color: "#b9b4a5" }}>de 100</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", fontSize: 60, fontWeight: 800, lineHeight: 1.05, wordBreak: "break-all" }}>{dominio}</div>
            {n && <div style={{ display: "flex", marginTop: 18, fontSize: 32, color, fontWeight: 700 }}>{NIVEL_TEXTO[n.nivel]}</div>}
            <div style={{ display: "flex", marginTop: 12, fontSize: 36, color: "#e8e4d8" }}>{frase}</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#b9b4a5" }}>
          <div style={{ display: "flex" }}>Comprueba la tuya gratis en andresrendon.com</div>
          <div style={{ display: "flex", color: "#8EA6FF", fontWeight: 700 }}>Andrés AI Studio</div>
        </div>
      </div>
    ),
    size,
  );
}
