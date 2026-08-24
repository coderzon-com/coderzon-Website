"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ACCENTS } from "@/data/projects";

/**
 * Detail panel for a single pipeline component.
 *
 * Every component carries two write-ups: a plain-English one and a technical
 * one. In technical mode both are shown, the technical one open; in plain mode
 * the technical write-up collapses into a disclosure so a non-technical reader
 * is never confronted with SQL they did not ask for, but can still reach it.
 * That is the engineer's own design and it is worth keeping exactly.
 *
 * The panel is a bottom sheet on a phone and a side panel from `sm` up. The
 * axis is chosen in JavaScript rather than by stacking Tailwind variants,
 * because the closed and open transforms differ per breakpoint and relying on
 * generated-CSS ordering to resolve that is a bug waiting for a refactor.
 *
 * Focus moves to the close button on open and returns to the node that opened
 * it on close, so keyboard and screen-reader users are not dropped back at the
 * top of the document.
 */
export function ProjectDrawer({ component, mode, open, onClose, returnRef }) {
  const closeRef = useRef(null);
  const bodyRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    // Reset the scroll position: opening a second component and landing
    // halfway down its write-up reads as a rendering fault.
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      /* The panel claims to be modal, but the page behind it is still in the
         tab order — so without this, the third Tab press lands on a link the
         reader cannot see, behind a scrim, with the body scroll locked. The
         cycle keeps focus where the dialog says it is. */
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (
        event.shiftKey &&
        (active === first || !panelRef.current.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, component]);

  const handleClose = () => {
    onClose();
    returnRef?.current?.focus();
  };

  const accent = component ? ACCENTS[component.accent] : ACCENTS.serve;
  const copy = component?.drawer[mode];

  return (
    <>
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`ease-power fixed inset-0 z-[70] bg-black/70 backdrop-blur-[2px] transition-opacity duration-500 print:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={copy ? copy.t.replace(/<[^>]+>/g, "") : "Component detail"}
        style={{
          "--accent": accent,
          transitionProperty: "transform, visibility",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`bg-ink-raised fixed z-[80] flex flex-col border-white/15 text-white print:hidden
          inset-x-0 bottom-0 max-h-[86vh] rounded-t-3xl border-t
          sm:inset-y-0 sm:bottom-auto sm:left-auto sm:right-0 sm:h-full sm:max-h-none sm:w-[min(480px,100vw)] sm:rounded-none sm:rounded-l-3xl sm:border-l sm:border-t-0
          ${
            open
              ? "visible translate-y-0 sm:translate-x-0"
              : "invisible translate-y-full sm:translate-y-0 sm:translate-x-full"
          }`}
      >
        {/* Grab handle. Purely an affordance for the sheet form, so it is
            hidden once the panel becomes a side drawer. */}
        <span
          aria-hidden="true"
          className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/25 sm:hidden"
        />

        <div className="relative shrink-0 border-b border-white/12 p-6 pr-14 sm:p-7 sm:pr-14">
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="Close detail"
            className="focus-visible:ring-offset-ink-raised absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>

          {copy && (
            <>
              <p
                className="font-mono text-[10px] uppercase tracking-label"
                style={{ color: accent }}
              >
                {copy.k}
              </p>
              <h2
                className="mt-3 break-words text-xl font-bold leading-tight [font-stretch:96%]"
                dangerouslySetInnerHTML={{ __html: copy.t }}
              />
              <p
                className="mt-2.5 text-sm leading-relaxed text-white/65"
                dangerouslySetInnerHTML={{ __html: copy.d }}
              />
            </>
          )}
        </div>

        <div
          ref={bodyRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 pb-10 sm:p-7"
        >
          {component && (
            <>
              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  In plain terms
                </p>
                <div
                  className="project-prose mt-3"
                  dangerouslySetInnerHTML={{ __html: component.plain }}
                />
              </div>

              {mode === "tech" ? (
                <div className="mt-7">
                  <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                    Technical detail
                  </p>
                  <div
                    className="project-prose mt-3"
                    dangerouslySetInnerHTML={{ __html: component.body }}
                  />
                </div>
              ) : (
                <details className="group mt-5 rounded-2xl border border-white/12">
                  <summary className="focus-visible:ring-offset-ink-raised flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 font-mono text-[10px] uppercase tracking-label text-white/60 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
                    Technical detail
                    <span
                      aria-hidden="true"
                      className="ease-power text-base leading-none transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div
                    className="project-prose border-t border-white/12 px-5 py-5"
                    dangerouslySetInnerHTML={{ __html: component.body }}
                  />
                </details>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
