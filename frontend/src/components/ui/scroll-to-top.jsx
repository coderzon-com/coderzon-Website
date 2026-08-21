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
      /* Light on the dark ground the whole site now uses. This was black
         type inside a black hairline — present, focusable, and completely
         invisible from the moment the pages stopped being white. */
      className={`bg-ink/70 fixed bottom-5 right-5 z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] backdrop-blur-md transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
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
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="4"
        />
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
