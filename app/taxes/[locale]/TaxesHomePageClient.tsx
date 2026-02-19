"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { SectionBadge } from "@/components/SectionBadge";

type Highlight = { text: string };
type Service = { title: string; description: string };
type PricingPlan = {
  name: string;
  price: string;
  description?: string;
  /** Newline-separated string (CMS) or legacy array of strings/objects */
  features?: string | string[] | { feature?: string }[];
  highlighted?: boolean;
};

function featureText(f: string | { feature?: string }): string {
  return typeof f === "string" ? f : f?.feature ?? "";
}

function getPricingFeatures(features: PricingPlan["features"]): string[] {
  if (!features) return [];
  if (typeof features === "string") {
    return features.split("\n").map((s) => s.trim()).filter(Boolean);
  }
  return features.map((f) => featureText(f));
}

interface TaxesHomePageClientProps {
  locale: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  highlights: Highlight[];
  introHeadline: string;
  introText: string;
  aboutHeadline: string;
  aboutText: string;
  aboutImage?: string;
  servicesHeadline: string;
  servicesSubtitle: string;
  services: Service[];
  pricingHeadline: string;
  pricingSubtitle: string;
  pricing: PricingPlan[];
}

export function TaxesHomePageClient({
  locale,
  heroTitle,
  heroSubtitle,
  heroImage,
  highlights,
  introHeadline,
  introText,
  aboutHeadline,
  aboutText,
  aboutImage,
  servicesHeadline,
  servicesSubtitle,
  services,
  pricingHeadline,
  pricingSubtitle,
  pricing,
}: TaxesHomePageClientProps) {
  const t = useTranslations("taxesHome");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-taxes-hero">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-taxes-gray-900 md:text-5xl">
              {heroTitle}
            </h1>
            <p className="mt-4 text-lg text-taxes-gray-600">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex rounded-lg bg-taxes-cyan px-6 py-3 font-medium text-taxes-white hover:bg-taxes-cyan-light"
              >
                {t("getStarted")}
              </a>
              <a
                href="#contact-form"
                className="inline-flex rounded-lg border-2 border-taxes-cyan bg-transparent px-6 py-3 font-medium text-taxes-cyan hover:bg-taxes-cyan/5"
              >
                {t("freeConsultation")}
              </a>
            </div>
          </div>
          <div className="relative flex min-h-[280px] w-full items-center justify-center rounded-2xl bg-taxes-gray-200 md:min-h-[320px]">
            {heroImage ? (
              <Image
                src={heroImage.startsWith("/") ? heroImage : `/${heroImage}`}
                alt=""
                fill
                className="rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <span className="text-sm text-taxes-gray-500">Image placeholder</span>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-taxes-gray-200 bg-taxes-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="sr-only">{t("highlightsLabel")}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => {
              const HIGHLIGHT_ICONS: IconName[] = [
                "file",
                "globe",
                "globe",
                "headphones",
              ];
              const iconName = HIGHLIGHT_ICONS[i] ?? "file";
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-4 rounded-xl bg-taxes-gray-100/80 p-8 text-center"
                >
                  <Icon
                    name={iconName}
                    size={24}
                    shape="circle"
                    color="taxes-white"
                    wrapperColor="taxes-cyan"
                  />
                  <span className="font-medium text-taxes-gray-900">{h.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-taxes-gray-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionBadge>{t("introLabel")}</SectionBadge>
          <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
            {introHeadline}
          </h2>
          <div className="mt-6 whitespace-pre-line text-taxes-gray-600 leading-relaxed">
            {introText}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-taxes-gray-200 bg-taxes-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-taxes-gray-200">
            {aboutImage ? (
              <Image
                src={aboutImage.startsWith("/") ? aboutImage : `/${aboutImage}`}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-taxes-gray-500 text-sm">
                About image placeholder
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <SectionBadge className="self-start">{t("aboutLabel")}</SectionBadge>
            <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
              {aboutHeadline}
            </h2>
            <div className="mt-6 whitespace-pre-line text-taxes-gray-600 leading-relaxed">
              {aboutText}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 border-t border-taxes-gray-200 bg-taxes-gray-100 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <SectionBadge>{t("servicesLabel")}</SectionBadge>
          <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
            {servicesHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-taxes-gray-600">
            {servicesSubtitle}
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const SERVICE_ICONS: IconName[] = [
                "building", // Business Registration
                "chart", // Business Tax Returns
                "person", // Individual Tax Filing
                "chart", // Bookkeeping Services
                "calendar", // Tax Planning
                "chart", // Cryptocurrency Tax Services
                "globe", // Non-Resident Tax Services
                "clock", // Sales & Payroll Taxes
              ];
              const iconName = SERVICE_ICONS[i] ?? "file";
              return (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-taxes-gray-200 bg-taxes-white p-6 text-left shadow-sm transition hover:shadow-md"
                >
                  <Icon
                    name={iconName}
                    size={24}
                    shape="square"
                    color="taxes-white"
                    wrapperColor="taxes-cyan"
                  />
                  <h3 className="mt-3 font-semibold tracking-tight text-taxes-gray-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-left text-sm text-taxes-gray-600">{s.description}</p>
                  <a
                    href={locale === "ru" ? "/ru/services" : "/services"}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-taxes-cyan hover:text-taxes-cyan-light"
                  >
                    {t("learnMore")}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-taxes-gray-200 bg-taxes-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <SectionBadge>{t("pricingLabel")}</SectionBadge>
          <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
            {pricingHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-taxes-gray-600">
            {pricingSubtitle}
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border-2 p-8 ${
                  plan.highlighted
                    ? "border-taxes-cyan bg-taxes-cyan text-taxes-white shadow-lg"
                    : "border-taxes-gray-200 bg-taxes-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-taxes-gray-900 px-3 py-0.5 text-xs font-medium text-taxes-white">
                    {t("popular")}
                  </span>
                )}
                <h3 className={`text-xl font-bold ${plan.highlighted ? "text-taxes-white" : "text-taxes-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-3xl font-bold ${plan.highlighted ? "text-taxes-white" : "text-taxes-cyan"}`}>
                  {plan.price}
                </p>
                {plan.description && (
                  <p className={`mt-2 text-sm ${plan.highlighted ? "text-taxes-white/90" : "text-taxes-gray-600"}`}>
                    {plan.description}
                  </p>
                )}
                <ul className="mt-6 flex-1 space-y-2">
                  {getPricingFeatures(plan.features).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className={plan.highlighted ? "text-taxes-white" : "text-taxes-cyan"} aria-hidden>✓</span>
                      <span className={plan.highlighted ? "text-taxes-white/90" : "text-taxes-gray-600"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact-form"
                  className={`mt-8 inline-flex justify-center rounded-lg px-4 py-3 font-medium ${
                    plan.highlighted
                      ? "bg-taxes-white text-taxes-cyan hover:bg-taxes-gray-100"
                      : "border-2 border-taxes-cyan text-taxes-cyan hover:bg-taxes-cyan/5"
                  }`}
                >
                  {t("getStarted")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Form */}
      <section id="contact-form" className="scroll-mt-20 border-t border-taxes-gray-200 bg-taxes-gray-100 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-taxes-gray-900 md:text-3xl">
              {t("contactSectionTitle")}
            </h2>
            <p className="mt-2 text-taxes-gray-600">
              {t("contactSectionSubtitle")}
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="tel:+19176356138"
                className="flex items-center gap-3 text-taxes-gray-700 hover:text-taxes-cyan"
              >
                <Icon name="phone" size={24} shape="square" color="taxes-white" wrapperColor="taxes-cyan" />
                <span>917-635-6138</span>
              </a>
              <div className="flex items-center gap-3 text-taxes-gray-700">
                <Icon name="location-pin" size={24} shape="square" color="taxes-white" wrapperColor="taxes-cyan" />
                <span>Miami, FL</span>
              </div>
              <a
                href="mailto:info@ananolan.com"
                className="flex items-center gap-3 text-taxes-gray-700 hover:text-taxes-cyan"
              >
                <Icon name="email" size={24} shape="square" color="taxes-white" wrapperColor="taxes-cyan" />
                <span>info@ananolan.com</span>
              </a>
            </div>
          </div>
          <div>
            <ContactForm variant="lead" />
          </div>
        </div>
      </section>
    </>
  );
}
