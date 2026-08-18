import Image from "next/image";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { aboutSection } from "@/data/home-content";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Section, SectionHeading } from "@/components/ui/section";

/** "About us" block with the paired images and the years-of-experience badge. */
export function AboutSection() {
  const { eyebrow, title, body, cta, yearsExperience, images } = aboutSection;

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={images.primary}
              alt="Coderzon team collaborating"
              width={400}
              height={500}
              className="h-full w-full rounded-2xl object-cover"
            />
            <Image
              src={images.secondary}
              alt="Coderzon engineers at work"
              width={400}
              height={500}
              className="mt-10 h-full w-full rounded-2xl object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-4 rounded-xl bg-brand p-5 text-white shadow-card">
            <BriefcaseBusiness
              className="h-9 w-9 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-2xl font-bold leading-none">
                <Counter to={yearsExperience} />+
              </p>
              <p className="mt-1 text-sm text-white/80">Years Experience</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <p className="mt-5 leading-relaxed text-muted">{body}</p>
          <Button href={cta.href} className="mt-8">
            {cta.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
