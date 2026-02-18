"use client";

import { useTranslations, useLocale } from "next-intl";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";

interface FooterProps {
  isTaxesSite?: boolean;
}

export function Footer({ isTaxesSite = false }: FooterProps) {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const brand = isTaxesSite ? BRAND.taxesSiteTitle : BRAND.mainSiteTitle;
  const borderBg = isTaxesSite ? "border-taxes-gray-200 bg-taxes-gray-100" : "border-slate-200 bg-slate-50";
  const textClass = isTaxesSite ? "text-taxes-gray-600" : "text-slate-600";
  const linkClass = isTaxesSite ? "text-taxes-cyan hover:underline" : "text-brand-primary hover:underline";

  const privacyHref = isTaxesSite ? `/taxes/${locale}/privacy` : "/privacy";
  const termsHref = isTaxesSite ? `/taxes/${locale}/terms` : "/terms";

  return (
    <footer className={`mt-auto border-t ${borderBg}`}>
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className={`text-center text-sm ${textClass}`}>
          {t("copyright", { year, brand })}
        </p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          {isTaxesSite ? (
            <>
              <NextLink href={privacyHref} className={linkClass}>
                {t("privacy")}
              </NextLink>
              <NextLink href={termsHref} className={linkClass}>
                {t("terms")}
              </NextLink>
            </>
          ) : (
            <>
              <Link href="/privacy" className={linkClass}>
                {t("privacy")}
              </Link>
              <Link href="/terms" className={linkClass}>
                {t("terms")}
              </Link>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
