"use client"
import SEO from "@/components/data/seo";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesMain from "./services";
import WorkArea from "../../homes/home/work";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const ServicePage = () => {
    return (
        <>
            <SEO pageTitle="Our Services" />
            <HeaderOne />
            <BreadCrumb title="Our Services" innerTitle="Our Services" />
            <ServicesMain />
            <WorkArea />
            <FooterOne />
            <ScrollToTop />
        </>
    );
};

export default ServicePage;