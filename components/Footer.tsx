"use client";

import { useTranslations } from "next-intl";
import { BRAND } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-center text-sm text-slate-600">
          {t("copyright", { year, brand: BRAND.mainSiteTitle })}
        </p>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <a href="/privacy" className="text-brand-primary hover:underline">
            {t("privacy")}
          </a>
          <a href="/terms" className="text-brand-primary hover:underline">
            {t("terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
