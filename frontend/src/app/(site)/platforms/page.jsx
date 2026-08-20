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

      <section className="px-x-default py-y-default bg-white text-black">
        <div className="space-y-20">
          {platformGroups.map((group) => (
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
                  .map((entry) => getPlatformBySlug(entry.slug))
                  .filter(Boolean)
                  .map((platform, index) => (
                    <PlatformCard
                      key={platform.slug}
                      platform={platform}
                      index={index}
                    />
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
