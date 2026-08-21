import Link from "next/link";

/**
 * One service in the catalogue.
 *
 * A row rather than a card: held back at rest, full on hover, sliding a
 * little to the right as it lights. Fourteen boxed cards is a wall; fourteen
 * rows is an index you can read down.
 *
 * The resting state is 70%, not 50%. Nothing on a touch device is ever
 * hovered, so whatever the row looks like at rest is the whole experience —
 * at 50% the description underneath fell to 2.4:1 and stayed there.
 */
export function ServiceCard({ service, index }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group ease-power flex items-baseline gap-5 border-b border-white/12 py-7 opacity-70 transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:gap-10"
    >
      {typeof index === "number" && (
        <span className="font-mono text-[10px] tabular-nums text-white/85">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <span className="ease-power flex-1 text-2xl font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
        {service.shortTitle}
      </span>

      <span className="hidden max-w-sm text-sm leading-relaxed text-white/70 lg:block">
        {service.overview.heading}
      </span>
    </Link>
  );
}
