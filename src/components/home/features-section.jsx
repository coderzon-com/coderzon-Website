import Image from "next/image";
import { featureSection } from "@/data/home-content";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";

/** Four core capabilities arranged around the central services illustration. */
export function FeaturesSection() {
  const { eyebrow, title, image, features } = featureSection;
  const [first, second, third, fourth] = features;

  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} centered />

      <div className="mt-14 grid items-center gap-8 lg:grid-cols-4">
        <div className="space-y-8 lg:col-span-1">
          <FeatureCard feature={first} />
          <FeatureCard feature={second} />
        </div>

        <div className="order-first lg:order-none lg:col-span-2">
          <Image
            src={image}
            alt="Overview of Coderzon IT services"
            width={520}
            height={520}
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>

        <div className="space-y-8 lg:col-span-1">
          <FeatureCard feature={third} />
          <FeatureCard feature={fourth} />
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({ feature }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon name={feature.icon} className="h-6 w-6" />
      </div>
      <h3 className="text-lg">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {feature.description}
      </p>
    </div>
  );
}
