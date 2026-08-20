"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/**
 * An element that drifts toward the pointer.
 *
 * The effect only engages inside the element's own bounds plus a small margin,
 * so it reads as attraction at close range rather than something chasing the
 * cursor across the page.
 *
 * Displacement is capped hard. A magnetic control that moves more than about
 * ten pixels stops feeling responsive and starts feeling slippery — the
 * pointer arrives where the button *was*.
 *
 * Position is driven by motion values, so tracking the pointer never causes a
 * React render, and the whole effect is disabled under reduced motion.
 */
export function Magnetic({ children, strength = 0.35, max = 9, className }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 260, damping: 18, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function handleMove(event) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-max, Math.min(max, dx * strength)));
    y.set(Math.max(-max, Math.min(max, dy * strength)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduceMotion ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
