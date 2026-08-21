"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";

/**
 * One plate travelling out of the portal to its place in the wall.
 *
 * The grid decides where the plate belongs; this only animates the journey to
 * it. The offset back to the centre is measured rather than guessed, so the
 * plates converge on the portal exactly wherever the grid happens to put them
 * at that breakpoint — no per-layout tuning, and it stays right when the
 * column count changes.
 *
 * Plates leave in sequence rather than together. A single burst reads as an
 * explosion; a stream reads as things being fed out one at a time and set
 * down, which is the idea.
 *
 * `converge` is off in a single column. Eight plates funnelling through one
 * point need width to fan out into; stacked vertically they simply overlap
 * for most of the flight, and a card sitting on top of another reads as a
 * bug rather than as choreography. There they rise into place instead.
 *
 * Everything animated here is transform and opacity, and the plate is inert
 * to the pointer until it has landed — a link should not be clickable while
 * it is still flying.
 */
export function EmergingPlate({
  index,
  total,
  offset,
  relief,
  progress,
  converge = true,
  children,
}) {
  const reduceMotion = useReducedMotion();

  // Each plate takes this much of the scroll; the starts are staggered across
  // what is left, so the last one launches as the first is settling.
  const span = 0.62;
  const start = total > 1 ? (index / (total - 1)) * (1 - span) : 0;
  const end = start + span;

  const x = useTransform(progress, [start, end], [offset?.dx ?? 0, 0]);
  const y = useTransform(progress, [start, end], [offset?.dy ?? 0, 0]);
  const z = useTransform(progress, [start, end], [-900, relief]);
  const scale = useTransform(progress, [start, end], [0.18, 1]);
  const rotate = useTransform(
    progress,
    [start, end],
    [index % 2 ? 10 : -10, 0],
  );
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.02, end],
    [0, 1, 1, 1],
  );
  // The plain rise used wherever the plates do not converge.
  const simpleY = useTransform(progress, [start, end], [28, 0]);
  const simpleOpacity = useTransform(progress, [start, end], [0, 1]);

  const landed = useTransform(progress, (value) =>
    value >= end - 0.02 ? "auto" : "none",
  );

  if (reduceMotion) {
    // Nothing to reveal and nothing to wait for: just show it.
    return (
      <li data-plate="" className="relative">
        {children}
      </li>
    );
  }

  if (!converge) {
    /* Driven by the same scroll value, not by whileInView. An observer that
       does not fire leaves the plate stranded at opacity 0 — which is exactly
       how this section rendered blank once already. Scroll progress is
       already in hand, so there is no reason to depend on a second signal. */
    return (
      <motion.li
        data-plate=""
        data-motion-reveal=""
        style={{ y: simpleY, opacity: simpleOpacity }}
        className="relative"
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.li
      data-plate=""
      data-motion-reveal=""
      style={{
        x,
        y,
        z,
        scale,
        rotate,
        opacity,
        pointerEvents: landed,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      {children}
    </motion.li>
  );
}
