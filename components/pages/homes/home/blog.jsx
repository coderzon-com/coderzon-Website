import { createClient } from 'next-sanity';
import Link from 'next/link';
import { format } from 'date-fns';
import Image from 'next/image';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

export default async function BlogPage() {
  let blogs = [];

  try {
    blogs = await client.fetch(`
      *[_type == 'blogs'] | order(_createdAt desc) {
        _id,
        blogName,
        _createdAt,
        content,
        "imageUrl": image.asset->url
      }
    `);
  } catch (err) {
    return <div className="text-center py-10 text-red-500">Failed to load blogs</div>;
  }

  return (
    <div className="blog__one section-padding">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-xl-6 col-lg-6">
            <div className="blog__one-title">
              <span className="subtitle-one">Blog And News</span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center gy-4">
          {blogs.slice(0, 3).map((data) => {
            const formattedDate = format(new Date(data._createdAt), 'PPP');
            return (
              <div className="col-xl-4 col-lg-6" key={data._id}>
                <div className="blog__one-single-blog">
                  <div className="blog__one-single-blog-image">
                    <Link href={`/blog/${data._id}`}>
                      <Image
                        src={data.imageUrl}
                        alt="blog"
                        width={400}
                        height={250}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                  </div>
                  <div className="blog__one-single-blog-date">
                    <span className="date">{formattedDate}</span>
                  </div>
                  <div className="blog__one-single-blog-content">
                    <div className="blog__one-single-blog-content-top">
                      <span><i className="far fa-user"></i>by Admin</span>
                    </div>
                    <Link className="blog-heading" href={`/blog/${data._id}`}>
                      {data.blogName}
                    </Link>
                    <Link className="btn-three" href={`/blog/${data._id}`}>
                      Read More<i className="fas fa-angle-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
