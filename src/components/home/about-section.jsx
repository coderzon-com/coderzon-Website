"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { aboutSection } from "@/data/home-content";
import { Counter } from "@/components/ui/counter";

/**
 * About — the light counterpart of the console.
 *
 * Same devices as the hero (monospace labels, hairline rules, a blueprint
 * grid) with the palette inverted, so the page changes register without
 * changing language. Following a dark hero with a second dark block would
 * flatten the rhythm.
 *
 * The claims are printed as a specification record rather than a paragraph of
 * prose: each row is one fact, on its own rule, in the order a buyer asks.
 * Motion is scroll-triggered here because the section sits below the fold —
 * the rules draw in, the rows print, and the years figure counts up.
 */
export function AboutSection() {
  const reduceMotion = useReducedMotion();

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
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Blueprint grid, inverted for the light surface. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(5,22,52,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,22,52,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 22%, #000 78%, transparent)",
        }}
      />

      <motion.div
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="container relative"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Portrait column */}
          <motion.div variants={rise} className="lg:col-span-5">
            <figure>
              <div className="relative overflow-hidden rounded-lg ring-1 ring-navy/10">
                <motion.div variants={imageReveal}>
                  <Image
                    src={aboutSection.image}
                    alt="A Coderzon engineer testing an immersive interface"
                    width={658}
                    height={860}
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="h-auto w-full"
                  />
                </motion.div>

                {/* Experience readout, seated inside the frame. */}
                <div className="absolute bottom-4 left-4 flex items-baseline gap-2 rounded-md bg-console/95 px-4 py-3 text-white shadow-[0_18px_40px_-24px_rgba(3,16,42,0.9)] backdrop-blur-sm">
                  <span className="text-2xl font-bold leading-none tabular-nums">
                    <Counter to={aboutSection.yearsExperience} />
                  </span>
                  <span className="font-mono text-[10px] uppercase leading-tight tracking-label text-white/75">
                    Years
                    <br />
                    experience
                  </span>
                </div>
              </div>

              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-label text-muted">
                {aboutSection.imageCaption}
              </figcaption>
            </figure>
          </motion.div>

          {/* Record column */}
          <div className="lg:col-span-7">
            <motion.div
              variants={rise}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-brand"
            >
              {aboutSection.eyebrow}
              <motion.span
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-16 origin-left bg-brand/40"
              />
            </motion.div>

            <motion.h2
              variants={rise}
              className="mt-5 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-navy sm:text-4xl lg:text-[42px]"
            >
              {aboutSection.title}
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-6 text-base leading-relaxed text-body"
            >
              {aboutSection.lead}
            </motion.p>

            <motion.p
              variants={rise}
              className="mt-4 leading-relaxed text-muted"
            >
              {aboutSection.body}
            </motion.p>

            {/* The record */}
            <dl className="mt-10">
              {aboutSection.spec.map((row) => (
                <motion.div key={row.label} variants={rise}>
                  <motion.div
                    variants={drawRule}
                    aria-hidden="true"
                    className="h-px w-full origin-left bg-navy/10"
                  />
                  <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-label text-muted">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] leading-snug text-navy">
                      {row.value}
                    </dd>
                  </div>
                </motion.div>
              ))}
              <motion.div
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-full origin-left bg-navy/10"
              />
            </dl>

            <motion.div variants={rise} className="mt-9">
              <Link
                href={aboutSection.cta.href}
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-md bg-navy px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {aboutSection.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
