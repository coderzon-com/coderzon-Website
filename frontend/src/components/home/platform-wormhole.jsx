"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";

/**
 * The portal the plates arrive from.
 *
 * Concentric rings at different depths and speeds, with a hot core. The rings
 * are placed in Z rather than merely scaled, so the pointer-driven turn of the
 * wall moves them against each other and the thing reads as a tunnel going
 * back rather than as a flat target painted on the surface.
 *
 * It fades out as the last plate lands. A portal that stays open after
 * everything has come through is decoration; one that closes has a job.
 */
export function PlatformWormhole({ progress }) {
  const reduceMotion = useReducedMotion();

  const opacity = useTransform(progress, [0, 0.12, 0.62, 0.92], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.92], [0.7, 1.35]);

  if (reduceMotion) return null;

  const rings = [
    { size: 92, z: -520, spin: "28s", tone: "rgba(77,225,255,0.55)" },
    { size: 168, z: -400, spin: "44s", tone: "rgba(77,225,255,0.32)" },
    { size: 268, z: -280, spin: "64s", tone: "rgba(14,89,242,0.30)" },
    { size: 400, z: -160, spin: "88s", tone: "rgba(14,89,242,0.16)" },
  ];

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, scale, transformStyle: "preserve-3d" }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0"
    >
      {/* The core. Small, and the only genuinely bright thing here — the rings
          read as lit by it rather than as glowing on their own. */}
      <div
        className="absolute -left-[70px] -top-[70px] h-[140px] w-[140px] rounded-full blur-[18px]"
        style={{
          background:
            "radial-gradient(circle, rgba(180,245,255,0.85) 0%, rgba(77,225,255,0.45) 38%, rgba(14,89,242,0.18) 62%, transparent 76%)",
        }}
      />
      {rings.map((ring) => (
        <div
          key={ring.size}
          className="animate-orbit absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            left: -ring.size / 2,
            top: -ring.size / 2,
            borderColor: ring.tone,
            transform: `translateZ(${ring.z}px)`,
            animationDuration: ring.spin,
            // Broken rings read as motion even at rest; a solid circle does not.
            maskImage:
              "conic-gradient(from 0deg, #000 0deg 120deg, transparent 150deg 210deg, #000 240deg 360deg)",
            WebkitMaskImage:
              "conic-gradient(from 0deg, #000 0deg 120deg, transparent 150deg 210deg, #000 240deg 360deg)",
          }}
        />
      ))}
    </motion.div>
  );
}
