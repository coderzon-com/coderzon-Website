/**
 * Single source of truth for company details, URLs and default SEO copy.
 * Change a phone number or an address here and it updates everywhere.
 */
export const siteConfig = {
  name: "Coderzon",
  legalName: "Coderzon Technologies Pvt Ltd",
  url: "https://www.coderzon.com",
  logo: "/images/logo.webp",
  description:
    "At CODERZON, we provide top-tier technology consulting and recruitment services, helping businesses thrive with tailored digital solutions and access to the industry's best tech talent.",
  contact: {
    email: "contact@coderzon.com",
    phone: "(+91) 8301890158",
    phoneHref: "tel:+918301890158",
    address:
      "CODERZON Technologies Pvt Ltd, AKL Heights, Seaport Road, Near Bharathmatha College, Kochi, Kerala - 682021",
    mapsUrl: "https://maps.google.com/?q=Coderzon+Technologies+Kochi",
    officeHours: ["Monday - Friday", "9:00 AM to 6:00 PM"],
  },
  keywords: [
    "Coderzon Technologies Pvt Ltd",
    "AI software development",
    "data analytics consulting",
    "business intelligence solutions",
    "cloud computing services",
    "web application development",
    "custom software development",
    "software company in India",
    "enterprise software solutions",
    "mobile app development",
    "legacy software modernization",
    "digital transformation company",
    "machine learning development",
    "SaaS product development",
    "technology consulting firm",
  ],
};

/**
 * Builds a full page title, description and Open Graph block from the
 * defaults above so every route stays consistent.
 */
export function buildMetadata({ title, description, path = "", keywords }) {
  // Company name first, then the page name — e.g.
  // "Coderzon Technologies Pvt Ltd | IT Services & Technology".
  const fullTitle = title
    ? `${siteConfig.legalName} | ${title}`
    : siteConfig.legalName;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    keywords: keywords ?? siteConfig.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}${siteConfig.logo}`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
  };
}
