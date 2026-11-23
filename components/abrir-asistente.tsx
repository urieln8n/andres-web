"use client";

import type { ReactNode } from "react";

// Botón que abre el asistente de la esquina desde cualquier parte de la página
export function AbrirAsistente({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent("abrir-asistente"))}>
      {children}
    </button>
  );
}
