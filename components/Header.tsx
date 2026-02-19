"use client";

import { useState, useEffect } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Main site: only blog and home (business card); blog has /blog (en) and /ru/blog (ru)
const MAIN_PATHS = [
  { key: "home", href: "/" },
  { key: "blog", href: "/blog" },
];

// All sections anchored on home page; services links to /services list page
const TAXES_PATHS = [
  { key: "home", href: "/", sectionId: null },
  { key: "whatWeDo", href: "/#services", sectionId: "services" },
  { key: "services", href: "/services", sectionId: null, isPageLink: true },
  { key: "pricing", href: "/#pricing", sectionId: "pricing" },
  { key: "faq", href: "/#faq", sectionId: "faq" },
  { key: "contact", href: "/#contact-form", sectionId: "contact-form" },
] as const;

interface HeaderProps {
  isTaxesSite: boolean;
  locale: string;
}

/** Build browser path for taxes subdomain: / for en, /ru for ru */
function taxesHref(href: string, locale: string): string {
  if (locale !== "ru") return href;
  const hashIdx = href.indexOf("#");
  const path = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const ruPath = path === "/" ? "/ru" : `/ru${path}`;
  return ruPath + hash;
}

/** True when we're on taxes home (pathname can be rewritten to /taxes/en or /taxes/ru). */
function isOnTaxesHome(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/" || pathname === "/ru" || pathname === "/taxes/en" || pathname === "/taxes/ru";
}

function NavLinks({
  isTaxesSite,
  locale,
  fullPathname,
  activeSection,
  t,
  mobile = false,
  onNavigate,
}: {
  isTaxesSite: boolean;
  locale: string;
  fullPathname: string | null;
  activeSection: string | null;
  t: (key: string) => string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const links = isTaxesSite ? TAXES_PATHS : MAIN_PATHS;
  const baseClass = mobile
    ? `block rounded-lg px-4 py-3 text-base font-medium ${isTaxesSite ? "text-taxes-gray-700 hover:bg-taxes-gray-100" : "text-slate-700 hover:bg-slate-100"}`
    : isTaxesSite
      ? "text-sm font-medium text-taxes-gray-600 hover:text-taxes-cyan"
      : "text-sm font-medium text-slate-600 hover:text-brand-primary";

  return (
    <>
      {links.map((item) => {
        const key = item.key;
        const href = "sectionId" in item ? item.href : item.href;
        const sectionId = "sectionId" in item ? item.sectionId : null;
        const isPageLink = "isPageLink" in item && item.isPageLink;
        const fullHref = isTaxesSite ? taxesHref(href, locale) : href;
        const onTaxesHome = isOnTaxesHome(fullPathname);
        const isActive = isTaxesSite
          ? isPageLink
            ? fullPathname?.includes("/services") ?? false
            : key === "home"
              ? onTaxesHome && activeSection === null
              : onTaxesHome && sectionId !== null && activeSection === sectionId
          : fullPathname === fullHref ||
            (href !== "/" && !href.startsWith("#") && fullPathname?.startsWith(fullHref + "/"));
        const activeUnderline = isTaxesSite && isActive && !mobile
          ? "border-b-2 border-taxes-cyan pb-0.5"
          : !isTaxesSite && isActive && !mobile
            ? "border-b-2 border-brand-primary pb-0.5"
            : "";
        const linkClass = mobile
          ? `${baseClass} ${isActive ? (isTaxesSite ? "bg-taxes-gray-100 text-taxes-cyan" : "bg-slate-100 text-brand-primary") : ""}`
          : `${baseClass} ${isActive ? (isTaxesSite ? "text-taxes-cyan " + activeUnderline : "text-brand-primary " + activeUnderline) : ""}`;

        const handleClick = () => onNavigate?.();

        if (isTaxesSite) {
          const isHashLink = fullHref.includes("#");
          if (isHashLink) {
            return (
              <a
                key={key}
                href={fullHref}
                className={linkClass}
                onClick={handleClick}
              >
                {t(key as "home")}
              </a>
            );
          }
          return (
            <NextLink key={key} href={fullHref} className={linkClass} onClick={handleClick}>
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

const TAXES_SECTION_IDS = ["services", "pricing", "faq", "contact-form"] as const;

/** Viewport Y (from top) used to decide which section is active. Just below fixed header. */
const SECTION_TRIGGER_Y = 120;

/** Active section = last one (in DOM order) whose top has crossed above the trigger line. */
function getActiveSection(): string | null {
  let active: string | null = null;
  for (const id of TAXES_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= SECTION_TRIGGER_Y) active = id;
  }
  return active;
}

export function Header({ isTaxesSite, locale }: HeaderProps) {
  const t = useTranslations(isTaxesSite ? "taxesNav" : "nav");
  const fullPathname = useNextPathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isTaxesHome = isTaxesSite && isOnTaxesHome(fullPathname);
  const logoHref = isTaxesSite ? (locale === "ru" ? "/ru" : "/") : "/";

  useEffect(() => {
    if (!isTaxesHome) {
      setActiveSection(null);
      return;
    }
    const update = () => setActiveSection(getActiveSection());
    update();
    let rafId: number | null = null;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        update();
        ticking = false;
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const hashCheck = setInterval(update, 150);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearInterval(hashCheck);
    };
  }, [isTaxesHome]);

  const headerBg = isTaxesSite ? "bg-taxes-white border-taxes-gray-200" : "bg-white/95 border-slate-200";
  const logoClass = isTaxesSite
    ? "text-taxes-gray-900 font-semibold hover:text-taxes-cyan"
    : "text-brand-primary hover:text-brand-secondary";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b ${headerBg} backdrop-blur`}>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-nowrap">
        {isTaxesSite ? (
          <NextLink href={logoHref} className={`flex items-center gap-2 text-xl ${logoClass}`}>
            <Image src="/icons/logo.svg" alt="" width={28} height={36} className="shrink-0" />
            A.N. Tax Expert
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
            activeSection={isTaxesHome ? activeSection : null}
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
              activeSection={isTaxesHome ? activeSection : null}
              t={t}
              mobile
              onNavigate={() => setMobileOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
}
