import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";

/**
 * Catalogue tile for one service.
 *
 * The whole tile is the link, with the slug printed in monospace beneath the
 * name — for a technical buyer the URL is part of the identity, and it makes
 * the catalogue feel like a real index rather than marketing tiles.
 */
export function ServiceCard({ service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-lg bg-white p-6 ring-1 ring-navy/10 transition-all duration-200 hover:-translate-y-0.5 hover:ring-brand/40 hover:shadow-[0_24px_48px_-32px_rgba(5,22,52,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-muted-surface text-brand ring-1 ring-navy/10 transition-colors duration-200 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>

      <h3 className="mt-5 text-[17px] font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-brand">
        {service.shortTitle}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {service.overview.heading}
      </p>

      <span className="mt-5 block truncate font-mono text-[10px] text-muted/70">
        /services/{service.slug}
      </span>
    </Link>
  );
}
