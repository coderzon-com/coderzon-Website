import ServicePage from '@/components/pages/services/service';
import React from 'react';

export const metadata = {
  title: 'Our Services | Coderzon Technologies Pvt Ltd',
  description: "Explore Coderzon’s expert services including AI software development, data analytics, cloud computing, web and mobile app development, legacy software modernization, and more.",
  keywords: [
    "Coderzon services",
    "AI software development",
    "data analytics services",
    "cloud computing solutions",
    "web application development",
    "mobile app development",
    "legacy software modernization",
    "custom software development",
    "digital transformation services",
    "enterprise software solutions",
    "machine learning development",
    "big data analytics",
    "SaaS product development",
    "technology consulting",
    "UI UX design services",
    "full stack development",
    "agile software development",
    "cloud infrastructure management",
    "software maintenance services",
    "business intelligence solutions"
  ],
  openGraph: {
    title: 'Our Services | Coderzon Technologies Pvt Ltd',
    description: "Discover the wide range of technology services offered by Coderzon including AI, analytics, cloud, and app development tailored to your business needs.",
    url: 'https://coderzon-website-2463.vercel.app/services',
    siteName: 'Coderzon',
    images: [
      {
        url: 'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width: 1200,
        height: 630,
        alt: 'Coderzon Services',
      }
    ],
    type: 'website',
  }
};


const ServicePages = () => {
    return (
        <>
            <ServicePage />
        </>
    );
};

export default ServicePages;