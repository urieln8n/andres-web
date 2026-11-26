import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "¿Te ve ChatGPT? Comprueba gratis si la IA puede leer tu web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const IAS = [
  ["ChatGPT", "#34d399"],
  ["Perplexity", "#2dd4bf"],
  ["Gemini", "#8ea6ff"],
  ["Claude", "#fb923c"],
  ["Google", "#facc15"],
];

export default function Imagen() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "linear-gradient(135deg, #0F1440 0%, #080808 70%)", color: "white", padding: "64px 72px" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#8EA6FF", letterSpacing: 5, fontWeight: 700 }}>GRATIS · SIN REGISTRO · 10 SEGUNDOS</div>
        <div style={{ display: "flex", marginTop: 34, fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>¿Te ve ChatGPT?</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 40, color: "#DCE3FF", lineHeight: 1.25, maxWidth: 980 }}>Tus clientes ya se lo preguntan a la IA. Mira la nota de tu web.</div>
        <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
          {IAS.map(([nombre, color]) => (
            <div key={nombre} style={{ display: "flex", alignItems: "center", gap: 10, border: "2px solid rgba(255,255,255,.18)", borderRadius: 999, padding: "10px 22px", fontSize: 26, fontWeight: 600 }}>
              <div style={{ display: "flex", width: 14, height: 14, borderRadius: 14, background: color }} />
              {nombre}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 700 }}>andresrendon.com/nota-ia</div>
          <div style={{ display: "flex", color: "#8EA6FF", fontWeight: 700 }}>Andrés AI Studio</div>
        </div>
      </div>
    ),
    size,
  );
}
