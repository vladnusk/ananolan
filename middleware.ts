import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { isTaxesSite } from "@/lib/constants";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Host-based routing and i18n:
 * - taxes.ananolan.com/* → internal /taxes/[locale]/*
 * - ananolan.com/* → standard next-intl (locale as-needed: / for en, /ru for ru)
 */
export default function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const pathname = req.nextUrl.pathname;

  // Decap CMS requests config at /config.yml (root) — handle before static-file skip
  if (pathname === "/config.yml") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/cms-config";
    return NextResponse.rewrite(url);
  }

  // Never touch api, static assets, or Next internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/uploads") ||
    /\/[^/]+\.[^/]+$/.test(pathname) // static file with extension
  ) {
    return NextResponse.next();
  }
  if (pathname === "/admin/config.yml") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/cms-config";
    return NextResponse.rewrite(url);
  }
  // Serve Decap CMS: /admin → index.html
  if (pathname === "/admin" || pathname === "/admin/") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/index.html";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/admin/config.yml") {
    const url = req.nextUrl.clone();
    url.pathname = "/api/cms-config";
    return NextResponse.rewrite(url);
  }
  if (pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  if (isTaxesSite(host)) {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    const isRu = first === "ru";
    const locale = isRu ? "ru" : "en";
    const rest = isRu ? segments.slice(1) : segments;
    const newPath =
      "/taxes/" + locale + (rest.length ? "/" + rest.join("/") : "");
    const url = req.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(req);
}

export const config = {
  // Decap loads config from /config.yml; also need /admin/config.yml for same-path setups
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/admin/config.yml",
    "/config.yml",
  ],
};
