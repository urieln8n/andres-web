import { NextResponse } from "next/server";

// Dirección corta para el botón «Pedir presupuesto» de Instagram (no admite parámetros en la URL).
// Lleva al formulario de auditoría y marca el lead como llegado desde ese botón.
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/auditoria-gratis?source=instagram-boton", request.url), 302);
}
