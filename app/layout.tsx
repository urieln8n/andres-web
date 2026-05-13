import type { Metadata } from "next";
import "./globals.css";
import { createMetadata, localBusinessJsonLd, organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { MarketingShell } from "@/components/marketing-shell";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd(), organizationJsonLd(), localBusinessJsonLd(), websiteJsonLd()]) }}
        />
        <div className="fixed inset-0 -z-20 bg-radial-premium" />
        <div className="noise pointer-events-none fixed inset-0 -z-10 opacity-[.12]" />
        <MarketingShell>{children}</MarketingShell>
      </body>
    </html>
  );
}
