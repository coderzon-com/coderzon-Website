import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata, siteConfig } from "@/config/site";
import { contactSection } from "@/data/home-content";
import { PageHero } from "@/components/ui/page-hero";
import { SignalPulse } from "@/components/ui/figures/signal-pulse";
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
        visual={<SignalPulse />}
      />

      <section className="px-x-default py-y-default bg-ink text-white">
        <div>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* The record */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 border-b border-white/12 pb-6">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-medium">{person.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                    {person.role}
                  </p>
                </div>
                <a
                  href={person.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  className="ease-power ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/17 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <SocialIcon name="linkedin" className="h-4 w-4" />
                </a>
              </div>

              <dl className="mt-10">
                {RECORD.map(({ label, icon: RowIcon, lines, href }) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-white/12 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                  >
                    <dt className="flex items-center gap-2 pt-0.5 font-mono text-[10px] uppercase tracking-label text-white/55">
                      <RowIcon
                        className="h-3.5 w-3.5 text-signal"
                        aria-hidden="true"
                      />
                      {label}
                    </dt>
                    <dd className="space-y-0.5 text-[15px] leading-snug">
                      {lines.map((line) =>
                        href ? (
                          <a
                            key={line}
                            href={href}
                            {...(href.startsWith("http")
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="block break-words transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              <div className="bg-mist rounded-3xl p-6 text-black shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8 lg:p-10">
                <p className="mb-8 font-mono text-[10px] uppercase tracking-label text-black/60">
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
