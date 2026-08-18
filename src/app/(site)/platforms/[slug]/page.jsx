import { notFound } from "next/navigation";
import { buildMetadata } from "@/config/site";
import { platforms, getPlatformBySlug } from "@/data/platforms";
import { PageHero } from "@/components/ui/page-hero";
import { PlatformDetail } from "@/components/platforms/platform-detail";
import { ContactCta } from "@/components/contact/contact-cta";

/** Pre-render every platform page at build time. */
export function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export function generateMetadata({ params }) {
  const platform = getPlatformBySlug(params.slug);
  if (!platform) return buildMetadata({ title: "Platform Not Found" });

  return buildMetadata({
    title: platform.navLabel,
    description: platform.intro.slice(0, 155),
    path: `/platforms/${platform.slug}`,
  });
}

export default function PlatformDetailPage({ params }) {
  const platform = getPlatformBySlug(params.slug);
  if (!platform) notFound();

  return (
    <>
      <PageHero title={platform.navLabel} breadcrumb={platform.shortTitle} />
      <PlatformDetail platform={platform} />
      <ContactCta />
    </>
  );
}
