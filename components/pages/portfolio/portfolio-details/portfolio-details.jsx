import icon from '../../../../public/assets/img/icon/project-details-icon.png';
import image1 from '../../../../public/assets/img/portfolio/project-details.png';
import image2 from '../../../../public/assets/img/portfolio/project-details-2.png';

const PortfolioDetailsMain = ({singleData}) => {
    return (
        <div className="project__details section-padding">
            <div className="container">
                <div className="row gy-4 mb-40 justify-content-center">
                    <div className="col-xl-4 col-lg-5">
                        <div className="project-feature">
                            <h4>Database Management</h4>
                            <div className="project-feature-icon">
                                <img src={icon.src} alt="image" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="project-feature">
                            <h4>Cloud Computing</h4>
                            <div className="project-feature-icon">
                                <img src={icon.src} alt="image" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="project-feature">
                            <h4>Network Security</h4>
                            <div className="project-feature-icon">
                                <img src={icon.src} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="project__details-thumb">
                            <img src={singleData.image.src} alt="image" />
                            <div className="project-info">
                                <div className="project-info-top">
                                    <h4>Project Details</h4>
                                </div>
                                <ul>
                                    <li>Name:<span>Net Works</span></li>
                                    <li>Author:<span>Rajin Saleh</span></li>
                                    <li>Date:<span>23 December,2023</span></li>
                                    <li>Tags:<span>DataMasters</span></li>
                                    <li>Value:<span className="value">$ 240</span></li>
                                    <li className="project-rating">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="project__details-content">
                            <div className="project__details-content-mid">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galltype and scrambled it to make a type specimen book. It has survived not only five centuries tinto electronic typesetting remaining essentially unchanged Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
                                <h3>Enabling Seamless IT Experiences</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galltype and scrambled it to make a type specimen book</p>
                                <p>. It has survived not only five centuries tinto electronic typesetting remaining essentially unchanged Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
                            </div>
                        </div>
                    </div>
                    <div className="project__details-images">
                        <img src={image1.src} alt="image" />
                        <img src={image2.src} alt="image" />
                    </div>
                    <div className="project__details-content">
                        <div className="project__details-content-bottom">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industr standard dummy text ever since the 1500s, when an unknown printer took a galltype and scrambled it to make a type specimen book. It has survived a only five centuries tinto electronic typesetting remaining essentially unchanged Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioDetailsMain;