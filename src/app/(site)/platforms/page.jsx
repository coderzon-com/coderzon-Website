import { buildMetadata } from "@/config/site";
import { platforms, getPlatformBySlug } from "@/data/platforms";
import { platformGroups } from "@/config/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { PlatformCard } from "@/components/platforms/platform-card";
import { RevealGrid } from "@/components/ui/reveal-grid";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Platforms",
  description:
    "The products and platforms Coderzon implements and supports: Microsoft BI and Azure, AWS, Google Cloud, open-source BI, Shopify and WordPress.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${platforms.length} platforms`}
        title="What we work in"
        breadcrumb="Platforms"
        description="We are not tied to one vendor. These are the stacks we implement, migrate and support in production."
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
          {platformGroups.map((group) => (
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
                  .map((entry) => getPlatformBySlug(entry.slug))
                  .filter(Boolean)
                  .map((platform) => (
                    <PlatformCard key={platform.slug} platform={platform} />
                  ))}
              </RevealGrid>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
