"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesSingleMain from "./services-single";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const ServicesSingle = ({serviceDetails}) => {
    const words = serviceDetails.title.split(':').slice(0,1);
    return (
        <>
            <SEO pageTitle={serviceDetails?.title} />            
            <HeaderOne />
            <BreadCrumb title={words} innerTitle={serviceDetails?.title} />
            <ServicesSingleMain firstAndSecondWord={words} />
            <FooterOne />
            <ScrollToTop />
        </>
    );
};

export default ServicesSingle;