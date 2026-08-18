import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ROUTES = [
  { label: "Services", href: "/services" },
  { label: "Platforms", href: "/platforms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Shared 404 body, rendered by both the global not-found page and the one
 * inside the (site) group.
 *
 * An empty screen is an invitation to act, so it offers the routes that exist
 * rather than only a way back.
 */
export function NotFoundContent() {
  return (
    <section className="relative overflow-hidden bg-console text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, #000, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 90%)",
        }}
      />

      <div className="container relative flex min-h-[60vh] flex-col justify-center py-20">
        <p className="font-mono text-[11px] uppercase tracking-label text-brand-light">
          Error 404
        </p>
        <h1 className="mt-4 max-w-2xl text-[30px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          That page is not here
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-white/70">
          It may have moved, been renamed, or never existed. These do exist:
        </p>

        <ul className="mt-8 grid max-w-2xl gap-px overflow-hidden rounded-lg bg-console-line sm:grid-cols-2">
          {ROUTES.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="group flex items-center justify-between gap-3 bg-console p-4 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                <span className="text-sm font-medium text-white/85 transition-colors group-hover:text-white">
                  {route.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/45 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-light" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 self-start border-b border-brand pb-1 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
        >
          Back to home
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
