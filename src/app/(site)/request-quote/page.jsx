import { buildMetadata } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { QuoteForm } from "@/components/contact/quote-form";

export const metadata = buildMetadata({
  title: "Request a Quote",
  description:
    "Request a personalised quote from Coderzon Technologies for custom AI software, data analytics, cloud solutions and web or mobile app development.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero title="Request a Quote" />

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Tell us about your project"
            description="Share a few details and we'll get back to you within one business day with a tailored quote."
            centered
          />
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6 lg:p-8">
            <QuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
