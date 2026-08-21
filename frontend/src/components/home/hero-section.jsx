"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/data/home-content";
import { serviceGroups } from "@/config/navigation";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { WordReveal } from "@/components/ui/word-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { PlatformStack } from "./platform-stack";
import { TechStream } from "./tech-stream";

/**
 * Homepage hero.
 *
 * The job of this section is to convince a technical buyer, in about three
 * seconds, that these people build serious systems — then move them into the
 * catalogue. So the claim leads, the catalogue counts sit underneath it as
 * evidence, and everything else stays quiet.
 *
 * Two pieces of motion, both load-bearing:
 *
 *   On arrival, the headline's words pivot up on a hinge. The claim is the
 *   most important thing on the page and a dimensional entrance earns that
 *   attention where a fade would not.
 *
 *   On scroll, three planes separate. The stream behind drifts down while the
 *   copy lifts away and the index at the foot follows more slowly, so leaving
 *   the hero reads as a camera pushing past it rather than content sliding
 *   off. That parallax is also the handoff into the section below.
 *
 * All of it is transform and opacity, driven by scroll progress rather than a
 * listener, and all of it collapses under reduced motion.
 */
export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Three depths. The field lags behind, the copy leaves, the index trails it.
  const fieldY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const indexY = useTransform(scrollYProgress, [0, 1], [0, -34]);

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.entrance, ease: EASE.power },
        },
      };

  /* The headline, split into words so each can pivot in on its own. The
     trailing half is optional — filtering keeps an empty string from becoming
     a phantom word with its own stagger slot. */
  const words = (value) =>
    value
      .split(" ")
      .filter(Boolean)
      .map((text) => ({ text }));

  const headline = [
    { parts: words(hero.titleStart) },
    {
      parts: [{ text: hero.titleHighlight }, ...words(hero.titleEnd)],
      className: "text-hero",
    },
  ];

  // The words finish at roughly this point, so everything after waits for it.
  const afterHeadline = reduceMotion ? 0 : 0.5;

  return (
    <section
      ref={sectionRef}
      className="bg-ink relative isolate flex min-h-[92svh] flex-col justify-between overflow-hidden text-white lg:min-h-screen"
    >
      <motion.div
        style={reduceMotion ? undefined : { y: fieldY }}
        /* Oversized with headroom above: the field drifts down on scroll and
           would otherwise pull a hard edge into frame. */
        className="absolute inset-x-0 -top-[20%] -z-10 h-[140%]"
      >
        <TechStream />
      </motion.div>

      {/* The stream already fades itself out of the copy column, so this is
          only here to settle the boundary and to keep a bright fragment from
          brushing the type on narrow screens, where there is no second column
          and the field runs across the whole frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5]"
        style={{
          background: [
            "linear-gradient(96deg, rgba(10,10,10,0.80) 0%, rgba(10,10,10,0.52) 48%, rgba(10,10,10,0.08) 70%, rgba(10,10,10,0) 100%)",
            "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0) 22%)",
            /* Only bites on narrow screens, where the object sits behind the
               copy rather than beside it. On lg the horizontal ramp above has
               already cleared that half of the frame. */
            "linear-gradient(105deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.30) 55%, rgba(10,10,10,0) 85%)",
          ].join(","),
        }}
      />

      {/* Copy and object share one band. Centring the stack on the section
          instead put it 47px below the copy's own centre at every width,
          because the catalogue index is a flex sibling that the copy centres
          above and the stack did not know about. */}
      <div className="relative z-[1] flex flex-1 items-center pb-10 pt-[calc(72px+2rem)] lg:pt-[calc(80px+1.5rem)]">
        <motion.div
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : STAGGER.normal,
                delayChildren: afterHeadline,
              },
            },
          }}
          initial="hidden"
          animate="show"
          /* Held to the quiet half of the frame on wide screens. The stream's
           own clearance ramp is measured against the same boundary, so the
           two halves of the composition are defined by one number, not two
           that can drift apart. */
          className="px-x-default w-full lg:max-w-[60%]"
        >
          {/* Ahead of the headline: it frames what follows, so it arrives first. */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.entrance, ease: EASE.power }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-label text-white/50"
          >
            {hero.spec.map((entry, index) => (
              <span key={entry} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="h-px w-6 bg-white/20" />
                )}
                {entry}
              </span>
            ))}
          </motion.p>

          {/* Fully white. The hierarchy is carried by size alone — 73px
            against 152px on a wide screen — which separates far more strongly
            than colour did: a bright accent sits only 1.55:1 from white, so
            it cost brand colour without buying much emphasis.

            font-stretch narrows the drawing itself at display size. That is a
            real width axis on the variable font, not tracking pulled tight,
            so the letterforms stay properly proportioned as they condense.

            The lead-in size sits on the h1 rather than on its first line,
            because `ch` resolves against the font-size of the element it is
            written on. With the size only on the lines, 26ch measured against
            the inherited 16px body text — a 229px column — and the headline
            broke after every word. */}
          <h1 className="mt-5 max-w-[26ch] break-words text-hero-lead font-bold text-white [font-stretch:94%]">
            <WordReveal lines={headline} delay={0.12} />
          </h1>

          <motion.div
            variants={rise}
            className="mt-7 flex flex-col items-start gap-6"
          >
            <p className="max-w-md text-base leading-relaxed text-white/70 lg:text-lg">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href={hero.primaryCta.href}
                  className="group ease-power inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {hero.primaryCta.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ease-power h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href={hero.secondaryCta.href}
                  /* This pill sits on the open right of the frame, where the scrim has
                   run out and a bright fragment can pass behind it. The tinted
                   glass is what keeps the label above the contrast floor. */
                  className="ease-power bg-ink/50 inline-flex min-h-[52px] items-center rounded-full border border-white/25 px-8 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:bg-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {hero.secondaryCta.label}
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* The stack Coderzon works across, as an object.

          Two compositions, not one composition shrunk.

          At lg it stands beside the copy as the right half of a two-column
          frame, at full strength, because there is a column for it.

          Below lg there is no second column and the band is already carrying
          a headline, a paragraph and two buttons — measured, that copy needs
          509px of a 474px band on the smallest phone. Adding a 300px block
          under it was never going to work, so the object stops being a block
          and becomes the ground the type sits on: oversized, bled off the
          right edge so it reads as cropped rather than parked, and dropped to
          a strength where it is texture behind the words instead of a second
          thing competing with them. The packets still rise, so a phone gets
          the movement too.

          A plate under this tilt projects to 116% of its box, so the crop is
          deliberate on mobile and right-[5%] is what avoids it on desktop. */}
        <motion.div
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="pointer-events-none absolute right-[-24%] top-[38%] z-0 w-[92%] opacity-[0.45] lg:right-[5%] lg:top-1/2 lg:w-[29vw] lg:max-w-[400px] lg:-translate-y-1/2 lg:opacity-100"
        >
          {/* Separate element from the parallax above, so the entrance can use
              y and opacity without fighting the scroll-linked values. */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.cinematic, ease: EASE.power }}
          >
            <PlatformStack />
          </motion.div>
        </motion.div>
      </div>

      {/* The catalogue, stated as fact and linked, because a reader who reads
          "Data & AI — 04" wants to see the four. */}
      <motion.nav
        style={reduceMotion ? undefined : { y: indexY }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : STAGGER.tight,
              delayChildren: afterHeadline + 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        aria-label="What we build"
        /* Four-up waits for lg. At sm the cells came out 144px against a 144px
           label, and md only reached 141px — the layout widened at exactly the
           point every label started wrapping. lg gives 198px, and it is the
           same breakpoint where the hero splits into two columns. */
        className="px-x-default relative z-[1] grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 lg:grid-cols-4"
      >
        {serviceGroups.slice(0, 4).map((group) => (
          <motion.a
            key={group.label}
            variants={rise}
            href="/services"
            aria-label={`${group.label} — ${group.items.length} services`}
            /* px-1 was 4px: on a phone the labels sat right against the hairline
                dividers, which is most of why this row read as cramped. */
            className="group bg-ink relative flex min-h-[92px] flex-col justify-between gap-2.5 px-3 py-5 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:min-h-0 sm:gap-3 sm:px-4 sm:py-6"
          >
            {/* A rule that draws in from the left on hover — the only movement
                here, so the pointer's position stays unambiguous. */}
            <span
              aria-hidden="true"
              className="ease-power absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-[450ms] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
            />
            <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-white/60 transition-colors duration-300 group-hover:text-white sm:tracking-label">
              {group.label}
            </span>
            {/* Plain text, not a counter. These values are 3 and 4 — an
                animation that ticks 0,1,2,3 is fuss rather than emphasis, and
                counting up from zero means the server renders "00", so a
                crawler or a reader without scripting sees the wrong number.
                The link's aria-label carries the count for assistive tech. */}
            <span
              aria-hidden="true"
              className="text-xl font-bold tabular-nums sm:text-2xl"
            >
              {String(group.items.length).padStart(2, "0")}
            </span>
          </motion.a>
        ))}
      </motion.nav>
    </section>
  );
}
