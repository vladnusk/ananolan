import { setRequestLocale } from "next-intl/server";
import { getContentBySlug } from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function MainHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const doc = await getContentBySlug("main", "pages", locale as Locale, "home");
  if (!doc) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-brand-secondary">Ana Nolan</h1>
        <p className="mt-4 text-slate-600">Welcome. Add content/main/pages/{locale}/home.md</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose">
        <h1>{doc.frontmatter.title}</h1>
        <MdxContent source={doc.content} />
      </article>
    </div>
  );
}
