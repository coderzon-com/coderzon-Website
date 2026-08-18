import { getRecentPosts } from "@/lib/sanity/queries";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";

/** Three most recent blog posts. Renders nothing when there are no posts. */
export async function LatestPostsSection() {
  const posts = await getRecentPosts(3);

  if (posts.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        eyebrow="Blog and News"
        title="Latest insights from our team"
        centered
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/blog" variant="outline">
          View All Posts
        </Button>
      </div>
    </Section>
  );
}
