"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";

/**
 * The catalogue surface.
 *
 * Same material as the bar, so opening it reads as the console expanding
 * rather than a dropdown appearing. The background is a faint blueprint
 * grid — the vernacular of schemas and dashboards — instead of the blurred
 * gradient every dark panel uses.
 *
 * Registers are deliberately split: chrome and labels in monospace, the
 * catalogue entries themselves in the body face so they stay readable.
 */
export function MegaPanel({ menu, menuKey, onNavigate }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.035 } },
  };
  const column = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <div className="relative overflow-hidden border-b border-console-line bg-console shadow-[0_40px_60px_-40px_rgba(3,16,42,0.95)]">
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={menuKey}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid gap-10 py-9 lg:grid-cols-12"
          >
            <motion.div variants={column} className="lg:col-span-9">
              <div className="mb-7 flex items-end justify-between gap-6 border-b border-console-line pb-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-label text-brand-light">
                    {menu.eyebrow}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-console-line"
                  />
                  <h2 className="font-mono text-[11px] uppercase tracking-label text-white/65">
                    {menu.title}
                  </h2>
                </div>

                <Link
                  href={menu.viewAll.href}
                  onClick={onNavigate}
                  className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  {menu.viewAll.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {menu.groups.map((group) => (
                  <motion.div key={group.label} variants={column}>
                    <p className="mb-3 border-l-2 border-brand pl-2 font-mono text-[11px] uppercase tracking-label text-white/70">
                      {group.label}
                    </p>
                    <ul className="space-y-px">
                      {group.items.map((entry) => {
                        const current = pathname === entry.href;
                        return (
                          <li key={entry.href}>
                            <Link
                              href={entry.href}
                              onClick={onNavigate}
                              aria-current={current ? "page" : undefined}
                              className={`group -mx-2 flex items-center gap-2.5 rounded px-2 py-[7px] text-sm leading-snug transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                                current
                                  ? "bg-white/[0.09] text-white"
                                  : "text-white/85 hover:bg-white/[0.06] hover:text-white"
                              }`}
                            >
                              {entry.icon ? (
                                <Icon
                                  name={entry.icon}
                                  className="h-3.5 w-3.5 shrink-0 text-white/50 transition-colors duration-150 group-hover:text-brand-light"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="h-px w-3.5 shrink-0 bg-white/40 transition-colors duration-150 group-hover:bg-brand-light"
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
              <div className="flex h-full flex-col justify-between border-l border-console-line pl-8">
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-white">
                    {menu.feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                    {menu.feature.body}
                  </p>
                </div>
                <Link
                  href={menu.feature.cta.href}
                  onClick={onNavigate}
                  className="group mt-6 inline-flex items-center gap-2 self-start border-b border-brand pb-1 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  {menu.feature.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
