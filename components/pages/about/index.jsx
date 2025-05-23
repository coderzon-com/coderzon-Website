import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import AboutMain from "./about";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import MainContact from "../contacts/MainContact";


const AboutUs = () => {
    return (
      <>
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        <AboutMain />
        <MainContact/>
        <FooterOne />        
        <ScrollToTop />
      </>
    );
};

export default AboutUs;