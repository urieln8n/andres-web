import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Andrés Rendón - Sistemas digitales con IA, SEO, CRM y automatización";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#030712,#0f172a 48%,#082f49)", color: "white", display: "flex", flexDirection: "column", justifyContent: "center", padding: 72 }}>
        <div style={{ fontSize: 28, color: "#f5c776", letterSpacing: 8 }}>ANDRÉS RENDÓN · ANDRESRENDON.COM</div>
        <div style={{ marginTop: 24, fontSize: 74, fontWeight: 800, lineHeight: 1.02 }}>Sistemas digitales con IA para captar más clientes</div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#cbd5e1" }}>Web premium · SEO local · CRM · WhatsApp · SaaS</div>
      </div>
    ),
    size
  );
}
