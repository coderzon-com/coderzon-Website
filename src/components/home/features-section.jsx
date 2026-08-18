"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { featureSection } from "@/data/home-content";
import { Icon } from "@/components/ui/icon";

/**
 * Core capability.
 *
 * Printed as full-width rules rather than cards, so it reads as an index and
 * stays distinct from the quad table in the section above. Each row is a real
 * link into the matching service — before, these were headings with nowhere
 * to go.
 */
export function FeaturesSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, features } = featureSection;

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
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
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
            "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
        }}
      />

      <motion.div
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="container relative"
      >
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
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
          </div>
          <motion.p
            variants={rise}
            className="leading-relaxed text-muted lg:col-span-5"
          >
            {description}
          </motion.p>
        </div>

        {/* The index */}
        <div className="mt-12">
          <motion.div
            variants={drawRule}
            aria-hidden="true"
            className="h-px w-full origin-left bg-navy/12"
          />
          {features.map((feature) => (
            <motion.div key={feature.title} variants={rise}>
              <Link
                href={feature.href}
                className="group grid items-start gap-x-6 gap-y-2 py-7 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:grid-cols-12 md:items-center"
              >
                <div className="flex items-center gap-4 md:col-span-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-muted-surface text-brand ring-1 ring-navy/10 transition-colors duration-200 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                    <Icon name={feature.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg leading-snug text-navy transition-colors duration-200 group-hover:text-brand">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-muted md:col-span-6">
                  {feature.description}
                </p>

                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-muted transition-colors duration-200 group-hover:text-brand md:col-span-1 md:justify-end">
                  <span className="md:sr-only">View service</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
              <motion.div
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-full origin-left bg-navy/12"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
