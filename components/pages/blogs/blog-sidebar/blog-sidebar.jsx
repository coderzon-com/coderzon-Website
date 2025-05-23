'use client'
import { createClient } from 'next-sanity';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-14',
});

const BlogSidebar = () => {
  const [blogs, setBlogs] = useState([]); 
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await client.fetch(`
          *[_type == 'blogs'] | order(_createdAt desc) {
            _id,
            "slug":slug.current,
            blogName,
            _createdAt,
            content,
            "imageUrl": image.asset->url
          }`);
        setBlogs(data); 
      } catch (err) {
        console.log('Failed to load blogs', err); 
      }
    };

    fetchBlogs(); 
  }, []);
  const filteredBlogs = searchText
    ? blogs.filter((blog) => blog.blogName.toLowerCase().includes(searchText.toLowerCase()))
    : blogs;
  const blogPost = filteredBlogs.slice(0, 3);

  return (
    <div className="all__sidebar dark_image ml-25 xl-ml-0">
      <div className="all__sidebar-item">
        <h6>Search</h6>
        <div className="all__sidebar-item-search">
          <form action="#">
            <input
              type="text"
              placeholder="Search....."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit">
              <i className="fal fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div className="all__sidebar-item">
        <h6>Recent Post</h6>
        <div className="all__sidebar-item-post">
          {blogPost.length === 0 ? (
            <p>No blogs found</p> // Display this message if no blogs are found
          ) : (
            blogPost.map((data, id) => {
              const formattedDate = format(new Date(data._createdAt), 'PPP');
              return (
                <div className="post__item" key={id}>
                  <div className="post__item-image">
                    <Link href={`/blog/${data.slug}`}>
                      <img src={data.imageUrl} alt={data.blogName} className='rounded'/>
                    </Link>
                  </div>
                  <div className="post__item-title">
                    <h6>
                      <Link href={`/blog/${data.slug}`}>{data.blogName}</Link>
                    </h6>
                    <span>
                      <i className="far fa-calendar-alt"></i>{formattedDate}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
