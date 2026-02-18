import { notFound } from "next/navigation";
import { getTaxesHome } from "@/lib/content";
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
  services: [
    { title: "Business Registration", description: "Start your U.S. business with confidence. We help you register LLCs and corporations, obtain EIN numbers, and ensure full compliance from day one." },
    { title: "Business Tax Returns", description: "Accurate preparation and filing for LLCs, S-Corps, and C-Corps. We help minimize tax liability and keep your business compliant." },
    { title: "Individual Tax Filing", description: "Professional tax preparation for individuals in all 50 states. We maximize deductions and ensure accurate filing." },
    { title: "Bookkeeping Services", description: "Stay organized with professional bookkeeping, financial reports, and ongoing support for your business." },
    { title: "Tax Planning", description: "Strategic tax planning to help you legally reduce taxes and improve your financial results." },
    { title: "Cryptocurrency Tax Services", description: "Accurate reporting of crypto trading, investing, staking, and mining to ensure full IRS compliance." },
    { title: "Non-Resident Tax Services", description: "Specialized tax services for non-U.S. residents, foreign business owners, and new immigrants." },
    { title: "Sales & Payroll Taxes", description: "Complete management of payroll taxes and sales tax filings to keep your business compliant." },
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

  return (
    <TaxesHomePageClient
      locale={locale}
      heroTitle={data.hero_title}
      heroSubtitle={data.hero_subtitle}
      heroImage={heroImage}
      highlights={data.highlights}
      introHeadline={data.intro_headline}
      introText={data.intro_text}
      aboutHeadline={data.about_headline}
      aboutText={data.about_text}
      aboutImage={aboutImage}
      services={data.services}
      pricing={pricing}
    />
  );
}
