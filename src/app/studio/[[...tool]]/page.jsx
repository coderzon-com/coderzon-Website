import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Sanity Studio, mounted at /studio.
 * The catch-all segment lets Studio handle its own internal routing.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
