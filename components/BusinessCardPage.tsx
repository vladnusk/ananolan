"use client";

import Image from "next/image";
import Link from "next/link";
import type { BusinessCardFrontmatter } from "@/lib/content";
import { ContactForm } from "./ContactForm";

interface BusinessCardPageProps {
  data: BusinessCardFrontmatter;
}

const SOCIAL_ICONS: Record<string, string> = {
  linkedin: "/icons/linkedin.svg",
  facebook: "/icons/facebook.svg",
  instagram: "/icons/instagram.svg",
};

export function BusinessCardPage({ data }: BusinessCardPageProps) {
  return (
    <div className="min-h-screen bg-business-card-gray-bg py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:gap-10">
        {/* Left column – Profile card */}
        <div className="flex-shrink-0 md:w-[380px]">
          <div className="rounded-2xl bg-white p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col items-center text-center">
              {data.photo && (
                <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full bg-taxes-gray-200">
                  <Image
                    src={data.photo.startsWith("/") ? data.photo : `/${data.photo}`}
                    alt={data.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              )}
              <h1 className="text-2xl font-bold text-taxes-gray-900 md:text-3xl">
                {data.name}
              </h1>
              <p className="mt-1 text-base font-medium text-taxes-cyan">
                {data.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-taxes-gray-600">
                {data.bio}
              </p>
            </div>

            {/* Contact blocks */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-4 rounded-xl bg-gradient-to-b from-business-card-blue-light to-taxes-gray-100 px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-taxes-cyan">
                  <Image src="/icons/email.svg" alt="" width={16} height={12} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-taxes-gray-500">Email</p>
                  <p className="text-sm font-medium text-taxes-gray-700">
                    {data.email}
                  </p>
                </div>
              </a>
              <a
                href={`tel:${data.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-4 rounded-xl bg-gradient-to-b from-business-card-blue-light to-taxes-gray-100 px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-taxes-cyan">
                  <Image src="/icons/phone.svg" alt="" width={16} height={16} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-taxes-gray-500">Phone</p>
                  <p className="text-sm font-medium text-taxes-gray-700">
                    {data.phone}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4 rounded-xl bg-gradient-to-b from-business-card-blue-light to-taxes-gray-100 px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-taxes-cyan">
                  <Image
                    src="/icons/location-pin.svg"
                    alt=""
                    width={12}
                    height={16}
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs text-taxes-gray-500">Location</p>
                  <p className="text-sm font-medium text-taxes-gray-700">
                    {data.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 text-center">
              <p className="mb-3 text-sm text-taxes-gray-500">Connect With Me</p>
              <div className="flex justify-center gap-3">
                {(data.social_links ?? []).map((link) => {
                  const icon = SOCIAL_ICONS[link.platform.toLowerCase()];
                  if (!icon) return null;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-taxes-cyan transition-opacity hover:opacity-90"
                      aria-label={link.platform}
                    >
                      <Image
                        src={icon}
                        alt=""
                        width={18}
                        height={18}
                        className="brightness-0 invert"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right column – 3 containers */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Taxes promo card */}
          <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-business-card-blue to-business-card-blue-dark shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] px-6 py-8 md:px-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                <Image
                  src="/icons/calculator.svg"
                  alt=""
                  width={23}
                  height={30}
                  className="brightness-0 invert"
                />
              </div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {data.taxes_promo_title}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/95">
                {data.taxes_promo_subtitle}
              </p>
              <Link
                href={data.taxes_promo_cta_url}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-business-card-blue-dark shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-95"
              >
                {data.taxes_promo_cta_text}
                <svg
                  className="h-5 w-5"
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
              </Link>
            </div>
            <div className="mt-6 border-t border-white/20 pt-6">
              <div className="flex flex-wrap justify-center divide-x divide-white/30">
                {(data.taxes_highlights ?? []).map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center px-6 py-1 text-white"
                  >
                    <span className="text-lg font-bold md:text-xl">{h.value}</span>
                    <span className="text-xs md:text-sm opacity-90">
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Blog promo card */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-taxes-cyan">
                <Image
                  src="/icons/blog.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-taxes-gray-900">
                  {data.blog_promo_title}
                </h2>
                <p className="text-sm text-taxes-gray-500">
                  {data.blog_promo_subtitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-taxes-gray-600">
                  {data.blog_promo_description}
                </p>
                <Link
                  href={data.blog_promo_cta_url}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-taxes-cyan underline decoration-taxes-cyan underline-offset-2 hover:text-taxes-cyan-light"
                >
                  {data.blog_promo_cta_text}
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
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form card */}
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] md:p-8">
            <h2 className="mb-6 text-xl font-bold text-taxes-gray-900">
              {data.contact_form_title}
            </h2>
            <ContactForm variant="business" submitText={data.contact_submit_text} />
          </div>
        </div>
      </div>
    </div>
  );
}
