
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import PricingPlansMain from "./pricing-plans";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

const PricingPages = () => {
    return (
        <>
            <HeaderOne />
            <BreadCrumb title='Pricing Plan' innerTitle='Pricing Plan' />
            <PricingPlansMain />
            <FooterOne />    
            <ScrollToTop />
        </>
    );
};

export default PricingPages;