import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getContentBySlug } from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = await getContentBySlug("main", "pages", locale as Locale, "pricing");
  if (!doc) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose">
        <h1>{doc.frontmatter.title}</h1>
        <MdxContent source={doc.content} />
      </article>
    </div>
  );
}
