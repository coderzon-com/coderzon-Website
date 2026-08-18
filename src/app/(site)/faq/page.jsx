import { buildMetadata } from "@/config/site";
import { faqs } from "@/data/faqs";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata = buildMetadata({
  title: "FAQs",
  description:
    "Answers to common questions about Coderzon's AI solutions, data analytics services, web and mobile app development, and cloud infrastructure.",
  path: "/faq",
});

export default function FaqPage() {
  const midpoint = Math.ceil(faqs.length / 2);

  return (
    <>
      <PageHero title="Questions & Answers" breadcrumb="FAQ" />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Accordion items={faqs.slice(0, midpoint)} defaultOpen={0} />
          <Accordion items={faqs.slice(midpoint)} defaultOpen={null} />
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
