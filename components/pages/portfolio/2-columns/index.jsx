'use client'
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import TwoColumns from "./two-columns";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const PortfolioTowColumns = () => {
    return (
        <>
            <HeaderOne />
            <BreadCrumb title="02 Columns" innerTitle="Portfolio Grid" />
            <TwoColumns />        
            <FooterOne />    
            <ScrollToTop />      
        </>
    );
};

export default PortfolioTowColumns;