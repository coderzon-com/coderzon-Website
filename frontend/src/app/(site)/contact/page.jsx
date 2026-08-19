import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata, siteConfig } from "@/config/site";
import { contactSection } from "@/data/home-content";
import { PageHero } from "@/components/ui/page-hero";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Coderzon Technologies for AI software development, data analytics, cloud services and custom application development.",
  path: "/contact",
});

const { contact } = siteConfig;

const RECORD = [
  {
    label: "Email",
    icon: Mail,
    lines: [contact.email],
    href: `mailto:${contact.email}`,
  },
  {
    label: "Phone",
    icon: Phone,
    lines: [contact.phone],
    href: contact.phoneHref,
  },
  { label: "Hours", icon: Clock, lines: contact.officeHours },
  {
    label: "Office",
    icon: MapPin,
    lines: [contact.address],
    href: contact.mapsUrl,
  },
];

export default function ContactPage() {
  const { person } = contactSection;

  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Tell us what you are trying to build"
        breadcrumb="Contact"
        description="Send the problem rather than a spec. We will tell you what it takes, who would work on it, and whether we are the right people for it."
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* The record */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 rounded-lg bg-muted-surface p-4 ring-1 ring-navy/10">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{person.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-label text-muted">
                    {person.role}
                  </p>
                </div>
                <a
                  href={person.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <SocialIcon name="linkedin" className="h-4 w-4" />
                </a>
              </div>

              <dl className="mt-8 border-t border-navy/10">
                {RECORD.map(({ label, icon: RowIcon, lines, href }) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-navy/10 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4"
                  >
                    <dt className="flex items-center gap-2 pt-0.5 font-mono text-[10px] uppercase tracking-label text-muted">
                      <RowIcon
                        className="h-3.5 w-3.5 text-brand"
                        aria-hidden="true"
                      />
                      {label}
                    </dt>
                    <dd className="space-y-0.5 text-[15px] leading-snug text-navy">
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            {...(href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="block break-words transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="break-words">
                            {line}
                          </p>
                        ),
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The form */}
            <div className="lg:col-span-7">
              <div className="rounded-lg bg-white p-5 ring-1 ring-navy/10 sm:p-7 lg:p-8">
                <p className="mb-6 border-l-2 border-brand pl-2.5 font-mono text-[10px] uppercase tracking-label text-navy">
                  Send a message
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
