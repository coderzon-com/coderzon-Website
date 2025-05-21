import BlogItem from './blog-item';
import Pagination from './pagination';
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const blogItemShow = 6;

const BlogGridMain = async ({ searchParams }) => {
  // Get currentPage from query params, fallback to 0
  const currentPage = parseInt(searchParams?.page || '0', 10);

  // Fetch blogs on server
  const blogs = await client.fetch(`
    *[_type == 'blogs'] | order(_createdAt desc) {
      _id,
      blogName,
      _createdAt,
      content,
      "imageUrl": image.asset->url
    }
  `);

  const totalPages = Math.ceil(blogs.length / blogItemShow);
  const startIndex = currentPage * blogItemShow;
  const endIndex = startIndex + blogItemShow;
  const currentBlogItems = blogs.slice(startIndex, endIndex);

  // Handlers can't work on server, so remove or replace with links in Pagination component

  return (
    <div className="blog__two section-padding">
      <div className="container">
        <div className="row gy-4">
          <BlogItem currentBlogItems={currentBlogItems} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          // You must update Pagination component to use links instead of handlers
        />
      </div>
    </div>
  );
};

export default BlogGridMain;
