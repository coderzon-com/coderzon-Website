import { buildMetadata } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
import { SignalPulse } from "@/components/ui/figures/signal-pulse";
import { QuoteForm } from "@/components/contact/quote-form";

export const metadata = buildMetadata({
  title: "Request a quote",
  description:
    "Request a quote from Coderzon Technologies for custom AI software, data analytics, cloud solutions and web or mobile app development.",
  path: "/request-quote",
});

const NEXT_STEPS = [
  {
    label: "You send",
    body: "The problem, any constraints, and roughly when you need it working.",
  },
  {
    label: "We reply",
    body: "Within one business day, with questions or an outline of the approach.",
  },
  {
    label: "We scope",
    body: "A written estimate covering the team, the stages and the assumptions behind them.",
  },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        // "Request a quote" already appears in the breadcrumb above and on
        // the button below; a third repeat teaches the reader nothing, so
        // this carries the promise instead.
        eyebrow="One business day"
        title="Scope the work"
        breadcrumb="Request a quote"
        description="Share a few details and we will come back within one business day."
        visual={<SignalPulse />}
      />

      <section className="px-x-default py-y-default bg-ink text-white">
        <div>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="mb-8 font-mono text-[10px] uppercase tracking-label text-white/55">
                  What happens next
                </p>
                <ol className="relative space-y-10">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-white/10"
                  />
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step.label} className="relative pl-10">
                      <span className="absolute left-0 top-1 font-mono text-[10px] tabular-nums text-white/55">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-lg font-bold tracking-[-0.02em]">
                        {step.label}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8">
              {/* The form sits on a light panel, as it does everywhere else on
                  the site. Placed straight onto the dark ground its labels
                  were black on black — only the required asterisks showed, so
                  every field was unlabelled and the form was unusable. */}
              <div className="bg-mist rounded-3xl p-6 text-black shadow-[0_40px_80px_-48px_rgba(0,0,0,0.9)] sm:p-8 lg:p-10">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
