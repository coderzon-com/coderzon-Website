import { services } from "@/data/services";
import { platforms } from "@/data/platforms";

/**
 * Header navigation. Dropdowns are generated from the real data files, so a
 * menu entry can never point at a service or platform that does not exist.
 */
export const mainNav = [
  { label: "Home", href: "/" },
  {
    label: "Consulting",
    children: [
      ...services.slice(0, 5).map((service) => ({
        label: service.shortTitle,
        href: `/services/${service.slug}`,
      })),
      { label: "Explore All Services", href: "/services" },
    ],
  },
  {
    label: "Products & Platforms",
    children: platforms.map((platform) => ({
      label: platform.navLabel,
      href: `/platforms/${platform.slug}`,
    })),
  },
  { label: "Training", href: "https://codiin.com/", external: true },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  quickLinks: [
    { label: "Services", href: "/services" },
    { label: "FAQ", href: "/faq" },
    { label: "About Us", href: "/about" },
    { label: "Request a Quote", href: "/request-quote" },
  ],
  services: [
    ...services.slice(0, 4).map((service) => ({
      label: service.shortTitle,
      href: `/services/${service.slug}`,
    })),
    { label: "View all services", href: "/services" },
  ],
};

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
