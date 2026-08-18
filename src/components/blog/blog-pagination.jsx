import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Link-based pagination. The old version took click handlers that were never
 * passed, so paging silently did nothing; using links keeps it working with
 * server components and makes each page shareable.
 */
export function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
  query = "",
}) {
  if (totalPages <= 1) return null;

  // Keep any active search term when moving between pages.
  const pageHref = (page) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (page > 1) params.set("page", String(page));
    const search = params.toString();
    return search ? `${basePath}?${search}` : basePath;
  };

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex justify-center">
      <ul className="flex items-center gap-2">
        <li>
          <PageLink
            href={pageHref(currentPage - 1)}
            disabled={currentPage === 1}
            label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </PageLink>
        </li>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <li key={page}>
              <Link
                href={pageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-brand text-white"
                    : "bg-muted-surface text-navy hover:bg-brand-50 hover:text-brand",
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}

        <li>
          <PageLink
            href={pageHref(currentPage + 1)}
            disabled={currentPage === totalPages}
            label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </PageLink>
        </li>
      </ul>
    </nav>
  );
}

function PageLink({ href, disabled, label, children }) {
  const classes =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-muted-surface text-navy transition-colors";

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(classes, "cursor-not-allowed opacity-40")}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(classes, "hover:bg-brand-50 hover:text-brand")}
    >
      {children}
    </Link>
  );
}
