import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildMetadata, siteConfig } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Coderzon Technologies for AI software development, data analytics, cloud services and custom application development.",
  path: "/contact",
});

const { contact } = siteConfig;

const details = [
  {
    icon: Mail,
    label: "Email",
    lines: [contact.email],
    href: `mailto:${contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    lines: [contact.phone],
    href: contact.phoneHref,
  },
  { icon: Clock, label: "Available", lines: contact.officeHours },
  {
    icon: MapPin,
    label: "Location",
    lines: [contact.address],
    href: contact.mapsUrl,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact us"
              title="Do you have any question?"
              description="Got a tech challenge? We're here to solve it. From expert advice to end-to-end solutions, you can count on us to keep your digital world running smoothly."
            />
            <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6 lg:p-8">
              <ContactForm />
            </div>
          </div>

          <ul className="space-y-6">
            {details.map(({ icon: DetailIcon, label, lines, href }) => (
              <li
                key={label}
                className="flex gap-4 rounded-2xl bg-muted-surface p-5 sm:gap-5 sm:p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <DetailIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg">{label}</h2>
                  <div className="mt-1 space-y-0.5 break-words text-sm leading-relaxed text-muted">
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          {...(href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="block transition-colors hover:text-brand"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line}>{line}</p>
                      ),
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
