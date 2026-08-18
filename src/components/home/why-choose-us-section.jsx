import Image from "next/image";
import { whyChooseUsSection } from "@/data/home-content";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";

/** Two differentiators alongside the supporting illustration. */
export function WhyChooseUsSection() {
  const { eyebrow, title, description, image, reasons } = whyChooseUsSection;

  return (
    <Section muted>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <div className="mt-10 space-y-8">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={reason.icon} className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg">{reason.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Image
          src={image}
          alt="Why businesses choose Coderzon"
          width={560}
          height={560}
          className="mx-auto h-auto w-full max-w-lg"
        />
      </div>
    </Section>
  );
}
