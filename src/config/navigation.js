import { services } from "@/data/services";
import { platforms } from "@/data/platforms";

/**
 * Navigation data.
 *
 * The two large menus are grouped by capability rather than listed flat —
 * with 14 services and 7 platforms, the grouping is what makes the catalogue
 * scannable. Groups reference slugs; anything not claimed by a group is
 * collected into "More", so a new entry in the data files can never vanish
 * from the menu.
 */

const SERVICE_GROUPS = [
  {
    label: "Data & intelligence",
    slugs: [
      "data-analytics-consulting-services",
      "business-intelligence",
      "network-analysis",
    ],
  },
  {
    label: "AI & engineering",
    slugs: [
      "machine-learning-app-development-services",
      "iot-software-development",
      "Digital-Product-Engineering",
    ],
  },
  {
    label: "Build & ship",
    slugs: [
      "web-development-services",
      "Mobile-App-Developments",
      "mvp-development-services",
      "saas-application-development-company",
    ],
  },
  {
    label: "Run & modernise",
    slugs: [
      "cloud-computing",
      "software-modernization",
      "software-planning",
      "application-support-and-maintenance",
    ],
  },
];

const PLATFORM_GROUPS = [
  { label: "Microsoft", slugs: ["Microsoft-BI", "Microsoft-Azure"] },
  { label: "Cloud", slugs: ["Amazon-Web-Services", "Google-Cloud"] },
  { label: "Open source", slugs: ["Open-Source-BI"] },
  { label: "Commerce & content", slugs: ["shopify", "WordPress"] },
];

/** Turn a group definition into resolved menu entries, dropping unknown slugs. */
function buildGroups(groupDefs, records, toEntry) {
  const claimed = new Set(groupDefs.flatMap((group) => group.slugs));

  const groups = groupDefs
    .map((group) => ({
      label: group.label,
      items: group.slugs
        .map((slug) => records.find((record) => record.slug === slug))
        .filter(Boolean)
        .map(toEntry),
    }))
    .filter((group) => group.items.length > 0);

  const leftovers = records.filter((record) => !claimed.has(record.slug));
  if (leftovers.length > 0) {
    groups.push({ label: "More", items: leftovers.map(toEntry) });
  }

  return groups;
}

/** Capability groups, also used by the homepage manifest. */
export const serviceGroups = buildGroups(
  SERVICE_GROUPS,
  services,
  (service) => ({
    slug: service.slug,
    label: service.shortTitle,
    href: `/services/${service.slug}`,
    icon: service.icon,
  }),
);

export const platformGroups = buildGroups(
  PLATFORM_GROUPS,
  platforms,
  (platform) => ({
    slug: platform.slug,
    label: platform.navLabel,
    href: `/platforms/${platform.slug}`,
  }),
);

/**
 * Header navigation. Entries with `menu` open the mega panel; the rest are
 * ordinary links.
 */
export const mainNav = [
  {
    label: "Consulting",
    menu: {
      eyebrow: `${services.length} capabilities`,
      title: "What we build",
      groups: serviceGroups,
      viewAll: { label: "All services", href: "/services" },
      feature: {
        title: "Not sure where to start?",
        body: "Tell us the problem and we will map it to the right team.",
        cta: { label: "Talk to an expert", href: "/contact" },
      },
    },
  },
  {
    label: "Platforms",
    menu: {
      eyebrow: `${platforms.length} platforms`,
      title: "What we work in",
      groups: platformGroups,
      viewAll: { label: "All platforms", href: "/platforms" },
      feature: {
        title: "Already using one of these?",
        body: "We take over systems someone else built and keep them running.",
        cta: { label: "Request a quote", href: "/request-quote" },
      },
    },
  },
  { label: "About", href: "/about" },
  { label: "Training", href: "https://codiin.com/", external: true },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    heading: "Services",
    links: [
      ...services.slice(0, 5).map((service) => ({
        label: service.shortTitle,
        href: `/services/${service.slug}`,
      })),
      { label: "All services", href: "/services" },
    ],
  },
  {
    heading: "Platforms",
    links: [
      ...platforms.slice(0, 5).map((platform) => ({
        label: platform.navLabel,
        href: `/platforms/${platform.slug}`,
      })),
      { label: "All platforms", href: "/platforms" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Request a quote", href: "/request-quote" },
      { label: "Training", href: "https://codiin.com/", external: true },
    ],
  },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Coderzon/61564371975938",
    icon: "facebook",
  },
  { label: "X", href: "https://x.com/coderzon", icon: "twitter" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/coderzon",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/coderzon-technologies/",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@codiin",
    icon: "youtube",
  },
];
