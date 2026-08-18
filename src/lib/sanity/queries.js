import { sanityClient, warnSanityNotConfigured } from "./client";

/**
 * All blog reads live here so pages never write GROQ inline.
 * Every post is returned with a `slug`, which is what the /blog/[slug]
 * route uses — never the raw Sanity `_id`.
 *
 * Each function degrades to an empty result when Sanity is unreachable or
 * unconfigured, so a missing environment variable cannot fail the build.
 */

const POST_FIELDS = `
  _id,
  _createdAt,
  blogName,
  "slug": slug.current,
  content,
  "imageUrl": image.asset->url
`;

/** All posts, newest first. Returns [] if Sanity is unavailable. */
export async function getAllPosts() {
  if (!sanityClient) {
    warnSanityNotConfigured("getAllPosts");
    return [];
  }

  try {
    const posts = await sanityClient.fetch(
      `*[_type == "blogs" && defined(slug.current)] | order(_createdAt desc) { ${POST_FIELDS} }`,
    );
    return posts ?? [];
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

/** The N most recent posts, used by the homepage and the blog sidebar. */
export async function getRecentPosts(limit = 3) {
  if (!sanityClient) {
    warnSanityNotConfigured("getRecentPosts");
    return [];
  }

  try {
    const posts = await sanityClient.fetch(
      `*[_type == "blogs" && defined(slug.current)] | order(_createdAt desc)[0...$limit] { ${POST_FIELDS} }`,
      { limit },
    );
    return posts ?? [];
  } catch (error) {
    console.error("Failed to fetch recent blog posts from Sanity:", error);
    return [];
  }
}

/** A single post by slug, or null when it does not exist. */
export async function getPostBySlug(slug) {
  if (!sanityClient) {
    warnSanityNotConfigured("getPostBySlug");
    return null;
  }

  try {
    const post = await sanityClient.fetch(
      `*[_type == "blogs" && slug.current == $slug][0] { ${POST_FIELDS} }`,
      { slug },
    );
    return post ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" from Sanity:`, error);
    return null;
  }
}
