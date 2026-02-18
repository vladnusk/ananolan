import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import type { Locale } from "./constants";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PageFrontmatter {
  title: string;
  description?: string;
  layout?: string;
  [key: string]: unknown;
}

export interface BlogFrontmatter extends PageFrontmatter {
  date: string;
  author?: string;
  image?: string;
}

/** Taxes homepage structured content (CMS-editable). */
export interface TaxesHomeFrontmatter {
  hero_title: string;
  hero_subtitle: string;
  hero_image?: string;
  highlights: { text: string }[];
  intro_headline: string;
  intro_text: string;
  about_headline: string;
  about_text: string;
  about_image?: string;
  services: { title: string; description: string }[];
  pricing?: {
    name: string;
    price: string;
    description?: string;
    features?: string[];
    highlighted?: boolean;
  }[];
}

export interface ContentDoc<T = PageFrontmatter> {
  slug: string;
  frontmatter: T;
  content: string;
}

type Site = "main" | "taxes";
type Collection = "pages" | "blog";

/**
 * List of main site page slugs (used for nav and routing).
 * Decap CMS will create files under content/main/pages/{locale}/.
 */
export const MAIN_PAGE_SLUGS = ["home", "about", "pricing", "contact"] as const;

/**
 * Taxes site page slugs (content/main → content/taxes for taxes site).
 */
export const TAXES_PAGE_SLUGS = ["landing", "pricing", "faq", "contact"] as const;

function contentPath(
  site: Site,
  collection: Collection,
  locale: Locale,
  slug?: string
): string {
  const base = path.join(CONTENT_DIR, site, collection, locale);
  return slug ? path.join(base, `${slug}.md`) : base;
}

/**
 * Read and parse a single Markdown file. Uses React cache() for request deduplication.
 * Using gray-matter for frontmatter; rendering is done via next-mdx-remote for consistency and safety.
 */
export const getContentBySlug = cache(
  async <T = PageFrontmatter>(
    site: Site,
    collection: Collection,
    locale: Locale,
    slug: string
  ): Promise<ContentDoc<T> | null> => {
    const filePath = contentPath(site, collection, locale, slug);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as T,
        content,
      };
    } catch {
      return null;
    }
  }
);

/**
 * List all slugs for a collection (for static params and listing).
 */
export const getSlugs = cache(
  async (
    site: Site,
    collection: Collection,
    locale: Locale
  ): Promise<string[]> => {
    const dir = contentPath(site, collection, locale);
    try {
      const files = fs.readdirSync(dir);
      return files
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
    } catch {
      return [];
    }
  }
);

const TAXES_HOME_DIR = path.join(CONTENT_DIR, "taxes", "home");

/**
 * Get taxes homepage content by locale. Returns null if file does not exist.
 */
export const getTaxesHome = cache(
  async (locale: Locale): Promise<ContentDoc<TaxesHomeFrontmatter> | null> => {
    const filePath = path.join(TAXES_HOME_DIR, `${locale}.md`);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: locale,
        frontmatter: data as TaxesHomeFrontmatter,
        content,
      };
    } catch {
      return null;
    }
  }
);

/**
 * Get all blog posts for a locale, sorted by date descending.
 */
export const getBlogPosts = cache(
  async (
    site: Site,
    locale: Locale
  ): Promise<ContentDoc<BlogFrontmatter>[]> => {
    const slugs = await getSlugs(site, "blog", locale);
    const posts: ContentDoc<BlogFrontmatter>[] = [];
    for (const slug of slugs) {
      const doc = await getContentBySlug<BlogFrontmatter>(
        site,
        "blog",
        locale,
        slug
      );
      if (doc) posts.push(doc);
    }
    posts.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
    return posts;
  }
);
