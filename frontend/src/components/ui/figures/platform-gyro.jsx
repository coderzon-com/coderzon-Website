"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Rings on different axes, turning at different rates.
 *
 * The platforms page argues that several stacks are held in one practice, so
 * the figure is several orbits sharing one centre: independent, none of them
 * privileged, all bound to the same point.
 *
 * A gyroscope rather than a stack. A stack would put one platform on top,
 * which is the opposite of what the page claims.
 */
export function PlatformGyro() {
  const reduceMotion = useReducedMotion();
  const rings = [
    { rx: 68, rz: 8, size: 96, speed: 38, tone: "rgba(77,225,255,0.55)" },
    { rx: 22, rz: -34, size: 82, speed: 52, tone: "rgba(255,255,255,0.30)" },
    { rx: 78, rz: 62, size: 68, speed: 66, tone: "rgba(14,89,242,0.55)" },
  ];

  return (
    <div
      className="relative aspect-square w-full"
      style={{ perspective: 1100 }}
    >
      {rings.map((ring) => (
        <div
          key={ring.size}
          className="absolute inset-0 grid place-items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={reduceMotion ? "" : "animate-[orbit_1s_linear_infinite]"}
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              borderRadius: "9999px",
              border: `1px solid ${ring.tone}`,
              transform: `rotateX(${ring.rx}deg) rotateZ(${ring.rz}deg)`,
              animationDuration: `${ring.speed}s`,
              transformStyle: "preserve-3d",
            }}
          />
        </div>
      ))}
      <span
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(77,225,255,0.45), rgba(14,89,242,0.16) 55%, transparent 74%)",
        }}
      />
    </div>
  );
}
