"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { FloatingAuditCta } from "@/components/floating-audit-cta";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { shouldShowMarketingAuditCta } from "@/lib/marketing-routes";

export function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showAuditCta = shouldShowMarketingAuditCta(pathname);

  return (
    <>
      <Navbar />
      <main className={cn(showAuditCta && "pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-0")}>{children}</main>
      <Footer />
      {showAuditCta && <div aria-hidden="true" className="h-[calc(5.75rem+env(safe-area-inset-bottom))] md:hidden" />}
      {showAuditCta && <FloatingAuditCta />}
    </>
  );
}
