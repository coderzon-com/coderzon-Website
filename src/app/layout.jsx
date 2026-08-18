import { Space_Grotesk } from "next/font/google";
import { siteConfig, buildMetadata } from "@/config/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: "IT Services & Technology",
    description: siteConfig.description,
  }),
};

/**
 * Root layout — only the document shell and the font.
 *
 * The marketing header and footer live in (site)/layout.jsx so that
 * /studio can render Sanity Studio full-screen without them.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
