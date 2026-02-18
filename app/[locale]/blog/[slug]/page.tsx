import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getContentBySlug, getSlugs } from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ru"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const slugs = await getSlugs("main", "blog", locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const doc = await getContentBySlug("main", "blog", locale as Locale, slug);
  if (!doc) notFound();
  const t = await getTranslations("blog");
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose">
        <h1>{doc.frontmatter.title}</h1>
        <p className="text-sm text-slate-500">
          {new Date(doc.frontmatter.date).toLocaleDateString(locale)}
          {doc.frontmatter.author && ` · ${doc.frontmatter.author}`}
        </p>
        <MdxContent source={doc.content} />
      </article>
      <p className="mt-8">
        <Link href="/blog" className="text-brand-primary hover:underline">
          {t("backToList")}
        </Link>
      </p>
    </div>
  );
}
