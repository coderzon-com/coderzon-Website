import image from "../../../../public/assets/img/service/services.png";

const Features = () => {
    return (
        <>
        <div className="services__one section-padding">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-xl-7 col-lg-7 col-md-9 services__one-title">
                        <span className="subtitle-one">Core Features</span>
                        <h2>Innovative IT Strategies and Solutions</h2>
                    </div>
                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-3">
                        <div className="row">
                            <div className="col-xl-12 col-md-6">
                                <div className="single-service">
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-global-network"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <h4>Cloud Solutions Management</h4>
                                        <p>Seamless deployment, scaling, and monitoring of cloud infrastructure to ensure business continuity and agility.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-md-6 xl-mb-30">
                                <div className="single-service">
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-mobile-phone-1"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <h4>Analytics & Business Intelligence</h4>
                                        <p>Transform data into actionable insights with advanced analytics, dashboards, and data-driven decision-making tools.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-7">
                        <div className="services-image-wrapper">
                            <img src={image.src} alt="IT Services" />
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="row">
                            <div className="col-xl-12 col-md-6">
                                <div className="single-service">
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-idea"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <h4>Custom Software Development</h4>
                                        <p>Designing scalable, secure, and tailored software solutions that drive innovation and business efficiency.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-12 col-md-6">
                                <div className="single-service">
                                    <div className="services__one-single-service-icon">
                                        <i className="flaticon-it"></i>
                                    </div>
                                    <div className="services__one-single-service-content">
                                        <h4>Machine Learning Implementation</h4>
                                        <p>Deploy intelligent systems that automate processes, enhance accuracy, and unlock predictive capabilities.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

export default Features;
