"use client";

import { useState } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

const MAIN_PATHS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "pricing", href: "/pricing" },
  { key: "contact", href: "/contact" },
  { key: "blog", href: "/blog" },
];

const TAXES_PATHS = [
  { key: "home", href: "/" },
  { key: "services", href: "/#services" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

interface HeaderProps {
  isTaxesSite: boolean;
  locale: string;
}

function NavLinks({
  isTaxesSite,
  locale,
  fullPathname,
  t,
  mobile = false,
}: {
  isTaxesSite: boolean;
  locale: string;
  fullPathname: string | null;
  t: (key: string) => string;
  mobile?: boolean;
}) {
  const links = isTaxesSite ? TAXES_PATHS : MAIN_PATHS;
  const baseClass = mobile
    ? `block rounded-lg px-4 py-3 text-base font-medium ${isTaxesSite ? "text-taxes-gray-700 hover:bg-taxes-gray-100" : "text-slate-700 hover:bg-slate-100"}`
    : isTaxesSite
      ? "text-sm font-medium text-taxes-gray-600 hover:text-taxes-cyan"
      : "text-sm font-medium text-slate-600 hover:text-brand-primary";

  return (
    <>
      {links.map(({ key, href }) => {
        const fullHref = isTaxesSite
          ? href.startsWith("#")
            ? `/taxes/${locale}${href}`
            : `/taxes/${locale}${href === "/" ? "" : href}`
          : href;
        const isActive =
          fullPathname === fullHref ||
          (href !== "/" && !href.startsWith("#") && fullPathname?.startsWith(fullHref + "/"));
        const linkClass = mobile
          ? `${baseClass} ${isActive ? (isTaxesSite ? "bg-taxes-gray-100 text-taxes-cyan" : "bg-slate-100 text-brand-primary") : ""}`
          : `${baseClass} ${isActive ? (isTaxesSite ? "text-taxes-cyan" : "text-brand-primary") : ""}`;

        if (isTaxesSite) {
          return (
            <NextLink key={key} href={fullHref} className={linkClass}>
              {t(key as "home")}
            </NextLink>
          );
        }
        return (
          <Link key={key} href={href as "/"} className={linkClass}>
            {t(key as "home")}
          </Link>
        );
      })}
    </>
  );
}

export function Header({ isTaxesSite, locale }: HeaderProps) {
  const t = useTranslations(isTaxesSite ? "taxesNav" : "nav");
  const fullPathname = useNextPathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerBg = isTaxesSite ? "bg-taxes-white border-taxes-gray-200" : "bg-white/95 border-slate-200";
  const logoClass = isTaxesSite
    ? "text-taxes-gray-900 font-semibold hover:text-taxes-cyan"
    : "text-brand-primary hover:text-brand-secondary";

  return (
    <header className={`border-b ${headerBg} backdrop-blur`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-nowrap">
        {isTaxesSite ? (
          <NextLink href={`/taxes/${locale}`} className={`text-xl ${logoClass}`}>
            A.Nolan Tax Expert
          </NextLink>
        ) : (
          <Link href="/" className={`text-xl font-semibold ${logoClass}`}>
            Ana Nolan
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks
            isTaxesSite={isTaxesSite}
            locale={locale}
            fullPathname={fullPathname}
            t={t}
          />
          <LanguageSwitcher isTaxesSite={isTaxesSite} locale={locale} />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher isTaxesSite={isTaxesSite} locale={locale} />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-taxes-gray-700 hover:bg-taxes-gray-100"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-taxes-gray-200 bg-taxes-gray-100 md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            <NavLinks
              isTaxesSite={isTaxesSite}
              locale={locale}
              fullPathname={fullPathname}
              t={t}
              mobile
            />
          </nav>
        </div>
      )}
    </header>
  );
}
