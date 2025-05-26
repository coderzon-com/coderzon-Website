import data from '@/components/data/product_platform-data';
import React from 'react';
const Product_and_Platforms = ({ id }) => {
  const product = data.find((product) => product.id ===id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="service__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="service__details-thumb">
              <img src="/assets/img/service/service-details.png" alt="service thumbnail" />
              <div className="service__details-thumb-icon">
                <div className="service__details-thumb-icon-wrapper">
                  <img src="/assets/img/icon/service-details-icon-2.png" alt="icon" />
                </div>
              </div>
            </div>

            <div className="service__details-content">
              {/* Title & Intro */}
              <h2>{product.title}</h2>
              <p>{product.p1}</p>

              {/* Subheading and intro paragraph */}
              <h3 className="sub-heading">{product.h3}</h3>
              <p>{product.p2}</p>

              {/* Why Power BI Consulting */}
              <div className="service__details-content-box">
                <div className="service__details-content-box-single">
                  <h4>{product.h4_1}</h4>
                  <p>{product.p3}</p>
                  <ul className="service-qualities">
                    {product.list?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="service__details-content-box-single">
                  <h4>{product.h4_2}</h4>
                  <p>{product.p4}</p>
                  <p>{product.p5}</p>
                </div>
              </div>
              

                  <div className="service__details-content-box">
                <div className="service__details-content-box-single">
                     <div className="workflow-section my-5">
                <h3 className="sub-heading mb-4">{product.p6}</h3>
                {product.Workflow?.map((step, idx) => (
                  <div key={idx} className="workflow-step mb-4">
                    <h5 className="font-bold">{step.title}</h5>
                    <ul>
                      {step.items.map((item, subIdx) => (
                        <li key={subIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
                </div>
                 <div>
                    
                 </div>
                <div className="service__details-content-box-single">
                 {product.useCases && (
                <section className="use-cases mb-5">
                  <h3 className="sub-heading mb-3">Use Cases</h3>
                  {Object.entries(product.useCases).map(([key, items]) => (
                    <div key={key} className="use-case-category mb-3">
                      <h5 className="capitalize">{key}</h5>
                      <ul>
                        {items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}
                </div>

                
              </div>


              {/* Mobile & Embedded Benefits */}
              {product.mobileAndEmbeddedBenefits && (
                <section className="mobile-embedded-benefits mb-5">
                  <h3 className="sub-heading mb-3">Mobile and Embedded Benefits</h3>
                  <div className="benefit-mobile mb-3">
                    <h5>Mobile</h5>
                    <p>{product.mobileAndEmbeddedBenefits.mobile}</p>
                  </div>
                  <div className="benefit-embedded">
                    <h5>Embedded</h5>
                    <p>{product.mobileAndEmbeddedBenefits.embedded}</p>
                  </div>
                </section>
              )}

              {/* Predictive & Advanced Analytics */}
              {product.predictiveAndAdvancedAnalytics && (
                <section className="predictive-analytics mb-5">
                  <h3 className="sub-heading mb-3">Predictive and Advanced Analytics</h3>
                  <div>
                    <h5>Capabilities</h5>
                    <ul>
                      {product.predictiveAndAdvancedAnalytics.capabilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5>Platforms</h5>
                    <ul>
                      {product.predictiveAndAdvancedAnalytics.platforms.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Real-Time Analytics */}
              {product.realTimeAnalytics && (
                <section className="real-time-analytics mb-5">
                  <h3 className="sub-heading mb-3">Real-Time Analytics</h3>
                  <p>{product.realTimeAnalytics.description}</p>
                  <ul>
                    {product.realTimeAnalytics.components.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Data Architecture */}
              {product.dataArchitecture && (
                <section className="data-architecture mb-5">
                  <h3 className="sub-heading mb-3">Data Architecture</h3>
                  <div className="data-types mb-3">
                    <h5>Data Types</h5>
                    <ul>
                      {product.dataArchitecture.dataTypes.map((type, idx) => (
                        <li key={idx}>{type}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="data-flow">
                    <h5>Data Flow</h5>
                    <ul>
                      {product.dataArchitecture.flow.map((flowStep, idx) => (
                        <li key={idx}>{flowStep}</li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_and_Platforms;
