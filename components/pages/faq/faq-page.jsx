import React from 'react';
import FaqOne from './faq-one';
import FaqTwo from './faq-two';


const FaqPage = () => {
    return (
        <>
        <div className="faq__three section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="faq-collapse">
                            <FaqOne />
                        </div>	
                    </div>
                    <div className="col-xl-6">
                        <div className="faq-collapse">
                            <FaqTwo />
                        </div>	
                    </div>
                </div>
            </div>
        </div>     
        </>
    );
};

export default FaqPage;