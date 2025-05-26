import about1 from "../../../../public/assets/img/about/about-1.png";
import about2 from "../../../../public/assets/img/about/about-2.png";
import Link from "next/link";
import Count from "../../common/count";

const About = () => {
    return (
        <>
        <div className="about__one section-padding">
            <div className="container">
                <div className="row align-items-center flex-wrap-reverse gy-4">
                    <div className="col-xl-6 col-lg-5">
                        <div className="about__one-image">
                            <div className="experience-bar animate-y-axis-slider">
                                <i className="flaticon-consultant"></i>
                                <div className="experience-bar-right">
                                    <div className="experience-bar-counter">
                                        <h4 className="counter"><Count number={25}/></h4>
                                        <span>+</span>
                                    </div>
                                    <span>Years Experience</span>
                                </div>
                            </div>
                            <div className="about__one-image-wrapper">
                                <img src={about1.src} alt="image" className="image-1" />
                                <img src={about2.src} alt="image" className="image-2" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7 col-md-9">
                        <div className="about__one-content">
                            <span className="subtitle-one">About us</span>
                            <h2>Empower businesses through technology, innovation, and excellence</h2>
                            <p >we specialize in delivering cutting-edge technology consulting services that drive innovation and business success. With a team of highly experienced software architects and engineers, we help organizations across the globe build scalable, secure, and future-ready digital solutions.
From enterprise web and mobile app development to AI, data engineering, cloud computing, blockchain, and system integration, we bring deep technical expertise and industry insights to every project. Whether you're a startup looking to accelerate growth or an enterprise aiming to modernize your tech stack, Coderzon is your trusted technology partner.
</p>
                            {/* <div className="about__one-content-service">
                                   <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Artificial Intelligence</span>
                                </div>
                                 <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Data Management Experts</span>
                                </div>
                               
                                    <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Web App Developments</span>
                                </div>
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>IT Infrastructure Solutions</span>
                                </div>
                               
                                <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Data Analytics Consulting</span>
                                </div>
                               
                                  <div className="service">
                                    <i className="far fa-check-circle"></i>
                                    <span>Mobile  App Development</span>
                                </div>
                                
                            </div> */}
                            <Link href="/services" className="btn-one">Discover More<i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default About;