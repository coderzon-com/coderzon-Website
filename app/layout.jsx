import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coderzon Technology Pvt Ltd | IT Services & Technology",
  description:"At CODERZON, we provide top-tier technology consulting and recruitment services, helping businesses thrive with tailored digital solutions and access to the industry’s best tech talent.",
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
  "AI and cloud integration services"],
  openGraph: {
    title: "Coderzon Technology Pvt Ltd",
    description:"At CODERZON, we provide top-tier technology consulting and recruitment services, helping businesses thrive with tailored digital solutions and access to the industry’s best tech talent.",
    url: "https://coderzon-website-2463.vercel.app/",
    images: [
      {
        url:'https://coderzon-website-2463.vercel.app/assets/img/coderzoneLogo.webp',
        width: 1200,
        height: 630,
        alt: "Coderzon Technology",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
