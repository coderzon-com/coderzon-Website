"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { workProcessSection } from "@/data/home-content";
import { DURATION, EASE, rise, stagger } from "@/lib/motion";
import { StagePanel } from "./stage-panel";

/**
 * How we work.
 *
 * The claim is gating: three stages, each closed before the next opens. So
 * the section is built as a progress track rather than a list — segments fill
 * in order, and a stage only lights when its segment reaches it.
 *
 * Numbers are earned here. Unlike the reasons in the section above, these
 * genuinely are steps in an order, so 01–03 and a filling track carry
 * information rather than decorate.
 *
 * Deliberately not another vertical rail. The section above threads its
 * panels onto a spine, and running the same device twice in a row would read
 * as a template however well it suits each one. This advances horizontally on
 * a wide screen and stacks on a narrow one, where the track stays horizontal
 * because a compact progress indicator is useful at any width.
 */
export function WorkProcessSection() {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, description, steps } = workProcessSection;

  const trackRef = useRef(null);

  /* Anchored to the panels, not the section. Tied to the section, the track
     finishes filling while the stages are still below the fold. */
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "end 0.7"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const riseVariant = rise(reduceMotion, { y: 22 });

  return (
    <section className="bg-ink px-x-default relative overflow-x-clip pb-y-default pt-y-seam text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger(reduceMotion)}
        className="grid gap-8 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-6">
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
          <h2 className="mt-6 max-w-[16ch] overflow-hidden break-words pb-[0.1em] text-heading font-bold [font-stretch:96%]">
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
          className="max-w-md self-end leading-relaxed text-white/65 lg:col-span-6"
        >
          {description}
        </motion.p>
      </motion.div>

      <div ref={trackRef} className="mt-14 lg:mt-20">
        {/* The track. One segment per stage, filling in turn — the gating made
            visible before you read a word of it. */}
        <div
          aria-hidden="true"
          className="mb-8 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((step, index) => (
            <SegmentFill
              key={step.number}
              index={index}
              total={steps.length}
              progress={eased}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <ol
          className="grid gap-4 lg:grid-cols-3"
          style={reduceMotion ? undefined : { perspective: 1100 }}
        >
          {steps.map((step, index) => (
            <StagePanel
              key={step.number}
              index={index}
              total={steps.length}
              progress={eased}
            >
              <div className="bg-ink-raised flex h-full flex-col rounded-2xl border border-white/12 p-6 sm:p-8">
                <span className="text-signal font-mono text-[11px] tabular-nums tracking-label">
                  {step.number}
                </span>
                <h3 className="mt-4 break-words text-display-sm font-bold [font-stretch:96%]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.description}
                </p>
              </div>
            </StagePanel>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** One segment of the progress track, filling across its own slice. */
function SegmentFill({ index, total, progress, reduceMotion }) {
  const slice = 1 / total;
  const fill = useTransform(
    progress,
    [index * slice, (index + 1) * slice],
    [0, 1],
  );
  return (
    <span className="relative h-px overflow-hidden bg-white/12">
      <motion.span
        style={{ scaleX: reduceMotion ? 1 : fill }}
        className="bg-signal absolute inset-0 origin-left"
      />
    </span>
  );
}
