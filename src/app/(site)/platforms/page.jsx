import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/config/site";
import { platforms } from "@/data/platforms";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "Products & Platforms",
  description:
    "The products and platforms Coderzon implements and supports, from Microsoft BI and Azure to AWS, Google Cloud, Shopify and WordPress.",
  path: "/platforms",
});

export default function PlatformsPage() {
  return (
    <>
      <PageHero title="Products & Platforms" />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <article
              key={platform.slug}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-7"
            >
              <h2 className="text-lg leading-snug">
                <Link
                  href={`/platforms/${platform.slug}`}
                  className="transition-colors hover:text-brand"
                >
                  {platform.navLabel}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {platform.shortTitle}
              </p>
              <Link
                href={`/platforms/${platform.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-dark"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
