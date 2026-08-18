import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav, socialLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { NewsletterForm } from "./newsletter-form";

/**
 * Site-wide footer: newsletter, company details, link columns and copyright.
 *
 * The blue newsletter card sits in the light area above and the navy footer
 * slides up 128px behind it, reproducing the original overlap.
 */
export function SiteFooter() {
  return (
    <>
      <div className="relative z-10">
        <NewsletterForm />
      </div>

      <footer className="-mt-32 bg-navy pt-32 text-white/80">
        <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} home`}>
              <Image
                src={siteConfig.logo}
                alt={siteConfig.legalName}
                width={1920}
                height={303}
                className="h-auto w-[165px] brightness-0 invert"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed">
              At CODERZON, we specialize in delivering cutting-edge technology
              consulting services.
            </p>

            <div className="mt-6 space-y-4">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-light" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-light" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
          <FooterLinks title="Our Services" links={footerNav.services} />

          <div>
            <h2 className="mb-5 text-lg text-white">Follow Us</h2>
            <p className="text-sm leading-relaxed">
              The latest news and articles, sent to your inbox weekly.
            </p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand hover:text-white"
                  >
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName} | All Rights
              Reserved
            </p>
            <Link
              href="/contact"
              className="transition-colors hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h2 className="mb-5 text-lg text-white">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
