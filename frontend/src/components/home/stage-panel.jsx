"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * One stage in the process, with three states rather than two.
 *
 * Waiting, running, done. Most scroll reveals only have "hidden" and "shown",
 * but this section's claim is that each stage closes before the next opens —
 * so a stage that has finished must look finished, not merely present. It
 * settles back in depth and dims, while the running stage sits forward and
 * bright.
 *
 * That third state is the whole point. Without it the panels light up and
 * stay lit, which says the stages run concurrently — the opposite of what the
 * copy claims.
 */
export function StagePanel({ index, total, progress, children }) {
  const reduceMotion = useReducedMotion();

  const slice = 1 / total;
  const opens = index * slice;
  const runs = opens + slice * 0.45;
  const closes = opens + slice;

  // Waiting -> running -> done. The last stage has nothing after it, so it
  // stays forward once reached rather than settling back into nothing.
  const isLast = index === total - 1;
  const z = useTransform(
    progress,
    [opens - slice * 0.5, runs, closes],
    [-90, 0, isLast ? 0 : -46],
  );
  const brightness = useTransform(
    progress,
    [opens - slice * 0.5, runs, closes],
    [0.45, 1, isLast ? 1 : 0.62],
  );
  const opacity = useTransform(progress, [opens - slice * 0.7, opens], [0, 1]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  if (reduceMotion) {
    return <li className="relative">{children}</li>;
  }

  return (
    <motion.li
      data-motion-reveal=""
      style={{
        z,
        opacity,
        filter,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className="relative"
    >
      {children}
    </motion.li>
  );
}
