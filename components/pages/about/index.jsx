import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import AboutMain from "./about";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about Coderzon Technology Pvt Ltd, our mission, vision, and innovative IT solutions.",
  keywords: "About Coderzon, software company, AI services, web development,Cloud Solutions",
};

const AboutUs = () => {
    return (
      <>
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        <AboutMain />
        <FooterOne />        
        <ScrollToTop />
      </>
    );
};

export default AboutUs;