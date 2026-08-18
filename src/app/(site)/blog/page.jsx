import { buildMetadata } from "@/config/site";
import { getAllPosts } from "@/lib/sanity/queries";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Insights on AI software development, cloud computing, data analytics, MVP strategies and emerging technology trends from the Coderzon team.",
  path: "/blog",
});

const POSTS_PER_PAGE = 6;

export default async function BlogPage({ searchParams }) {
  const query = searchParams?.q?.trim() ?? "";
  const requestedPage = Number.parseInt(searchParams?.page ?? "1", 10);

  const allPosts = await getAllPosts();

  const posts = query
    ? allPosts.filter((post) =>
        post.blogName?.toLowerCase().includes(query.toLowerCase()),
      )
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  // Clamp so ?page=99 or ?page=abc still renders a valid page.
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <PageHero title="Blog" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            {query && (
              <p className="mb-8 text-sm text-muted">
                {posts.length === 0
                  ? `No articles found for “${query}”.`
                  : `${posts.length} article${posts.length === 1 ? "" : "s"} matching “${query}”.`}
              </p>
            )}

            {visiblePosts.length === 0 ? (
              <p className="text-muted">
                {allPosts.length === 0
                  ? "No posts have been published yet. Check back soon."
                  : "Try a different search term."}
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {visiblePosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            )}

            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              query={query}
            />
          </div>

          <BlogSidebar />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
