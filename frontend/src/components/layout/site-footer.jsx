import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { NewsletterForm } from "./newsletter-form";

const CONTACT_ROWS = [
  {
    icon: Phone,
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  {
    icon: Mail,
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    value: "Kakkanad, Kochi, Kerala",
    href: siteConfig.contact.mapsUrl,
  },
];

/**
 * Site footer, on the same console surface as the header — the page opens and
 * closes on the same chrome. Column headings are monospace, links are square,
 * and the blueprint grid runs underneath.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-console text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, #000, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 85%)",
        }}
      />

      <div className="container relative">
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-4 focus-visible:ring-offset-console"
            >
              <Image
                src={siteConfig.logo}
                alt={siteConfig.legalName}
                width={1920}
                height={303}
                className="h-auto w-[150px]"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Technology consulting for teams that need the data platform, the
              cloud under it, and the people who keep it running.
            </p>

            <ul className="mt-7 space-y-px">
              {CONTACT_ROWS.map(({ icon: RowIcon, value, href }) => (
                <li key={value}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group -mx-2 flex items-center gap-3 rounded px-2 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    <RowIcon className="h-4 w-4 shrink-0 text-brand-light" />
                    <span className="break-words">{value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {footerNav.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2"
            >
              <h2 className="mb-4 border-l-2 border-brand pl-2 font-mono text-[10px] uppercase tracking-label text-white/70">
                {column.heading}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Follow */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 border-l-2 border-brand pl-2 font-mono text-[10px] uppercase tracking-label text-white/70">
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
                    className="flex h-10 w-10 items-center justify-center rounded-md text-white/70 ring-1 ring-console-line transition-colors hover:bg-brand hover:text-white hover:ring-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                  >
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <NewsletterForm />

        <div className="flex flex-col-reverse items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
