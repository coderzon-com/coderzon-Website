"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { contactSection } from "@/data/home-content";
import { siteConfig } from "@/config/site";
import { DURATION, EASE } from "@/lib/motion";
import { SocialIcon } from "@/components/ui/social-icon";
import { WordReveal } from "@/components/ui/word-reveal";
import { ContactForm } from "./contact-form";

/**
 * Closing call to action.
 *
 * This is the only thing the page asks for, and it is the one section where
 * motion has to get out of the way. Six sections of movement lead here; this
 * one is where they come to rest. Nothing tilts under the pointer, nothing
 * moves while you are typing, and the form never animates on a surface you
 * are trying to hit.
 *
 * The one deliberate gesture is the invitation, which uses the same word
 * pivot as the opening line of the page. That is a bookend rather than a
 * repeat: the page opens and closes on the same move, six sections apart.
 *
 * The form sits on a light panel rather than being restyled for the dark
 * ground. Its fields are shared with the contact page and the quote form, so
 * recolouring them would reach into two other pages to decorate this one —
 * and a light panel is the right answer anyway, since the single brightest
 * object in the section should be the thing being asked for.
 */
export function ContactCta() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, person } = contactSection;

  const panelRef = useRef(null);

  /* Anchored to the panel, so it settles as the panel arrives rather than
     finishing while it is still below the fold. */
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const asideOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const asideY = useTransform(scrollYProgress, [0, 0.55], [24, 0]);

  const words = title
    .split(" ")
    .filter(Boolean)
    .map((text) => ({ text }));

  const quietLink =
    "block text-sm text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink rounded-sm";

  return (
    <section className="bg-ink px-x-default pb-y-default pt-y-seam text-white">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.entrance, ease: EASE.power }}
            data-motion-reveal=""
            className="font-mono text-[10px] uppercase tracking-label text-white/55"
          >
            {eyebrow}
          </motion.p>

          <h2 className="mt-6 max-w-[14ch] break-words text-heading font-bold [font-stretch:96%]">
            <WordReveal lines={[{ parts: words }]} />
          </h2>

          <motion.div
            style={
              reduceMotion ? undefined : { opacity: asideOpacity, y: asideY }
            }
            data-motion-reveal=""
          >
            <p className="mt-8 max-w-md leading-relaxed text-white/65">
              {description}
            </p>

            {/* A name and a face, because the section asks the reader to write
                to someone. A form with no person behind it is a void. */}
            <div className="mt-12 flex items-center gap-4 border-t border-white/12 pt-8">
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
                className="focus-visible:ring-offset-ink ease-power ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <SocialIcon name="linkedin" className="h-4 w-4" />
              </a>
            </div>

            {/* hover:text-white, not hover:opacity-100: the dimming comes from
                the colour's own alpha, so changing element opacity — which is
                already 1 — did nothing at all. */}
            <div className="mt-8 space-y-1">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={quietLink}
              >
                {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.phoneHref} className={quietLink}>
                {siteConfig.contact.phone}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={panelRef}
          style={
            reduceMotion ? undefined : { y: panelY, opacity: panelOpacity }
          }
          data-motion-reveal=""
          className="lg:col-span-7"
        >
          {/* Settles once and then stays put. Nothing here responds to the
              pointer — a field that moves as you reach for it is a defect,
              however good it looks in isolation. */}
          <div className="bg-mist rounded-3xl p-6 text-black shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)] sm:p-9 lg:p-10">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
