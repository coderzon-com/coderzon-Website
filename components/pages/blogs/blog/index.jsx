import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import BlogGridMain from "./blog-grid";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import MainContact from "../../contacts/MainContact";

const BlogGrid = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Blogs" innerTitle="Blogs" />
      <BlogGridMain />
      <MainContact/>
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default BlogGrid;
