import portfolioData from "@/components/data/portfolio-data";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay} from 'swiper/modules';
import Link from "next/link";

const Portfolio = () => {
    const slideControl = {
		spaceBetween: 35,
		slidesPerView: 3,
		centeredSlides: true,
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 4500,
            reverseDirection: false,
            disableOnInteraction: false,
        },
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			575: {
				slidesPerView: 1
			},
			992: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 3
			},
		}
    };
    return (
        <div className="portfolio__one section-padding">
            <div className="container">
                <div className="row gy-4 align-items-end justify-content-between mb-5">
                    <div className="col-xl-6 col-lg-7 col-md-9 col-sm-10">
                        <div className="portfolio__one-content-left">
                            <span className="subtitle-one">Tech Portfolio</span>
                            <h2>Case Studies in Ingenious IT Portfolio</h2>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="portfolio__one-content-right text-lg-end">
                            <Link href="/portfolio/3-columns" className="btn-one">All Portfolio<i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container custom__container">
                <Swiper modules={[EffectFade, Autoplay]} {...slideControl} className="py-5">
                    {portfolioData?.map((data, id) => (
                        <SwiperSlide key={id} className="portfolio__one-single-portfolio single-portfolio">
                            <img src={data.image.src} alt="image" />
                            <div className="portfolio__one-single-portfolio-content">
                                <h4><Link href={`/portfolio/${data.id}`}>{data.title}</Link></h4>
                                <span>{data.subtitle}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Portfolio;