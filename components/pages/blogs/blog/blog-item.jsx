import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';

const BlogItem = ({ currentBlogItems }) => {
  return (
    <>
      {currentBlogItems?.map((data, id) => {
        const formattedDate = format(new Date(data._createdAt), 'PPP');
        return (
          <div className="col-xl-4 col-lg-6" key={id}>
            <div className="blog__two-single-blog">
              <div className="blog__two-single-blog-img">
                <div className="blog__two-single-blog-date">
                  <span className="date">{formattedDate}</span>
                </div>
                <Link href={`/blog/${data.slug}`}>
                  <img className='blog__one-single-blog-image' src={data.imageUrl} alt="blog" />
                </Link> 
              </div>
              <div className="blog__two-single-blog-content">
                <div className="blog__two-single-blog-content-top">
                  <span><i className="far fa-user"></i>by Admin</span>
                </div>
                <Link
                  href={`/blog/${data.slug}`}
                  className="blog__two-single-blog-content-title"
                >
                  {data.blogName}
                </Link>
                <Link className="btn-three" href={`/blog/${data.slug}`}>
                  Read More<i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogItem;
