import AboutUs from "@/components/pages/about";
export const  metadata={
 title:'About Us | Coderzon Technologies Pvt Ltd',
 description:"Learn More about Coderzon, a leading provider of Artificial Intelligence, data analytics, cloud computing, and custom web application solutions and more ...",
   keywords: [
  "Coderzon Technologies Pvt Ltd",
  "Codiin",
  "AI software development",
  "artificial intelligence services",
  "data analytics consulting",
  "business intelligence solutions",
  "cloud computing services",
  "cloud infrastructure management",
  "web application development",
  "custom software development",
  "software company in India",
  "enterprise software solutions",
  "mobile app development",
  "iOS and Android app development",
  "MVP development for startups",
  "legacy software modernization",
  "digital transformation company",
  "machine learning development",
  "deep learning services",
  "predictive analytics solutions",
  "big data analytics company",
  "network analysis tools",
  "real-time data processing",
  "SaaS product development",
  "technology consulting firm",
  "UI UX design services",
  "agile software development team",
  "full stack web developers",
  "data-driven decision making",
  "AI and cloud integration services"
],
  openGraph:{
    title:'About Us | Coderzon Technologies Pvt Ltd',
    description:"Learn More about Coderzon, a leading provider of Artificial Intelligence, data analytics, cloud computing, and custom web application solutions and more ...",
    url:'https://coderzon-website-2463.vercel.app/about',
    siteName:'Coderzon',
    images:[{
        url:'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width:1200,
        height:630,
        alt:'About Us'
    }],
    type:"website"
  }

}
const About = () => {
    return (
        <>
            <AboutUs />
        </>
    );
};

export default About;