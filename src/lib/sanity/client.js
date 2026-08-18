import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

/** True when both Sanity environment variables are present. */
export const isSanityConfigured = Boolean(projectId && dataset);

/**
 * The one Sanity client for the whole app (it used to be re-created in four
 * separate files).
 *
 * `createClient` throws immediately when projectId is missing, and it runs at
 * module scope — which fails the whole production build on any host where the
 * environment variables are not set. Returning null instead lets the blog
 * degrade to empty while the rest of the site builds and deploys normally.
 */
export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2023-05-14",
      useCdn: true,
    })
  : null;

let warned = false;

/** Logs a single build-time warning when Sanity is not configured. */
export function warnSanityNotConfigured(context) {
  if (warned) return;
  warned = true;
  console.warn(
    `[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET are not set — ` +
      `blog content is unavailable (${context}).`,
  );
}
