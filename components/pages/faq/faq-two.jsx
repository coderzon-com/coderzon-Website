import React, { useState } from 'react';

const FaqOne = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const faqs = [
        {
            question: "Do you have any Partnerships?",
            answer: "es, we have several international partnerships as well as some  to help cater to our global clients. For more information, please contact our partnership division through this page."
        },
        {
            question: "What is your approach to cybersecurity?",
            answer: "We take a proactive and comprehensive approach to cybersecurity, implementing layered security measures to protect your data, applications, and networks from threats."
        },
        {
            question: "Can I get a free consultation for  needs?",
            answer: "We offer a free initial consultation to understand your business requirements and propose how our services can assist you. Please use our online booking system or call us directly to schedule your consultation."
        },
        {
            question: "How can I submit a support ticket?",
            answer: "For current clients requiring technical support, please visit the Support section of our website and submit a ticket through our automated system. Our technical team aims to respond to all tickets within 24 hours."
        },
    ];
    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-collapse">
            {faqs.map((faq, index) => (
                <div className="faq-collapse-item" key={index}>
                    <div className={`faq-collapse-item-card ${activeIndex === index ? 'active' : ''}`}>
                        <div className="faq-collapse-item-card-header" onClick={() => toggleFaq(index)}>
                            <i className={`fas ${activeIndex === index ? 'fa-minus' : 'fa-plus'}`}></i>
                            <h6>{faq.question}</h6>
                        </div>
                        <div className={`faq-collapse-item-card-header-content ${activeIndex === index ? 'active' : 'display-none'}`}>
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FaqOne;
