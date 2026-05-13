import { clsx, type ClassValue } from "clsx";

function normalizeSiteUrl(url: string) {
  return url.replace(/^https:\/\/www\.andresrendon\.com\/?$/i, "https://andresrendon.com").replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://andresrendon.com");

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function siteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
