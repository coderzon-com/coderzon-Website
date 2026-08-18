import { Button } from "@/components/ui/button";

/**
 * Shared 404 body. Rendered both by the global not-found page and by the
 * one inside the (site) group, so the two stay identical.
 */
export function NotFoundContent() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-6xl font-bold text-brand sm:text-7xl lg:text-9xl">
        404
      </p>
      <h1 className="mt-6 text-2xl lg:text-3xl">
        This page could not be found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for may have been moved, renamed, or never
        existed.
      </p>
      <Button href="/" size="lg" className="mt-8">
        Back to Home
      </Button>
    </div>
  );
}
