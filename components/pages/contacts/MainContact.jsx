import React from 'react';
import FormArea from './form';
import Image from 'next/image';
import Link from 'next/link';

const MainContact = () => {
  return (
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
                  <div >
                     <Image src='/assets/img/vijeesh_sir.jpg' width={150} height={150} />
                  </div>
                  <div className="contact__two-single-info-content">
                    <h4>Vijeesh Tp</h4>
                    <span>Head of Sales & Account Executive</span>
                    <Link  href='https://www.linkedin.com/in/vijeesh-tp-91268015a/' target='_blank'><i className="fab fa-linkedin-in"></i></Link>
                  </div>
                </div>                   
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MainContact;
