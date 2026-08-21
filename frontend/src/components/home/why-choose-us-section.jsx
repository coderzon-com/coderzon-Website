"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { whyChooseUsSection } from "@/data/home-content";
import { DURATION, EASE, rise, stagger } from "@/lib/motion";
import { ReasonPanel } from "./reason-panel";

/**
 * Why choose us.
 *
 * The claim is continuity — one team from architecture through to uptime — so
 * the section is built as a single thread with the reasons hinged off it. The
 * line draws itself as you scroll and each panel swings open as the line
 * reaches its node.
 *
 * That is the argument made structurally rather than asserted: four reasons
 * arranged as a grid are four separate boasts, whereas four panels attached to
 * one spine are four faces of the same thing.
 *
 * A thread, not a timeline. The panels deliberately carry no numbers and sit
 * on one side rather than alternating: leadership, support, vendor-neutrality
 * and ownership are not stages in an order, and either device would assert a
 * sequence the content does not have.
 *
 * Dark, like every section above it. This was the last light section in the
 * run and the flip broke the page in half for no gain.
 */
export function WhyChooseUsSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, reasons } = whyChooseUsSection;

  const listRef = useRef(null);

  /* Anchored to the list, not the section.
     Tied to the section, the window finishes while the panels are still below
     the fold — you arrive to find everything already open and nothing moves.
     This runs from the list appearing to it being most of the way up. */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.9", "end 0.65"],
  });

  // The spine is drawn by the same value that opens the panels.
  const draw = useTransform(scrollYProgress, [0, 0.92], [0, 1]);

  const riseVariant = rise(reduceMotion, { y: 22 });

  return (
    <section className="bg-ink px-x-default relative overflow-x-clip pb-y-default pt-y-seam text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(reduceMotion)}
        className="grid gap-8 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
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
            data-motion-reveal=""
            className="font-mono text-[10px] uppercase tracking-label text-white/55"
          >
            {eyebrow}
          </motion.p>

          {/* Clipped, so the line arrives from behind its own edge. */}
          <h2 className="mt-6 max-w-[15ch] overflow-hidden break-words pb-[0.1em] text-heading font-bold [font-stretch:96%]">
            <motion.span
              variants={
                reduceMotion
                  ? { hidden: { y: 0 }, show: { y: 0 } }
                  : {
                      hidden: { y: "110%" },
                      show: {
                        y: 0,
                        transition: {
                          duration: DURATION.cinematic,
                          ease: EASE.power,
                        },
                      },
                    }
              }
              data-motion-reveal=""
              className="block"
            >
              {title}
            </motion.span>
          </h2>
        </div>

        <motion.p
          variants={riseVariant}
          data-motion-reveal=""
          className="max-w-md self-end leading-relaxed text-white/65 lg:col-span-5"
        >
          {description}
        </motion.p>
      </motion.div>

      <div className="relative mt-14 lg:mt-20">
        {/* The thread. A track at low contrast the whole way down, with the
            drawn line scaling over it — scaleY on a one-pixel element, so the
            drawing costs nothing and needs no geometry. */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-3 top-0 w-px bg-white/10 sm:left-5"
        />
        <motion.span
          aria-hidden="true"
          style={reduceMotion ? undefined : { scaleY: draw }}
          className="via-signal/70 to-signal/40 absolute bottom-0 left-3 top-0 w-px origin-top bg-gradient-to-b from-white/60 sm:left-5"
        />

        <ol ref={listRef} className="relative">
          {reasons.map((reason, index) => (
            <ReasonPanel
              key={reason.title}
              reason={reason}
              index={index}
              total={reasons.length}
              progress={scrollYProgress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
