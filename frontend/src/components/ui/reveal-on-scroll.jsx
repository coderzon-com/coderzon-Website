"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

/**
 * A block that arrives as it reaches the viewport.
 *
 * For long reading pages, where content is met one block at a time rather
 * than composed into a single view. Those pages want the opposite of the
 * homepage's choreography: no scroll-linked scrubbing, nothing that moves
 * while you are reading it. A block rises once, settles, and is then simply
 * text on a page.
 *
 * `index` staggers neighbours so a run of blocks reads as a sequence rather
 * than as everything arriving at once. It caps deliberately — past the fourth
 * item a stagger stops reading as rhythm and starts reading as lag.
 */
export function RevealOnScroll({
  children,
  index = 0,
  as: Tag = "div",
  className,
  y = 22,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[Tag] ?? motion.div;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      data-motion-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: DURATION.entrance,
        ease: EASE.power,
        delay: Math.min(index, 3) * STAGGER.normal,
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
