import { buildMetadata } from "@/config/site";
import { services, getServiceBySlug } from "@/data/services";
import { serviceGroups } from "@/config/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { RevealGrid } from "@/components/ui/reveal-grid";
import { WorkProcessSection } from "@/components/home/work-process-section";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Coderzon's full capability: data analytics, cloud, AI and machine learning, web and mobile development, modernisation and long-term support.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${services.length} capabilities`}
        title="What we build"
        breadcrumb="Services"
        description="Grouped by the kind of problem they solve rather than listed alphabetically, so you can find the right team without reading all fourteen."
      />

      <section className="px-x-default py-y-default bg-white text-black">
        <div className="space-y-20">
          {serviceGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-mono text-[10px] uppercase tracking-label text-black/40">
                  {group.label}
                </h2>
                <span className="font-mono text-[10px] tabular-nums text-black/30">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <RevealGrid className="mt-8 border-t border-black/10">
                {group.items
                  .map((entry) => getServiceBySlug(entry.slug))
                  .filter(Boolean)
                  .map((service, index) => (
                    <ServiceCard
                      key={service.slug}
                      service={service}
                      index={index}
                    />
                  ))}
              </RevealGrid>
            </div>
          ))}
        </div>
      </section>

      <WorkProcessSection />
      <ContactCta />
    </>
  );
}
