import { notFound } from "next/navigation";
import { getTaxesHome, getTaxesServices } from "@/lib/content";
import { TaxesHomePageClient } from "./TaxesHomePageClient";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

const DEFAULT_HOME = {
  hero_title: "U.S. Tax & Accounting Services You Can Trust",
  hero_subtitle:
    "Professional tax preparation, bookkeeping, and business services for individuals and companies across the United States — fully online.",
  highlights: [
    { text: "Certified Tax Professional" },
    { text: "Serving clients in all 50 states" },
    { text: "Russian and English support" },
    { text: "Year-round assistance" },
  ],
  intro_headline: "Welcome to Your Trusted Accounting Partner",
  intro_text:
    "We provide professional tax and accounting services for individuals, business owners, and non-residents across the United States. Whether you need help filing taxes, starting a business, managing bookkeeping, or reporting cryptocurrency, we make the process simple, secure, and fully online.\n\nOur goal is to help you stay compliant, reduce taxes, and gain peace of mind — with reliable support you can trust.",
  about_headline: "Your Trusted Accounting Partner",
  about_text:
    "Founded by Anastasia Nolan, Certified Tax Preparer and QuickBooks ProAdvisor, our firm provides professional tax and accounting services for clients across the United States.\n\nWe specialize in helping Russian-speaking individuals, business owners, and non-residents navigate U.S. tax regulations with confidence.\n\nOur fully online services make working with us simple, secure, and convenient — no matter where you are located.",
  services_headline: "Comprehensive Tax Solutions",
  services_subtitle: "Professional services to keep you compliant and confident.",
  services: [],
  pricing_headline: "Transparent & Affordable Pricing",
  pricing_subtitle: "Clear pricing for individuals and businesses. No hidden fees.",
  faq_headline: "Frequently Asked Questions",
  faq_subtitle: "Quick answers to common questions about our tax services.",
  faq: [
    { question: "Do you work with clients outside the United States?", answer: "Yes. We specialize in helping non-residents, foreign business owners, and new immigrants navigate U.S. tax regulations. All our services are delivered fully online." },
    { question: "How long does tax preparation take?", answer: "Typical individual returns are completed within 5–7 business days after we receive all documents. Business returns may take 1–2 weeks depending on complexity." },
    { question: "What documents do I need to provide?", answer: "For individuals, we typically need W-2s, 1099s, and records of deductions. For business returns, we need financial statements, bank records, and receipts. We'll send you a tailored checklist." },
    { question: "Do you offer year-round support?", answer: "Yes. We provide ongoing bookkeeping, tax planning, and advisory support throughout the year, not just during tax season." },
  ],
  pricing: [
    { name: "Basic", price: "$99", description: "Individual tax return, simple situation.", features: ["Federal & state filing", "Standard deduction", "Email support"], highlighted: false },
    { name: "Professional", price: "$199", description: "Most popular for individuals and sole proprietors.", features: ["Everything in Basic", "Itemized deductions", "Schedule C support", "Priority support"], highlighted: true },
    { name: "Business", price: "$499", description: "Full business and multi-state support.", features: ["Everything in Professional", "Business entity returns", "Multi-state filing", "Year-round advisory"], highlighted: false },
  ],
};

export default async function TaxesLandingPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "ru") notFound();
  const doc = await getTaxesHome(locale as Locale);
  const data = doc ? doc.frontmatter : DEFAULT_HOME;
  const heroImage = doc?.frontmatter?.hero_image;
  const aboutImage = doc?.frontmatter?.about_image;
  const pricing = data.pricing ?? DEFAULT_HOME.pricing;
  const services = await getTaxesServices(locale as Locale, true);

  // Fallback to defaults when CMS-saved content has empty/missing text
  const heroTitle = (data.hero_title ?? DEFAULT_HOME.hero_title) || DEFAULT_HOME.hero_title;
  const heroSubtitle = (data.hero_subtitle ?? DEFAULT_HOME.hero_subtitle) || DEFAULT_HOME.hero_subtitle;
  const introHeadline = (data.intro_headline ?? DEFAULT_HOME.intro_headline) || DEFAULT_HOME.intro_headline;
  const introText = (data.intro_text ?? DEFAULT_HOME.intro_text) || DEFAULT_HOME.intro_text;
  const aboutHeadline = (data.about_headline ?? DEFAULT_HOME.about_headline) || DEFAULT_HOME.about_headline;
  const aboutText = (data.about_text ?? DEFAULT_HOME.about_text) || DEFAULT_HOME.about_text;

  return (
    <TaxesHomePageClient
      locale={locale}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      heroImage={heroImage}
      highlights={data.highlights ?? DEFAULT_HOME.highlights}
      introHeadline={introHeadline}
      introText={introText}
      aboutHeadline={aboutHeadline}
      aboutText={aboutText}
      aboutImage={aboutImage}
      servicesHeadline={data.services_headline ?? DEFAULT_HOME.services_headline}
      servicesSubtitle={data.services_subtitle ?? DEFAULT_HOME.services_subtitle}
      services={services}
      pricingHeadline={data.pricing_headline ?? DEFAULT_HOME.pricing_headline}
      pricingSubtitle={data.pricing_subtitle ?? DEFAULT_HOME.pricing_subtitle}
      pricing={pricing}
      faqHeadline={data.faq_headline ?? DEFAULT_HOME.faq_headline}
      faqSubtitle={data.faq_subtitle ?? DEFAULT_HOME.faq_subtitle}
      faq={data.faq ?? DEFAULT_HOME.faq}
    />
  );
}
