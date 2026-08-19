"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { hero } from "@/data/home-content";
import { serviceGroups } from "@/config/navigation";

/**
 * Homepage hero.
 *
 * The console surface from the header carries straight through, so the top of
 * the page is one continuous instrument rather than a dark bar sitting on a
 * light banner.
 *
 * The motion is one idea, not a pile of effects: the section boots, then it
 * runs. Boot is the headline wiping up line by line while the orbit draws
 * itself. Running is a slow scan passing down the grid, the orbit turning,
 * and the artwork leaning toward the pointer. All of it stops under
 * prefers-reduced-motion.
 */
export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Pointer parallax. Motion values are used directly so moving the mouse
  // never triggers a React render.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const artX = useTransform(springX, [-0.5, 0.5], [18, -18]);
  const artY = useTransform(springY, [-0.5, 0.5], [14, -14]);

  const handlePointerMove = (event) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Headline lines wipe up from behind their own edge.
  const wipe = reduceMotion
    ? { hidden: { y: 0 }, show: { y: 0 } }
    : {
        hidden: { y: "110%" },
        show: {
          y: 0,
          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const rise = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const sequence = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative overflow-hidden border-b border-console-line bg-console text-white"
    >
      {/* Blueprint grid, masked away from the artwork so the two technical
          patterns never overlap. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to right, #000 0%, #000 42%, transparent 72%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 0%, #000 42%, transparent 72%)",
        }}
      />

      {/* The scan: the system polling itself. One slow pass, then a pause. */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ y: "-30%" }}
          animate={{ y: "130%" }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "linear",
            delay: 1.2,
          }}
          className="pointer-events-none absolute inset-x-0 h-48 bg-gradient-to-b from-transparent via-brand/[0.14] to-transparent"
        />
      )}

      <motion.div
        variants={sequence}
        initial="hidden"
        animate="show"
        className="container relative"
      >
        <div className="grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-7">
            <motion.div
              variants={rise}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-label text-white/70"
            >
              {hero.spec.map((entry, index) => (
                <span key={entry} className="flex items-center gap-3">
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-px w-6 bg-console-line"
                    />
                  )}
                  {entry}
                </span>
              ))}
            </motion.div>

            <h1 className="mt-6 text-[34px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[58px] xl:text-[64px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={wipe} className="block text-white">
                  {hero.titleStart}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  variants={wipe}
                  className="relative inline-block text-brand-light"
                >
                  {hero.titleHighlight}
                  <motion.span
                    aria-hidden="true"
                    initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: reduceMotion ? 0 : 0.95,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute bottom-[0.04em] left-0 h-[3px] w-full origin-left rounded-full bg-accent"
                  />
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={rise}
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base"
            >
              {hero.description}
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-console"
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/20 px-6 text-sm font-semibold text-white/90 transition-colors duration-200 hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={rise} className="lg:col-span-5">
            <motion.div
              style={reduceMotion ? undefined : { x: artX, y: artY }}
              className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none"
            >
              {/* The power mark from the logo, drawn at scale, turning slowly
                  and never stopping. */}
              <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[8%] h-[116%] w-[116%] animate-spin [animation-duration:48s] motion-reduce:animate-none"
              >
                <motion.circle
                  cx="100"
                  cy="100"
                  r="94"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="text-brand-light/55"
                  initial={
                    reduceMotion
                      ? { pathLength: 0.82 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  animate={{ pathLength: 0.82, opacity: 1 }}
                  transition={{
                    duration: 1.6,
                    delay: reduceMotion ? 0 : 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </svg>

              {/* A node riding the orbit, replacing the template's two dots. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[8%] animate-spin [animation-duration:48s] motion-reduce:animate-none"
              >
                <span className="absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_rgba(248,229,89,0.85)]" />
              </div>

              <Image
                src={hero.image}
                alt="Robotic hands holding a globe marked AI, over a circuit board"
                width={1400}
                height={1377}
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="relative h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.dl
          variants={rise}
          className="grid grid-cols-2 gap-px overflow-hidden border-t border-console-line bg-console-line sm:grid-cols-4"
        >
          {serviceGroups.slice(0, 4).map((group) => (
            <div key={group.label} className="bg-console px-1 py-5 sm:px-4">
              <dt className="font-mono text-[10px] uppercase tracking-label text-white/70">
                {group.label}
              </dt>
              <dd className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tabular-nums text-white">
                  {String(group.items.length).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  {group.items.length === 1 ? "service" : "services"}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
