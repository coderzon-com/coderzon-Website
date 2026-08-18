import { buildMetadata } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { AboutSection } from "@/components/home/about-section";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn more about Coderzon, a leading provider of artificial intelligence, data analytics, cloud computing, and custom web application solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" breadcrumb="Company About" />
      <AboutSection />
      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
