import Link from "next/link";

/**
 * One platform in the catalogue. Same row treatment as services, so the two
 * indexes behave identically.
 */
export function PlatformCard({ platform, index }) {
  return (
    <Link
      href={`/platforms/${platform.slug}`}
      className="group ease-power flex items-baseline gap-5 border-b border-black/10 py-7 opacity-50 transition-all duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black sm:gap-10"
    >
      {typeof index === "number" && (
        <span className="font-mono text-[10px] tabular-nums text-black/40">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <span className="ease-power flex-1 text-2xl font-bold tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
        {platform.navLabel}
      </span>

      <span className="hidden max-w-sm text-sm leading-relaxed text-black/55 lg:block">
        {platform.shortTitle}
      </span>
    </Link>
  );
}
