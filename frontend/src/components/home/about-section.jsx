"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { aboutSection } from "@/data/home-content";
import { DURATION, EASE, STAGGER, rise, stagger, wipeUp } from "@/lib/motion";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { ScrollStaggerItem } from "@/components/ui/scroll-stagger-item";
import { TiltCard } from "@/components/ui/tilt-card";

/**
 * About, as a statement and a record.
 *
 * No photograph. The stock images that were here showed strangers in a stock
 * office, which said nothing true about this firm — the claim itself, set
 * large, carries more weight than a picture of someone else's team.
 *
 * Dark, like the three sections above it. This was white, on the argument
 * that the contrast was a deliberate change of register. Read in sequence it
 * was not: after three dark sections the page simply broke in half, and the
 * flip drew more attention than anything written here. Continuity of ground
 * is worth more than a change of pace nobody asked for.
 *
 * The argument is "partner, not supplier", so the four facts are treated as
 * something a buyer can pick up and look at rather than a table to skim: they
 * assemble as a deck, each card leaning toward the pointer, and the deck dims
 * around whichever one is being read. A supplier hands over a list; a partner
 * hands over a record you can interrogate.
 *
 * Every element does NOT share one entrance. Labels fade, because a label
 * should not perform. The heading wipes up from behind its own edge. Body copy
 * rises. The figure counts, because it is the evidence. The cards assemble in
 * depth. Motion earns its place by telling you what kind of thing each element
 * is — a single reused fade tells you nothing.
 *
 * Deliberately unnumbered. Disciplines, Engagements, Team and Based are facets
 * of one firm, not steps in a process, and 01–04 would assert an order that
 * does not exist.
 */
