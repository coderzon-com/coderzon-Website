import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import FaqPage from "./faq-page";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";


const Faq = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Question & Ans." innerTitle="FAQ's" />
      <FaqPage />
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default Faq;
