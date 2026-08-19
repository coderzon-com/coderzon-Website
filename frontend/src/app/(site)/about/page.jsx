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
      <PageHero
        eyebrow="About Coderzon"
        title="A technology partner, not only a staffing supplier"
        breadcrumb="About"
        description="Software architects and senior engineers building systems that outlast the engagement."
      />
      <AboutSection />
      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
