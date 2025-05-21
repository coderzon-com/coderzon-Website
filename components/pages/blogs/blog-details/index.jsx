import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import BlogSingleMain from "./blog-details";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

export const metadata = ({singleData }) => ({
  title: singleData?.title || 'Blog Details',
  description: singleData?.excerpt || 'Read the detailed blog post',
});

const BlogDetails = ({ singleData }) => {
  const firstThreeWords = singleData?.blogName.split(' ').slice(0, 3).join(' ') + '...';

  return (
    <>
      <HeaderOne />
      <BreadCrumb title={firstThreeWords} innerTitle={singleData?.blogName} />
      <BlogSingleMain singleData={singleData} />
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default BlogDetails;
