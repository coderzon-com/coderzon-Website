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
import { SPRING } from "@/lib/motion";

/**
 * The stack, as an object you can look at.
 *
 * This is the argument the hero is making, in physical form: work rises
 * through layers, from the infrastructure at the bottom to the product people
 * actually touch at the top. It is 3D because the subject is genuinely
 * layered — the depth carries the meaning rather than decorating it.
 *
 * Deliberately wordless. An earlier pass pinned a caption to each plate, and
 * they were the worst thing on the page: fixed text tied to a rotating scene,
 * running past the container edge and clipping. Captions on a 3D object have
 * to either distort with it or fight it, and both read as noise. The plates
 * carry the idea on their own, and the words that matter are in the headline
 * a column to the left.
 *
 * Built from CSS transforms rather than WebGL. Four plates and five packets is
 * nowhere near the threshold where a renderer earns its download.
 */

/** The isometric rest pose. Enough lean to read as depth, not so much it skews. */
const BASE_TILT_X = 54;
const BASE_TILT_Z = -34;
/** How far the pointer may lean it, in degrees. */
const LEAN_X = 7;
const LEAN_Z = 9;
/** Vertical gap between plates, in px of Z. */
const PLATE_GAP = 54;
/** Bottom plate first. Each one above sits further in, so the stack tapers. */
const PLATES = [0, 1, 2, 3];
const PACKETS = [0, 1, 2, 3, 4];

export function PlatformStack({ className = "" }) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const leanZ = useSpring(pointerX, SPRING.weighted);
  const leanX = useSpring(pointerY, SPRING.weighted);

  const tiltX = useTransform(leanX, (value) => BASE_TILT_X + value);
  const tiltZ = useTransform(leanZ, (value) => BASE_TILT_Z + value);
  const assembly = useMotionTemplate`rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;

  useEffect(() => {
    if (reduceMotion) return;
    const onPointerMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2 * LEAN_Z);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2 * LEAN_X);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pointerX, pointerY, reduceMotion]);

  const topOfStack = (PLATES.length - 1) * PLATE_GAP;

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ perspective: 1400 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          transform: reduceMotion
            ? `rotateX(${BASE_TILT_X}deg) rotateZ(${BASE_TILT_Z}deg)`
            : assembly,
          transformStyle: "preserve-3d",
        }}
        className="relative aspect-square w-full"
      >
        {/* Ground glow, so the stack sits on something rather than floating. */}
        <div
          className="absolute inset-[6%] rounded-full opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(14,89,242,0.55), rgba(10,10,10,0))",
            transform: "translateZ(-30px)",
          }}
        />

        {/* The beam the work travels along. Stood upright out of the plane. */}
        <div
          className="absolute left-1/2 top-1/2 h-px w-px"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="via-signal/40 to-signal/70 absolute -left-px bottom-0 w-0.5 rounded-full bg-gradient-to-t from-transparent"
            style={{
              height: topOfStack,
              transform: `rotateX(-${BASE_TILT_X}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        </div>

        {PLATES.map((plate) => {
          const depth = plate * PLATE_GAP;
          // Higher plates sit further in and read brighter, which is what
          // gives the stack atmosphere instead of four identical panes.
          const inset = plate * 5;
          const face = 0.03 + plate * 0.012;
          const edge = 0.12 + plate * 0.055;

          return (
            <div
              key={plate}
              className="absolute rounded-[26px] backdrop-blur-[2px]"
              style={{
                inset: `${inset}%`,
                transform: `translateZ(${depth}px)`,
                backgroundColor: `rgba(255,255,255,${face})`,
                border: `1px solid rgba(255,255,255,${edge})`,
                boxShadow: `0 0 ${40 + plate * 14}px -18px rgba(77,225,255,${0.35 + plate * 0.14})`,
                // A faint grid, so each plate reads as a surface with extent
                // rather than as a flat pane of colour.
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
          );
        })}

        {/* Work rising through the layers. The only thing that moves on its
            own, so what the object is saying stays unambiguous. */}
        {!reduceMotion &&
          PACKETS.map((packet) => (
            <motion.span
              key={packet}
              initial={{ translateZ: 0, opacity: 0 }}
              animate={{ translateZ: [0, topOfStack], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3.4,
                delay: packet * 0.68,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.15, 0.8, 1],
              }}
              className="bg-signal absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full shadow-[0_0_12px_2px_rgba(77,225,255,0.7)]"
              style={{ transformStyle: "preserve-3d" }}
            />
          ))}
      </motion.div>
    </div>
  );
}
