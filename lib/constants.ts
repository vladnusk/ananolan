/**
 * Brand and site configuration. Adjust these for easy rebranding.
 */
export const BRAND = {
  lastName: "Nolan",
  mainSiteTitle: "Ana Nolan",
  taxesSiteTitle: "Ana Nolan Taxes",
} as const;

export const LOCALES = ["en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const TAXES_HOST = "taxes.ananolan.com";
/** Use for local dev so taxes.ananolan.com stays resolvable to production. */
export const TAXES_LOCAL_HOST = "taxes.ananolan.local";
export const MAIN_HOST = "ananolan.com";

export function isTaxesSite(host: string | null): boolean {
  if (!host) return false;
  return (
    host === TAXES_HOST ||
    host === TAXES_LOCAL_HOST ||
    host.startsWith("taxes.")
  );
}

export function isMainSite(host: string | null): boolean {
  if (!host) return false;
  return host === MAIN_HOST || host === "localhost" || host === "127.0.0.1";
}
