import Link from "next/link";

/**
 * Header block for inner pages.
 *
 * Paper-white with the display face at full size, matching the homepage. The
 * breadcrumb is a monospace path — the one place a utility face still earns
 * its keep, because a route is literally a path.
 */
export function PageHero({
  title,
  breadcrumb,
  eyebrow,
  description,
  trail = [],
}) {
  const path = [{ label: "Home", href: "/" }, ...trail];

  return (
    <section // pt clears the fixed header (72px, 80px from lg) plus its own spacing.
      className="px-x-default border-b border-black/10 bg-white pb-14 pt-[calc(72px+3rem)] text-black sm:pb-20 lg:pt-[calc(80px+4rem)]"
    >
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-label text-black/40">
          {path.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <Link
                href={crumb.href}
                className="transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                {crumb.label}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li className="text-black" aria-current="page">
            {breadcrumb ?? title}
          </li>
        </ol>
      </nav>

      {eyebrow && (
        <p className="mt-8 font-mono text-[11px] uppercase tracking-label text-brand">
          {eyebrow}
        </p>
      )}

      <h1
        className={`${eyebrow ? "mt-4" : "mt-8"} max-w-[16ch] break-words text-display font-bold`}
      >
        {title}
      </h1>

      {description && (
        <p className="mt-7 max-w-xl text-base leading-relaxed text-black/55">
          {description}
        </p>
      )}
    </section>
  );
}
