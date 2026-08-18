import { createClient } from "next-sanity";

/**
 * The one Sanity client for the whole app. Previously this was re-created in
 * four separate files; import this instead.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-14",
  useCdn: true,
});
