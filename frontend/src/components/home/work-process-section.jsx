"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { workProcessSection } from "@/data/home-content";

/**
 * How we work — the one inverted section.
 *
 * Everything else on the page is paper. Turning this black gives the scroll
 * somewhere to change gear, and it is the section that most deserves the
 * emphasis: it is the only claim here about how the work is actually run.
 *
 * The numbering is honest. These stages happen in order and each has to close
 * before the next opens, so the rail and the numerals carry information
 * rather than decoration. The rail fills as the section passes.
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
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section className="px-x-default py-y-default bg-white text-black">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
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
            className="mt-8 max-w-md text-base leading-relaxed text-black/55"
          >
            {description}
          </motion.p>
        </div>

        <div ref={railRef} className="relative lg:col-span-7">
          <span
            aria-hidden="true"
            className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-black/10"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : railScale }}
            className="bg-brand absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px origin-top"
          />

          <ol className="space-y-14">
            {steps.map((step) => (
              <motion.li key={step.number} variants={rise} className="pl-10">
                <span className="font-mono text-[10px] tabular-nums text-black/40">
                  {step.number}
                </span>
                <h3 className="mt-3 text-display-sm font-bold break-words">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-black/55">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
