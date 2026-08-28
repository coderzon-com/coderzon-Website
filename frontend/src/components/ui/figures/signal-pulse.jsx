"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";

/**
 * Rings leaving a centre, one after another.
 *
 * For the pages that ask the visitor to make contact. A message going out and
 * something coming back is the whole transaction, and a pulse is the plainest
 * possible picture of it.
 *
 * Deliberately quiet and slow. This sits on pages with a form on them, and a
 * background that keeps catching the eye while somebody is typing is working
 * against the only thing the page is for.
 */
export function SignalPulse() {
  const reduceMotion = useReducedMotion();
  const waves = [0, 1, 2, 3];

  return (
    <div className="relative aspect-square w-full">
      {!reduceMotion &&
        waves.map((wave) => (
          <motion.span
            key={wave}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/25"
            style={{ x: "-50%", y: "-50%" }}
            initial={{ width: "8%", height: "8%", opacity: 0 }}
            /* Stops at 80%, not 96%. The hero bleeds its object slightly past
               the right edge and past the band top and bottom, so a wave that
               expands to the full width of the frame is cut on three sides at
               the moment it is brightest. */
            animate={{
              width: ["8%", "80%"],
              height: ["8%", "80%"],
              opacity: [0, 0.55, 0],
            }}
            transition={{
              duration: 7,
              delay: wave * 1.75,
              repeat: Infinity,
              ease: EASE.power,
            }}
          />
        ))}

      {/* Structure that is there whether or not anything is animating: a
          target reads as a signal source even at rest, where a single ring
          just reads as a circle somebody forgot to fill. */}
      {[0.32, 0.54, 0.76].map((ring) => (
        <span
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12"
          style={{ width: `${ring * 100}%`, height: `${ring * 100}%` }}
        />
      ))}

      {/* Bearing ticks. Four is enough to imply the instrument; more would
          start competing with the type this sits behind. */}
      {[0, 90, 180, 270].map((angle) => (
        <span
          key={angle}
          className="absolute inset-0"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className="absolute left-1/2 top-[9%] h-[6%] w-px -translate-x-1/2 bg-white/25" />
        </span>
      ))}

      <motion.span
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0.6 }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [0.9, 1.08, 0.9], opacity: [0.55, 1, 0.55] }
        }
        transition={{
          duration: DURATION.cinematic * 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[18%] w-[18%] rounded-full blur-lg"
        /* Centred through Motion, not Tailwind. Motion owns `transform` on any
           element it animates, so `-translate-x-1/2 -translate-y-1/2` sitting
           beside an animated `scale` is silently discarded — which left the
           core hanging half its own width down and right of the rings it is
           supposed to sit inside. */
        style={{
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(150,240,255,0.9), rgba(77,225,255,0.5) 45%, rgba(14,89,242,0.18) 68%, transparent 80%)",
        }}
      />
    </div>
  );
}
