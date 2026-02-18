# Ana Nolan – Production-ready Next.js monorepo

Two sites served from one Next.js app:

1. **Main site** at `ananolan.com`: Home, About, Pricing, Contact, Blog.
2. **Taxes landing** at `taxes.ananolan.com`: Landing, Pricing, FAQ, Contact.

Both are editable via **Decap CMS** at `/admin`, with **i18n** (en + ru) and path-based locales: `/` (en), `/ru` (ru).

## Tech stack

- **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**
- **next-intl** for UI strings; content from Markdown in Git
- **gray-matter** + **next-mdx-remote** for Markdown/MDX
- **Decap CMS** (Git Gateway + Netlify Identity)
- **Netlify** for hosting and forms

## Local development

Requires **Node 18+** (20 recommended for Netlify).

```bash
npm install
npm run dev
```

- Main site: **http://localhost:3000**
- Taxes site: add to `/etc/hosts`: `127.0.0.1 taxes.ananolan.com` then open **http://taxes.ananolan.com:3000**

### Using the CMS locally

The admin UI lives under **`public/admin/`** (you’ll see `index.html` and `config.yml` there in your file tree).

1. **Open the CMS**  
   With the app running (`npm run dev`), go to **http://localhost:3000/admin**. You should see the Decap CMS login screen and the sidebar with collections (Main Pages, Main Blog, Taxes Pages in en/ru).

2. **What works locally**  
   - You can open the admin and browse the collection list.  
   - **Saving/publishing does not work** on localhost with the default setup: the config uses **Git Gateway**, which only works when the site is on Netlify with Identity and Git Gateway enabled.

3. **To edit content locally** you can either:
   - **Edit files in the repo** under `content/main/...` and `content/taxes/...` (Markdown with frontmatter). The site will show changes after refresh.
   - **Use the Decap local backend** so the CMS can read/write to your repo from localhost: see [Decap CMS local backend](https://decapcms.org/docs/local-backend/). Run that proxy alongside `npm run dev` and point the admin config to it when developing.

4. **To test full CMS flow (login + publish)**  
   Deploy the app to Netlify, enable Identity and Git Gateway (see “Decap CMS auth on Netlify” below), then use **https://your-site.netlify.app/admin**.

Build:

```bash
npm run build
npm start
```

## Custom domains on Netlify

1. **Main site**  
   - In Netlify: **Domain management** → **Add custom domain** → `ananolan.com`.  
   - Add the DNS records Netlify shows (A/CNAME).  
   - Optional: add `www.ananolan.com` and set redirect to `ananolan.com`.

2. **Taxes site**  
   - Same repo can serve both domains with **branch subdomains** or a **second site**:
     - **Option A – One site, multiple domains:** Add `taxes.ananolan.com` as an additional domain on the same Netlify site. The app uses host-based routing, so `taxes.ananolan.com` will serve the taxes section.
     - **Option B – Two Netlify sites:** Deploy the same repo to a second Netlify site and assign `taxes.ananolan.com` to that site. Both use the same codebase and host header to decide which content to show.

   For Option A: **Domain management** → **Add domain alias** → `taxes.ananolan.com` and add the CNAME (or A) record Netlify provides.

## Decap CMS auth on Netlify (Git Gateway + Identity)

1. **Enable Identity**  
   Netlify dashboard → **Site** → **Identity** → **Enable Identity**.

2. **Enable Git Gateway**  
   **Identity** → **Services** → **Git Gateway** → **Enable**. This lets Identity users commit to the repo.

3. **Registration**  
   - **Identity** → **Settings and usage** → **Registration**: set to **Invite only** (recommended) or **Open**.
   - **Invite** users from **Identity** → **Invite users** (they get an email to set password).

4. **CMS access**  
   - Open `https://your-site.netlify.app/admin` (or your custom domain).
   - Log in with a Netlify Identity user; Git Gateway will then perform Git operations for that user.

5. **Local dev with CMS**  
   - For local backend (avoid Git Gateway while developing), you can use [Decap CMS local backend](https://decapcms.org/docs/local-backend/) and run it separately; the repo is set up for production Git Gateway.

## Adding a new blog post

1. Go to **https://your-domain.com/admin** and log in.
2. Under **Main Blog (English)** or **Main Blog (Russian)**, click **New Main Blog (English)** (or Russian).
3. Set **Title**, **Description**, **Date**, **Author**, and **Body** (markdown).
4. **Slug** is derived from the filename; use a URL-friendly name (e.g. `my-new-post`).
5. Click **Publish** → **Publish now**. The post will appear at `/blog/my-new-post` (or `/ru/blog/my-new-post` for Russian).

Content is stored under `content/main/blog/{en|ru}/*.md`.

## How i18n works

- **Locales:** `en` (default), `ru`.
- **URLs:** Default locale has no prefix: `/`, `/about`, `/blog`. Russian uses prefix: `/ru`, `/ru/about`, `/ru/blog`.
- **Taxes site:** Same idea: `taxes.ananolan.com/` = en, `taxes.ananolan.com/ru` = ru; e.g. `taxes.ananolan.com/ru/pricing`.

**Where to edit:**

- **UI strings** (nav, footer, buttons): **`messages/en.json`** and **`messages/ru.json`**. Namespaces: `nav`, `taxesNav`, `footer`, `blog`, `contact`. Use these keys in components with `useTranslations('nav')` etc.
- **Page and blog content:** In Decap CMS or directly in **`content/{main|taxes}/{pages|blog}/{en|ru}/*.md`**. Each file has YAML frontmatter (title, description, date for blog) and Markdown body.

**Config:** Locales and default are in **`lib/constants.ts`** (`LOCALES`, `DEFAULT_LOCALE`). Routing is in **`i18n/routing.ts`** (next-intl) and **`middleware.ts`** (host-based rewrites for taxes).

## Project layout (concise)

```
├── app/
│   ├── [locale]/           # Main site (en, ru)
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Home
│   │   ├── about, pricing, contact, blog, blog/[slug]
│   ├── taxes/[locale]/     # Taxes site
│   │   ├── layout.tsx
│   │   ├── page.tsx        # Landing
│   │   ├── pricing, faq, contact
│   ├── api/
│   └── globals.css
├── components/             # Header, Footer, LanguageSwitcher, ContactForm
├── content/
│   ├── main/pages/{en,ru}/
│   ├── main/blog/{en,ru}/
│   └── taxes/pages/{en,ru}/
├── i18n/                   # next-intl routing, request, navigation
├── lib/                    # constants, content loader, mdx
├── messages/               # en.json, ru.json
├── public/
│   ├── admin/              # Decap CMS (index.html, config.yml)
│   └── uploads/
├── middleware.ts           # Host rewrites + locale
├── netlify.toml
└── README.md
```

## Netlify Forms

Contact forms use **Netlify Forms**:

- Add `data-netlify="true"` and `name="contact"` (or your form name) to the form.
- Include a hidden `form-name` input with the same name.
- Optional: `data-netlify-honeypot="bot-field"` and a hidden `bot-field` to reduce spam.

Submissions appear in Netlify dashboard under **Forms**. No serverless functions or paid add-ons required.

## Variables (easy to change)

In **`lib/constants.ts`**:

- `BRAND.lastName`, `BRAND.mainSiteTitle`, `BRAND.taxesSiteTitle`
- `LOCALES`, `DEFAULT_LOCALE`
- `TAXES_HOST`, `MAIN_HOST`

Adjust these to rebrand or change domains.
