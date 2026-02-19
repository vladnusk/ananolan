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
}: {
  /** "lead" = extended form (First Name, Last Name, phone, service). "default" = name, email, message. */
  variant?: "default" | "lead";
}) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const formName = variant === "lead" ? "lead" : "contact";

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
