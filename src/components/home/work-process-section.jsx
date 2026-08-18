"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { workProcessSection } from "@/data/home-content";

/**
 * How we work.
 *
 * Back to the console surface, which anchors the middle of the page against
 * the dark hero at the top.
 *
 * This is the one section where numbering is honest: the stages run in order
 * and each has to close before the next opens, so the rail and the numerals
 * carry real information rather than decoration. The rail fills as the
 * section scrolls, which is the sequence made visible.
 */
export function WorkProcessSection() {
  const reduceMotion = useReducedMotion();
  const railRef = useRef(null);
  const { eyebrow, title, description, steps } = workProcessSection;

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 60%"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
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
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  return (
    <section className="relative overflow-hidden bg-console py-16 text-white lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent)",
        }}
      />

      <motion.div
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="container relative"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <motion.div
              variants={rise}
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-brand-light"
            >
              {eyebrow}
              <motion.span
                variants={drawRule}
                aria-hidden="true"
                className="h-px w-16 origin-left bg-brand-light/40"
              />
            </motion.div>

            <motion.h2
              variants={rise}
              className="mt-5 text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl lg:text-[40px]"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={rise}
              className="mt-5 leading-relaxed text-white/70"
            >
              {description}
            </motion.p>
          </div>

          {/* The sequence */}
          <div ref={railRef} className="relative lg:col-span-7">
            {/* Unfilled rail */}
            <span
              aria-hidden="true"
              className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px bg-white/12"
            />
            {/* Filled rail, tracking scroll through the section */}
            <motion.span
              aria-hidden="true"
              style={{ scaleY: reduceMotion ? 1 : railScale }}
              className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-brand"
            />

            <ol className="space-y-10">
              {steps.map((step) => (
                <motion.li
                  key={step.number}
                  variants={rise}
                  className="group relative pl-14"
                >
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-console-line bg-console font-mono text-[11px] tabular-nums text-white/80 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    {step.number}
                  </span>
                  <h3 className="text-lg leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
