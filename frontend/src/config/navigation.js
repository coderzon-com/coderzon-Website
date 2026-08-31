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
    // The firm leads with data work, so this group leads the catalogue and
    // carries the engineering discipline the rest of it depends on.
    label: "Data & intelligence",
    slugs: [
      "data-engineering",
      "data-science",
      "data-analytics-consulting-services",
      "business-intelligence",
      "network-analysis",
    ],
  },
  {
    label: "AI & engineering",
    slugs: [
      "agentic-ai",
      "machine-learning-app-development-services",
      "Digital-Product-Engineering",
      "iot-software-development",
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
  /* Grouped by what a platform is, not by who sells it.
     "Microsoft" sat alongside "Cloud" and "Commerce & content" — a vendor in
     a list of categories — which put Fabric (a data platform), Power BI (a
     reporting tool) and Azure (a cloud) in one bucket whose only common
     property was the logo. A buyer shopping for a warehouse does not care who
     owns it, so Fabric now sits with the warehouses it competes against and
     Azure with the clouds it competes against. */
  {
    label: "Warehouse & lakehouse",
    slugs: [
      "Microsoft-Fabric",
      "databricks",
      "snowflake",
      "google-bigquery",
      "amazon-redshift",
    ],
  },
  {
    label: "Cloud",
    slugs: ["Microsoft-Azure", "Amazon-Web-Services", "Google-Cloud"],
  },
  {
    label: "Business intelligence",
    slugs: ["Microsoft-BI", "Open-Source-BI"],
  },
  {
    /* What replaced "Commerce & content". Shopify and WordPress were the only
       two platforms here that no case study, service or homepage claim
       supported. These three are named in the write-ups of work actually
       delivered — which is the standard the rest of this list is held to. */
    label: "Integration & pipelines",
    slugs: ["azure-data-factory", "salesforce", "sap"],
  },
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
  {
    // Named for what a visitor is looking for rather than what we call
    // it internally. "Case studies" is industry language; "Our work" is
    // what someone types when they want to see whether we can do it.
    label: "Our work",
    href: "/work",
  },
  {
    // Separate from "Our work" on purpose: one is systems we built and run,
    // the other is how we would approach a sector. Listing them together
    // presented the second as the first.
    label: "Case studies",
    href: "/case-studies",
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
      { label: "Our work", href: "/work" },
      { label: "Case studies", href: "/case-studies" },
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
