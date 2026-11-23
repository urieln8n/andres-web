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
