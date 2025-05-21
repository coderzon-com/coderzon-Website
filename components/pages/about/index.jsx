import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import AboutMain from "./about";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about Coderzon Technology Pvt Ltd, our mission, vision, and innovative IT solutions.",
  keywords: "About Coderzon, software company, AI services, web development",
  openGraph: {
    title: "About Coderzon Technology Pvt Ltd",
    description:
      "Discover our story and expertise in AI-driven software solutions.",
    url: "https://coderzon-website-2463.vercel.app/about",
    images: [
      {
        url: "/img/aboutPageImage.webp",
        width: 1200,
        height: 630,
        alt: "About Coderzon Technology",
      },
    ],
    type: "article",
  },
};

const AboutUs = () => {
    return (
      <>
        <HeaderOne />
        <BreadCrumb title="About Us" innerTitle="Company About" />
        <AboutMain />
        <FooterOne />        
        <ScrollToTop />
      </>
    );
};

export default AboutUs;