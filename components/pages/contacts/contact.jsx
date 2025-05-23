import HeaderOne from "@/components/layout/headers/header/header-one";
import BreadCrumb from "../common/breadcrumb";
import FooterOne from "@/components/layout/footers/footer-one";
import ScrollToTop from "../common/scroll/scroll-to-top";
import FormArea from "./form";

const ContactUs = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Contact Us" innerTitle="Contact Us" />
      <div className="contact__two section-padding">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-xl-6">
              <div className="contact__two-content">
                <div className="contact__two-title">
                  <span className="subtitle-one">Contact us</span>
                  <h2>Do you have any question?</h2>
                  <p>
                   Got a tech challenge? We’re here to solve it. From expert advice to end-to-end solutions, you can count on us to keep your digital world running smoothly — feel free to reach out anytime!
                  </p>
                </div>
                <div className="contact__two-form">
                  <FormArea />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="contact__two-contact-info">
                <div className="contact__two-single-info">
                  <div className="contact__two-single-info-icon">
                    <img src="/assets/img/icon/service-1.png" alt="Email" />
                  </div>
                  <div className="contact__two-single-info-content">
                    <h4>Email</h4>
                    <span>contact@coderzon.com</span>
                  </div>
                </div>
                <div className="contact__two-single-info">
                  <div className="contact__two-single-info-icon">
                    <img src="/assets/img/icon/service-2.png" alt="Phone" />
                  </div>
                  <div className="contact__two-single-info-content">
                    <h4>Contact</h4>
                    <span>(+91) 8301890158</span>
                  </div>
                </div>
                <div className="contact__two-single-info">
                  <div className="contact__two-single-info-icon">
                    <img src="/assets/img/icon/service-3.png" alt="Availability" />
                  </div>
                  <div className="contact__two-single-info-content">
                    <h4>Available</h4>
                    <span>Monday - Friday</span>
                    <span>9.Am To 6.Pm</span>
                  </div>
                </div>
                <div className="contact__two-single-info">
                  <div className="contact__two-single-info-icon">
                    <img src="/assets/img/icon/service-4.png" alt="Location" />
                  </div>
                  <div className="contact__two-single-info-content">
                    <h4>Location</h4>
                    <span>
                      CODERZON Technologies Pvt Ltd, AKL Heights, Seaport Road,
                      Near Bharathmatha College, Kochi, Kerala - 682021
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterOne />
      <ScrollToTop />
    </>
  );
};

export default ContactUs;
