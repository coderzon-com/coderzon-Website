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

      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(5,22,52,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,22,52,0.045) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          }}
        />

        <div className="container relative space-y-14">
          {serviceGroups.map((group) => (
            <div key={group.label}>
              <div className="flex items-baseline justify-between gap-4 border-b border-navy/12 pb-4">
                <h2 className="border-l-2 border-brand pl-2.5 font-mono text-[11px] uppercase tracking-label text-navy">
                  {group.label}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-label text-muted">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <RevealGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items
                  .map((entry) => getServiceBySlug(entry.slug))
                  .filter(Boolean)
                  .map((service) => (
                    <ServiceCard key={service.slug} service={service} />
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
