import Link from "next/link";
import { buildMetadata } from "@/config/site";
import { faqs } from "@/data/faqs";
import { PageHero } from "@/components/ui/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Coderzon's AI solutions, data analytics, web and mobile development, cloud infrastructure and support.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow={`${faqs.length} answers`}
        title="Questions, answered"
        breadcrumb="FAQ"
        description="What people usually ask before starting a project. If yours is not here, send it over."
      />

      <section className="px-x-default py-y-default bg-white text-black">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8">
            <Accordion items={faqs} defaultOpen={0} />
          </div>

          <aside className="lg:col-span-4">
            <div className="border-t border-black/10 pt-8 lg:sticky lg:top-28">
              <p className="font-mono text-[10px] uppercase tracking-label text-black/40">
                Still unsure
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/60">
                Ask us directly. We answer questions about scope and approach
                before anyone talks about a contract.
              </p>
              <Link
                href="/contact"
                className="ease-power mt-6 inline-flex min-h-[48px] items-center rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Contact the team
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
