"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import { Icon } from "@/components/ui/icon";

/**
 * The catalogue panel.
 *
 * It hinges down from the bar's bottom edge — rotateX inside a perspective
 * context, with the transform origin on the top edge. The panel appears to
 * swing into the room rather than fade in, which is the difference between
 * depth and a dissolve.
 *
 * Perspective sits on the wrapper and the rotation on the child, because a
 * rotated element cannot establish its own perspective. Origin is the top
 * edge so the hinge line matches the bar it is attached to.
 *
 * Contents stagger in behind the hinge, slightly delayed, so the panel reads
 * as opening first and filling second.
 */
export function MegaPanel({ menu, onNavigate, onMouseEnter, onMouseLeave }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const panel = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: DURATION.micro } },
        exit: { opacity: 0, transition: { duration: DURATION.micro } },
      }
    : {
        hidden: { opacity: 0, rotateX: -14, y: -6 },
        show: {
          opacity: 1,
          rotateX: 0,
          y: 0,
          transition: { duration: DURATION.interaction, ease: EASE.entry },
        },
        exit: {
          opacity: 0,
          rotateX: -10,
          y: -6,
          transition: { duration: 0.2, ease: EASE.exit },
        },
      };

  const column = reduceMotion
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
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 1600 }}
      className="absolute inset-x-0 top-full hidden xl:block"
    >
      <motion.div
        variants={panel}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ transformOrigin: "top center" }}
        className="bg-ink-raised origin-top border-b border-white/12 text-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)]"
      >
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduceMotion ? 0 : STAGGER.tight,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="px-x-default grid gap-12 py-12 lg:grid-cols-12"
        >
          <motion.div variants={column} className="lg:col-span-9">
            <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-white/12 pb-5">
              <div className="flex items-baseline gap-4">
                <span className="text-brand font-mono text-[10px] uppercase tracking-label">
                  {menu.eyebrow}
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-black/15" />
                <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  {menu.title}
                </h2>
              </div>

              <Link
                href={menu.viewAll.href}
                onClick={onNavigate}
                className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {menu.viewAll.label}
                <ArrowUpRight className="ease-power h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* The list dims as a whole on hover so the item under the pointer
                is the only one at full strength. */}
            <div className="group/list grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {menu.groups.map((group) => (
                <motion.div key={group.label} variants={column}>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-label text-white/55">
                    {group.label}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((entry) => {
                      const current = pathname === entry.href;
                      return (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            onClick={onNavigate}
                            aria-current={current ? "page" : undefined}
                            className={`group/item ease-power -mx-2 flex items-center gap-2.5 rounded-md px-2 py-2 text-sm leading-snug transition-all duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover/list:opacity-40 hover:!opacity-100 focus-visible:!opacity-100 ${
                              current ? "font-medium" : ""
                            }`}
                          >
                            {entry.icon ? (
                              <Icon
                                name={entry.icon}
                                className="text-brand h-3.5 w-3.5 shrink-0"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="h-px w-3.5 shrink-0 bg-black/25"
                              />
                            )}
                            <span className="min-w-0">{entry.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.aside variants={column} className="lg:col-span-3">
            <div className="flex h-full flex-col justify-between border-l border-white/12 pl-10">
              <div>
                <h3 className="text-display-sm font-bold">
                  {menu.feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {menu.feature.body}
                </p>
              </div>
              <Link
                href={menu.feature.cta.href}
                onClick={onNavigate}
                className="ease-power mt-8 inline-flex min-h-[44px] items-center self-start rounded-full bg-black px-6 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {menu.feature.cta.label}
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      </motion.div>
    </div>
  );
}
