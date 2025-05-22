import { createClient } from 'next-sanity';
import BlogDetails from '@/components/pages/blogs/blog-details';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

export async function generateMetadata({ params }) {
  const blog = await client.fetch(
    `*[_type == "blogs" && _id == $id][0]{
      blogName,
      content,
      "imageUrl": image.asset->url
    }`,
    { id: params.id }
  );

  if (!blog) {
    return {
      title: 'Blog Not Found - Coderzon',
      description: 'This blog post could not be found.',
    };
  }

  return {
    title: `${blog.blogName} | Coderzon Technologies Pvt Ltd`,
    description: blog.content?.slice(0, 150) ?? 'Read the latest insights from Coderzon.',
    openGraph: {
      title: blog.blogName,
      description: blog.content?.slice(0, 150),
      images: [
        {
          url: blog.imageUrl,
          width: 1200,
          height: 630,
          alt: blog.blogName,
        },
      ],
    },
  };
}

const BlogDetailPage = async ({ params }) => {
  const blog = await client.fetch(
    `*[_type == "blogs" && _id == $id][0]{
      _id,
      blogName,
      _createdAt,
      content,
      "imageUrl": image.asset->url
    }`,
    { id: params.id }
  );

  if (!blog) {
    return <div className="p-10 text-center">Blog post not found.</div>;
  }

  return <BlogDetails singleData={blog} />;
};

export default BlogDetailPage;
