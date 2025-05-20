'use client'
import Social from "@/components/data/social";
import Link from "next/link";
import ctaBg from "../../../public/assets/img/subscribe/subscribe-one-shape-1.png";
import footerBg from "../../../public/assets/img/shape/footer-two-bg.png";
import servicesData from "@/components/data/services-data";
import { useState } from "react";
import Swal from 'sweetalert2';

const FooterOne = () => {
	const [email,setEmail]=useState({
		email:''
	})
 async function handleSubmit(event) {
	  event.preventDefault();
	  const data = new FormData();
	  data.append('News Letter Subscription email', email.email);
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
			text: 'Subscribed Successfully',
			icon: 'success',
		  });
		  setEmail({
			email: '',
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
        <div className="subscribe__one">
            <div className="container">
                <div className="row justify-content-center text-center subscribe__one-content" style={{backgroundImage: `url(${ctaBg.src})`}}>
                    <div className="col-xl-7 col-lg-8">
                        <div className="subscribe__one-title">
                            <h3>Subscribe Our newsletter</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="subscribe__one-form">
                            <input type="email" placeholder="Enter Your Email" value={email.email} onChange={(e)=>setEmail({email:e.target.value})} />
                            <button className="btn-two" type="submit">subscribe now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
		<div className="footer__two">
			<img className="footer__two-shape" src={footerBg.src} alt="image" />
			<div className="container">
				<div className="row gy-4 justify-content-between">
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
						<div className="footer__two-widget">
							<div className="footer__two-widget-about">
								<Link href="/"><img src='/assets/img/coderzoneLogo.webp' alt="image" /></Link>
								<p>At CODERZON, we specialize in delivering cutting-edge technology consulting services</p>
								<div className="footer__two-widget-about-location">
									<div className="footer__two-widget-about-location-item">
										<div className="footer__two-widget-about-location-item-icon">
											<i className="flaticon-telephone-call"></i>
										</div>
										<div className="footer__two-widget-about-location-item-info">
											<span>Phone Number</span>
											<Link href="tel:(+91)8301890158">(+91) 8301890158</Link>
										</div>
									</div>
									<div className="footer__two-widget-about-location-item">
										<div className="footer__two-widget-about-location-item-icon">
											<i className="flaticon-mail"></i>
										</div>
										<div className="footer__two-widget-about-location-item-info">
											<span>Email</span>
											<Link href="mailto:contact@coderzon.com" >contact@coderzon.com</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
						<div className="footer__two-widget ml-85">
							<h4>Quick Link</h4>
							<div className="footer__two-widget-solution">
								<ul>
									<li><Link href="/services"><i className="far fa-chevron-double-right"></i>Service</Link></li>
									<li><Link href="faq"><i className="far fa-chevron-double-right"></i>FAQ</Link></li>
									<li><Link href="about"><i className="far fa-chevron-double-right"></i>About Us</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
						<div className="footer__two-widget">
							<h4>Our Services</h4>
							<div className="footer__two-widget-solution">
								<ul>
									{servicesData.slice(0, 4).map((data, id) => {
										const words = data.title.split(':');
										const firstAndSecondWord = words.slice(0,1);
										return (
											<li key={id}><Link href={`/services/${data.id}`}><i className="far fa-chevron-double-right"></i>{firstAndSecondWord}</Link></li>
										);
									})}
									<li><Link href='services'><i className="far fa-chevron-double-right"></i>view more</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
						<div className="footer__two-widget">
							<h4>Follow Us</h4>
							<div className="footer__two-widget-subscribe">
								<p>The latest news, articles, sent to your inbox weekly.</p>
								<div className="footer__two-widget-social">	
									<Social />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="copyright__one">
				<div className="container">
					<div className="row justify-content-between copyright__one-container-area">
						<div className="col-xl-5 col-lg-6"> 
							<div className="copyright__one-left">
								<p>© CODERZON Technologies Pvt Ltd | All Rights Reserved</p>
							</div>
						</div>
						<div className="col-xl-5 col-lg-6">
							<div className="copyright__one-right">
								<Link href="/contact">Contact Us</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        </>
    );
};

export default FooterOne;