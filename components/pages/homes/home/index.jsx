import ScrollToTop from "../../common/scroll/scroll-to-top";
import HeaderOne from "@/components/layout/headers/header/header-one";
import BannerOne from "./banner";
import About from "./about";
import ChooseUs from "./choose-us";
import Features from "./features";
import WorkArea from "./work";
import FooterOne from "@/components/layout/footers/footer-one";
import Blog from "./blog";

export const metadata = {
  title: "Coderzon Technology Pvt Ltd | IT Services & Technology",
  description:
    "Top-tier software solutions provider for AI, web, and mobile apps. We design modern, scalable, secure digital experiences.",
  keywords:
    "Coderzon, software company, AI development, web development, mobile apps, Next.js, React, IT consulting",
  openGraph: {
    title: "Coderzon Technology Pvt Ltd",
    description:
      "AI-driven software development & IT services company based in India.",
    url: "https://coderzon-website-2463.vercel.app/",
    images: [
      {
        url: "/img/coderzoneLogo.webp",
        width: 1200,
        height: 630,
        alt: "Coderzon Technology",
      },
    ],
    type: "website",
  },
};

const HomeOne = () => {
    return (
        <div>
            <HeaderOne />
            <BannerOne />
            <About />
            <ChooseUs />
            <Features />
            {/* <Portfolio /> */}
            <WorkArea />
            {/* <Testimonial /> */}
            <Blog />
            <FooterOne />
            <ScrollToTop />
        </div>
    );
};

export default HomeOne;