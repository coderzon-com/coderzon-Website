"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/* Five stages down a spine, each reaching further right than the last as the
   data gets more refined. Percentages of a square, so the figure scales with
   its frame.

   Nothing reaches past 62%. The hero deliberately hangs its object off the
   right edge of the page, and the further the viewport widens the more of
   that square falls outside it — at 1920 roughly a third is never seen. A
   circle bleeding off an edge reads as intentional; a row of bars sliced in
   half reads as broken, so the drawing simply stays inside the part that is
   always on screen. */
const STAGES = [
  { y: 16, reach: 28 },
  { y: 33, reach: 38 },
  { y: 50, reach: 47 },
  { y: 67, reach: 55 },
  { y: 84, reach: 62 },
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
 * but it is wide and thin, which in a square frame means a hairline stranded
 * in empty space with its last stage pushed off the edge. Descending stages,
 * each reaching further right as the data gets cleaner, fill the same frame
 * and say the same thing.
 *
 * The stages exist at rest: with motion off this is still a pipeline.
 */
export function PipelineFlow() {
  const reduceMotion = useReducedMotion();

  return (
    /* Wider than tall on purpose. The hero's object slot is 160% of the
       hero's own height, so a square drawing runs off the top and bottom of
       the band the reader can actually see. */
    <div className="relative aspect-[3/2] w-full">
      {/* The spine every stage hangs from. */}
      <span
        aria-hidden="true"
        className="absolute bottom-[16%] left-[8%] top-[16%] w-px bg-white/20"
      />

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="bg-signal absolute left-[8%] h-2 w-2 -translate-x-1/2 rounded-full"
          style={{ boxShadow: "0 0 14px 3px rgba(77,225,255,0.45)" }}
          initial={{ top: "16%", opacity: 0 }}
          animate={{ top: ["16%", "84%"], opacity: [0, 1, 1, 0] }}
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
