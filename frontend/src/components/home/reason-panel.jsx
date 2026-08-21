"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { Icon } from "@/components/ui/icon";

/**
 * One reason, hinged to the spine.
 *
 * The panel opens on its inner edge as the line reaches it — a page swinging
 * out from a binding. That gesture is the argument: these are not four
 * separate boasts, they are four faces of one thing, and each is physically
 * attached to the thread running through the section.
 *
 * Driven by the list's scroll position rather than whileInView. An observer
 * that never fires leaves a panel stuck shut at opacity 0, and everything on
 * this page that reveals now runs off a scroll value that is already in hand.
 */
export function ReasonPanel({ reason, index, total, progress }) {
  const reduceMotion = useReducedMotion();

  /* Each panel opens as the line passes its own node, with the windows
     overlapping so the section reads as one continuous unfolding. */
  const span = 0.55;
  const step = total > 1 ? (1 - span) / (total - 1) : 0;
  const start = index * step;
  const end = start + span;

  /* Positive, and this sign is not cosmetic.
     Rotated about its left edge, a negative angle swings the panel's far edge
     toward the viewer — and under perspective a near edge projects outward,
     so a full-width panel threw its right edge to 8365px and the document
     scrolled sideways by a factor of four. Opening away from the viewer
     projects inward instead, which can never widen the page. */
  const rotateY = useTransform(progress, [start, end], [30, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-26, 0]);
  // The node fills as the line arrives, a beat before its panel opens.
  const nodeScale = useTransform(progress, [start, start + 0.12], [0.4, 1]);
  const nodeOpacity = useTransform(progress, [start, start + 0.12], [0.25, 1]);

  const still = reduceMotion;

  return (
    <li className="relative pb-10 pl-12 last:pb-0 sm:pb-14 sm:pl-20">
      {/* The node sits on the spine, in flow — no measuring, so it stays put
          at every width and however the copy wraps. */}
      {/* The centring translate has to live in Motion's style, not in a
          class. Motion owns `transform` on any element it animates, so a
          Tailwind -translate-x-1/2 sitting beside an animated scale is
          discarded without warning — which left every node exactly half its
          own width to the right of the line it belongs on. */}
      <motion.span
        aria-hidden="true"
        style={
          still
            ? undefined
            : { x: "-50%", scale: nodeScale, opacity: nodeOpacity }
        }
        className={`bg-signal absolute left-3 top-6 h-2.5 w-2.5 rounded-full shadow-[0_0_14px_2px_rgba(77,225,255,0.55)] sm:left-5 ${
          still ? "-translate-x-1/2" : ""
        }`}
      />

      <motion.article
        data-motion-reveal=""
        style={
          still
            ? undefined
            : {
                x,
                opacity,
                rotateY,
                transformOrigin: "0% 50%",
                transformPerspective: 1200,
              }
        }
        className="bg-ink-raised rounded-2xl border border-white/12 p-6 transition-colors duration-300 hover:border-white/30 sm:p-8"
      >
        <div className="flex items-center gap-3">
          <span className="text-signal flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Icon name={reason.icon} className="h-4 w-4" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
            {reason.tag}
          </p>
        </div>
        <h3 className="mt-5 break-words text-display-sm font-bold [font-stretch:96%]">
          {reason.title}
        </h3>
        <p className="mt-3 leading-relaxed text-white/65">
          {reason.description}
        </p>
      </motion.article>
    </li>
  );
}
