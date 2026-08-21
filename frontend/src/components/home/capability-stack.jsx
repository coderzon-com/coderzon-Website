"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups } from "@/config/navigation";
import { getServiceBySlug, services } from "@/data/services";
import { DURATION, EASE, STAGGER, rise, stagger } from "@/lib/motion";
import { Icon } from "@/components/ui/icon";
import { StackCard } from "@/components/ui/stack-card";

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
const CARD_MIN_H = "min-h-[330px] sm:min-h-[430px] lg:min-h-[530px]";

/**
 * What each discipline is for. Written from the services inside it rather
 * than as a tagline, so the sentence stays true if the catalogue changes.
 */
const PURPOSE = {
  "Data & intelligence":
    "Turning data you already hold into decisions people act on — pipelines, warehouses, and the reporting that sits on top.",
  "AI & engineering":
    "Models and connected systems built to survive production, not to demo well.",
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
  /* Self-contained, not inherited. A card that depends on a variant coming
     down from an ancestor is one remount away from being stuck at opacity 0,
     and it cannot recover because the ancestor's whileInView only fires once. */
  const entrance = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-8% 0px" },
        transition: { duration: DURATION.entrance, ease: EASE.power },
      };

  /* The phases each engagement runs through, straight from the service data.
     This is the part a buyer actually wants: not what the service is called,
     but what working with us on it involves. One service documents no
     workflow, so the line is dropped rather than faked. */
  const groups = serviceGroups.map((group) => {
    const entries = group.items
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

  // Four discipline cards plus the closing catalogue card.
  const total = groups.length + 1;

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
            Four disciplines, one team. Most engagements start in the first one
            and end up touching all four.
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
        {groups.map((group, index) => (
          <StackCard
            key={group.label}
            as="li"
            index={index}
            total={total}
            top={STACK_TOP + index * STACK_STEP}
            progress={scrollYProgress}
            range={ranges[index]}
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
          index={groups.length}
          total={total}
          top={STACK_TOP + groups.length * STACK_STEP}
          progress={scrollYProgress}
          range={ranges[groups.length]}
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
