"use client";

import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { ACCENTS } from "@/data/projects";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { ProjectNode } from "./project-node";

/**
 * What actually runs, in what order.
 *
 * The architecture board answers "what is this made of"; this answers "what
 * happens, and when". They are genuinely different questions about the same
 * system, which is why the engineer drew two boards rather than one crowded
 * diagram — and why they are a switch here rather than two sections stacked.
 *
 * Lanes, because the three schedules are independent: scoring runs nightly,
 * training runs occasionally, monitoring runs continuously. Stacking them in
 * one line would imply an order between lanes that does not exist.
 *
 * Steps are numbered across all lanes, not within them. The numbering is the
 * argument — the loop at the end points back to step 1, and that only reads
 * if 1 and 13 are on one scale.
 */
export function ProjectWorkflow({
  workflow,
  components,
  mode,
  openId,
  onOpen,
}) {
  const reduceMotion = useReducedMotion();
  const intro = workflow.intro[mode];

  /* Numbered continuously across lanes, so the loop back to step 1 lands. */
  let stepNumber = 0;

  const fade = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.entrance, ease: EASE.power },
        },
      };

  return (
    <div>
      <h2 className="break-words text-display-sm font-bold [font-stretch:96%]">
        {intro.title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
        {intro.sub}
      </p>

      <div className="mt-10 border-t border-white/12">
        {workflow.lanes.map((lane, laneIndex) => {
          const accent = ACCENTS[lane.accent];
          return (
            <motion.div
              key={lane.label.tech}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : STAGGER.tight,
                    delayChildren: reduceMotion ? 0 : laneIndex * 0.06,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              style={{ "--accent": accent }}
              className="grid gap-5 border-b border-white/12 py-8 lg:grid-cols-12 lg:gap-8"
            >
              <motion.div
                variants={fade}
                data-motion-reveal=""
                className="lg:col-span-3"
              >
                <h3
                  className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-label"
                  style={{ color: accent }}
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ background: accent }}
                  />
                  {lane.label[mode]}
                </h3>
                <p className="mt-2 text-[13px] leading-snug text-white/55">
                  {lane.sub[mode]}
                </p>
              </motion.div>

              {/* Wrapped, not scrolled. A single row is the truer picture of a
                  sequence, but seven steps do not fit one at any width — and a
                  row that runs off the edge shows a card sliced in half, which
                  reads as broken rather than as scrollable. The numbers carry
                  the order, so wrapping loses nothing and hides nothing. */}
              <div className="lg:col-span-9">
                <ol className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
                  {lane.steps.map((id) => {
                    stepNumber += 1;
                    return (
                      <li key={id}>
                        <ProjectNode
                          id={id}
                          component={components[id]}
                          mode={mode}
                          active={openId === id}
                          onOpen={onOpen}
                          step={stepNumber}
                        />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* The edge that makes this a loop rather than a line. */}
      <div
        style={{ "--accent": ACCENTS.plat }}
        className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-[color:var(--accent)] bg-white/[0.03] p-5"
      >
        <RotateCcw
          aria-hidden="true"
          className="mt-0.5 h-5 w-5 shrink-0"
          style={{ color: ACCENTS.plat }}
        />
        <p
          className="text-[13.5px] leading-relaxed text-white/70 [&_b]:font-semibold [&_b]:text-white"
          dangerouslySetInnerHTML={{ __html: workflow.loop[mode] }}
        />
      </div>
    </div>
  );
}
