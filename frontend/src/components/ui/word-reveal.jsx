"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

/**
 * A headline whose words pivot up into place.
 *
 * Each word sits in a clipped box and rotates in on the X axis from below, so
 * it reads as type swinging up on a hinge rather than sliding. Against a flat
 * background a fade would barely register; the rotation is what gives the
 * claim physical presence.
 *
 * Words, not characters. Per-character staggering on a headline this size
 * produces a typewriter effect that delays comprehension — the reader ends up
 * waiting for the sentence instead of reading it.
 *
 * The text stays real text, so it remains selectable and is announced once,
 * in order. Only the wrappers are added.
 *
 * Lines carry their own class, so a headline can change size partway through
 * without being split into two elements that a screen reader would read as
 * two separate headings.
 */
export function WordReveal({ lines, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  const word = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { y: "105%", rotateX: -55, opacity: 0 },
        show: {
          y: "0%",
          rotateX: 0,
          opacity: 1,
          transition: { duration: DURATION.cinematic, ease: EASE.power },
        },
      };

  return (
    <span
      className={className}
      style={reduceMotion ? undefined : { perspective: 800 }}
    >
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          <motion.span
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : STAGGER.tight,
                  delayChildren: reduceMotion ? 0 : delay + lineIndex * 0.06,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className={`block ${line.className ?? ""}`}
          >
            {line.parts.map((part, partIndex) => (
              <Fragment key={partIndex}>
                {/* Clipping happens on the outer span; the inner one moves. */}
                <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    variants={word}
                    data-motion-reveal=""
                    style={
                      reduceMotion
                        ? undefined
                        : {
                            transformOrigin: "50% 100%",
                            transformStyle: "preserve-3d",
                          }
                    }
                    className={`inline-block ${part.accent ? "text-signal" : ""}`}
                  >
                    {part.text}
                  </motion.span>
                </span>
                {/* The space belongs between the clipped boxes, never inside
                  one: a trailing space at the end of an inline-block is
                  trimmed by line layout, and the words run together. */}
                {partIndex < line.parts.length - 1 ? " " : null}
              </Fragment>
            ))}
          </motion.span>
          {/* The lines are separate block boxes, so this space is collapsed on
            screen — but without it the accessible text runs the last word of
            one line into the first word of the next. */}
          {lineIndex < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
