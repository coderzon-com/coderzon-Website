import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import BlogGridMain from "./blog-grid";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const BlogGrid = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Blogs" innerTitle="Blogs" />
      <BlogGridMain />
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default BlogGrid;
