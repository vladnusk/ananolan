"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

type Highlight = { text: string };
type Service = { title: string; description: string };
type PricingPlan = {
  name: string;
  price: string;
  description?: string;
  features?: string[] | { feature?: string }[];
  highlighted?: boolean;
};

function featureText(f: string | { feature?: string }): string {
  return typeof f === "string" ? f : f?.feature ?? "";
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
  services: Service[];
  pricing: PricingPlan[];
}

export function TaxesHomePageClient({
  heroTitle,
  heroSubtitle,
  heroImage,
  highlights,
  introHeadline,
  introText,
  aboutHeadline,
  aboutText,
  aboutImage,
  services,
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
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl bg-taxes-gray-100/80 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-taxes-cyan/15 text-taxes-cyan">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="font-medium text-taxes-gray-900">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-taxes-gray-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-taxes-cyan">
            {t("introLabel")}
          </p>
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
            <p className="text-sm font-semibold uppercase tracking-wider text-taxes-cyan">
              {t("aboutLabel")}
            </p>
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
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-taxes-cyan">
            {t("servicesLabel")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
            Comprehensive Tax Solutions
          </h2>
          <p className="mt-3 max-w-2xl text-taxes-gray-600">
            Professional services to keep you compliant and confident.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <div
                key={i}
                className="flex flex-col rounded-xl border border-taxes-gray-200 bg-taxes-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-taxes-cyan/15 text-taxes-cyan">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-taxes-gray-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-taxes-gray-600">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-taxes-gray-200 bg-taxes-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-taxes-cyan">
            {t("pricingLabel")}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-taxes-gray-900 md:text-4xl">
            Transparent & Affordable Pricing
          </h2>
          <p className="mt-3 max-w-2xl text-taxes-gray-600">
            Clear pricing for individuals and businesses. No hidden fees.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
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
                  {(plan.features ?? []).map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className={plan.highlighted ? "text-taxes-white" : "text-taxes-cyan"} aria-hidden>✓</span>
                      <span className={plan.highlighted ? "text-taxes-white/90" : "text-taxes-gray-600"}>
                        {featureText(f)}
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
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-taxes-gray-900 md:text-3xl">
            {t("contactLabel")}
          </h2>
          <p className="mt-2 text-taxes-gray-600">{t("contactSubtitle")}</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
