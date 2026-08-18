import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/lib/sanity/client";

/**
 * Sanity Studio, mounted at /studio.
 * The catch-all segment lets Studio handle its own internal routing.
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Without projectId/dataset the Studio cannot boot. Render a hint rather
  // than letting it throw and take the whole build down.
  if (!isSanityConfigured) {
    return (
      <div style={{ padding: "3rem", fontFamily: "system-ui, sans-serif" }}>
        <h1>Sanity Studio is not configured</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in this environment, then
          redeploy.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
