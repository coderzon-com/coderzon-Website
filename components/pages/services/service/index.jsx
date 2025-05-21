import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../../common/breadcrumb";
import ServicesMain from "./services";
import WorkArea from "../../homes/home/work";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../../common/scroll/scroll-to-top";

// ✅ Server-side SEO metadata
export const metadata = {
  title: "Our Services",
  description: "Explore the range of professional services we offer to help your business grow.",
};

const ServicePage = () => {
  return (
    <>
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
