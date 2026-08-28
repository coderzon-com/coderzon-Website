"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/* Five stages down a spine, each reaching further right than the last as the
   data gets more refined. Percentages of a square, so the figure scales with
   its frame. */
const STAGES = [
  { y: 12, reach: 38 },
  { y: 31, reach: 51 },
  { y: 50, reach: 63 },
  { y: 69, reach: 74 },
  { y: 88, reach: 84 },
];

/**
 * Records moving through a pipeline.
 *
 * The object for the work pages. Everything shown there is a system that takes
 * data from one place, refines it in stages, and puts it somewhere useful — so
 * the picture is that, with a packet travelling the spine rather than an
 * abstract shape rotating.
 *
 * Laid out down rather than across. A left-to-right rail is the truer diagram
 * but it is wide and thin, which in this frame means a hairline stranded in
 * empty space. Descending stages, each reaching further right as the data
 * gets cleaner, fill the frame and say the same thing.
 *
 * The stages exist at rest: with motion off this is still a pipeline.
 */
export function PipelineFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-[6/5] w-full">
      {/* The spine every stage hangs from. */}
      <span
        aria-hidden="true"
        className="absolute bottom-[12%] left-[8%] top-[12%] w-px bg-white/20"
      />

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="bg-signal absolute left-[8%] h-2 w-2 -translate-x-1/2 rounded-full"
          style={{ boxShadow: "0 0 14px 3px rgba(77,225,255,0.45)" }}
          initial={{ top: "12%", opacity: 0 }}
          animate={{ top: ["12%", "88%"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.06, 0.94, 1],
          }}
        />
      )}

      {STAGES.map((stage, index) => (
        <div
          key={stage.y}
          className="absolute left-[8%]"
          style={{ top: `${stage.y}%`, right: `${100 - stage.reach}%` }}
        >
          <motion.div
            className="flex -translate-y-1/2 items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0.4 }}
            animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 6,
              delay: index * 0.6,
              repeat: Infinity,
              ease: EASE.power,
            }}
          >
            <span className="bg-ink block h-2.5 w-2.5 shrink-0 -translate-x-1/2 rotate-45 border border-white/40" />
            {/* The bar is the stage's output: longer each time, because more
                of the data is usable by the time it leaves. */}
            <span className="block h-8 flex-1 rounded-md border border-white/20 bg-white/[0.04]" />
          </motion.div>
        </div>
      ))}
    </div>
  );
}
