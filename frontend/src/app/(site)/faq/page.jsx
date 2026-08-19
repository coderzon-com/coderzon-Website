import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <Accordion items={faqs} defaultOpen={0} />
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-lg bg-console p-6 text-white lg:sticky lg:top-28">
                <p className="font-mono text-[10px] uppercase tracking-label text-brand-light">
                  Still unsure
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Ask us directly. We answer questions about scope and approach
                  before anyone talks about a contract.
                </p>
                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2 border-b border-brand pb-1 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                >
                  Contact the team
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
