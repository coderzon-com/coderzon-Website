import Faq from "@/components/pages/faq";
export const metadata = {
  title: 'FAQs | Coderzon Technologies Pvt Ltd',
  description: "Find answers to frequently asked questions about Coderzon's AI solutions, data analytics services, web and mobile app development, cloud infrastructure, and more. Get clarity before you collaborate with us.",
  keywords: [
    "Coderzon FAQs",
    "frequently asked questions",
    "AI development FAQ",
    "data analytics support",
    "cloud computing queries",
    "web app development help",
    "mobile app development FAQ",
    "software company support",
    "how to contact Coderzon",
    "project requirements Coderzon",
    "technology consulting questions",
    "MVP development queries",
    "legacy software modernization FAQ",
    "support for software services",
    "tech solutions Coderzon",
    "AI software company India",
    "onboarding with Coderzon",
    "Coderzon services explained",
    "FAQ for startups",
    "custom software development FAQ"
  ],
  openGraph: {
    title: 'FAQs | Coderzon Technologies Pvt Ltd',
    description: "Explore frequently asked questions about Coderzon’s services including AI, cloud, web development, and more. Get the information you need before working with us.",
    url: 'https://coderzon-website-2463.vercel.app/faq',
    siteName: 'Coderzon',
    images: [
      {
        url: 'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width: 1200,
        height: 630,
        alt: 'Coderzon FAQ',
      }
    ],
    type: 'website',
  }
};

const FaqPage = () => {
    return (
        <>
            <Faq />
        </>
    );
};

export default FaqPage;