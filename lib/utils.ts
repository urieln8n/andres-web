import { clsx, type ClassValue } from "clsx";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andresrendon.com";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function siteUrl(path = "") {
  const normalizedBase = SITE_URL.replace(/\/$/, "");
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`;
}
