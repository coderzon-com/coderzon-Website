"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * A horizontal rail of cards you can drag, scroll, or step through.
 *
 * Native scrolling with snap points does the work rather than a carousel
 * library: it keeps keyboard and trackpad behaviour for free, costs nothing
 * in bundle size, and degrades to a plain scrolling row if JavaScript never
 * arrives.
 *
 * Pointer dragging is layered on top for mouse users, who otherwise have no
 * obvious way to move a horizontal list.
 */
export function CardRail({ children, label, className = "" }) {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(rail.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    measure();
    rail.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /** Step by roughly one card, whatever the current card width is. */
  const step = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const distance = card ? card.getBoundingClientRect().width + 20 : 320;
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  // Click-and-drag for mouse users. Touch already works natively.
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse") return;
    const rail = railRef.current;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: rail.scrollLeft,
    };
    rail.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!drag.current.active) return;
    railRef.current.scrollLeft =
      drag.current.startScroll - (event.clientX - drag.current.startX);
  };

  const endDrag = (event) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    railRef.current?.releasePointerCapture?.(event.pointerId);
  };

  return (
    <div className={className}>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="[scrollbar-width:none] flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        {children}
      </div>

      {/* Controls are hidden from assistive tech: the rail itself is already
          focusable and arrow-key scrollable. */}
      <div className="mt-8 flex gap-2" aria-hidden="true">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={!canScrollLeft}
          tabIndex={-1}
          aria-label="Scroll left"
          className="ease-power flex h-11 w-11 items-center justify-center rounded-full border border-current/20 transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={!canScrollRight}
          tabIndex={-1}
          aria-label="Scroll right"
          className="ease-power flex h-11 w-11 items-center justify-center rounded-full border border-current/20 transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
