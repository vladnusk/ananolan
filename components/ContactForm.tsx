"use client";

import { useTranslations } from "next-intl";

/**
 * Netlify Forms: form name must match in netlify.toml or dashboard.
 * Add data-netlify="true" and hidden field for bot protection.
 */
export function ContactForm() {
  const t = useTranslations("contact");

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="mx-auto max-w-md space-y-4"
      action="/"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded bg-brand-primary px-4 py-2 font-medium text-white hover:bg-brand-secondary"
      >
        {t("submit")}
      </button>
    </form>
  );
}
