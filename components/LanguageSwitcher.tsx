"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRouter as useIntlRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { LOCALES } from "@/lib/constants";

interface LanguageSwitcherProps {
  isTaxesSite: boolean;
  locale: string;
}

/**
 * Switches between en and ru while preserving current path (and site).
 * Uses external path (browser URL): on taxes subdomain pathname is / or /ru/..., not /taxes/...
 */
export function LanguageSwitcher({ isTaxesSite, locale }: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const fullPathname = useNextPathname();
  const router = useRouter();
  const intlRouter = useIntlRouter();

  const switchTo = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // Path from next/navigation is the browser URL (external path).
    // On taxes: /, /ru, /ru/pricing. On main: /, /ru, /about, /ru/about.
    const path = fullPathname ?? "/";
    const pathWithoutLocale =
      path.startsWith("/ru")
        ? path.replace(/^\/ru/, "") || "/"
        : path || "/";

    const newPath =
      newLocale === "ru"
        ? `/ru${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
        : pathWithoutLocale;

    if (isTaxesSite) {
      router.push(newPath);
    } else {
      intlRouter.push(newPath as "/");
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor="language-select" className="sr-only">
        Language
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => switchTo(e.target.value)}
        className={
          isTaxesSite
            ? "rounded border border-taxes-gray-300 bg-taxes-white px-3 py-1.5 text-sm font-medium text-taxes-gray-700 focus:border-taxes-cyan focus:outline-none focus:ring-1 focus:ring-taxes-cyan"
            : "rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        }
        aria-label="Select language"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
