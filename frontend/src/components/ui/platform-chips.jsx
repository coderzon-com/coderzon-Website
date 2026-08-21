import Link from "next/link";
import { getPlatformBySlug } from "@/data/platforms";

/**
 * The platforms a piece of work is delivered in, as links.
 *
 * Naming them matters more than it looks. A buyer with a Fabric estate or a
 * Snowflake bill is scanning for that word specifically, and prose that says
 * "we work across modern data platforms" answers nobody. These are the actual
 * products, and each one goes to the page describing how we work in it.
 *
 * Unknown slugs are dropped rather than rendered as dead text, so a typo in
 * the data can never ship a broken link.
 */
export function PlatformChips({
  slugs = [],
  label = "Delivered in",
  className = "",
}) {
  const platforms = slugs.map(getPlatformBySlug).filter(Boolean);
  if (!platforms.length) return null;

  return (
    <div className={className}>
      <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
        {label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {platforms.map((platform) => (
          <li key={platform.slug}>
            <Link
              href={`/platforms/${platform.slug}`}
              className="focus-visible:ring-offset-ink ease-power inline-flex items-center rounded-full border border-white/20 px-3 py-1.5 text-[13px] font-medium text-white/80 transition-colors duration-300 hover:border-white/45 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              {platform.navLabel}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
