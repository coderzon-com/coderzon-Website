"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A card that leans toward the pointer.
 *
 * Real 3D: the card is rotated on X and Y inside a perspective context, and a
 * light source tracks the cursor across its surface. Both are driven by motion
 * values rather than state, so moving the mouse never triggers a React render.
 *
 * The rotation is deliberately small. Past about eight degrees a card stops
 * reading as a physical object catching the light and starts reading as a
 * gimmick, and text on its surface begins to distort.
 *
 * Under prefers-reduced-motion the tilt and the light are both switched off
 * and it behaves as an ordinary card.
 */
export function TiltCard({
  children,
  className,
  as: Tag = "div",
  intensity = 6,
  glare = true,
  ...props
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // Pointer position within the card, normalised to -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // Y position drives X rotation, and vice versa — that is what makes it feel
  // like the surface is pivoting under the cursor rather than following it.
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 55%)`;

  function handleMove(event) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  const MotionTag = motion.create ? motion.create(Tag) : motion[Tag];

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <MotionTag
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={cn("relative h-full", className)}
        {...props}
      >
        {children}

        {glare && !reduceMotion && (
          <motion.span
            aria-hidden="true"
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </MotionTag>
    </div>
  );
}
