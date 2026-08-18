import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * The dark banner with a breadcrumb shown at the top of every inner page.
 * Replaces the old `BreadCrumb` component.
 */
export function PageHero({ title, breadcrumb }) {
  return (
    <div className="bg-navy py-12 sm:py-16 lg:py-20">
      <div className="container">
        {/* break-words guards against long blog titles overflowing at 320px. */}
        <h1 className="break-words text-2xl text-white sm:text-3xl lg:text-5xl">
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-4">
          {/* Matches the original: white "Home" link, brand-coloured current page. */}
          <ol className="flex flex-wrap items-center gap-2 break-all text-sm sm:break-normal">
            <li>
              <Link
                href="/"
                className="text-white transition-colors hover:text-brand-light"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li className="text-brand-light" aria-current="page">
              {breadcrumb ?? title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
