import { buildMetadata } from "@/config/site";
import { PageHero } from "@/components/ui/page-hero";
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
        eyebrow="Request a quote"
        title="Scope the work"
        breadcrumb="Request a quote"
        description="Share a few details and we will come back within one business day."
      />

      <section className="bg-white py-14 lg:py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="mb-5 border-l-2 border-brand pl-2.5 font-mono text-[10px] uppercase tracking-label text-navy">
                  What happens next
                </p>
                <ol className="relative space-y-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-3 h-[calc(100%-1.5rem)] w-px bg-navy/12"
                  />
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step.label} className="relative pl-11">
                      <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white font-mono text-[10px] tabular-nums text-navy ring-1 ring-navy/15">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-sm font-semibold text-navy">
                        {step.label}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="rounded-lg bg-white p-5 ring-1 ring-navy/10 sm:p-7 lg:p-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
