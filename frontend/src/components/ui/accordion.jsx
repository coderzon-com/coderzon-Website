"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

/**
 * Questions as a register.
 *
 * Rows sit dimmed and the open one comes to full, matching every other list
 * on the site. The plus rotates into a cross — the same device the navigation
 * uses to open the catalogue.
 */
export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-black/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-black/10">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className={`group flex w-full items-start gap-5 py-7 text-left transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black sm:gap-8 ${
                  isOpen ? "opacity-100" : "opacity-50 hover:opacity-100"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="mt-2 shrink-0 font-mono text-[10px] tabular-nums text-black/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1 break-words text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                  {item.question}
                </span>

                <Plus
                  aria-hidden="true"
                  className={`mt-2 h-4 w-4 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 leading-relaxed text-black/60 sm:pl-[3.25rem]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
