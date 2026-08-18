# Coderzon Website

Marketing website for **Coderzon Technologies Pvt Ltd**, built with
[Next.js 14](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com)
and [Motion](https://motion.dev) for animation. All content lives in plain JS
data files — there is no CMS.

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
NEXT_PUBLIC_FORM_ACCESS_KEY=your_web3forms_access_key
```

This is the only variable the site needs. Without it the contact, quote and
newsletter forms report a configuration message instead of submitting;
everything else builds and runs normally.

**When deploying (Vercel, Netlify, etc.) set this in the host's own
environment-variable settings** — `.env` is gitignored and never reaches the
deploy.

## Project structure

```
src/
├── app/                        # Routes (App Router)
│   ├── layout.jsx              # Document shell + fonts
│   ├── globals.css             # Tailwind directives
│   ├── not-found.jsx           # Global 404
│   ├── robots.js               # Generates /robots.txt
│   ├── sitemap.js              # Generates /sitemap.xml
│   └── (site)/                 # Public pages — share header + footer
│       ├── layout.jsx          # Header, footer, scroll-to-top
│       ├── page.jsx            # Homepage
│       ├── about/
│       ├── services/           # + [slug] detail pages
│       ├── platforms/          # + [slug] detail pages
│       ├── contact/
│       ├── faq/
│       └── request-quote/
│
├── components/
│   ├── ui/                     # Reusable primitives (Button, Icon, …)
│   ├── layout/                 # Header, console nav, mega panel, footer
│   ├── home/                   # One file per homepage section
│   ├── services/               # Service card + detail blocks
│   ├── platforms/              # Platform detail page
│   └── contact/                # Contact form, quote form, closing CTA
│
├── config/
│   ├── site.js                 # Company details + shared SEO metadata
│   └── navigation.js           # Menus, capability groups, social links
│
├── data/                       # All page content as plain JS
│   ├── services.js             # 14 services
│   ├── platforms.js            # 7 products & platforms
│   ├── faqs.js
│   └── home-content.js
│
└── lib/
    ├── use-contact-form.js     # Shared form submission hook
    └── utils.js                # cn() class merge helper
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
| Regroup the nav mega-menu           | `src/config/navigation.js`                  |
| Change brand colours or fonts       | `tailwind.config.js`                        |

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

Two typefaces: **Space Grotesk** for display and body, **JetBrains Mono** for
small uppercase labels and counts — the monospace register is what gives the
navigation and section headers their instrument feel.

Icons come from [lucide-react](https://lucide.dev). Brand logos (LinkedIn,
Facebook, …) are inline SVG in `src/components/ui/social-icon.jsx`, because
lucide removed brand icons in v1.

Animation uses [Motion](https://motion.dev). Every animated component honours
`prefers-reduced-motion`.

## Forms

The contact, quote and newsletter forms all post to
[Web3Forms](https://web3forms.com) through the shared
`useContactForm` hook in `src/lib/use-contact-form.js`. Submissions are
emailed to the address registered against `NEXT_PUBLIC_FORM_ACCESS_KEY`;
there is no database.
