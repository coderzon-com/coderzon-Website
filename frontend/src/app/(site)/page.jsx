import { HeroSection } from "@/components/home/hero-section";
import { CapabilityStack } from "@/components/home/capability-stack";
import { AboutSection } from "@/components/home/about-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { PlatformBand } from "@/components/home/platform-band";
import { SelectedWork } from "@/components/home/selected-work";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { ContactCta } from "@/components/contact/contact-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* The catalogue comes straight after the hero: it is what the company
          sells, and it answers the first question the hero raises. */}
      <CapabilityStack />
      {/* Platforms sits third, straight after the catalogue: someone who has
          just read what we build asks next whether we work in what they
          already run. */}
      <PlatformBand />
      {/* Proof, fourth. The two sections above are claims about what we do and
          what we run it on; this is the first thing on the page that can be
          checked. Before it existed the only route to a case study was a
          two-line list buried inside the capability deck. */}
      <SelectedWork />
      <AboutSection />
      <WhyChooseUsSection />
      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
