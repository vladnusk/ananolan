"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface MainLayoutShellProps {
  children: React.ReactNode;
  locale: string;
}

/**
 * Main domain layout shell. Shows header and footer on all pages except home.
 * Business card home page has no nav/footer.
 */
export function MainLayoutShell({ children, locale }: MainLayoutShellProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header isTaxesSite={false} locale={locale} />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
