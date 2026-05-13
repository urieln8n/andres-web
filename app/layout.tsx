import type { Metadata } from "next";
import "./globals.css";
import { createMetadata, organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd(), organizationJsonLd(), websiteJsonLd()]) }}
        />
        <div className="fixed inset-0 -z-20 bg-radial-premium" />
        <div className="noise pointer-events-none fixed inset-0 -z-10 opacity-[.12]" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
