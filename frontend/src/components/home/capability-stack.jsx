"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/config/navigation";
import { getServiceBySlug, services } from "@/data/services";
import { deliveredProjects, projectHref } from "@/data/projects";
import { DURATION, EASE, STAGGER, rise, stagger } from "@/lib/motion";
import { Icon } from "@/components/ui/icon";
import { StackCard } from "@/components/ui/stack-card";
import { PlatformChips } from "@/components/ui/platform-chips";

/**
 * The catalogue, as a deck of four disciplines.
 *
 * Fourteen services is too many to grid without becoming a wall and too many
 * to list without burying everything past the third. Grouping them into the
 * four disciplines the navigation already uses gives four cards a reader can
 * actually finish, and puts the data work first because that is what this
 * firm leads with.
 *
 * Each card is two-sided: the discipline and what it is for on the left, the
 * services themselves on the right. That is the difference between a card
 * carrying a label and a card carrying information — a stack of near-empty
 * panels wastes the screen it just took over.
 *
 * A fifth card closes the deck with the whole catalogue and the route to it,
 * so nobody has to leave the section wondering what else there was.
 *
 * Cards pin while you read them, so every link stays still under the pointer.
 */

/** Clear of the fixed header, with room to breathe. */
const STACK_TOP = 80;
/** Each card pins slightly lower, leaving a strip of the one below on show. */
const STACK_STEP = 10;
/** Breathing room kept below the pinned deck before it counts as too tall. */
const FIT_MARGIN = 16;
/** Kept in step with the .stack-pin query in globals.css. */
/** Must match the .stack-pin query in globals.css exactly. */
const STACKS_ABOVE = "(min-height: 560px)";
/**
 * Every card is held to the same height.
 *
 * Without it the deck steps in and out as you scroll — a four-service card is
 * a row taller than a three-service one, and the closing catalogue card is
 * shorter than both. Stacked panels of different heights read as a mistake
 * rather than a deck, and the mismatched card is the one the eye lands on.
 */
/**
 * Every card is held to the same height, per breakpoint.
 *
 * A minimum only sets a floor — taller content still wins, and it did: the
 * cards measured 500, 500, 542, 505, 500, so the third stood 42px proud of
 * its neighbours and behaved differently in the stack. Each value clears the
 * tallest natural card at that width, which is what makes them actually equal
 * rather than merely bounded.
 */
/**
 * The two disciplines the firm leads with, on one card ahead of the grouped
 * catalogue.
 *
 * Together rather than separately: they are one practice, sold together and
 * usually delivered by the same people on the same engagement. Two cards
 * implied two offers and cost a whole extra pin in the stack for a
 * distinction the buyer does not make.
 *
 * They are removed from their group below rather than listed twice — the same
 * service appearing in two cards of one deck makes the deck look padded.
 */
const LEAD_SLUGS = ["data-engineering", "data-science"];

/* How many case studies the lead card names before deferring to /work.
   Bounded by the deck's shared height, not by how many exist. */
const LEAD_PROJECT_LIMIT = 2;
const LEAD_HEADING = "Data engineering & data science";
const LEAD_BLURB =
  "The platform underneath and the modelling on top, from the same team. Most engagements start with the pipelines and end with something predicting on them.";

/**
 * What an engagement actually leaves behind.
 *
 * Concrete deliverables rather than adjectives. A buyer comparing firms is
 * trying to work out what they will own at the end, and "modern, scalable
 * solutions" answers that for nobody — these are the four artefacts that
 * exist when the work is done.
 */
const LEAD_OUTPUTS = [
  "A warehouse with tested, versioned models",
  "Pipelines that announce their own failures",
  "Models serving in production, not sitting in notebooks",
  "Documentation and a team who can run it without us",
];

const CARD_MIN_H = "min-h-[330px] sm:min-h-[430px] lg:min-h-[530px]";

/**
 * What each discipline is for. Written from the services inside it rather
 * than as a tagline, so the sentence stays true if the catalogue changes.
 */
