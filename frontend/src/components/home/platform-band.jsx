"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { platforms } from "@/data/platforms";
import { platformGroups } from "@/config/navigation";
import { STAGGER, rise, stagger } from "@/lib/motion";
import { PlatformWormhole } from "./platform-wormhole";
import { EmergingPlate } from "./emerging-plate";

/**
 * The platforms, as a relief wall.
 *
 * A third distinct idiom, on purpose. The hero pushes through a tunnel and
 * the capability deck pins and stacks; here the wall assembles itself. A
 * portal opens at the centre of the frame and the plates come out of it one
 * after another, each flying to the place the grid has already reserved for
 * it, then the portal closes behind them.
 *
 * It is the right gesture for the argument. The section says these platforms
 * are one practice rather than seven unrelated badges, and watching them
 * issue from a single source says that before the copy does. It also keeps
 * the peer relationship intact: they all come from the same place, and none
 * of them arrives first by importance — only by sequence.
 *
 * Once landed the wall behaves as one rigid panel that turns with the
 * pointer, and the plates sit at stepped depths so the surface has relief.
 *
 * Why a wall and not another deck: the claim here is vendor-neutrality. A
 * stack imposes an order, and a carousel promotes whatever sits in the middle.
 * A wall says none of these outranks the others, which is the argument the
 * section exists to make. It also means the whole grid moves as one object,
 * so no platform gets its own entrance.
 *
 * It replaced a marquee, and that was a usability decision rather than a
 * visual one: these names are links, and a marquee asks you to click a moving
 * target — worse on touch, where nothing pauses it.
 *
 * Depth comes from one light. A single glow tracks the pointer across the
 * whole wall and the plates catch it as it passes, so the group reads as one
 * lit surface instead of eight cards each doing their own thing.
 *
 * On hover a plate rises toward you in Z rather than sliding up in Y. Inside
 * the shared perspective that is real depth: the plate grows very slightly as
 * it approaches, which is what makes it read as coming forward.
 */

/** slug -> the group it already belongs to in the navigation. */
const CATEGORY = new Map(
  platformGroups.flatMap((group) =>
    group.items.map((item) => [item.slug, group.label]),
  ),
);

/**
 * Resting depth per plate, stepping back across each row so the wall reads as
 * corrugated rather than flat. A regular pattern, not noise — the eye reads
 * a rhythm as deliberate and random offsets as a mistake.
 */
const RELIEF = [0, -18, -36, -54];

