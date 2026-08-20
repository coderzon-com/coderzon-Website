"use client";

import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "@/components/ui/tilt-card";
import { whyChooseUsSection } from "@/data/home-content";

/**
 * Why choose us.
 *
 * Four differentiators, each with a tag drawn from the real catalogue rather
 * than asserted. Set as a plain grid on paper — no cards, no borders around
 * every claim. The generous space between them is what makes them read as
 * considered rather than listed.
 */
export function WhyChooseUsSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, reasons } = whyChooseUsSection;

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
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              variants={rise}
              className="font-mono text-[10px] uppercase tracking-label text-black/40"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              variants={rise}
              className="mt-6 max-w-[13ch] text-heading font-bold break-words"
            >
              {title}
            </motion.h2>
          </div>
          <motion.p
            variants={rise}
            className="max-w-md self-end leading-relaxed text-black/55 lg:col-span-5"
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={rise}>
              <TiltCard className="group h-full" intensity={4}>
                <article className="ease-power h-full rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] sm:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-label text-brand">
                    {reason.tag}
                  </p>
                  <h3 className="mt-5 text-heading font-bold">
                    {reason.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-black/55">
                    {reason.description}
                  </p>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
