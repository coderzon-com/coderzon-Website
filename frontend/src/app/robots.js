import { siteConfig } from "@/config/site";

/** Next.js serves this at /robots.txt automatically. */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
