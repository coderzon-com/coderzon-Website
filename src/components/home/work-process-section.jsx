import Image from "next/image";
import { workProcessSection } from "@/data/home-content";
import { Counter } from "@/components/ui/counter";
import { Section, SectionHeading } from "@/components/ui/section";

/** Numbered three-step delivery process. Reused on the About and Services pages. */
export function WorkProcessSection() {
  const { eyebrow, title, steps, images, yearsExperience } = workProcessSection;

  return (
    <Section className="bg-navy text-white/80">
      <SectionHeading
        eyebrow={eyebrow}
        title={<span className="text-white">{title}</span>}
      />

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        <ol className="space-y-6">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-4 rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10 sm:gap-5 sm:p-6"
            >
              <span
                className="text-3xl font-bold text-brand-light"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <div>
                <h3 className="text-lg text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          <Image
            src={images.primary}
            alt="Coderzon delivery team"
            width={360}
            height={460}
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="space-y-5">
            <div className="rounded-2xl bg-brand p-6 text-white">
              <p className="text-3xl font-bold leading-none">
                <Counter to={yearsExperience} />+
              </p>
              <p className="mt-2 text-sm text-white/80">years of experience</p>
            </div>
            <Image
              src={images.secondary}
              alt="Coderzon workspace"
              width={360}
              height={260}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
