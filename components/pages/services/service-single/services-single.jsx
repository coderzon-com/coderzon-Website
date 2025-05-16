import ServicesDetail from '../../../../public/assets/img/service/service-details.png';
import image1 from '../../../../public/assets/img/icon/service-details-icon-2.png';
import image2 from '../../../../public/assets/img/icon/service-details-icon.png';
import { useParams } from 'next/navigation';
import servicesData from '@/components/data/services-data';

const ServicesSingleMain = ({ firstAndSecondWord}) => {
 const {id} = useParams();
 const service=servicesData.find((service)=>service.id === id)
  return (
    <div className="service__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="service__details-thumb">
              <img src={ServicesDetail.src} alt="service thumbnail" />
              <div className="service__details-thumb-icon">
                <div className="service__details-thumb-icon-wrapper">
                  <img src={image1.src} alt="icon" />
                </div>
              </div>
            </div>

            <div className="service__details-content">
              <h2>{firstAndSecondWord}</h2>
              <p>{service?.p1}</p>

              <h3 className="sub-heading">{service?.h3}</h3>
              <p>{service?.p2}</p>

              <div className="service__details-content-box">
                <div className="service__details-content-box-single">
                  <h4>{service?.h4_1}</h4>
                  <p>{service?.p3}</p>
                  <ul className="service-qualities">
                    {service?.list?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="service__details-content-box-single">
                  <div className="icon">
                    <img src={image2.src} alt="icon" />
                  </div>
                  <h4 className="mb-4">{service?.h4_2}</h4>
                  <p className="m-0">{service?.p4}</p>
                </div>
              </div>

              <p>{service?.p5}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSingleMain;
