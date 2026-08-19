import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { NotFoundContent } from "@/components/not-found-content";

/**
 * Global 404 for URLs that match no route at all. Because it sits outside
 * the (site) group it has to render the header and footer itself.
 */
export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </div>
  );
}
