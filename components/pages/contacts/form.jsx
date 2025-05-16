import React, { useState } from 'react';

const FormArea = () => {
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        subject:'',
        message:''
    })
    console.log(formData);
    
    return (
        <>
            <form action="#">
                <div className="row">
                    <div className="col-md-6 mb-30">
                        <div className="contact__form-area-item">
                            <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} placeholder="Full Name" required="required" />
                        </div>
                    </div>
                    <div className="col-md-6 md-mb-30">
                        <div className="contact__form-area-item">
                            <input type="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} placeholder="Email Address" required="required" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-30">
                        <div className="contact__form-area-item">
                            <input type="text" value={formData.subject} onChange={(e)=>setFormData({...formData,subject:e.target.value})} placeholder="Subject" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-30">
                        <div className="contact__form-area-item">
                            <textarea value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="contact__two-right-form-item">
                            <button className="btn-one" type="submit">Submit Now</button>
                        </div>
                    </div>
                </div>
            </form>            
        </>
    );
};

export default FormArea;