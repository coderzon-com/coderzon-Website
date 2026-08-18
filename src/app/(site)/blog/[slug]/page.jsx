import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { CalendarDays, User } from "lucide-react";
import { buildMetadata } from "@/config/site";
import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries";
import { excerptFromPortableText, formatDate } from "@/lib/utils";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { ContactCta } from "@/components/contact/contact-cta";

/** Pre-render the posts that exist at build time; new ones render on demand. */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(decodeURIComponent(params.slug));
  if (!post) return buildMetadata({ title: "Post Not Found" });

  const description = excerptFromPortableText(post.content);

  return {
    ...buildMetadata({
      title: post.blogName,
      description,
      path: `/blog/${post.slug}`,
    }),
    openGraph: {
      title: post.blogName,
      description,
      type: "article",
      publishedTime: post._createdAt,
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630 }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(decodeURIComponent(params.slug));
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.blogName} breadcrumb="Blog" />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article>
            {post.imageUrl && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src={post.imageUrl}
                  alt={post.blogName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-5 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {formatDate(post._createdAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                by Admin
              </span>
            </div>

            <h1 className="mb-6 break-words text-2xl leading-tight sm:text-3xl lg:text-4xl">
              {post.blogName}
            </h1>

            <div className="prose-blog">
              <PortableText value={post.content} />
            </div>
          </article>

          <BlogSidebar />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
