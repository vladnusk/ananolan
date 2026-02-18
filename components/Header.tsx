"use client";

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
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

interface HeaderProps {
  isTaxesSite: boolean;
  locale: string;
}

export function Header({ isTaxesSite, locale }: HeaderProps) {
  const t = useTranslations(isTaxesSite ? "taxesNav" : "nav");
  const fullPathname = useNextPathname();
  const links = isTaxesSite ? TAXES_PATHS : MAIN_PATHS;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {isTaxesSite ? (
          <NextLink
            href={`/taxes/${locale}`}
            className="text-xl font-semibold text-brand-primary hover:text-brand-secondary"
          >
            Ana Nolan Taxes
          </NextLink>
        ) : (
          <Link
            href="/"
            className="text-xl font-semibold text-brand-primary hover:text-brand-secondary"
          >
            Ana Nolan
          </Link>
        )}
        <nav className="flex items-center gap-6">
          {links.map(({ key, href }) => {
            const fullHref = isTaxesSite
              ? `/taxes/${locale}${href === "/" ? "" : href}`
              : href;
            const isActive =
              fullPathname === fullHref ||
              (href !== "/" && fullPathname.startsWith(fullHref + "/"));
            const linkClass = `text-sm font-medium ${
              isActive
                ? "text-brand-primary"
                : "text-slate-600 hover:text-brand-primary"
            }`;
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
          <LanguageSwitcher isTaxesSite={isTaxesSite} locale={locale} />
        </nav>
      </div>
    </header>
  );
}
