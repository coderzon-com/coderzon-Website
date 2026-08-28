"use client";

import { useReducedMotion } from "motion/react";
import { CapabilityDial } from "./capability-dial";

/**
 * The dial, with this capability's own vocabulary coming out of it.
 *
 * Every service page used to show the same rotating dial, which said "this is
 * a service page" and nothing else. The dial is still the right object — it is
 * an instrument, and a service is a practice with a shape — but on its own it
 * cannot say *which* service. So the terms of this particular discipline are
 * emitted from its centre: the instrument runs, and this is what it produces.
 *
 * Outward from the middle, not scattered across the frame. A field of floating
 * words is the homepage's gesture, and repeating it here would both spend that
 * moment and leave the dial decorative. Emission ties the two together — the
 * words have a source, and the source is the thing that was already there.
 *
 * The terms stay upright while the dial is tilted away under perspective.
 * Laying type onto the face would make it a texture on a disc; standing it up
 * makes it a readout coming off an instrument, and keeps it legible.
 *
 * Directions are deterministic — a golden-angle fan, with timing from a hash
 * of the term itself. No `Math.random`: the server and the client have to
 * agree, and a field that reshuffles on every navigation reads as noise.
 */

/* How far a term travels before it fades. Kept well inside the frame: under
   perspective the hero sits its object near the edge of the page, and a term
   is as wide as its own text, so the reach is measured from the end of the
   word rather than from its anchor. The vertical reach is shorter because the
   frame bleeds above the hero, where the header floats. */
const REACH_X = 0.3;
const REACH_Y = 0.26;

/* The field sits below the middle of its frame, so an upward-travelling term
   clears the navigation whatever the term count happens to be. */
const CENTRE_Y = 55;
const GOLDEN_ANGLE = 137.507;
const CYCLE = 11;

/** Stable per-term jitter, so timing does not track the reading order. */
function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

export function ServiceField({ terms }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-square w-full" aria-hidden="true">
      {/* Drawn smaller here than on the catalogue page. A term has only so
          far it can travel before it leaves the frame, so if the dial fills
          the frame the words never get past its outer ring and read as
          sitting on the instrument rather than coming off it. */}
      <div className="absolute inset-0 scale-[0.74]">
        <CapabilityDial />
      </div>

      {terms && terms.length > 0 && (
        <div className="absolute inset-0">
          {terms.map((term, index) => {
            const angle = (index * GOLDEN_ANGLE * Math.PI) / 180;
            const jitter = hash(term);

            /* Every term leaves on its own heading and takes the same time to
               get there, so what varies between them is when they start —
               which is what makes it read as a steady emission rather than a
               pulse where everything moves at once. */
            /* A term's reach is measured to the end of the word, not to its
               anchor, so a long one has to stop sooner. Without this, whichever
               term happened to land pointing straight right decided whether the
               figure fitted — "Performance monitoring" ran 18px off the page at
               768 while every other service was fine, which is a layout that
               works by luck. The allowance is per character at the narrowest
               frame the figure is drawn in, and only bites in proportion to how
               horizontal the heading is. */
            const cos = Math.cos(angle);
            const reachX = Math.max(
              0.1,
              REACH_X - term.length * 0.008 * Math.abs(cos),
            );

            const toX = cos * reachX * 100;
            const toY = Math.sin(angle) * REACH_Y * 100;

            if (reduceMotion) {
              /* Held at the end of their travel: the same picture, minus the
                 movement. A reader who has asked for less motion should still
                 get the information the motion was carrying. */
              return (
                <span
                  key={term}
                  className="absolute whitespace-nowrap font-mono text-[11px] uppercase tracking-label text-white/45"
                  style={{
                    left: `${50 + toX}%`,
                    top: `${CENTRE_Y + toY}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {term}
                </span>
              );
            }

            /* One animated element: a full-size wrapper carrying the
               travel, with the word riding it. The word itself is a plain
               span, so nothing competes for its `transform`. */
            return (
              <div
                key={term}
                className="term-emit absolute inset-0"
                style={{
                  "--tx": `${toX}%`,
                  "--ty": `${toY}%`,
                  "--emit-duration": `${CYCLE}s`,
                  /* Spread across the cycle by index, nudged by the hash so
                     two adjacent terms never leave in lockstep. */
                  "--emit-delay": `${(index / terms.length) * CYCLE + jitter * 0.6}s`,
                }}
              >
                <span
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-label text-white/75"
                  style={{ top: `${CENTRE_Y}%` }}
                >
                  {term}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
