import React, { useState } from 'react';

const FaqOne = () => {

    const [activeIndex, setActiveIndex] = useState(1);
    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We specialize in a broad range of IT services, including software development, cloud services, cyber security, IT consulting, and tech support. Visit our Services page for detailed information."
        },
        {
            question: "How can I request a quote for my project?",
            answer: "Fill out the contact form on this page, providing as many details as possible about your project. A representative will be in touch within one business day to discuss your needs and provide a tailored quote."
        },
        {
            question: "What is your process for client inquiries?",
            answer: "We prioritize getting back to you quickly. After an inquiry is submitted, it'll be routed to the appropriate team, who will review your information and respond with the next steps or a request for further details."
        },
        {
            question: "What are your hours of operation? ",
            answer: "Our office is open Monday-Friday from 9 AM to 5 PM [Time Zone]. For support outside of these hours, please consult our support package details or use our emergency contact methods outlined above."
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
