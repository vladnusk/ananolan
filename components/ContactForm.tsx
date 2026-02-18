"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Netlify Forms: submission goes to static __forms.html (see public/__forms.html and
 * https://ntl.fyi/next-runtime-forms-migration). Do not use data-netlify on this form.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4"
    >
      <input type="hidden" name="form-name" value="contact" />
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
        className="w-full rounded bg-brand-primary px-4 py-2 font-medium text-white hover:bg-brand-secondary disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
