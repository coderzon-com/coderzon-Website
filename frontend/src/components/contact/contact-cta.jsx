"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { contactSection } from "@/data/home-content";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { ContactForm } from "./contact-form";

/**
 * Closing call to action.
 *
 * The invitation is set at display size — it is the last thing on the page
 * and the only thing being asked for, so it gets the same weight as the
 * opening line rather than being tucked above the footer.
 */
export function ContactCta() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, person } = contactSection;

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section className="px-x-default py-y-default bg-mist text-black">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
        }}
        className="grid gap-16 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-5">
          <motion.p
            variants={rise}
            className="font-mono text-[10px] uppercase tracking-label text-black/40"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            variants={rise}
            className="mt-6 max-w-[12ch] text-heading font-bold break-words"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-8 max-w-md leading-relaxed text-black/55"
          >
            {description}
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-12 flex items-center gap-4 border-t border-black/10 pt-8"
          >
            <Image
              src={person.photo}
              alt={person.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="font-medium">{person.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-label text-black/40">
                {person.role}
              </p>
            </div>
            <a
              href={person.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="ease-power ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <SocialIcon name="linkedin" className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div variants={rise} className="mt-8 space-y-1">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block text-sm text-black/55 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="block text-sm text-black/55 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              {siteConfig.contact.phone}
            </a>
          </motion.div>
        </div>

        <motion.div variants={rise} className="lg:col-span-7">
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
