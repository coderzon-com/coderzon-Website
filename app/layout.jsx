import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coderzon Technology Pvt Ltd | IT Services & Technology",
  description:
    "Top-tier software solutions provider for AI, web, and mobile apps. We design modern, scalable, secure digital experiences.",
  keywords:
    "Coderzon, software company, AI development, web development, mobile apps, Next.js, React, IT consulting",
  openGraph: {
    title: "Coderzon Technology Pvt Ltd",
    description:
      "AI-driven software development & IT services company based in India.",
    url: "https://coderzon-website-2463.vercel.app/",
    images: [
      {
        url: "/img/coderzoneLogo.webp",
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
