import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { hero } from "@/data/home-content";
import { Button } from "@/components/ui/button";

/**
 * Top-of-homepage hero.
 *
 * The background reproduces the original diagonal split: near-white on the
 * left, #F4F7FB on the right, with a hard edge at 52% on a 75deg angle.
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(75deg,#fefefe_52%,#F4F7FB_48%)]">
      {/* Soft brand glow in the lower left, as in the original design. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-44 left-6 h-[370px] w-[420px] rounded-full bg-brand/25 blur-[130px]"
      />

      <div className="container relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="animate-fade-up">
          <h1 className="break-words text-[28px] leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            {hero.titleStart}{" "}
            <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-body sm:text-lg">
            {hero.description}
          </p>
          <Button href={hero.cta.href} size="lg" className="mt-8">
            {hero.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          {/*
            Two dots orbiting the image on a 24s loop, as in the original.
            The wrapper rotates; the dots ride around with it.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 animate-orbit rounded-full motion-reduce:animate-none"
          >
            <span className="absolute left-[7%] top-[14%] h-5 w-5 rounded-full bg-white outline outline-4 outline-brand sm:h-[35px] sm:w-[35px] sm:outline-8" />
            <span className="absolute bottom-[15%] right-5 h-6 w-6 rounded-full bg-white outline outline-[6px] outline-brand sm:h-[45px] sm:w-[45px] sm:outline-[10px]" />
          </div>

          <Image
            src={hero.image}
            alt="Robotic hand representing intelligent automation"
            width={640}
            height={640}
            priority
            className="relative h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
