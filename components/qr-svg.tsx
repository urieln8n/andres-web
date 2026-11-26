import QRCode from "qrcode";

/** QR como SVG (en el servidor), oscuro sobre blanco para que lo lea cualquier móvil. */
export async function QrSvg({ texto, tam = 160 }: { texto: string; tam?: number }) {
  const svg = await QRCode.toString(texto, { type: "svg", margin: 2, color: { dark: "#0F1440", light: "#ffffff" }, errorCorrectionLevel: "M" });
  return <div className="overflow-hidden rounded-xl bg-white" style={{ width: tam, height: tam }} dangerouslySetInnerHTML={{ __html: svg.replace("<svg ", `<svg width="${tam}" height="${tam}" `) }} />;
}

export async function qrDataUrl(texto: string) {
  return QRCode.toDataURL(texto, { margin: 2, width: 1200, color: { dark: "#0F1440", light: "#ffffff" }, errorCorrectionLevel: "M" });
}
