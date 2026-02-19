import { notFound } from "next/navigation";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { getTaxesServiceBySlug, getTaxesServices } from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ru"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const services = await getTaxesServices(locale, false);
    for (const s of services) {
      params.push({ locale, slug: s.slug });
    }
  }
  return params;
}

export default async function TaxesServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "ru") notFound();
  const doc = await getTaxesServiceBySlug(locale as Locale, slug);
  if (!doc) notFound();
  const t = await getTranslations("taxesServices");

  const servicesHref = locale === "ru" ? "/ru/services" : "/services";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <NextLink
        href={servicesHref}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-taxes-cyan hover:text-taxes-cyan-light"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
        {t("backToServices")}
      </NextLink>
      <article>
        <h1 className="text-3xl font-bold text-taxes-gray-900 md:text-4xl">
          {doc.frontmatter.title}
        </h1>
        <p className="mt-4 text-taxes-gray-600">
          {doc.frontmatter.short_description}
        </p>
        {doc.frontmatter.price && (
          <p className="mt-4 text-xl font-semibold text-taxes-cyan">
            {t("fromPrice")} {doc.frontmatter.price}
          </p>
        )}
        {doc.content && (
          <div className="prose mt-8 max-w-none">
            <MdxContent source={doc.content} />
          </div>
        )}
      </article>
      <div className="mt-12">
        <NextLink
          href={locale === "ru" ? "/ru#contact-form" : "/#contact-form"}
          className="inline-flex rounded-lg bg-taxes-cyan px-6 py-3 font-medium text-taxes-white hover:bg-taxes-cyan-light"
        >
          {t("getInTouch")}
        </NextLink>
      </div>
    </div>
  );
}
