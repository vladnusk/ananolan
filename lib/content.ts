import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { DEFAULT_LOCALE, type Locale } from "./constants";

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
  services_headline?: string;
  services_subtitle?: string;
  services: { title: string; description: string }[];
  pricing_headline?: string;
  pricing_subtitle?: string;
  pricing?: {
    name: string;
    price: string;
    description?: string;
    /** Newline-separated string (CMS) or array of strings/objects */
    features?: string | string[] | { feature?: string }[];
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
 * Falls back to English when the requested locale file does not exist.
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
    let data: T;
    let content: string;
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = matter(raw);
      data = parsed.data as T;
      content = parsed.content;
    } catch {
      if (locale !== DEFAULT_LOCALE) {
        return getContentBySlug(site, collection, DEFAULT_LOCALE, slug);
      }
      return null;
    }

    // Fallback media to English when empty (no duplicate uploads needed)
    if (locale !== DEFAULT_LOCALE) {
      const enDoc = await getContentBySlug<T>(site, collection, DEFAULT_LOCALE, slug);
      if (enDoc?.frontmatter) {
        const fm = enDoc.frontmatter as unknown as Record<string, unknown>;
        const dataRecord = data as unknown as Record<string, unknown>;
        for (const key of MEDIA_FALLBACK_FIELDS) {
          const val = dataRecord[key];
          if (val === undefined || val === null || val === "") {
            const enVal = fm[key];
            if (enVal) dataRecord[key] = enVal;
          }
        }
      }
    }

    return { slug, frontmatter: data, content };
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
 * Media fields that fall back to English when empty (avoids duplicate uploads).
 * Used by both getContentBySlug and getTaxesHome.
 */
const MEDIA_FALLBACK_FIELDS = ["hero_image", "about_image", "image"] as const;

/**
 * Get taxes homepage content by locale.
 * Falls back to English when the locale file does not exist.
 * Media fields (hero_image, about_image) fall back to English when empty.
 */
export const getTaxesHome = cache(
  async (locale: Locale): Promise<ContentDoc<TaxesHomeFrontmatter> | null> => {
    const filePath = path.join(TAXES_HOME_DIR, `${locale}.md`);
    let data: TaxesHomeFrontmatter;
    let content: string;
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = matter(raw);
      data = parsed.data as TaxesHomeFrontmatter;
      content = parsed.content;
    } catch {
      if (locale !== DEFAULT_LOCALE) {
        return getTaxesHome(DEFAULT_LOCALE);
      }
      return null;
    }

    // Fallback media to English when empty (no duplicate uploads needed)
    if (locale !== DEFAULT_LOCALE) {
      const enDoc = await getTaxesHome(DEFAULT_LOCALE);
      if (enDoc?.frontmatter) {
        const fm = enDoc.frontmatter as unknown as Record<string, unknown>;
        const dataRecord = data as unknown as Record<string, unknown>;
        for (const key of MEDIA_FALLBACK_FIELDS) {
          const val = dataRecord[key];
          if (val === undefined || val === null || val === "") {
            const enVal = fm[key];
            if (enVal) dataRecord[key] = enVal;
          }
        }
      }
    }

    return {
      slug: locale,
      frontmatter: data,
      content,
    };
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
