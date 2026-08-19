"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

/**
 * Questions as a hairline register.
 *
 * Each row carries a monospace index, and the trigger is a plus that turns
 * into a cross — the same device the navigation uses to open the catalogue.
 */
export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-navy/12">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="border-b border-navy/12">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-4 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 font-mono text-[11px] tabular-nums transition-colors ${
                    isOpen ? "text-brand" : "text-muted"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={`min-w-0 flex-1 font-semibold leading-snug transition-colors ${
                    isOpen ? "text-brand" : "text-navy group-hover:text-brand"
                  }`}
                >
                  {item.question}
                </span>

                <Plus
                  aria-hidden="true"
                  className={`mt-0.5 h-4 w-4 shrink-0 transition-all duration-300 ${
                    isOpen ? "rotate-45 text-brand" : "text-muted"
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
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 leading-relaxed text-muted sm:pl-[3.25rem] sm:pr-10">
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
