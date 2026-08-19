import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { platforms } from "@/data/platforms";

/**
 * Next.js serves this at /sitemap.xml automatically — no hand-written XML.
 */
export default function sitemap() {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/platforms",
    "/faq",
    "/contact",
    "/request-quote",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const platformRoutes = platforms.map((platform) => ({
    url: `${siteConfig.url}/platforms/${platform.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...platformRoutes];
}
