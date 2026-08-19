import { NotFoundContent } from "@/components/not-found-content";

/** Shown when a page inside the site calls notFound() — keeps header and footer. */
export const metadata = { title: "Page Not Found" };

export default function SiteNotFound() {
  return <NotFoundContent />;
}