export function AboutSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const figureRef = useRef(null);
  const deckRef = useRef(null);

  /* A late window, deliberately. Starting when the section's top edge first
     touches the bottom of the viewport means the whole move plays out while
     the reader is still in the section above and finishes before they arrive.
     This begins as the section appears and completes as it fills the screen. */
  /* Short and early, and this matters more than it sounds.
     A window that only completes once the section's top reaches the top of
     the viewport leaves a long stretch where the section fills the screen
     showing nothing — the reader arrives at a blank page and scrolls looking
     for content. This runs from the section first appearing to it being about
     two thirds on screen, so the choreography plays as it rises into view and
     everything has landed by the time it is properly being read. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  /* The figure's journey: it opens large and high in the frame, then travels
     down into its slot beside the label as you scroll.

     Measured from layout offsets, never from getBoundingClientRect. A rect
     reports the element *with* the transform already applied to it, so
     reading one fed the figure's own displacement into the next measurement
     and compounded until it sat a thousand pixels off-canvas. offsetLeft and
     offsetTop describe where the element belongs in layout and are untouched
     by transforms, which is the only stable thing to measure against. */
  const [flight, setFlight] = useState({ dx: 0, dy: 0, scale: 1 });

  useEffect(() => {
    const section = sectionRef.current;
    const figure = figureRef.current;
    if (!section || !figure) return;

    const layoutOffset = (node) => {
      let x = 0;
      let y = 0;
      let current = node;
      while (current) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
      }
      return { x, y };
    };

    const measure = () => {
      const height = figure.offsetHeight;
      const width = figure.offsetWidth;
      if (!height) return;

      const here = layoutOffset(figure);
      const box = layoutOffset(section);
      const scale = Math.min(
        5.5,
        Math.max(1, (window.innerHeight * 0.42) / height),
      );

      /* Clamped to the section's own width. An enlarged glyph reaching past
         the edge is exactly how a page starts scrolling sideways. */
      const halfGrown = (width * scale) / 2;
      const room = Math.max(0, section.offsetWidth / 2 - halfGrown - 16);
      const wantedX = box.x + section.offsetWidth / 2 - (here.x + width / 2);

      setFlight({
        dx: Math.max(-room, Math.min(room, wantedX)),
        // High in the section, not level with the slot it is heading for.
        dy: box.y + section.offsetHeight * 0.16 - (here.y + height / 2),
        scale,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const figureX = useTransform(scrollYProgress, [0, 0.78], [flight.dx, 0]);
  const figureY = useTransform(scrollYProgress, [0, 0.78], [flight.dy, 0]);
  const figureScale = useTransform(
    scrollYProgress,
    [0, 0.78],
    [flight.scale, 1],
  );

  /* The copy arrives while the figure is still travelling, so the section
     reads as one move rather than a queue. */
  /* The deck runs off its own position, not the section's.
     Tied to the section, the cards' window finished while they were still
     below the fold — the section's top only has to reach a third of the way
     up the screen, and the deck sits far beneath that. By the time you had
     scrolled to them the progress was already 1 and they simply sat there.
     Anchored to the list itself, they animate as they come into view. */
  const { scrollYProgress: deckProgress } = useScroll({
    target: deckRef,
    offset: ["start 0.95", "start 0.45"],
  });

  const supportOpacity = useTransform(scrollYProgress, [0.3, 0.72], [0, 1]);
  const supportY = useTransform(scrollYProgress, [0.3, 0.72], [24, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const { eyebrow, title, lead, body, spec, cta, yearsExperience } =
    aboutSection;

  const riseVariant = rise(reduceMotion);
  const wipe = wipeUp(reduceMotion);

  return (
    <section
      ref={sectionRef}
      className="px-x-default relative overflow-x-clip bg-ink pb-y-default pt-y-seam text-white"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(reduceMotion, { each: STAGGER.normal })}
      >
        <motion.p
          variants={
            reduceMotion
              ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
              : {
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { duration: DURATION.entrance },
                  },
                }
          }
          className="font-mono text-[10px] uppercase tracking-label text-white/55"
        >
          {eyebrow}
        </motion.p>

        {/* Clipped, so the line arrives from behind its own edge rather than
            fading. A different gesture from the hero's word pivot on purpose:
            two headings that animate identically read as a template. */}
        <h2 className="mt-6 max-w-[18ch] overflow-hidden break-words pb-[0.1em] text-heading font-bold [font-stretch:96%]">
          <motion.span variants={wipe} className="block">
            {title}
          </motion.span>
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <motion.div
            style={
              reduceMotion
                ? undefined
                : { opacity: supportOpacity, y: supportY }
            }
            data-motion-reveal=""
            className="lg:col-span-5"
          >
            <motion.p
              variants={riseVariant}
              className="text-lg leading-relaxed"
            >
              {lead}
            </motion.p>
            <motion.p
              variants={riseVariant}
              className="mt-6 leading-relaxed text-white/65"
            >
              {body}
            </motion.p>

            <motion.div variants={riseVariant} className="mt-10">
              <Magnetic className="inline-block">
                <Link
                  href={cta.href}
                  className="group ease-power inline-flex min-h-[52px] items-center gap-2 rounded-full focus-visible:ring-offset-ink bg-white px-8 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  {cta.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ease-power h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7">
            {/* The figure travels here. It opens large and high in the frame
                and settles into this slot as you scroll, which puts the
                strongest piece of evidence in front of the reader before a
                word qualifies it. Transform only, so nothing around it moves
                while it is on its way, and the label waits until it has
                nearly landed — a caption on something still moving is
                unreadable. */}
            <div className="relative z-10 flex items-baseline gap-5 border-b border-white/12 pb-10">
              <motion.span
                ref={figureRef}
                style={
                  reduceMotion
                    ? undefined
                    : { x: figureX, y: figureY, scale: figureScale }
                }
                className="block origin-center text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-[0.82] tracking-[-0.045em] tabular-nums will-change-transform [font-stretch:94%]"
              >
                <Counter to={yearsExperience} />
              </motion.span>
              <motion.span
                style={reduceMotion ? undefined : { opacity: labelOpacity }}
                data-motion-reveal=""
                className="font-mono text-[10px] uppercase leading-tight tracking-label text-white/55"
              >
                Years
                <br />
                delivering
              </motion.span>
            </div>
            {/* The deck. Perspective on the container, so the cards tip within
                one shared space instead of each having its own vanishing
                point — four separate perspectives look subtly wrong. */}
            <ul
              ref={deckRef}
              style={reduceMotion ? undefined : { perspective: 1200 }}
              className="group/deck mt-10 grid gap-4 sm:grid-cols-2"
            >
              {spec.map((row, index) => (
                <ScrollStaggerItem
                  key={row.label}
                  as="li"
                  progress={deckProgress}
                  index={index}
                  total={spec.length}
                  deal={index}
                  className="ease-power opacity-100 transition-opacity duration-300 group-hover/deck:opacity-45 hover:!opacity-100 focus-within:!opacity-100 motion-reduce:transition-none"
                >
                  <TiltCard className="h-full" intensity={5}>
                    <dl className="bg-ink-raised flex h-full flex-col gap-4 rounded-2xl border border-white/12 p-6 transition-colors duration-300 hover:border-white/30 hover:bg-ink-high">
                      <dt className="font-mono text-[10px] uppercase tracking-label text-white/55">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] leading-snug">{row.value}</dd>
                    </dl>
                  </TiltCard>
                </ScrollStaggerItem>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
