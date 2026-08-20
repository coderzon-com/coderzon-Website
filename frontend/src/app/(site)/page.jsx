import { HeroSection } from "@/components/home/hero-section";
import { PlatformBand } from "@/components/home/platform-band";
import { AboutSection } from "@/components/home/about-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { CapabilityFlow } from "@/components/home/capability-flow";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { ContactCta } from "@/components/contact/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlatformBand />
      <AboutSection />
      <WhyChooseUsSection />
      <CapabilityFlow />
      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
