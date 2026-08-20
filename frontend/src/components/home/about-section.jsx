"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { aboutSection } from "@/data/home-content";
import { Counter } from "@/components/ui/counter";

/**
 * About, as a statement and a record.
 *
 * No photograph. The stock images that were here showed strangers in a stock
 * office, which said nothing true about this firm — the claim itself, set
 * large, carries more weight than a picture of someone else's team.
 *
 * The facts underneath are printed as a record: one row each, on a rule, in
 * the order a buyer asks them.
 */
export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, lead, body, spec, cta, yearsExperience } =
    aboutSection;

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
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
        }}
      >
        <motion.p
          variants={rise}
          className="font-mono text-[10px] uppercase tracking-label text-black/40"
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={rise}
          className="mt-6 max-w-[15ch] text-heading font-bold break-words"
        >
          {title}
        </motion.h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <motion.p variants={rise} className="text-lg leading-relaxed">
              {lead}
            </motion.p>
            <motion.p
              variants={rise}
              className="mt-6 leading-relaxed text-black/55"
            >
              {body}
            </motion.p>

            <motion.div variants={rise} className="mt-10">
              <Link
                href={cta.href}
                className="ease-power inline-flex min-h-[52px] items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {cta.label}
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <motion.div variants={rise} className="flex items-baseline gap-4">
              <span className="text-display font-bold tabular-nums leading-none">
                <Counter to={yearsExperience} />
              </span>
              <span className="font-mono text-[10px] uppercase leading-tight tracking-label text-black/40">
                Years
                <br />
                delivering
              </span>
            </motion.div>

            <dl className="mt-12 border-t border-black/10">
              {spec.map((row) => (
                <motion.div
                  key={row.label}
                  variants={rise}
                  className="grid gap-1 border-b border-black/10 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-label text-black/40">
                    {row.label}
                  </dt>
                  <dd className="text-[15px] leading-snug">{row.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
