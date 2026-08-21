import Image from "next/image";
import Link from "next/link";
import { footerNav, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { NewsletterForm } from "./newsletter-form";

/**
 * Site footer.
 *
 * The one inverted surface on the page. Everything above is paper; ending on
 * black gives the scroll somewhere to land, and it is the only place the
 * contact details can sit without competing with the work above them.
 *
 * Link columns use the same dim-at-rest treatment as the navigation, so the
 * whole site behaves one way.
 */
export function SiteFooter() {
  return (
    <footer className="px-x-default bg-black pb-10 pt-y-default text-white">
      <NewsletterForm />

      <div className="grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.legalName}
              width={1920}
              height={303}
              className="h-auto w-[150px]"
            />
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
            Technology consulting for teams that need the data platform, the
            cloud under it, and the people who keep it running.
          </p>

          <div className="mt-8 space-y-1">
            <a
              href={siteConfig.contact.phoneHref}
              className="block rounded-sm text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block rounded-sm text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-sm text-sm text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Kakkanad, Kochi, Kerala
            </a>
          </div>
        </div>

        {footerNav.map((column) => (
          <nav
            key={column.heading}
            aria-label={column.heading}
            className="lg:col-span-2"
          >
            <h2 className="mb-5 font-mono text-[10px] uppercase tracking-label text-white/35">
              {column.heading}
            </h2>
            <ul className="space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm opacity-50 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-2">
          <h2 className="mb-5 font-mono text-[10px] uppercase tracking-label text-white/35">
            Follow
          </h2>
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="ease-power flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform duration-300 hover:-translate-y-1 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col-reverse items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[10px] uppercase tracking-label text-white/35">
          © {new Date().getFullYear()} {siteConfig.legalName}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-label text-white/35">
          All rights reserved
        </p>
      </div>
    </footer>
  );
}
