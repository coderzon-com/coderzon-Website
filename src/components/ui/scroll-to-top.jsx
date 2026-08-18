"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button.
 *
 * The ring around the arrow is an SVG circle whose stroke is drawn in
 * proportion to how far down the page you are, matching the original design.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    const update = () => {
      const scrolled = window.scrollY;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      // Guard against dividing by zero on pages shorter than the viewport.
      const progress = scrollable > 0 ? scrolled / scrollable : 0;
      path.style.strokeDashoffset = `${length - progress * length}`;
      setIsVisible(scrolled > 300);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      className={`fixed bottom-5 right-5 z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-transparent text-brand shadow-[inset_0_0_0_2px_rgba(14,89,242,0.22)] backdrop-blur-sm transition-all duration-200 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
        isVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-4 opacity-0"
      }`}
    >
      {/* Progress ring */}
      <svg
        aria-hidden="true"
        viewBox="-1 -1 102 102"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="transition-[stroke-dashoffset] duration-100 ease-linear"
        />
      </svg>

      <ArrowUp className="relative h-5 w-5" />
    </button>
  );
}
