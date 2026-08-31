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
 *
 * Each ring is two elements: a static plane carrying the tilt, and the ring
 * itself turning inside it. They cannot be one element — a CSS animation
 * overrides `transform` wholesale, so a tilt written inline alongside
 * `animate-[orbit]` is thrown away as soon as the animation runs.
 */
export function PlatformGyro() {
  const reduceMotion = useReducedMotion();
  /* Tones lifted from the originals, and the deep blue replaced. On a
     near-black ground rgba(14,89,242) at 55% is all but invisible — the ring
     was there and could not be seen, which is half of why this figure read as
     empty. Brightness carries the hue instead of saturation. */
  const rings = [
    { rx: 68, rz: 8, size: 96, speed: 38, tone: "rgba(77,225,255,0.72)" },
    { rx: 22, rz: -34, size: 82, speed: 52, tone: "rgba(255,255,255,0.42)" },
    { rx: 78, rz: 62, size: 68, speed: 66, tone: "rgba(120,165,255,0.68)" },
  ];

  return (
    /* Drawn at 64% of its frame. The rings turn continuously under
       perspective, and a ring sized to the full frame projects past it —
       measured 136% of the box at its widest, which put the outer orbit
       129px beyond the right edge of the page at 1280. */
    <div
      className="relative aspect-square w-full scale-[0.64]"
      style={{ perspective: 1100 }}
    >
      {rings.map((ring) => (
        <div
          key={ring.size}
          className="absolute inset-0 grid place-items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* The plane the ring lies in. The tilt lives here, on a static
              element, and nowhere near the animation — a running CSS
              animation replaces `transform` outright, so a tilt set inline
              on the animated element is discarded the moment it starts. That
              is what flattened three gyroscope rings into concentric
              circles. */}
          <div
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              transform: `rotateX(${ring.rx}deg) rotateZ(${ring.rz}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The turn, inside that plane, so it reads as an orbit rather
                than a spin on the screen. */}
            <div
              className={`relative h-full w-full ${
                reduceMotion ? "" : "animate-[orbit_1s_linear_infinite]"
              }`}
              style={{
                animationDuration: `${ring.speed}s`,
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: ring.tone }}
              />

              {/* A bead on the rim. Without it there is nothing to see: a
                  uniform circle rotating about its own centre is identical
                  to a still one, however fast it turns. */}
              <span
                className="absolute left-1/2 top-0 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: ring.tone,
                  boxShadow: `0 0 10px 2px ${ring.tone}`,
                }}
              />
            </div>
          </div>
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
