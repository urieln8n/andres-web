import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { createMetadata, organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { MarketingShell } from "@/components/marketing-shell";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-ink font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd(), organizationJsonLd(), websiteJsonLd()]) }}
        />
        <div className="fixed inset-0 -z-20 bg-radial-premium" />
        <div className="noise pointer-events-none fixed inset-0 -z-10 opacity-[.12]" />
        <MarketingShell>{children}</MarketingShell>
      </body>
    </html>
  );
}
