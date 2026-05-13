import type { Metadata } from "next";
import { SITE_URL, siteUrl } from "./utils";

export const defaultTitle = "Andrés Rendón | Sistemas digitales con IA, SEO y automatización";
export const defaultDescription =
  "Construyo sistemas digitales con IA para negocios locales, autónomos y empresas que quieren captar más clientes, automatizar procesos y vender más.";

export function createMetadata({
  title = defaultTitle,
  description = defaultDescription,
  path = "/",
  image = "/opengraph-image",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const url = siteUrl(path);
  const imageUrl = image.startsWith("http") ? image : siteUrl(image);
  return {
    title: {
      default: title,
      template: "%s | Andrés Rendón",
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Andrés Rendón",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrés Fabián Rendón",
    alternateName: "Andrés Rendón",
    jobTitle: "Consultor de IA, automatización y sistemas digitales",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
    knowsAbout: [
      "Inteligencia artificial",
      "Automatización",
      "Diseño web premium",
      "SEO local",
      "SaaS",
      "Chatbots WhatsApp",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Andrés Rendón",
    legalName: "Andrés Fabián Rendón",
    url: SITE_URL,
    founder: { "@type": "Person", name: "Andrés Fabián Rendón" },
    areaServed: "Barcelona, España",
    description: defaultDescription,
    sameAs: [SITE_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andrés Rendón",
    url: SITE_URL,
    inLanguage: "es-ES",
    description: defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Person",
      name: "Andrés Fabián Rendón",
      url: SITE_URL,
    },
    areaServed: ["Barcelona", "España"],
    url: siteUrl(path),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
