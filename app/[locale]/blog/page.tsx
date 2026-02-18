import { setRequestLocale, getTranslations } from "next-intl/server";
import { getBlogPosts } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/constants";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = await getBlogPosts("main", locale as Locale);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-secondary">
        {t("title")}
      </h1>
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-slate-200 pb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg font-medium text-brand-primary hover:underline"
            >
              {post.frontmatter.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              {new Date(post.frontmatter.date).toLocaleDateString(locale)}
              {post.frontmatter.author && ` · ${post.frontmatter.author}`}
            </p>
            {post.frontmatter.description && (
              <p className="mt-2 text-slate-600">{post.frontmatter.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
