"use client";

import { Printer } from "lucide-react";

/**
 * Hands the case study to the browser's print dialog, which is where
 * "Save as PDF" lives on every desktop platform.
 *
 * The engineer's page had to assemble a hidden appendix before printing
 * because its detail only existed in JavaScript. Ours is already on the page,
 * so this is just the affordance — the print stylesheet does the rest, and
 * Ctrl/Cmd+P produces exactly the same document without it.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-visible:ring-offset-ink ease-power inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold transition-colors duration-300 hover:border-white/45 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 print:hidden"
    >
      <Printer aria-hidden="true" className="h-4 w-4" />
      Save as PDF
    </button>
  );
}
