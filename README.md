# Coderzon Website

Marketing website for **Coderzon Technologies Pvt Ltd**, built with
[Next.js 14](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com)
and [Sanity](https://sanity.io) as the blog CMS.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script          | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server with hot reload  |
| `npm run build` | Production build                      |
| `npm run start` | Serve the production build            |
| `npm run lint`  | Run ESLint                            |

### Environment variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORM_ACCESS_KEY=your_web3forms_access_key
```

The site still builds without these — the blog renders empty and the forms
show a configuration message rather than crashing.

## Project structure

```
src/
├── app/                        # Routes (App Router)
│   ├── layout.jsx              # Document shell + font only
│   ├── globals.css             # Tailwind directives + blog prose styles
│   ├── not-found.jsx           # Global 404
│   ├── robots.js               # Generates /robots.txt
│   ├── sitemap.js              # Generates /sitemap.xml
│   │
│   ├── (site)/                 # Public pages — share header + footer
│   │   ├── layout.jsx          # Header, footer, scroll-to-top
│   │   ├── page.jsx            # Homepage
│   │   ├── about/
│   │   ├── services/           # + [slug] detail pages
│   │   ├── platforms/          # + [slug] detail pages
│   │   ├── blog/               # + [slug] post pages
│   │   ├── contact/
│   │   ├── faq/
│   │   └── request-quote/
│   │
│   └── studio/[[...tool]]/     # Sanity Studio at /studio (no site chrome)
│
├── components/
│   ├── ui/                     # Reusable primitives (Button, Section, Icon…)
│   ├── layout/                 # Header, navigation, footer, newsletter
│   ├── home/                   # One file per homepage section
│   ├── services/               # Service card + detail blocks
│   ├── platforms/              # Platform detail page
│   ├── blog/                   # Cards, sidebar, search, pagination
│   └── contact/                # Contact form, quote form, contact CTA
│
├── config/
│   ├── site.js                 # Company details + shared SEO metadata
│   └── navigation.js           # Header/footer menus, social links
│
├── data/                       # Page content as plain JS
│   ├── services.js             # 14 services
│   ├── platforms.js            # 7 products & platforms
│   ├── faqs.js
│   └── home-content.js
│
├── lib/
│   ├── sanity/                 # Sanity client + all GROQ queries
│   ├── use-contact-form.js     # Shared form submission hook
│   └── utils.js                # cn(), formatDate(), excerpt helpers
│
└── sanity/                     # Studio schema, structure, env
```

### Where to change things

| I want to…                          | Edit                                        |
| ----------------------------------- | ------------------------------------------- |
| Change the phone number or address  | `src/config/site.js`                        |
| Add or reorder a menu item          | `src/config/navigation.js`                  |
| Add a service                       | `src/data/services.js`                      |
| Add a product/platform              | `src/data/platforms.js`                     |
| Edit homepage copy                  | `src/data/home-content.js`                  |
| Add an FAQ                          | `src/data/faqs.js`                          |
| Change brand colours or fonts       | `tailwind.config.js`                        |
| Write a blog post                   | Sanity Studio at `/studio`                  |

Adding an entry to `services.js` or `platforms.js` is all that's needed —
the detail page, the nav dropdown, and the sitemap entry are generated
from that data automatically.

## Styling

All styling is Tailwind utility classes. The theme lives in
`tailwind.config.js`:

| Token          | Value     | Used for                        |
| -------------- | --------- | ------------------------------- |
| `brand`        | `#0E59F2` | Primary blue, buttons, links    |
| `brand-dark`   | `#0B46BF` | Hover states                    |
| `brand-light`  | `#406AFF` | Accents on dark backgrounds     |
| `navy`         | `#051634` | Headings and dark sections      |
| `accent`       | `#F8E559` | Yellow highlight                |
| `muted`        | `#737373` | Secondary text                  |
| `muted-surface`| `#F4F7FB` | Light section backgrounds       |

Icons come from [lucide-react](https://lucide.dev). Brand logos
(LinkedIn, Facebook, …) are inline SVG in
`src/components/ui/social-icon.jsx`, because lucide removed brand icons in v1.

## Forms

The contact, quote and newsletter forms all post to
[Web3Forms](https://web3forms.com) through the shared
`useContactForm` hook in `src/lib/use-contact-form.js`. Submissions are
emailed to the address registered against `NEXT_PUBLIC_FORM_ACCESS_KEY`;
there is no database.

## Blog

Posts are authored in Sanity Studio at `/studio` and read through
`src/lib/sanity/queries.js`. Posts are addressed by **slug**, never by
document ID. Existing posts are pre-rendered at build time; new ones are
rendered on first request.
