import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { siteConfig, buildMetadata } from "@/config/site";
import "./globals.css";

/**
 * Display and body face.
 *
 * A neo-grotesque rather than the geometric one that was here before: quieter
 * letterforms, a taller x-height, and no quirks competing with the layout —
 * the type carries the page by proportion instead of by personality.
 *
 * Loaded as a variable font across both its axes. The width axis is the point:
 * it allows a genuinely narrower drawing for display sizes, which is the
 * mechanism a separate headline cut provides, rather than faking the same
 * effect with negative tracking on the normal width.
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument-sans",
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
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
