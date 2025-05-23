import ScrollToTop from "../../common/scroll/scroll-to-top";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BannerOne from "./banner";
import About from "./about";
import ChooseUs from "./choose-us";
import Features from "./features";
import WorkArea from "./work";
import FooterOne from "@/components/layout/footers/footer-one";
import Blog from "./blog";
import ContactUs from "../../contacts/contact";
import ContactPage from "@/app/contact/page";
import MainContact from "../../contacts/MainContact";

const HomeOne = () => {
    return (
        <div>
            <HeaderOne />
            <BannerOne />
            <About />
            <ChooseUs />
            <Features />
            <WorkArea />
            <Blog />
            <MainContact/>
            <FooterOne />
            <ScrollToTop />
        </div>
    );
};

export default HomeOne;