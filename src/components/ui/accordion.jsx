"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

/**
 * Self-contained accordion used by the FAQ page.
 * `defaultOpen` is the index that starts expanded (null for all closed).
 */
export function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted-surface sm:gap-4 sm:p-5"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-brand text-white" : "bg-brand-50 text-brand"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0 font-semibold text-navy">
                  {item.question}
                </span>
              </button>
            </h3>
            {isOpen && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 sm:pl-16">
                <p className="leading-relaxed text-muted">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
