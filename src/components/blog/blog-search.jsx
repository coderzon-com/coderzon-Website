import { Search } from "lucide-react";

/**
 * Plain GET form — submitting navigates to /blog?q=… and the blog page filters
 * server-side. Previously the search box only filtered the three posts already
 * visible in the sidebar, so it never surfaced anything new.
 */
export function BlogSearch({ defaultValue = "" }) {
  return (
    <form action="/blog" method="get" role="search" className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <input
        id="blog-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search articles…"
        className="w-full rounded-lg border border-gray-200 py-3 pl-4 pr-12 text-sm transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-brand text-white transition-colors hover:bg-brand-dark"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
