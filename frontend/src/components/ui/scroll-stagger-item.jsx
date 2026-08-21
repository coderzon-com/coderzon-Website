"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";

/**
 * One item in a scroll-driven stagger.
 *
 * The difference from a `whileInView` stagger is that the reader controls the
 * pace: items arrive as the section is scrolled, not on a timer that starts
 * when the container happens to cross a threshold. On a section where
 * something else is animating to the same scroll — a figure settling into
 * place, here — that matters, because one clock keeps them in step.
 *
 * Each item takes a slice of the window and they overlap, so the group reads
 * as a run rather than as separate arrivals.
 *
 * No measurement, deliberately. Everything is a fixed offset from the item's
 * own resting place, so there is no rect to read and nothing that can feed a
 * transform back into itself.
 */
export function ScrollStaggerItem({
  progress,
  index,
  total,
  from = 0,
  to = 1,
  distance = 56,
  deal,
  as: Tag = "div",
  className = "",
  children,
}) {
  const reduceMotion = useReducedMotion();

  const span = (to - from) * 0.55;
  const step = total > 1 ? (to - from - span) / (total - 1) : 0;
  const start = from + index * step;
  const end = start + span;

  /* `deal` turns the stagger into a hand of cards being dealt: each item
     starts drawn back toward where the previous one came from and rotated off
     axis, then squares up. Without it the group is a tidy queue of identical
     rises, which is the generic result this exists to avoid. */
  const dealt = typeof deal === "number";
  const swing = dealt ? (index % 2 === 0 ? -1 : 1) : 0;

  const y = useTransform(progress, [start, end], [distance, 0]);
  const x = useTransform(progress, [start, end], [dealt ? swing * 46 : 0, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [dealt ? 0.86 : 0.94, 1]);
  const rotateX = useTransform(progress, [start, end], [12, 0]);
  const rotateY = useTransform(progress, [start, end], [swing * -16, 0]);
  const rotateZ = useTransform(progress, [start, end], [swing * 5, 0]);

  const MotionTag = motion[Tag] ?? motion.div;

  if (reduceMotion) {
    return (
      <MotionTag
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION.entrance, ease: EASE.power }}
        data-motion-reveal=""
        className={className}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      data-motion-reveal=""
      style={{
        x,
        y,
        opacity,
        scale,
        rotateX,
        rotateY,
        rotateZ,
        transformOrigin: "50% 0%",
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
