"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, Info } from "lucide-react";
import { ACCENTS } from "@/data/projects";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { ProjectNode } from "./project-node";
import { ProjectDrawer } from "./project-drawer";

const MODES = [
  { id: "plain", label: "Plain English" },
  { id: "tech", label: "Technical" },
];

/**
 * An interactive case study.
 *
 * Two things drive the whole page. The first is the mode: every heading,
 * every node and every drawer exists in a plain-English and a technical
 * reading of the same system, and the toggle swaps the words without moving a
 * single box. The second is direction: this is a pipeline, so the diagram is
 * revealed left to right in the order the data actually travels, and the
 * arrows between stages draw themselves as the connection is made. Nothing
 * here fades in for the sake of fading in — the entrance is the subject.
 *
 * Below `lg` the five stages stack vertically and the arrows rotate to point
 * down. A five-across pipeline on a phone would mean a horizontal scroller
 * inside a vertical page, which is the wrong gesture for reading a sequence.
 *
 * The engineer's original defaulted to the technical vocabulary; that is kept,
 * with the plain reading one clearly-labelled tap away.
 */
export function ProjectCaseStudy({ project }) {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState("tech");
  const [openId, setOpenId] = useState(null);
  const triggerRef = useRef(null);

  const handleOpen = useCallback((id, element) => {
    triggerRef.current = element;
    setOpenId(id);
  }, []);

  const handleClose = useCallback(() => setOpenId(null), []);

  const header = project.header[mode];
  const metrics = project.metrics[mode];

  /* One container per stage: on a phone each stage enters as it is scrolled
     to, and on a wide screen — where all five are visible at once — the
     delay ordered by column index recreates the same left-to-right reading. */
  const stageVariants = (columnIndex) => ({
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : STAGGER.normal,
        delayChildren: reduceMotion ? 0 : columnIndex * 0.08,
      },
    },
  });

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
    <>
      <section className="bg-ink px-x-default relative isolate overflow-hidden pb-16 pt-10 text-white sm:pb-20">
        <p className="text-signal font-mono text-[11px] uppercase tracking-label">
          Project {project.number} &middot; {project.discipline}
        </p>

        {/* Keyed on the mode so the retitle plays as a crossfade. The element
            stays one h1 in the accessibility tree either way. */}
        <h1
          key={mode}
          className="mt-5 max-w-[18ch] break-words text-display font-bold [font-stretch:96%]"
        >
          <motion.span
            data-motion-reveal=""
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.entrance, ease: EASE.power }}
            className="block"
          >
            {header.title}
            <span className="text-signal block">{header.titleAccent}</span>
          </motion.span>
        </h1>

        <motion.p
          key={`story-${mode}`}
          data-motion-reveal=""
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.entrance, ease: EASE.power }}
          className="project-lead mt-7 max-w-2xl text-base leading-relaxed text-white/70 [&_b]:font-semibold [&_b]:text-white"
          dangerouslySetInnerHTML={{ __html: header.story }}
        />

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/12 pt-8 sm:mt-12 lg:grid-cols-4">
          {metrics.map(([value, label], index) => (
            <div key={`${mode}-${index}`}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <motion.span
                  data-motion-reveal=""
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.entrance,
                    ease: EASE.power,
                    delay: reduceMotion ? 0 : index * 0.05,
                  }}
                  className="block"
                >
                  <span className="block break-words text-2xl font-bold leading-none [font-stretch:96%] sm:text-3xl">
                    {value}
                  </span>
                  <span className="mt-2.5 block text-[13px] leading-snug text-white/55">
                    {label}
                  </span>
                </motion.span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-label text-white/65"
            >
              {chip}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink px-x-default pb-y-default border-t border-white/10 text-white">
        <div className="flex flex-col gap-5 pt-10 sm:flex-row sm:items-center sm:justify-between">
          {/* The control names both readings rather than showing a switch,
              because a bare toggle would not say what the alternative is. */}
          {/* Equal-width segments on purpose. A shared-layout indicator that
              measures two different label widths was landing on the wrong
              segment on first paint, before the webfont settled. Halves that
              are equal by construction need no measurement: the marker moves
              exactly one of its own widths and can never be wrong. */}
          <div
            role="group"
            aria-label="Reading level"
            className="relative inline-flex w-full max-w-[320px] rounded-full border border-white/15 bg-white/[0.04] p-1 sm:w-auto"
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white"
              initial={false}
              animate={{ x: mode === "plain" ? "0%" : "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: DURATION.interaction, ease: EASE.power }
              }
            />

            {MODES.map((option) => {
              const selected = mode === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  aria-pressed={selected}
                  className={`focus-visible:ring-offset-ink relative flex-1 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:min-w-[130px] ${
                    selected ? "text-ink" : "text-white/65 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="flex items-center gap-2 text-[13px] text-white/55">
            <Info aria-hidden="true" className="h-4 w-4 shrink-0" />
            {header.hint}
          </p>
        </div>

        <div className="mt-10 flex flex-col lg:mt-12 lg:flex-row lg:items-stretch">
          {project.columns.map((column, columnIndex) => {
            const accent = ACCENTS[column.accent];
            return (
              <div key={column.key ?? columnIndex} className="contents">
                <motion.div
                  variants={stageVariants(columnIndex)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  style={{ "--accent": accent }}
                  className="min-w-0 flex-1"
                >
                  <motion.div variants={fade} data-motion-reveal="">
                    <h2
                      data-accent-text=""
                      className="text-[15px] font-bold leading-tight [font-stretch:96%]"
                      style={{ color: accent }}
                    >
                      {column.head[mode]}
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-snug text-white/50">
                      {column.sub[mode]}
                    </p>
                  </motion.div>

                  <div className="mt-5 space-y-3">
                    {column.nodes.map((id) => (
                      <ProjectNode
                        key={id}
                        id={id}
                        component={project.components[id]}
                        mode={mode}
                        active={openId === id}
                        onOpen={handleOpen}
                      />
                    ))}
                  </div>

                  {column.mini && (
                    <motion.p
                      variants={fade}
                      data-motion-reveal=""
                      className="mt-4 border-l-2 pl-3 text-[12.5px] leading-relaxed text-white/55 [&_b]:font-semibold [&_b]:text-white/85"
                      style={{ borderColor: accent }}
                      dangerouslySetInnerHTML={{ __html: column.mini[mode] }}
                    />
                  )}
                </motion.div>

                {columnIndex < project.columns.length - 1 && (
                  <FlowArrow reduceMotion={reduceMotion} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 border-t border-white/12 pt-10 sm:mt-20">
          <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
            {project.platform.label[mode]}
          </h2>
          <motion.div
            variants={stageVariants(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {project.platform.nodes.map((id) => (
              <ProjectNode
                key={id}
                id={id}
                component={project.components[id]}
                mode={mode}
                active={openId === id}
                onOpen={handleOpen}
              />
            ))}
          </motion.div>
        </div>

        {/* The diagram is a map; the reference below is the territory. A
            reader who wants everything at once should not have to open
            seventeen drawers to find out that it exists. */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <p className="font-mono text-[10px] uppercase tracking-label text-white/40">
            {header.foot}
          </p>

          <a
            href="#component-reference"
            className="focus-visible:ring-offset-ink group ease-power inline-flex items-center gap-2.5 text-[13px] font-semibold text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            Read every component in full
            <ArrowDown
              aria-hidden="true"
              className="ease-power h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </section>

      <ProjectDrawer
        component={openId ? project.components[openId] : null}
        mode={mode}
        open={Boolean(openId)}
        onClose={handleClose}
        returnRef={triggerRef}
      />
    </>
  );
}

/**
 * The connector between two stages.
 *
 * Drawn rather than faded: the stroke growing from one stage to the next is
 * the flow of data, which is the one thing this diagram exists to show. It
 * turns to point down below `lg`, where the stages stack.
 */
function FlowArrow({ reduceMotion }) {
  return (
    <motion.div
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="flex shrink-0 items-center justify-center py-5 text-white/30 lg:px-2 lg:py-0 lg:pt-1"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 rotate-90 lg:rotate-0"
      >
        <motion.path
          d="M5 12h13M13 6l6 6-6 6"
          variants={
            reduceMotion
              ? { hidden: { pathLength: 1 }, show: { pathLength: 1 } }
              : {
                  hidden: { pathLength: 0, opacity: 0 },
                  show: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      duration: DURATION.cinematic,
                      ease: EASE.power,
                    },
                  },
                }
          }
        />
      </svg>
    </motion.div>
  );
}