const PURPOSE = {
  "Data & intelligence":
    "The engineering underneath, and the reporting on top: pipelines, warehouses and models that make the numbers dependable enough to act on.",
  "AI & engineering":
    "Agents and models built to survive production rather than to demo well — grounded in your own data, with the brakes fitted.",
  "Build & ship":
    "New products, from first architecture through to something customers can use.",
  "Run & modernise":
    "Keeping what you already run healthy, and moving it forward without a rewrite.",
};

export function CapabilityStack() {
  const reduceMotion = useReducedMotion();
  const stackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  /* A second, earlier window purely for the cards arriving.
     Their entrance used whileInView, which is an observer this section does
     not need — it already has a scroll position in hand, and every time a
     reveal here has depended on an observer the section has ended up rendering
     blank when the observer did not fire. This runs from the deck appearing at
     the bottom of the viewport to it reaching the middle. */
  const { scrollYProgress: arrival } = useScroll({
    target: stackRef,
    offset: ["start end", "start 0.4"],
  });

  /* One decision for the whole deck, from the tallest card actually rendered.
     Measured rather than guessed at with a breakpoint, because how tall a card
     is depends on its content: the same deck fits at 1280x800 and overflows at
     1024x640. Re-measured on resize and whenever the content reflows. */
  const [canStack, setCanStack] = useState(false);
  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    const list = stackRef.current;
    if (!list) return;

    const check = () => {
      const items = Array.from(list.children);
      const tallest = items.reduce(
        (max, item) => Math.max(max, item.offsetHeight),
        0,
      );
      const lastTop = STACK_TOP + (items.length - 1) * STACK_STEP;
      setCanStack(
        window.matchMedia(STACKS_ABOVE).matches &&
          tallest + lastTop + FIT_MARGIN <= window.innerHeight,
      );

      /* When each card is actually covered, in the container's own progress.
         Card i+1 pins once it has travelled its own height less its offset,
         so that is the moment card i finishes receding. The recede begins a
         little before, while the next card is closing in — matching the
         motion to the event instead of to an arbitrary fraction. */
      const travel = list.offsetHeight - window.innerHeight;
      if (travel <= 0) {
        setRanges(
          items.map((_, i) => [i / items.length, (i + 1) / items.length]),
        );
        return;
      }
      const pitch = items[0]?.offsetHeight ?? tallest;
      setRanges(
        items.map((_, i) => {
          const coveredAt =
            (i + 1) * pitch - (STACK_TOP + (i + 1) * STACK_STEP);
          const finish = Math.min(1, Math.max(0, coveredAt / travel));
          const begin = Math.max(0, finish - (pitch * 0.75) / travel);
          return [begin, finish];
        }),
      );
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(list);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  const riseVariant = rise(reduceMotion, { y: 24 });
  /* Driven by the arrival window rather than by an observer, and staggered so
     the deck assembles rather than appearing all at once. */
  const cardOpacity = useTransform(arrival, [0.05, 0.45], [0, 1]);
  const cardY = useTransform(arrival, [0.05, 0.45], [40, 0]);
  const entrance = reduceMotion
    ? {}
    : { style: { opacity: cardOpacity, y: cardY } };

  /* The phases each engagement runs through, straight from the service data.
     This is the part a buyer actually wants: not what the service is called,
     but what working with us on it involves. One service documents no
     workflow, so the line is dropped rather than faked. */
  const lead = LEAD_SLUGS.map((slug) => {
    const service = getServiceBySlug(slug);
    if (!service) return null;
    return {
      ...service,
      href: `/services/${slug}`,
      phases: (service.workflow?.steps ?? [])
        .map((step) => step.title)
        .filter(Boolean),
      platforms: service.platforms ?? [],
    };
  }).filter(Boolean);

  const groups = serviceGroups.map((group) => {
    const entries = group.items
      .filter((item) => !LEAD_SLUGS.includes(item.slug))
      .map((item) => {
        const service = getServiceBySlug(item.slug);
        if (!service) return null;
        const phases = (service.workflow?.steps ?? [])
          .map((step) => step.title)
          .filter(Boolean);
        return { ...service, href: item.href, phases };
      })
      .filter(Boolean);

    const counts = entries.map((e) => e.phases.length).filter(Boolean);
    const range = counts.length
      ? Math.min(...counts) === Math.max(...counts)
        ? `${counts[0]} phases`
        : `${Math.min(...counts)}\u2013${Math.max(...counts)} phases`
      : null;

    return { ...group, entries, range };
  });

  // The lead cards, the discipline cards, and the closing catalogue card.
  const leadPlatforms = [
    ...new Set(lead.flatMap((service) => service.platforms)),
  ];

  /* Proof, on the card that makes the claim. A deck of capabilities is a list
     of things a firm says it can do; a named system running in production is
     the only line on it that can be checked. Pulled from the project data so
     the card cannot go stale when the case studies change. */
  const allLeadProjects = deliveredProjects.filter((project) =>
    LEAD_SLUGS.includes(project.serviceSlug),
  );

  /* Two, not all of them. Every card in this deck sits on one height floor,
     and each extra row pushes the lead card past it — which is the mismatch
     that made the deck look broken before. So the card shows the two most
     recent and links out for the rest, rather than silently dropping a
     project the way a bare cap did. */
  const leadProjects = allLeadProjects.slice(0, LEAD_PROJECT_LIMIT);
  const hasMoreProjects = allLeadProjects.length > leadProjects.length;

  const populated = groups.filter((group) => group.entries.length > 0);
  const leadCards = lead.length > 0 ? 1 : 0;
  const total = leadCards + populated.length + 1;

  return (
    <section className="bg-ink px-x-default border-b border-white/10 pb-y-seam pt-y-default text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={stagger(reduceMotion, { each: STAGGER.normal })}
      >
        <motion.div
          variants={riseVariant}
          className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
              {services.length} capabilities
            </p>
            <h2 className="mt-5 max-w-[16ch] break-words text-heading font-bold [font-stretch:96%]">
              Everything we build, in one place
            </h2>
          </div>
          <p className="max-w-full text-sm leading-relaxed text-white/60 sm:max-w-xs">
            Data work leads, and the rest of the catalogue supports it. Most
            engagements start with the platform and end up touching several of
            the disciplines below it.
          </p>
        </motion.div>
      </motion.div>

      {/* Outside the motion wrapper on purpose. Motion writes transforms and
          will-change onto the elements it animates, and a transformed ancestor
          becomes the containing block for anything sticky inside it — the
          cards would pin to that wrapper rather than to the viewport, which
          for a box the height of its own content does nothing whatsoever. */}
      <ul
        ref={stackRef}
        /* Enough to let the finished deck be read, and no more. This was
           20vh, which left most of a screen of empty dark between this
           section and the next — long enough that the section after it had
           played its whole entrance before the reader arrived. */
        className="relative mt-12 pb-[5vh] lg:mt-16 lg:pb-[6vh]"
      >
        {/* One lead card for both disciplines. Each service keeps its own
            row, its own link and its own phases, so nothing is lost by
            combining them — but the deck states one practice rather than two
            competing offers, and the reader pins one card instead of two. */}
        {lead.length > 0 && (
          <StackCard
            as="li"
            index={0}
            total={total}
            top={STACK_TOP}
            progress={scrollYProgress}
            range={ranges[0]}
            enabled={canStack}
            className="pb-4"
          >
            <motion.div data-motion-reveal="" {...entrance}>
              <div
                className={`bg-ink-raised grid content-start gap-8 rounded-3xl border border-white/20 p-6 shadow-[0_-14px_40px_-28px_rgba(0,0,0,0.9)] sm:grid-cols-12 sm:gap-8 sm:p-7 lg:gap-10 lg:p-8 ${CARD_MIN_H}`}
              >
                <div className="sm:col-span-5 lg:col-span-4">
                  <p className="text-signal font-mono text-[10px] uppercase tracking-label">
                    What we lead with
                  </p>
                  <h3 className="mt-3 break-words text-display-sm font-bold [font-stretch:96%]">
                    {LEAD_HEADING}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/65 sm:mt-4 sm:text-sm">
                    {LEAD_BLURB}
                  </p>
                  <PlatformChips
                    slugs={leadPlatforms}
                    className="mt-6 hidden sm:block"
                  />

                  {leadProjects.length > 0 && (
                    <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.04] p-4">
                      {/* The link rides the label row rather than sitting
                          under the list. Every card in this deck shares one
                          height, and an extra row here pushed the lead card
                          22px past it at 1440 — visibly taller than its
                          neighbours. On a row that already exists it costs
                          nothing. */}
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                          {leadProjects.length === 1
                            ? "Recent project"
                            : "Recent projects"}
                        </p>

                        {hasMoreProjects && (
                          <Link
                            href="/work"
                            className="focus-visible:ring-offset-ink-raised group/all ease-power flex shrink-0 items-center gap-1.5 rounded-sm font-mono text-[10px] uppercase tracking-label text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                          >
                            View all {allLeadProjects.length}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="ease-power h-3 w-3 transition-transform duration-300 group-hover/all:-translate-y-0.5 group-hover/all:translate-x-0.5 motion-reduce:transition-none"
                            />
                          </Link>
                        )}
                      </div>

                      <ul className="mt-1">
                        {leadProjects.map((project) => (
                          <li
                            key={project.slug}
                            className="border-t border-white/10 pt-3 first:border-t-0 [&+li]:mt-3"
                          >
                            <Link
                              href={projectHref(project)}
                              className="focus-visible:ring-offset-ink-raised group/project ease-power flex items-start justify-between gap-3 rounded-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                            >
                              <span className="min-w-0">
                                <span className="block break-words text-[13.5px] font-bold leading-tight transition-colors duration-300 group-hover/project:text-white">
                                  {project.cardName}
                                </span>
                                {/* The project's headline figure, shown as the
                                    pair it is rather than glued into a
                                    sentence. Lower-casing the label and running
                                    the two together only reads for one of them
                                    — the others came out as "Batch by batch how
                                    sap data is fetched" and "Who might leave
                                    what it predicts".

                                    Supporting evidence, not the link, so it is
                                    dropped on the narrowest screens where every
                                    row makes this card taller than its
                                    neighbours in the deck. Both project names
                                    still appear and both still lead to the
                                    write-up. */}
                                {project.metrics && (
                                  <span className="mt-1 hidden text-[12.5px] leading-snug text-white/60 sm:block">
                                    {project.metrics.plain[0][0]}
                                    {" \u2014 "}
                                    {project.metrics.plain[0][1]}
                                  </span>
                                )}
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="ease-power mt-0.5 h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5 group-hover/project:text-white motion-reduce:transition-none"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-7 lg:col-span-8">
                  <ul>
                    {lead.map((service) => (
                      <li
                        key={service.slug}
                        className="border-t border-white/10 py-4 first:border-t-0 first:pt-0"
                      >
                        <Link
                          href={service.href}
                          className="focus-visible:ring-offset-ink-raised group/lead ease-power flex items-start gap-4 rounded-sm transition-[padding] duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 motion-reduce:hover:pl-0"
                        >
                          <span className="text-signal mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                            <Icon name={service.icon} className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-base font-bold leading-tight">
                              {service.shortTitle}
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-white/65">
                              {service.overview.heading}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="ease-power mt-1 h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover/lead:-translate-y-0.5 group-hover/lead:translate-x-0.5 group-hover/lead:text-white motion-reduce:transition-none"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                      What you end up with
                    </p>
                    <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                      {LEAD_OUTPUTS.map((output) => (
                        <li
                          key={output}
                          className="flex items-start gap-2 text-[13px] leading-snug text-white/70"
                        >
                          <span aria-hidden="true" className="text-signal mt-1">
                            &#8226;
                          </span>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </StackCard>
        )}

        {populated.map((group, index) => (
          <StackCard
            key={group.label}
            /* Offset past the lead cards. Using the map index alone gave the
               third card a z-index of 1, the same as the first — so it stacked
               underneath the cards it is supposed to cover. */
            index={leadCards + index}
            as="li"
            total={total}
            top={STACK_TOP + (leadCards + index) * STACK_STEP}
            progress={scrollYProgress}
            range={ranges[leadCards + index]}
            enabled={canStack}
            className="pb-4"
          >
            <motion.div data-motion-reveal="" {...entrance}>
              <div
                className={`bg-ink-raised grid content-start gap-8 rounded-3xl border border-white/12 p-6 shadow-[0_-14px_40px_-28px_rgba(0,0,0,0.9)] sm:grid-cols-12 sm:gap-8 sm:p-7 lg:gap-10 lg:p-8 ${CARD_MIN_H}`}
              >
                <div className="sm:col-span-5 lg:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                    {group.entries.length}{" "}
                    {group.entries.length === 1 ? "service" : "services"}
                  </p>
                  <h3 className="mt-3 break-words text-display-sm font-bold [font-stretch:96%]">
                    {group.label}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-white/60 sm:mt-4 sm:line-clamp-none sm:text-sm">
                    {PURPOSE[group.label] ?? ""}
                  </p>
                  {group.range && (
                    <p className="mt-4 hidden border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-label text-white/45 sm:mt-6 sm:block">
                      Typical engagement
                      <span className="mt-1 block text-white/70">
                        {group.range}, discovery to handover
                      </span>
                    </p>
                  )}
                </div>

                <ul className="sm:col-span-7 lg:col-span-8">
                  {group.entries.map((service) => (
                    <li
                      key={service.slug}
                      className="border-t border-white/10 first:border-t-0"
                    >
                      <Link
                        href={service.href}
                        className="ease-power focus-visible:ring-offset-ink-raised group/row flex items-start gap-3 py-2.5 sm:gap-4 sm:py-4 transition-[padding] duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 motion-reduce:hover:pl-0"
                      >
                        <span className="text-signal mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-9 sm:w-9">
                          <Icon name={service.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block break-words text-base font-bold leading-tight transition-colors duration-300 group-hover/row:text-white">
                            {service.shortTitle}
                          </span>
                          <span className="mt-1.5 hidden text-sm leading-snug text-white/60 sm:block">
                            {service.overview.heading}
                          </span>
                          {service.phases.length > 0 && (
                            <span className="mt-3 hidden flex-wrap gap-x-2 gap-y-1.5 sm:flex">
                              {service.phases.slice(0, 2).map((phase) => (
                                <span
                                  key={phase}
                                  className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white/50 transition-colors duration-300 group-hover/row:border-white/25 group-hover/row:text-white/70"
                                >
                                  {phase}
                                </span>
                              ))}
                              {service.phases.length > 2 && (
                                <span className="self-center font-mono text-[10px] uppercase tracking-[0.08em] text-white/35">
                                  +{service.phases.length - 2} more
                                </span>
                              )}
                            </span>
                          )}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="ease-power mt-1 h-4 w-4 shrink-0 text-white/45 transition-all duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-white motion-reduce:transition-none"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </StackCard>
        ))}

        {/* The deck closes on the full catalogue, so the section answers
              "what else?" before the reader has to go looking. */}
        <StackCard
          as="li"
          index={leadCards + populated.length}
          total={total}
          top={STACK_TOP + groups.length * STACK_STEP}
          progress={scrollYProgress}
          range={ranges[leadCards + populated.length]}
          enabled={canStack}
          className="pb-4"
        >
          <motion.div data-motion-reveal="" {...entrance}>
            <div
              className={`bg-ink-high grid content-start gap-8 rounded-3xl border border-white/20 p-6 sm:grid-cols-12 sm:gap-8 sm:p-7 lg:gap-10 lg:p-8 ${CARD_MIN_H}`}
            >
              <div className="sm:col-span-5 lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  The whole catalogue
                </p>
                <h3 className="mt-3 break-words text-display-sm font-bold [font-stretch:96%]">
                  All {services.length} services
                </h3>
                <Link
                  href="/services"
                  className="focus-visible:ring-offset-ink-high group mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-colors duration-300 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  View all services
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ease-power h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </div>

              <ul className="grid gap-x-8 gap-y-1 sm:col-span-7 sm:grid-cols-2 lg:col-span-8">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="ease-power focus-visible:ring-offset-ink-high group/item flex items-center justify-between gap-3 border-b border-white/10 py-2.5 text-sm transition-[padding] duration-300 hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 motion-reduce:hover:pl-0"
                    >
                      <span className="min-w-0 break-words text-white/75 transition-colors duration-300 group-hover/item:text-white">
                        {service.shortTitle}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ease-power h-3.5 w-3.5 shrink-0 text-white/35 transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-white motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </StackCard>
      </ul>
    </section>
  );
}
