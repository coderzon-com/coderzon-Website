"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Leaves fanned open from a common edge.
 *
 * For pages whose content is layered rather than sequential — a company with
 * things behind it, a list of answers stacked under questions. The leaves
 * share a hinge and open by degrees, which is what "there is more here than
 * the top one" looks like.
 *
 * The fan leans with the pointer. Nothing here is interactive, so the lean is
 * the only thing that tells you it is an object in space rather than a
 * printed pattern.
 */
export function LayerFan({ leaves = 5 }) {
  const reduceMotion = useReducedMotion();

  const lean = useMotionValue(0);
  const smooth = useSpring(lean, { stiffness: 110, damping: 22, mass: 0.8 });
  const rotate = useTransform(smooth, (v) => -18 + v);
  const face = useMotionTemplate`perspective(1000px) rotateX(58deg) rotateZ(${rotate}deg)`;

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event) => {
      lean.set((event.clientX / window.innerWidth - 0.5) * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [lean, reduceMotion]);

  return (
    <motion.div
      style={{
        transform: reduceMotion
          ? "perspective(1000px) rotateX(58deg) rotateZ(-18deg)"
          : face,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-square w-full"
    >
      {Array.from({ length: leaves }, (_, index) => {
        const depth = index / (leaves - 1);
        return (
          <span
            key={index}
            className="absolute rounded-[22px] border"
            style={{
              inset: `${8 + index * 5}%`,
              borderColor: `rgba(255,255,255,${0.08 + depth * 0.16})`,
              background: `rgba(255,255,255,${0.012 + depth * 0.022})`,
              transform: `translateZ(${index * 26}px) rotate(${index * 4 - 8}deg)`,
              transformStyle: "preserve-3d",
            }}
          />
        );
      })}
      <span
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(77,225,255,0.35), transparent 70%)",
        }}
      />
    </motion.div>
  );
}
