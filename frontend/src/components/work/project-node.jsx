"use client";

import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { ACCENTS } from "@/data/projects";
import { DURATION, EASE } from "@/lib/motion";

/**
 * One component of the pipeline diagram.
 *
 * The box never moves when the vocabulary is switched — only the words inside
 * it change. That is deliberate and it is the whole argument of the page: the
 * architecture is one thing, and "Metadata Config" and "The instruction sheet"
 * are two ways of naming the same box. If the boxes re-laid out on toggle, the
 * reader would lose the thread and the equivalence would not land.
 *
 * The text is keyed on the mode so React remounts it and the entrance plays
 * again — a crossfade with a few pixels of lift, short enough to read as a
 * relabel rather than a transition.
 */
export function ProjectNode({ id, component, mode, active, onOpen }) {
  const reduceMotion = useReducedMotion();
  const copy = component.node[mode];
  const accent = ACCENTS[component.accent];

  return (
    <motion.button
      type="button"
      data-node={id}
      data-motion-reveal=""
      onClick={(event) => onOpen(id, event.currentTarget)}
      aria-expanded={active}
      variants={
        reduceMotion
          ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.entrance, ease: EASE.power },
              },
            }
      }
      style={{ "--accent": accent }}
      className={`focus-visible:ring-offset-ink group ease-power relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
        active
          ? "border-[color:var(--accent)] bg-white/[0.09]"
          : "border-white/12 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      {/* The accent rail is how a node declares which layer it belongs to.
          It is the only place colour is load-bearing, so it grows on hover
          and when open rather than relying on a hue change alone. */}
      <span
        aria-hidden="true"
        className={`ease-power absolute inset-y-0 left-0 w-[3px] transition-all duration-300 ${
          active ? "opacity-100" : "opacity-60 group-hover:opacity-100"
        }`}
        style={{ background: accent }}
      />

      <span
        aria-hidden="true"
        className={`ease-power absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 ${
          active
            ? "rotate-45 border-[color:var(--accent)] text-[color:var(--accent)]"
            : "border-white/15 text-white/45 group-hover:border-white/35 group-hover:text-white"
        } motion-reduce:transition-none`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>

      <span key={mode} className="block pr-8">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.interaction, ease: EASE.power }}
          className="block"
        >
          <span className="block break-words text-[15px] font-bold leading-tight text-white">
            {copy.t}
          </span>
          <span className="mt-1.5 block text-[13px] leading-snug text-white/60">
            {copy.d}
          </span>
          {copy.tag && (
            <span
              data-accent-text=""
              className="mt-3 inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-label"
              style={{ color: accent, background: `${accent}1f` }}
            >
              {copy.tag}
            </span>
          )}
        </motion.span>
      </span>
    </motion.button>
  );
}
