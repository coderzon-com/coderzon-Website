import { buildMetadata } from "@/config/site";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ServiceCard } from "@/components/services/service-card";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore Coderzon's expert services including AI software development, data analytics, cloud computing, web and mobile app development, and legacy software modernization.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our Services" />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
