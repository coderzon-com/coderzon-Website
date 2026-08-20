"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { platforms } from "@/data/platforms";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

/**
 * The stacks we work in.
 *
 * A studio site puts a wall of client logos here. We have no logo rights to
 * show and inventing them would be dishonest, so the same job is done in type,
 * with the real platform names.
 *
 * The row travels because the list is too long to sit still and too short to
 * paginate. Movement here is doing a job — it is how the seventh name gets
 * seen on a phone — which is also why it cannot be the only way to reach one:
 * under reduced motion the same names lay out as a static wrapped list rather
 * than sitting frozen in a clipped row where four of them are unreachable.
 *
 * The names are dimmed and brighten on hover, but only far enough that the
 * dim state still passes contrast on its own. A touch device never hovers, so
 * whatever the resting state is, that is the whole experience.
 */
export function PlatformBand() {
  const reduceMotion = useReducedMotion();

  // Duplicated so the translation loops without a visible seam. Pointless
  // when nothing is translating, and it would read the list twice.
  const track = reduceMotion ? platforms : [...platforms, ...platforms];

  const reveal = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.entrance, ease: EASE.power },
        },
      };

  return (
    <motion.section
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduceMotion ? 0 : STAGGER.normal },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      className="bg-ink border-b border-white/10 py-14 text-white"
    >
      <motion.div
        variants={reveal}
        className="px-x-default flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
      >
        <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
          Vendor-neutral by design
        </p>
        <Link
          href="/platforms"
          className="focus-visible:ring-offset-ink rounded-sm font-mono text-[10px] uppercase tracking-label text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4"
        >
          All {platforms.length} platforms
        </Link>
      </motion.div>

      <motion.div
        variants={reveal}
        /* overflow-hidden is load-bearing, not cosmetic: the marquee list is
           `w-max` and runs to roughly 2,900px, so without clipping here the
           whole page scrolls sideways on a phone. */
        className="group relative mt-10 overflow-hidden"
        style={
          reduceMotion
            ? undefined
            : {
                // Feathered ends, so names enter and leave rather than being
                // chopped off at a hard edge.
                maskImage:
                  "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
              }
        }
      >
        <ul
          aria-label="Platforms we work in"
          className={
            reduceMotion
              ? "px-x-default flex flex-wrap items-center gap-x-10 gap-y-4"
              : /* Pausing on focus-within matters as much as on hover: without
                   it a keyboard user is chasing a link that is still moving. */
                "animate-marquee flex w-max shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] sm:gap-14 sm:pr-14"
          }
        >
          {track.map((platform, index) => {
            const isClone = index >= platforms.length;
            return (
              <li
                key={`${platform.slug}-${index}`}
                aria-hidden={isClone}
                className="shrink-0"
              >
                <Link
                  href={`/platforms/${platform.slug}`}
                  tabIndex={isClone ? -1 : undefined}
                  className="focus-visible:ring-offset-ink block whitespace-nowrap rounded-sm text-2xl font-bold tracking-[-0.03em] text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 sm:text-4xl"
                >
                  {platform.navLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.section>
  );
}
