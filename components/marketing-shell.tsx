"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { AsistenteWeb } from "@/components/asistente-web";
import { Navbar } from "@/components/navbar";

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // El dashboard tiene su propio layout — no necesita navbar/footer de marketing
  if (pathname.startsWith("/dashboard")) return <>{children}</>;

  // Enlace de la bio de Instagram: sin menú ni pie, solo lo esencial y el asistente
  if (pathname === "/instagram") {
    return (
      <>
        <main>{children}</main>
        <AsistenteWeb />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* Asistente con IA en todas las páginas públicas: atiende y, de paso, es la demo de un producto que se vende */}
      <AsistenteWeb />
    </>
  );
}
