'use client'
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesSingleMain from "./services-single";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

export const metadata =(serviceDetails)=> ({
  title: serviceDetails.title,
  description: "Explore the range of professional services we offer to help your business grow.",
});

const ServicesSingle = ({ serviceDetails }) => {
    const words = serviceDetails.title.split(':').slice(0, 1);
    return (
        <>
            <HeaderOne />
            <BreadCrumb title={words} innerTitle={serviceDetails?.title} />
            <ServicesSingleMain firstAndSecondWord={words} />
            <FooterOne />
            <ScrollToTop />
        </>
    );
};

export default ServicesSingle;
