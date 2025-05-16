import Link from 'next/link';
import servicesData from '@/components/data/services-data';

const ServicesMain = () => {
    return (
        <>
	    <div className="services__two section-padding">
                <div className="container">
                    <div className="row gy-4">
                        {servicesData?.map((data, id) => (
                            <div className="col-xl-4 col-lg-4 col-md-6" key={id}>
                                <div className="services__two-single-service">
                                    <div className="services__two-single-service-icon">
                                        {data.icon}
                                    </div>
                                    <div className="services__two-single-service-content">
                                        <h4>{data.title}</h4>
                                        <Link href={`/services/${data.id}`} className="btn-three">Read More<i className="fas fa-chevron-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServicesMain;