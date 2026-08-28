import Link from "next/link";

/**
 * Header block for inner pages.
 *
 * Dark, like the rest of the site. This was the last light surface in the
 * system, and it opened every page that was not the homepage — so the site
 * changed ground the moment you followed any link.
 *
 * The `visual` slot is where a page puts an object of its own. A catalogue
 * page and a contact page should not open on the same picture, and the object
 * is the cheapest way to say which one you are on before the title is read.
 * It sits behind the type and is inert to the pointer, so it can never get
 * between a reader and a breadcrumb.
 */
export function PageHero({
  title,
  breadcrumb,
  eyebrow,
  description,
  trail = [],
  visual,
}) {
  const path = [{ label: "Home", href: "/" }, ...trail];

  return (
    <section
      // pt clears the fixed header (72px, 80px from lg) plus its own spacing.
      className="bg-ink px-x-default relative isolate overflow-hidden border-b border-white/10 pb-14 pt-[calc(72px+3rem)] text-white sm:pb-20 lg:pt-[calc(80px+4rem)]"
    >
      {visual && (
        <div
          aria-hidden="true"
          /* Sized from the hero's height, not its width, and offset by a
             fixed distance rather than a percentage.

             The previous slot was `inset-y-[-30%] right-[-12%] w-[54%]`,
             which meant the object was always taller than the band it sits
             in and pushed further off the right edge the wider the screen
             got — at 1920 only 101px of a 330px radius was still on screen,
             so a concentric figure lost its outer ring on every side. A
             square the height of the hero always fits the band, and sitting
             inside the right edge rather than hanging past it means a figure
             whose 3D projection runs a little wide is still whole. */
          className="pointer-events-none absolute inset-y-[-7%] right-0 -z-10 hidden aspect-square w-auto max-w-[56%] items-center justify-center md:flex lg:right-2"
        >
          {visual}
        </div>
      )}

      <nav aria-label="Breadcrumb" className="relative">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-label text-white/55">
          {path.map((crumb) => (
            <li key={crumb.href} className="flex items-center gap-2">
              <Link
                href={crumb.href}
                className="focus-visible:ring-offset-ink rounded-sm transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                {crumb.label}
              </Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li className="text-white" aria-current="page">
            {breadcrumb ?? title}
          </li>
        </ol>
      </nav>

      {eyebrow && (
        // signal, not brand: #0E59F2 measures 3.5:1 on this ground, which is
        // under the floor for 11px text. The cyan clears 12.7:1.
        <p className="text-signal relative mt-8 font-mono text-[11px] uppercase tracking-label">
          {eyebrow}
        </p>
      )}

      <h1
        className={`${eyebrow ? "mt-4" : "mt-8"} relative max-w-[16ch] break-words text-display font-bold [font-stretch:96%]`}
      >
        {title}
      </h1>

      {description && (
        <p className="relative mt-7 max-w-xl text-base leading-relaxed text-white/65">
          {description}
        </p>
      )}
    </section>
  );
}
