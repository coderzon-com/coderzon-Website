import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

/**
 * Chrome shared by every public-facing page: header, footer and the
 * scroll-to-top button. Pages only render their own content.
 */
export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
