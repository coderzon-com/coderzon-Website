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
import { serviceGroups } from "@/config/navigation";

/**
 * The catalogue as a dial.
 *
 * One spoke per service, laid round a ring and broken into arcs by the four
 * disciplines. It says what the page is before the title is read: a complete
 * set, organised — not a list that happens to be long.
 *
 * Seen at an angle rather than flat on. A circle drawn face-on is a pie
 * chart, which claims proportions this data does not have; tilted into
 * perspective it reads as an instrument face instead, and the arcs become
 * groupings rather than shares.
 *
 * Ambient rotation with a pointer lean. The dial is behind the type and inert
 * to the pointer, so nothing here can intercept a click.
 */
const TILT = 62;

export function CapabilityDial() {
  const reduceMotion = useReducedMotion();

  const lean = useMotionValue(0);
  const smooth = useSpring(lean, { stiffness: 120, damping: 24, mass: 0.8 });
  const tilt = useTransform(smooth, (value) => TILT + value);
  const face = useMotionTemplate`perspective(900px) rotateX(${tilt}deg)`;

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (event) => {
      lean.set((event.clientY / window.innerHeight - 0.5) * -10);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [lean, reduceMotion]);

  // Flattened once, so a spoke knows which discipline it belongs to.
  const spokes = serviceGroups.flatMap((group, groupIndex) =>
    group.items.map(() => groupIndex),
  );
  const step = 360 / spokes.length;

  return (
    <motion.div
      style={{
        transform: reduceMotion
          ? `perspective(900px) rotateX(${TILT}deg)`
          : face,
        transformStyle: "preserve-3d",
      }}
      className="relative aspect-square w-full"
    >
      <div className="motion-reduce:animate-none absolute inset-0 animate-[orbit_54s_linear_infinite]">
        {[0.42, 0.62, 0.82].map((ring) => (
          <span
            key={ring}
            className="absolute rounded-full border border-white/[0.13]"
            style={{
              inset: `${(1 - ring) * 50}%`,
            }}
          />
        ))}

        {/* Each spoke rides a full-size wrapper that rotates about the
            centre, rather than being translated outward itself. A percentage
            translate resolves against the element's own box — on a bar 9% of
            the dial tall, -41% moved it about four pixels and every spoke
            piled up in the middle as a starburst. */}
        {spokes.map((groupIndex, index) => {
          const lead = index % 3 === 0;
          return (
            <span
              key={index}
              className="absolute inset-0"
              style={{ transform: `rotate(${index * step}deg)` }}
            >
              <span
                className="absolute left-1/2 w-[2px] -translate-x-1/2 rounded-full"
                style={{
                  top: lead ? "5%" : "7%",
                  height: lead ? "13%" : "9%",
                  background:
                    groupIndex % 2 === 0
                      ? "rgba(77,225,255,0.95)"
                      : "rgba(255,255,255,0.7)",
                }}
              />
            </span>
          );
        })}
      </div>

      <span
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(77,225,255,0.5), rgba(14,89,242,0.18) 55%, transparent 72%)",
        }}
      />
    </motion.div>
  );
}
