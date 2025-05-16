import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FormArea = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company:'',
    message: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('company/organization',formData.company)
    data.append('message', formData.message);
    data.append('access_key', process.env.NEXT_PUBLIC_FORM_ACCESS_KEY);

    const object = Object.fromEntries(data);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: 'Good job!',
          text: 'Message Sent Successfully',
          icon: 'success',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        Swal.fire('Oops!', 'Something went wrong.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Network Error', 'Please try again later.', 'error');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-30">
            <div className="contact__form-area-item">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Full Name"
                required
              />
            </div>
          </div>
          <div className="col-md-6 md-mb-30">
            <div className="contact__form-area-item">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email Address"
                required
              />
            </div>
          </div>
          <div className="col-md-12 mb-30">
            <div className="contact__form-area-item">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Subject"
              />
            </div>
          </div>
             <div className="col-md-12 mb-30">
            <div className="contact__form-area-item">
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Company/Organization"
              />
            </div>
          </div>
          <div className="col-md-12 mb-30">
            <div className="contact__form-area-item">
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Message"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-md-12">
            <div className="contact__two-right-form-item">
              <button className="btn-one" type="submit">
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormArea;
