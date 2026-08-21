import Link from "next/link";

const ROUTES = [
  { label: "Services", href: "/services" },
  { label: "Platforms", href: "/platforms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Shared 404 body.
 *
 * An empty screen is an invitation to act, so it offers the routes that do
 * exist rather than only a way back.
 */
export function NotFoundContent() {
  return (
    <section className="px-x-default flex min-h-[70vh] flex-col justify-center bg-ink pb-20 pt-[calc(72px+4rem)] text-white lg:pt-[calc(80px+5rem)]">
      <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
        Error 404
      </p>
      <h1 className="mt-6 max-w-[14ch] text-heading font-bold break-words">
        That page is not here
      </h1>
      <p className="mt-8 max-w-md leading-relaxed text-white/70">
        It may have moved, been renamed, or never existed. These do exist:
      </p>

      <ul className="mt-12 max-w-2xl border-t border-white/12">
        {ROUTES.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              className="ease-power flex items-baseline border-b border-white/12 py-5 text-2xl font-bold tracking-[-0.02em] opacity-50 transition-all duration-300 hover:translate-x-2 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="ease-power mt-12 inline-flex min-h-[52px] w-fit items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      >
        Back to home
      </Link>
    </section>
  );
}
