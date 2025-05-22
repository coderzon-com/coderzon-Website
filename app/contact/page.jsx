import ContactUs from '@/components/pages/contacts/contact';

export const metadata = {
  title: 'Contact Us | Coderzon Technologies Pvt Ltd',
  description: "Get in touch with Coderzon Technologies for top-tier AI software development, data analytics solutions, cloud services, and custom application development. We're here to help you build the future.",
  keywords: [
    "Contact Coderzon",
    "Coderzon Technologies Pvt Ltd",
    "software development contact",
    "AI software company contact",
    "data analytics company",
    "cloud computing services",
    "custom web development company",
    "mobile app development contact",
    "technology consulting firm",
    "digital transformation experts",
    "enterprise software solutions",
    "machine learning development",
    "SaaS solutions company",
    "India software company",
    "AI development services",
    "software support team",
    "get in touch with Coderzon",
    "contact software agency",
    "coderzon office contact",
    "project consultation Coderzon"
  ],
  openGraph: {
    title: 'Contact Us | Coderzon Technologies Pvt Ltd',
    description: "Reach out to Coderzon Technologies for custom AI, cloud, analytics, and web development solutions tailored to your business.",
    url: 'https://coderzon-website-2463.vercel.app/contact',
    siteName: 'Coderzon',
    images: [
      {
        url: 'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Coderzon',
      }
    ],
    type: 'website',
  }
};

const ContactPage = () => {
    return (
        <>
            <ContactUs />
        </>
    );
};

export default ContactPage;