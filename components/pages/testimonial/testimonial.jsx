import icon from "../../../public/assets/img/testimonial/testimonial-quote-two.png";
import avatar1 from "../../../public/assets/img/avatar/avatar-1.jpg";
import avatar2 from "../../../public/assets/img/avatar/avatar-2.jpg";

const TestimonialMain = () => {
    return (
        <>
        <div className="testimonial__five section-padding">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-6">
                        <div className="testimonial__five-card">
                            <div className="testimonial__five-card-top mb-40">
                                <img src={icon.src} alt="image" />
                                <div className="testimonial-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <p>Their product exceeded his my ro expectationsa The the quality and attention to moutstandin an and it has become an essential active</p>
                            <div className="testimonial__five-card-profile">
                                <img src={avatar2.src} alt="image" />
                                <div className="testimonial__five-card-profile-content">
                                    <h4>Nasir Al Shakib</h4>
                                    <span>Content creator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="testimonial__five-card">
                            <div className="testimonial__five-card-top mb-40">
                            <img src={icon.src} alt="image" />
                                <div className="testimonial-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <p>Their product exceeded his my ro expectationsa The the quality and attention to moutstandin an and it has become an essential active</p>
                            <div className="testimonial__five-card-profile">
                                <img src={avatar1.src} alt="image" />
                                <div className="testimonial__five-card-profile-content">
                                    <h4>Nasir Al Shakib</h4>
                                    <span>Content creator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="testimonial__six section-padding">
            <div className="container">
                <div className="row justify-content-center text-center mb-50">
                    <div className="col-lg-7 col-lg-7 col-md-9">
                        <span className="subtitle-one">Praise & Feedback</span>
                        <h2>Customer Experiencess</h2>
                    </div>
                </div>
                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div className="testimonial__six-card">
                            <h4>Sara Albert</h4>
                            <span>video creator</span>
                            <p>Their professionals demonstrated a deep understanding of our business needs and provided tailored solutions that</p>
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial__six-card">
                            <h4>Sara Albert</h4>
                            <span>video creator</span>
                            <p>Their professionals demonstrated a deep understanding of our business needs and provided tailored solutions that</p>
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="testimonial__six-card">
                            <h4>Sara Albert</h4>
                            <span>video creator</span>
                            <p>Their professionals demonstrated a deep understanding of our business needs and provided tailored solutions that</p>
                            <div className="testimonial-rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default TestimonialMain;