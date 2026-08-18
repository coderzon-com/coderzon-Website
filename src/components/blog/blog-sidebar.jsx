import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getRecentPosts } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import { BlogSearch } from "./blog-search";

/** Sidebar on blog pages: search box plus the most recent posts. */
export async function BlogSidebar() {
  const recentPosts = await getRecentPosts(4);

  return (
    <aside className="space-y-8">
      <div className="rounded-2xl bg-muted-surface p-6">
        <h2 className="mb-4 text-lg">Search</h2>
        <BlogSearch />
      </div>

      <div className="rounded-2xl bg-muted-surface p-6">
        <h2 className="mb-4 text-lg">Recent Posts</h2>

        {recentPosts.length === 0 ? (
          <p className="text-sm text-muted">No posts yet.</p>
        ) : (
          <ul className="space-y-5">
            {recentPosts.map((post) => (
              <li key={post._id} className="flex gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg"
                >
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.blogName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="block h-full w-full bg-gray-200" />
                  )}
                </Link>
                <div className="min-w-0">
                  <h3 className="text-sm leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-brand"
                    >
                      {post.blogName}
                    </Link>
                  </h3>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted">
                    <CalendarDays className="h-3 w-3" />
                    {formatDate(post._createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
