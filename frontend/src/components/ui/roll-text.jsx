/**
 * Text that rolls over on hover.
 *
 * Two identical copies sit stacked inside a clipped box. On hover the first
 * slides up and out while the second arrives from below, so the label appears
 * to flip to a fresh copy of itself.
 *
 * Done in CSS transforms rather than JavaScript: it is GPU-composited, costs
 * nothing at runtime, and keeps working before hydration.
 *
 * The duplicate is hidden from assistive technology, or the label would be
 * announced twice. The parent must carry `group`, and the effect answers
 * keyboard focus as well as hover so it is not mouse-only.
 */
export function RollText({ children, className = "" }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span className="ease-power block transition-transform duration-[450ms] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="ease-power absolute inset-0 block translate-y-full transition-transform duration-[450ms] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
      >
        {children}
      </span>
    </span>
  );
}
