import type { Metadata } from "next";
import { SITE_URL, siteUrl } from "./utils";

export const PERSON_NAME = "Andrés Fabián Rendón Ramírez";
export const BRAND_NAME = "Andrés Rendón";

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
    applicationName: BRAND_NAME,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
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
    name: PERSON_NAME,
    alternateName: BRAND_NAME,
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
    name: BRAND_NAME,
    legalName: PERSON_NAME,
    url: SITE_URL,
    founder: { "@type": "Person", name: PERSON_NAME },
    areaServed: "Barcelona, España",
    description: defaultDescription,
    sameAs: [SITE_URL],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
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
      name: PERSON_NAME,
      url: SITE_URL,
    },
    areaServed: ["Barcelona", "España"],
    url: siteUrl(path),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    legalName: PERSON_NAME,
    url: SITE_URL,
    image: siteUrl("/opengraph-image"),
    priceRange: "€€€",
    areaServed: [
      { "@type": "City", name: "Barcelona" },
      { "@type": "Country", name: "España" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
    description: defaultDescription,
    founder: { "@type": "Person", name: PERSON_NAME },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Auditoría gratis de captación digital" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webs premium para negocios locales" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatización con inteligencia artificial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO local para negocios" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software para negocios locales" } },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
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
