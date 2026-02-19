import { notFound } from "next/navigation";
import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { getTaxesServices } from "@/lib/content";
import { Icon, type IconName } from "@/components/Icon";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

const SERVICE_ICONS: IconName[] = [
  "building",
  "chart",
  "person",
  "chart",
  "calendar",
  "chart",
  "globe",
  "clock",
];

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function TaxesServicesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ru") notFound();
  const services = await getTaxesServices(locale as Locale, false);
  const t = await getTranslations("taxesServices");
  const tHome = await getTranslations("taxesHome");

  const servicesHref = locale === "ru" ? "/ru/services" : "/services";

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-taxes-gray-900 md:text-4xl">
          {t("pageTitle")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-taxes-gray-600">
          {t("pageSubtitle")}
        </p>
      </header>
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const iconName = SERVICE_ICONS[i % SERVICE_ICONS.length];
          const href = `${servicesHref}/${s.slug}`;
          return (
            <NextLink
              key={s.slug}
              href={href}
              className="flex flex-col rounded-xl border border-taxes-gray-200 bg-taxes-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <Icon
                name={iconName}
                size={24}
                shape="square"
                color="taxes-white"
                wrapperColor="taxes-cyan"
              />
              <h2 className="mt-3 font-semibold tracking-tight text-taxes-gray-900">
                {s.frontmatter.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-taxes-gray-600">
                {s.frontmatter.short_description}
              </p>
              {s.frontmatter.price && (
                <p className="mt-3 text-sm font-medium text-taxes-cyan">
                  {t("fromPrice")} {s.frontmatter.price}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-taxes-cyan">
                {tHome("learnMore")}
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
