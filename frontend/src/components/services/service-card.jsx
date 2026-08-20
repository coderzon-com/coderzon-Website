import Link from "next/link";

/**
 * One service in the catalogue.
 *
 * A row rather than a card: dimmed at rest, full on hover, sliding a little
 * to the right as it lights. Fourteen boxed cards is a wall; fourteen rows
 * is an index you can read down.
 */
export function ServiceCard({ service, index }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group ease-power flex items-baseline gap-5 border-b border-black/10 py-7 opacity-50 transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black sm:gap-10"
    >
      {typeof index === "number" && (
        <span className="font-mono text-[10px] tabular-nums text-black/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <span className="ease-power flex-1 text-2xl font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
        {service.shortTitle}
      </span>

      <span className="hidden max-w-sm text-sm leading-relaxed text-black/55 lg:block">
        {service.overview.heading}
      </span>
    </Link>
  );
}
