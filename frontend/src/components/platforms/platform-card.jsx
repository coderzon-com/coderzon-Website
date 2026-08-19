import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Catalogue tile for one platform. Platforms carry no icon in the data, so
 * the vendor initials stand in as the mark.
 */
export function PlatformCard({ platform }) {
  const initials = platform.navLabel
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group relative flex h-full flex-col rounded-lg bg-white p-6 ring-1 ring-navy/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-32px_rgba(5,22,52,0.45)] hover:ring-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 min-w-11 items-center justify-center rounded-md bg-muted-surface px-2 font-mono text-[13px] font-medium text-brand ring-1 ring-navy/10 transition-colors duration-200 group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
          {initials}
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>

      <h3 className="mt-5 text-[17px] font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-brand">
        {platform.navLabel}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {platform.shortTitle}
      </p>

      <span className="mt-5 block truncate font-mono text-[10px] text-muted/70">
        /platforms/{platform.slug}
      </span>
    </Link>
  );
}
