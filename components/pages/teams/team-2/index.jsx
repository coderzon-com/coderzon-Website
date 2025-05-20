"use client"
import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import TeamMain from "./team";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

const TeamPageTwo = () => {
    return (
        <>
            <HeaderOne />
            <BreadCrumb title='Team Two' innerTitle='Team Two'/>
            <TeamMain />
            <FooterOne />
            <ScrollToTop />
        </>
    );
};

export default TeamPageTwo;