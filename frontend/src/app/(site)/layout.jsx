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
      {/* Motion writes its starting styles into the server HTML, which means a
          revealed headline ships as opacity:0 and only becomes visible once
          the library hydrates. If scripting never runs, the page's largest
          claim would be invisible. This puts it back. */}
      <noscript>
        <style>{`[data-motion-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
