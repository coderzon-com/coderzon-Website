import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

/** Preview card for a single blog post, used by the grid and the homepage. */
export function BlogCard({ post }) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.blogName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted-surface" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(post._createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            by Admin
          </span>
        </div>

        <h3 className="break-words text-lg leading-snug">
          <Link href={href} className="transition-colors hover:text-brand">
            {post.blogName}
          </Link>
        </h3>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
