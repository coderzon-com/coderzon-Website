
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
              {/* <div className="blog__details-pagination">
                <div className="blog__details-pagination-btn blog__details-pagination-prev">
                  <Link href="/blog/software-development-agility-a-primer" className="pagination-btn">
                    <i className="fas fa-arrow-left"></i>
                  </Link>
                  <div className="blog__details-pagination-text">
                    <span>Previous post</span>
                    <span>Insure your peace of mind</span>
                  </div>
                </div>
                <div className="blog__details-pagination-btn blog__details-pagination-next">
                  <div className="blog__details-pagination-text">
                    <span>Next post</span>
                    <span>Coverage you can count on</span>
                  </div>
                  <Link href="/blog/cloud-computing-solutions-for-business" className="pagination-btn">
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div> */}
              {/* <div className="blog__details-comments">
                <h3>3 Comments</h3>
                <div className="blog__details-single-comment">
                  <div className="blog__details-single-comment-user-pic">
                    <img src={avatar2.src} alt="image" />
                  </div>
                  <div className="blog__details-single-comment-body">
                    <div className="blog__details-single-comment-body-top">
                      <h5>Stanio lainto</h5>
                      <span>February 16, 2024</span>
                      <Social />
                    </div>
                    <p>
                      Ished fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <Link href="#" className="comment-reply-btn">Reply</Link>
                  </div>
                </div>
                <div className="blog__details-single-comment">
                  <div className="blog__details-single-comment-user-pic">
                    <img src={avatar3.src} alt="image" />
                  </div>
                  <div className="blog__details-single-comment-body">
                    <div className="blog__details-single-comment-body-top">
                      <h5>Court Henry</h5>
                      <span>February 16, 2024</span>
                      <Social />
                    </div>
                    <p>
                      Ished fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    </p>
                    <Link href="#" className="comment-reply-btn">Reply</Link>
                  </div>
                </div>
              </div> */}
              {/* <form action="#" className="blog__details-comment-form">
                <h3>Leave a comment</h3>
                <p>By using this form, you agree with the message storage. You can contact us directly now.</p>
                <input type="text" placeholder="Name" />
                <textarea placeholder="Message here..."></textarea>
                <input type="submit" value="Send Message" />
              </form> */}
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
