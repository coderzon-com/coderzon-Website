import { notFound } from "next/navigation";
import { buildMetadata } from "@/config/site";
import { services, getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/ui/page-hero";
import { CapabilityDial } from "@/components/services/capability-dial";
import { ServiceDetail } from "@/components/services/service-detail";
import { ContactCta } from "@/components/contact/contact-cta";

/** Pre-render every service page at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return buildMetadata({ title: "Service Not Found" });

  return buildMetadata({
    title: service.shortTitle,
    description: service.intro.slice(0, 155),
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.shortTitle}
        breadcrumb={service.shortTitle}
        trail={[{ label: "Services", href: "/services" }]}
        visual={<CapabilityDial />}
      />
      <ServiceDetail service={service} />
      <ContactCta />
    </>
  );
}
