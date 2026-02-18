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
 */
export function LanguageSwitcher({ isTaxesSite, locale }: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const fullPathname = useNextPathname();
  const router = useRouter();
  const intlRouter = useIntlRouter();

  const switchTo = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    if (isTaxesSite) {
      const path = fullPathname ?? `/taxes/${currentLocale}`;
      const newPath = path.replace(
        /^\/taxes\/[a-z]{2}/,
        `/taxes/${newLocale}`
      );
      router.push(newPath);
    } else {
      const pathWithoutLocale =
        currentLocale === "ru"
          ? (fullPathname ?? "/").replace(/^\/ru/, "") || "/"
          : fullPathname ?? "/";
      const newPath =
        newLocale === "ru"
          ? `/ru${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
          : pathWithoutLocale;
      intlRouter.push(newPath as "/");
    }
  };

  return (
    <div className="flex gap-2">
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          className={`rounded px-2 py-1 text-sm font-medium ${
            locale === loc
              ? "bg-brand-primary text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
