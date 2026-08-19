import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig, buildMetadata } from "@/config/site";
import "./globals.css";

// Display and body face — the brand's geometric, technical character.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Utility face, used only for small uppercase labels and counts. The
// monospace register belongs to an engineering consultancy's own world.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
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
 * Root layout — the document shell and the fonts.
 *
 * The header and footer live in (site)/layout.jsx, which keeps this file free
 * to host any route that should render without the marketing chrome.
 */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