export function PlatformBand() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const wallRef = useRef(null);

  /* Tracked against the wall, not the section, and over a deliberately late
     window.
     Measuring the section from "start end" begins the moment its very top
     edge touches the bottom of the viewport — which, with a tall section above
     it, happens while the reader is still scrolling through that one. The
     plates finished assembling before anyone arrived to watch. Anchoring to
     the wall and starting at 0.85 of the viewport means the portal opens as
     the wall itself appears and closes as it settles into view. */
  const { scrollYProgress } = useScroll({
    target: wallRef,
    offset: ["start 0.92", "start 0.18"],
  });
  /* The portal does the entrance now, so the panel itself only settles the
     last few degrees — two competing arrivals would fight each other. */
  const hinge = useTransform(scrollYProgress, [0, 1], [7, 0]);

  // Pointer turns the panel; motion values, so tracking never renders.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const turnY = useSpring(pointerX, { stiffness: 140, damping: 22, mass: 0.7 });
  const turnX = useSpring(pointerY, { stiffness: 140, damping: 22, mass: 0.7 });
  const tiltX = useTransform([hinge, turnX], ([h, t]) => h + t);

  const wall = useMotionTemplate`perspective(1300px) rotateX(${tiltX}deg) rotateY(${turnY}deg)`;

  const lightX = useMotionValue(-1000);
  const lightY = useMotionValue(-1000);
  const glowX = useSpring(lightX, { stiffness: 220, damping: 30, mass: 0.6 });
  const glowY = useSpring(lightY, { stiffness: 220, damping: 30, mass: 0.6 });
  const light = useMotionTemplate`radial-gradient(460px circle at ${glowX}px ${glowY}px, rgba(77,225,255,0.20), rgba(14,89,242,0.12) 40%, transparent 70%)`;

  const onPointerMove = (event) => {
    if (reduceMotion || !wallRef.current) return;
    const rect = wallRef.current.getBoundingClientRect();
    lightX.set(event.clientX - rect.left);
    lightY.set(event.clientY - rect.top);
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
    pointerY.set(-((event.clientY - rect.top) / rect.height - 0.5) * 5);
  };

  const resetPointer = () => {
    lightX.set(-1000);
    lightY.set(-1000);
    pointerX.set(0);
    pointerY.set(0);
  };

  /* Where each plate sits relative to the middle of the wall, so it can be
     flown in from exactly there. Measured, because the grid decides the
     positions and they change with the column count. */
  const [offsets, setOffsets] = useState([]);

  useEffect(() => {
    const wallEl = wallRef.current;
    if (!wallEl) return;
    const measure = () => {
      const box = wallEl.getBoundingClientRect();
      const cx = box.width / 2;
      const cy = box.height / 2;
      setOffsets(
        Array.from(wallEl.querySelectorAll("[data-plate]")).map((el) => {
          const r = el.getBoundingClientRect();
          return {
            dx: cx - (r.left - box.left + r.width / 2),
            dy: cy - (r.top - box.top + r.height / 2),
          };
        }),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wallEl);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Eight plates converging on one point needs room. In a single column they
     spend most of the flight piled on each other — which is what makes the
     Cloud card look like it is sitting on top of Microsoft. Narrow screens get
     a plain rise instead, and the portal stays shut. */
  const [converge, setConverge] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setConverge(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const riseVariant = rise(reduceMotion, { y: 24 });

  /* Two compositions, not one shrunk.
     A plate holds a category, a name and an arrow. At 320px that is 136px of
     mostly padding carrying no more than a row would — eight of them cost
     roughly 1,200px of scroll for a list of eight names. Below sm the same
     content is a compact index: name, category, arrow, separated by rules.
     Same information, a third of the height, and it reads as something to
     scan rather than eight things to consider one at a time. */
  const plateClass =
    "ease-power focus-visible:ring-offset-ink group/plate flex min-h-[58px] w-full flex-row items-center gap-3 border-0 border-b border-white/12 px-0 py-3 transition-[transform,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 " +
    "sm:h-full sm:min-h-[136px] sm:flex-col sm:items-stretch sm:justify-between sm:gap-6 sm:rounded-2xl sm:border sm:p-5 sm:[transform-style:preserve-3d] sm:hover:translate-z-6";

  return (
    <motion.section
      ref={sectionRef}
      id="platforms"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={stagger(reduceMotion, { each: STAGGER.normal })}
      className="bg-ink px-x-default border-b border-white/10 py-y-seam text-white"
    >
      <motion.div
        variants={riseVariant}
        data-motion-reveal=""
        className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
            Vendor-neutral by design
          </p>
          <h2 className="mt-5 max-w-[20ch] break-words text-heading font-bold [font-stretch:96%]">
            We work in the platforms you already run
          </h2>
        </div>
        <p className="max-w-full text-sm leading-relaxed text-white/60 sm:max-w-xs">
          No reseller targets and no house preference. The right platform is
          whichever one your business is already standing on.
        </p>
      </motion.div>

      <div
        ref={wallRef}
        onPointerMove={onPointerMove}
        onPointerLeave={resetPointer}
        className="relative mt-12 lg:mt-16"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ background: light }}
            /* inset-0, not a negative inset. Reaching outside the wall pushed the
               document wider than the viewport and the page scrolled sideways;
               the radius does the spreading instead. */
            className="pointer-events-none absolute inset-0 rounded-[36px] opacity-0 transition-opacity duration-500 group-hover/wall:opacity-100"
          />
        )}

        {converge && <PlatformWormhole progress={scrollYProgress} />}

        <motion.ul
          style={
            reduceMotion
              ? undefined
              : {
                  transform: wall,
                  transformOrigin: "50% 100%",
                  transformStyle: "preserve-3d",
                }
          }
          className="group/wall relative grid gap-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4"
        >
          {platforms.map((platform, index) => (
            <EmergingPlate
              key={platform.slug}
              index={index}
              total={platforms.length + 1}
              offset={offsets[index]}
              relief={RELIEF[index % RELIEF.length]}
              progress={scrollYProgress}
              converge={converge}
            >
              <Link
                href={`/platforms/${platform.slug}`}
                className={`${plateClass} border-white/12 bg-white/[0.04] hover:border-white/35 hover:bg-white/[0.09]`}
              >
                <span className="w-[5.5rem] shrink-0 font-mono text-[10px] uppercase leading-tight tracking-label text-white/55 transition-colors duration-300 group-hover/plate:text-white sm:w-auto">
                  {CATEGORY.get(platform.slug) ?? "Platform"}
                </span>
                <span className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:items-end">
                  <span className="min-w-0 break-words text-[15px] font-bold leading-tight [font-stretch:96%] sm:text-display-sm">
                    {platform.navLabel}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ease-power h-4 w-4 shrink-0 translate-y-0.5 text-white/50 transition-all duration-300 group-hover/plate:-translate-y-0 group-hover/plate:translate-x-0.5 group-hover/plate:text-white motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </EmergingPlate>
          ))}

          {/* Seven plates leave a four-column wall ragged. The eighth cell is
              the route to the full list — which is where someone who did not
              find their platform needs to go anyway, so the layout problem and
              the UX one share a solution. It comes out of the portal last. */}
          <EmergingPlate
            index={platforms.length}
            total={platforms.length + 1}
            offset={offsets[platforms.length]}
            relief={RELIEF[platforms.length % RELIEF.length]}
            progress={scrollYProgress}
            converge={converge}
          >
            <Link
              href="/platforms"
              className={`${plateClass} border-white/25 bg-white/[0.09] hover:bg-white/[0.15]`}
            >
              <span className="w-[5.5rem] shrink-0 font-mono text-[10px] uppercase leading-tight tracking-label text-white/55 sm:w-auto">
                Everything
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:items-end">
                <span className="min-w-0 break-words text-[15px] font-bold leading-tight [font-stretch:96%] sm:text-display-sm">
                  All {platforms.length} platforms
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="ease-power h-4 w-4 shrink-0 translate-y-0.5 transition-transform duration-300 group-hover/plate:-translate-y-0 group-hover/plate:translate-x-0.5 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </EmergingPlate>
        </motion.ul>
      </div>
    </motion.section>
  );
}
