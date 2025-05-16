import workBg from "../../../../public/assets/img/work-process/work-process-bg.png";
import image1 from "../../../../public/assets/img/work-process/work-process-1.png";
import image2 from "../../../../public/assets/img/work-process/work-process-2.png";
import Count from "../../common/count";

const WorkArea = () => {
    return (
        <div className="work-process-area__one section-padding" style={{backgroundImage: `url(${workBg.src})`}}>
            <div className="container">
                <div className="row align-items-end work-process-area__one-title">
                    <div className="col-xl-7 col-lg-7">
                        <div className="work-process-area__one-content-left">
                            <span className="subtitle-one">Work Process</span>
                            <h2>Sustainable and Responsible Computing</h2>
                        </div>
                    </div>
                    <div className="col-xl-4 offset-xl-1 col-lg-4 offset-lg-1">
                        <div className="work-process-area__one-content-right">
                            <p>Discuss strategies for reducing energy consumption in data centers, personal devices, and reduce power usage</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center gy-4">
                    <div className="col-xl-6">
                        <div className="work-process-area__one-single-work">
                            <span>01</span>
                            <div className="work-process-area__one-single-work-content">
                                <h4>Assess Requirements Precisely</h4>
                                <p>Begin by comprehensively understanding your business needs to ensure a perfect fit for tech solutions.</p>
                            </div>
                        </div>
                        <div className="work-process-area__one-single-work">
                            <span>02</span>
                            <div className="work-process-area__one-single-work-content">
                                <h4>Develop Custom Solutions</h4>
                                <p>Engage in crafting tailor-made software designed meticulously to align with your specific targets.</p>
                            </div>
                        </div>
                        <div className="work-process-area__one-single-work">
                            <span>03</span>
                            <div className="work-process-area__one-single-work-content">
                                <h4>Implement and Support</h4>
                                <p>Seamlessly integrate the new systems into framework with ongoing support for continual optimization.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="work-process-area__one-right-img">
                            <img src={image1.src} alt="image" />
                        </div>
                        <div className="work-process-area__one-right-counter-img">
                            <div className="img-counter">
                                <div className="counter-only">
                                    <h2 className="counter"><Count number={20}/></h2>
                                    <h2>+</h2>
                                </div>
                                <span>years of experiences</span>
                            </div>
                            <img src={image2.src} alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkArea;