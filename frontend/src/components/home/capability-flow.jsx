"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/config/navigation";
import { getServiceBySlug } from "@/data/services";
import { Icon } from "@/components/ui/icon";
import { CardRail } from "@/components/ui/card-rail";
import { TiltCard } from "@/components/ui/tilt-card";

/**
 * The capability flow.
 *
 * Fourteen services will not fit on a screen as a grid without becoming a
 * wall, and a stacked list buries everything past the third item. A rail you
 * can drag keeps the whole catalogue reachable in one gesture and gives the
 * section something to do.
 *
 * Cards lean toward the pointer in real perspective. The tilt is small on
 * purpose — enough to read as a physical surface catching light, not enough
 * to distort the text sitting on it.
 */
export function CapabilityFlow() {
  const reduceMotion = useReducedMotion();

  const services = serviceGroups.flatMap((group) =>
    group.items
      .map((entry) => {
        const service = getServiceBySlug(entry.slug);
        return service ? { ...service, group: group.label } : null;
      })
      .filter(Boolean),
  );

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <section className="bg-ink py-y-default text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
        }}
      >
        <div className="px-x-default">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <motion.p
                variants={rise}
                className="font-mono text-[10px] uppercase tracking-label text-white/40"
              >
                {services.length} capabilities
              </motion.p>
              <motion.h2
                variants={rise}
                className="mt-5 max-w-[16ch] break-words text-display font-bold"
              >
                Everything we build, in one place
              </motion.h2>
            </div>

            <motion.div variants={rise}>
              <Link
                href="/services"
                className="ease-power inline-flex min-h-[48px] items-center rounded-full border border-white/20 px-7 text-sm font-medium transition-transform duration-300 hover:-translate-y-1 hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                All services
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div variants={rise} className="px-x-default mt-14">
          <CardRail label="Capabilities">
            {services.map((service) => (
              <div
                key={service.slug}
                className="w-[16rem] shrink-0 snap-start sm:w-[19rem]"
              >
                <TiltCard className="group h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="ease-power flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-signal">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="ease-power h-4 w-4 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                    </div>

                    <p className="mt-8 font-mono text-[10px] uppercase tracking-label text-white/35">
                      {service.group}
                    </p>
                    <h3 className="mt-2 text-display-sm font-bold">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                      {service.overview.heading}
                    </p>
                  </Link>
                </TiltCard>
              </div>
            ))}
          </CardRail>
        </motion.div>
      </motion.div>
    </section>
  );
}
