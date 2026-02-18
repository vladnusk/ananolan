import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LOCALES } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function TaxesLocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header isTaxesSite locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer isTaxesSite />
      </div>
    </NextIntlClientProvider>
  );
}
