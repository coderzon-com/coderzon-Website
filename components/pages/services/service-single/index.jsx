import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesSingleMain from "./services-single";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";
import MainContact from "../../contacts/MainContact";


const ServicesSingle = ({ serviceDetails }) => {
    const words = serviceDetails.title.split(':').slice(0, 1);
    return (
        <>
            <HeaderOne />
            <BreadCrumb title={words} innerTitle={serviceDetails?.title} />
            <ServicesSingleMain firstAndSecondWord={words} />
            <MainContact/>
            <FooterOne />
            <ScrollToTop />
        </>
    );
};

export default ServicesSingle;
