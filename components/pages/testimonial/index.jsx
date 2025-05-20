"use client"
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import TestimonialMain from "./testimonial";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

const Testimonial = () => {
    return (
        <>
            <HeaderOne />
            <BreadCrumb title='Testimonials' innerTitle='Testimonials' />
            <TestimonialMain />
            <FooterOne />
            <ScrollToTop
             />         
        </>
    );
};

export default Testimonial;