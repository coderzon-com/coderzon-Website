import RequestQuote from "@/components/pages/request-quote";

export const metadata = {
  title: 'Request a Quote | Coderzon Technologies Pvt Ltd',
  description: "Request a personalized quote from Coderzon Technologies for custom AI software, data analytics, cloud solutions, and web/mobile app development etc ..., tailored to your business needs.",
  keywords: [
    "Request a quote Coderzon",
    "Coderzon Technologies quote",
    "custom software quote",
    "AI development pricing",
    "data analytics quote",
    "cloud computing pricing",
    "web app development quote",
    "mobile app development pricing",
    "software project estimate",
    "enterprise software quote",
    "digital transformation quote",
    "custom software development cost",
    "get a quote for software",
    "technology consulting quote",
    "software solution estimate",
    "project consultation quote",
    "Coderzon pricing",
    "business software quote",
    "startup software quote",
    "MVP development quote"
  ],
  openGraph: {
    title: 'Request a Quote | Coderzon Technologies Pvt Ltd',
    description: "Get your custom software development quote from Coderzon Technologies. Tailored pricing for AI, cloud, analytics, and app development services.",
    url: 'https://coderzon-website-2463.vercel.app/request-quote',
    siteName: 'Coderzon',
    images: [
      {
        url: 'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width: 1200,
        height: 630,
        alt: 'Request a Quote at Coderzon',
      }
    ],
    type: 'website',
  }
};


const RequestQuotePage = () => {
    return (
        <>
            <RequestQuote />
        </>
    );
};

export default RequestQuotePage;