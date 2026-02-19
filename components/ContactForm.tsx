"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const LEAD_FORM_SERVICES = [
  "Individual Tax Filing",
  "Business Tax Returns",
  "Bookkeeping Services",
  "Tax Planning",
  "Cryptocurrency Tax Services",
  "Non-Resident Tax Services",
  "Sales & Payroll Taxes",
  "Other",
];

/**
 * Netlify Forms: submission goes to static __forms.html (see public/__forms.html and
 * https://ntl.fyi/next-runtime-forms-migration). Do not use data-netlify on this form.
 */
export function ContactForm({
  variant = "default",
  submitText = "Send Message",
}: {
  /** "lead" = extended form. "default" = name, email, message. "business" = Your Name, Email, Message (business card). */
  variant?: "default" | "lead" | "business";
  /** Custom submit button text for business variant. */
  submitText?: string;
}) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const formName = variant === "lead" ? "lead" : variant === "business" ? "business" : "contact";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-taxes-gray-300 px-3 py-2 focus:border-taxes-cyan focus:outline-none focus:ring-1 focus:ring-taxes-cyan disabled:opacity-50";

  if (variant === "business") {
    return (
      <form name={formName} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="form-name" value={formName} />
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>
        <div>
          <label htmlFor="business-name" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            Your Name
          </label>
          <input
            id="business-name"
            name="name"
            placeholder="John Doe"
            type="text"
            required
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="business-email" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            Email Address
          </label>
          <input
            id="business-email"
            name="email"
            placeholder="john@example.com"
            type="email"
            required
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="business-message" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            Message
          </label>
          <textarea
            id="business-message"
            name="message"
            placeholder="How can I help you?"
            rows={4}
            required
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        {status === "success" && (
          <p className="text-sm text-green-600">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{t("error")}</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-business-card-blue to-business-card-blue-dark px-6 py-3 font-medium text-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-95 disabled:opacity-50"
        >
          {status === "sending" ? t("sending") : submitText}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
            <path
              d="M17.5115 0.197009C17.8665 0.443103 18.0529 0.868494 17.9861 1.29388L15.7361 15.9189C15.6833 16.2599 15.4759 16.5587 15.1736 16.7275C14.8712 16.8962 14.5091 16.9173 14.1892 16.7837L9.9845 15.0365L7.57629 17.6415C7.2634 17.9826 6.77122 18.0951 6.33879 17.9263C5.90637 17.7576 5.62512 17.3392 5.62512 16.8751V13.9361C5.62512 13.7954 5.67786 13.6619 5.77278 13.5599L11.665 7.12982C11.8689 6.90834 11.8618 6.56732 11.6509 6.35638C11.44 6.14545 11.0989 6.13138 10.8775 6.33178L3.72668 12.6845L0.622388 11.1306C0.249731 10.9443 0.0106689 10.5716 0.000122031 10.1568C-0.0104248 9.74193 0.207544 9.35521 0.566138 9.14779L16.3161 0.147791C16.6923 -0.0666624 17.1564 -0.0455687 17.5115 0.197009Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    );
  }

  if (variant === "lead") {
    return (
      <form name={formName} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="form-name" value={formName} />
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-firstName" className="mb-1 block text-sm font-medium text-taxes-gray-700">
              {t("firstName")}
            </label>
            <input
              id="lead-firstName"
              name="first_name"
              placeholder={t("firstNamePlaceholder")}
              type="text"
              required
              disabled={status === "sending"}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lead-lastName" className="mb-1 block text-sm font-medium text-taxes-gray-700">
              {t("lastName")}
            </label>
            <input
              id="lead-lastName"
              name="last_name"
              placeholder={t("lastNamePlaceholder")}
              type="text"
              required
              disabled={status === "sending"}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="lead-email" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            {t("email")}
          </label>
          <input
            id="lead-email"
            name="email"
            placeholder={t("emailPlaceholder")}
            type="email"
            required
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            {t("phone")}
          </label>
          <input
            id="lead-phone"
            name="phone"
            placeholder={t("phonePlaceholder")}
            type="tel"
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lead-service" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            {t("service")}
          </label>
          <select
            id="lead-service"
            name="service"
            disabled={status === "sending"}
            className={inputClass}
          >
            <option value="">{t("servicePlaceholder")}</option>
            {LEAD_FORM_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-message" className="mb-1 block text-sm font-medium text-taxes-gray-700">
            {t("message")}
          </label>
          <textarea
            id="lead-message"
            name="message"
            placeholder={t("messagePlaceholder")}
            rows={4}
            required
            disabled={status === "sending"}
            className={inputClass}
          />
        </div>
        {status === "success" && (
          <p className="text-sm text-green-600">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{t("error")}</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex justify-center w-full rounded-lg bg-taxes-cyan px-6 py-3 font-medium text-taxes-white hover:bg-taxes-cyan-light"
        >
          {status === "sending" ? t("sending") : t("submit")}
        </button>
      </form>
    );
  }

  return (
    <form
      name={formName}
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4"
    >
      <input type="hidden" name="form-name" value={formName} />
      <p className="hidden">
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === "sending"}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "sending"}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={status === "sending"}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:opacity-50"
        />
      </div>
      {status === "success" && (
        <p className="text-sm text-green-600">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{t("error")}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex justify-center w-full rounded-lg bg-taxes-cyan px-6 py-3 font-medium text-taxes-white hover:bg-taxes-cyan-light"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
