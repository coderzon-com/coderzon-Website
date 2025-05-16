import { createClient } from 'next-sanity';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to store the blogs
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors during fetch

  useEffect(() => {
    // Fetch the blogs client-side after the component mounts
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(`
          *[_type == 'blogs'] | order(_createdAt desc) {
            _id,
            blogName,
            _createdAt,
            content,
            "imageUrl": image.asset->url
          }`);
        setBlogs(data); // Set blogs data into state
      } catch (err) {
        setError('Failed to load blogs'); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading to false once fetch is done
      }
    };

    fetchBlogs(); // Call the function to fetch blogs
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Render loading or error message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Once data is loaded, render the blogs
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
                      <img src={data.imageUrl} alt="blog"/>
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
};

export default Blog;
