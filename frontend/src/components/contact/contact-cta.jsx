"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactSection } from "@/data/home-content";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "./contact-form";

const DETAILS = [
  {
    icon: Mail,
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phoneHref,
  },
  { icon: MapPin, value: "Kochi, Kerala", href: siteConfig.contact.mapsUrl },
];

/**
 * Closing call to action.
 *
 * The form sits inside a hairline panel and the details are printed as a
 * record, matching the About section — the page opens and closes in the same
 * register.
 */
export function ContactCta() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, person } = contactSection;

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const drawRule = reduceMotion
    ? { hidden: { scaleX: 1 }, show: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        show: {
          scaleX: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const sequence = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(5,22,52,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,22,52,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 20%, #000 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 20%, #000 100%)",
        }}
      />

      <motion.div
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="container relative"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <motion.div
              variants={rise}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-brand"
            >
              {eyebrow}
              <motion.span
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-16 origin-left bg-brand/40"
              />
            </motion.div>

            <motion.h2
              variants={rise}
              className="mt-5 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-navy sm:text-4xl lg:text-[40px]"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-5 leading-relaxed text-muted"
            >
              {description}
            </motion.p>

            {/* Who picks it up */}
            <motion.div
              variants={rise}
              className="mt-9 flex items-center gap-4 rounded-lg bg-muted-surface p-4 ring-1 ring-navy/10"
            >
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
            </motion.div>

            {/* Details, printed as a record */}
            <dl className="mt-8">
              {DETAILS.map(({ icon: DetailIcon, value, href }) => (
                <motion.div key={value} variants={rise}>
                  <motion.div
                    variants={drawRule}
                    aria-hidden="true"
                    className="h-px w-full origin-left bg-navy/10"
                  />
                  <dd>
                    <a
                      href={href}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-3 py-3.5 text-sm text-navy transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <DetailIcon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-brand" />
                      <span className="break-words">{value}</span>
                    </a>
                  </dd>
                </motion.div>
              ))}
              <motion.div
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-full origin-left bg-navy/10"
              />
            </dl>
          </div>

          <motion.div variants={rise} className="lg:col-span-7">
            <div className="rounded-lg bg-white p-5 ring-1 ring-navy/10 sm:p-7 lg:p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
