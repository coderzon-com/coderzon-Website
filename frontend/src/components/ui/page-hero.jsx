import Link from "next/link";

/**
 * Header block for inner pages.
 *
 * Sits on the console surface so it continues the header rather than starting
 * a new one, matching how the homepage hero behaves. The breadcrumb is a
 * monospace path, which suits a catalogue you navigate by slug.
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
    <section className="relative overflow-hidden border-b border-console-line bg-console text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to right, #000 0%, #000 45%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to right, #000 0%, #000 45%, transparent 80%)",
        }}
      />

      <div className="container relative py-10 sm:py-14 lg:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-label">
            {path.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <Link
                  href={crumb.href}
                  className="text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  {crumb.label}
                </Link>
                <span aria-hidden="true" className="text-white/30">
                  /
                </span>
              </li>
            ))}
            <li className="text-brand-light" aria-current="page">
              {breadcrumb ?? title}
            </li>
          </ol>
        </nav>

        {eyebrow && (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-label text-brand-light">
            {eyebrow}
          </p>
        )}

        <h1
          className={`${eyebrow ? "mt-3" : "mt-6"} max-w-4xl break-words text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[52px]`}
        >
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
