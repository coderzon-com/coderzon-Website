import Image from "next/image";
import { SocialIcon } from "@/components/ui/social-icon";
import { contactSection } from "@/data/home-content";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "./contact-form";

/**
 * "Do you have any question?" block with the contact form.
 * Appears at the bottom of most pages.
 */
export function ContactCta() {
  const { eyebrow, title, description, person } = contactSection;

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <div className="mt-8 flex items-center gap-4 rounded-xl bg-muted-surface p-5">
            <Image
              src={person.photo}
              alt={person.name}
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-navy">{person.name}</p>
              <a
                href={person.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <SocialIcon name="linkedin" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6 lg:p-8">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
