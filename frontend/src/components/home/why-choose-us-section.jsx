"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { whyChooseUsSection } from "@/data/home-content";
import { Icon } from "@/components/ui/icon";

/**
 * Why Choose Us.
 *
 * Carries the hairline-cell device from the hero manifest up to full scale:
 * the differentiators sit in a grid whose gaps are the rules, so the section
 * reads as one printed table rather than four floating cards.
 *
 * On the muted surface rather than white, so it separates from the About
 * block above without adding a second dark band.
 */
export function WhyChooseUsSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, image, imageCaption, reasons } =
    whyChooseUsSection;

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

  const imageReveal = reduceMotion
    ? {
        hidden: { clipPath: "inset(0 0 0% 0)" },
        show: { clipPath: "inset(0 0 0% 0)" },
      }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        show: {
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const sequence = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };

  return (
    <section className="relative overflow-hidden bg-muted-surface py-16 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(5,22,52,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,22,52,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
        }}
      />

      <motion.div
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container relative"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Portrait */}
          <motion.div variants={rise} className="lg:col-span-4">
            <figure className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-lg ring-1 ring-navy/10">
                <motion.div variants={imageReveal}>
                  <Image
                    src={image}
                    alt="Coderzon engineers working at their desks"
                    width={468}
                    height={500}
                    sizes="(max-width: 1024px) 90vw, 32vw"
                    className="h-auto w-full"
                  />
                </motion.div>
              </div>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-label text-muted">
                {imageCaption}
              </figcaption>
            </figure>
          </motion.div>

          <div className="lg:col-span-8">
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
              className="mt-5 max-w-2xl leading-relaxed text-muted"
            >
              {description}
            </motion.p>

            {/* Hairline table: the gaps are the rules. */}
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-navy/10 sm:grid-cols-2">
              {reasons.map((reason) => (
                <motion.article
                  key={reason.title}
                  variants={rise}
                  className="group bg-muted-surface p-6 transition-colors duration-200 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-brand ring-1 ring-navy/10 transition-colors duration-200 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                      <Icon name={reason.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-label text-muted">
                      {reason.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg leading-snug text-navy">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </p>

                  {/* Rule extends on hover — the row registering the pointer. */}
                  <span
                    aria-hidden="true"
                    className="mt-5 block h-px w-8 origin-left bg-brand transition-transform duration-300 group-hover:scale-x-[3]"
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
