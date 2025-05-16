"use client";

import { useState } from "react";

const RequestQuoteMain = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    number: '',
    company: '',
    message: ''
  });
  console.log(formData);
  
  return (
    <div className="request-quote__area section-padding">
      <div className="container">
        <form action="#">
          <div className="request-quote__area-inputs">
            <div className="request-quote__area-input-field">
              <label htmlFor="first-name">First Name *</label>
              <input
                type="text"
                id="first-name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="First"
              />
            </div>
            <div className="request-quote__area-input-field">
              <label htmlFor="last-name">Last Name *</label>
              <input
                type="text"
                id="last-name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Last"
              />
            </div>
            <div className="request-quote__area-input-field">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="request-quote__area-input-field">
              <label htmlFor="number">Number *</label>
              <input
                type="text"
                id="number"
                placeholder="Contact Number"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              />
            </div>
            <div className="request-quote__area-input-field">
              <label htmlFor="company">Company/Organization *</label>
              <input
                type="text"
                id="company"
                placeholder="e.g., Coderzon"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>
          <div className="request-quote__area-input-field">
            <label htmlFor="message" className="mb-2">Message *</label>
            <textarea
              id="message"
              placeholder="Type Here"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
            <input type="submit" value="Submit Now" className="btn-two mt-4" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestQuoteMain;
