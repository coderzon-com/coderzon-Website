import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { FeaturesSection } from "@/components/home/features-section";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { LatestPostsSection } from "@/components/home/latest-posts-section";
import { ContactCta } from "@/components/contact/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FeaturesSection />
      <WorkProcessSection />
      <LatestPostsSection />
      <ContactCta />
    </>
  );
}
