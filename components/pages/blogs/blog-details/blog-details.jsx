import BlogSidebar from '../blog-sidebar/blog-sidebar';
import { format } from 'date-fns';
import { PortableText } from '@portabletext/react';

const BlogSingleMain = ({ singleData }) => {
  const createdAt = singleData?._createdAt;
  const isValidDate = createdAt && !isNaN(new Date(createdAt).getTime());
  const formattedDate = isValidDate ? format(new Date(createdAt), 'PPP') : 'Invalid Date';

  return (
    <>
      <div className="blog__details section-padding">
        <div className="container ">
          <div className="row gy-4 flex-wrap-reverse">
            <div className="col-xl-8 p-3">
              <div className="blog__details-thumb">
                <span className="date">{formattedDate}</span>
                <img className="img__full rounded-md" src={singleData?.imageUrl} alt="blog-details-image" />
              </div>
              <div className="blog__details-content">
                <div className="blog__details-content-top">
                  <span>
                    <i className="far fa-user"></i>
                    by Admin
                  </span>
                </div>
                <h2>{singleData?.blogName}</h2>
               <PortableText value={singleData?.content}/>
                
              </div>
            </div>
            <div className="col-xl-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSingleMain;
