import Image from "next/image";
import { Check, Maximize2 } from "lucide-react";
import { ACCENTS, projectLabel } from "@/data/projects";
import { RevealGrid } from "@/components/ui/reveal-grid";

/**
 * A narrative case study.
 *
 * The other three case studies are architecture boards: every node opens a
 * write-up, so the page is a thing you interrogate. This one came from a
 * layout document — a challenge, an architecture, the analytics it enables,
 * the outcomes — with no per-component prose behind it. Rendering it as a
 * board would mean seventeen nodes that open nothing, so it is rendered as
 * what it is: a document you read top to bottom.
 *
 * A server component. Almost all of it is prose, and prose belongs in the
 * server HTML where a crawler and a reader with no JavaScript can both reach
 * it; only the staggered reveals are handed to the client.
 */
/**
 * Fades the outer edges so the picture dissolves into the page.
 *
 * Two linear gradients intersected, not one radial. A radial vignette is the
 * obvious choice and the wrong one here: this drawing runs all the way into
 * its corners — pipeline top-left, bottle top-right — and any ellipse tight
 * enough to fade the edges eats them. Crossing a horizontal fade with a
 * vertical one softens all four sides while leaving the middle 84% untouched.
 *
 * Sized in the box, not around it. A first attempt used
 * `radial-gradient(118% 118% ...)`, whose transparent stop therefore sat well
 * outside the element — the mask was there and did nothing.
 *
 * Where `mask-composite` is unsupported the layers combine additively, which
 * means no fade rather than a broken one.
 */
const BLEND = [
  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)",
].join(", ");

export function ProjectNarrative({ project }) {
  const n = project.narrative;

  return (
    <>
      {/* Hero */}
      <section className="bg-ink px-x-default relative isolate overflow-hidden pb-16 pt-10 text-white sm:pb-20">
        {/* Name on the left, object on the right. The title and the image are
            the two things this header is for, and side by side each gets the
            room the other was taking. Below `lg` they stack, title first —
            the words are what the page is, the picture is what it looks
            like. */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <p className="text-signal font-mono text-[11px] uppercase tracking-label">
              {projectLabel(project)}
            </p>

            <h1 className="mt-5 max-w-[18ch] break-words text-display font-bold [font-stretch:96%]">
              {project.name}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70">
              {n.hero.intro}
            </p>
          </div>

          {n.hero.image && (
            <figure className="lg:col-span-6">
              {/* No frame. The image is already black-grounded, so a border
                  and a rounded corner were the only things making it read as
                  a pasted rectangle; without them it sits in the page. The
                  mask carries the last of it — the outer edges dissolve into
                  the background instead of stopping at a line. */}
              <a
                href={n.hero.image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-offset-ink ease-power block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4"
              >
                <Image
                  src={n.hero.image.src}
                  alt={n.hero.image.alt}
                  width={n.hero.image.width}
                  height={n.hero.image.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                  style={{
                    maskImage: BLEND,
                    WebkitMaskImage: BLEND,
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                  }}
                  priority
                />
              </a>

              {/* Smaller here than it was full width, so the labels inside are
                  further out of reach — the way to read them stays offered. */}
              <figcaption className="mt-2 flex justify-end">
                <a
                  href={n.hero.image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-visible:ring-offset-ink group/hero ease-power inline-flex items-center gap-2 rounded-sm font-mono text-[10px] uppercase tracking-label text-white/45 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                  Open full size
                </a>
              </figcaption>
            </figure>
          )}
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-7 border-t border-white/12 pt-8 sm:grid-cols-3">
          {n.hero.meta.map((entry) => (
            <div key={entry.label}>
              <dt className="font-mono text-[10px] uppercase tracking-label text-white/50">
                {entry.label}
              </dt>
              <dd className="mt-2 break-words text-[15px] font-semibold leading-snug">
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-10 flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-label text-white/65"
            >
              {chip}
            </li>
          ))}
        </ul>
      </section>

      {/* The challenge */}
      <Section eyebrow={n.challenge.eyebrow} heading={n.challenge.heading}>
        <p className="max-w-2xl text-sm leading-relaxed text-white/65">
          {n.challenge.intro}
        </p>

        <RevealGrid className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {n.challenge.points.map((point) => (
            <div
              key={point.title}
              className="h-full rounded-2xl border border-white/12 bg-white/[0.035] p-5"
            >
              <h3 className="text-base font-bold leading-tight">
                {point.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/60">
                {point.body}
              </p>
            </div>
          ))}
        </RevealGrid>
      </Section>

      {n.principles && (
        <Section eyebrow={n.principles.eyebrow} heading={n.principles.heading}>
          {n.principles.intro && (
            <p className="max-w-2xl text-sm leading-relaxed text-white/65">
              {n.principles.intro}
            </p>
          )}

          {/* Numbered, because these are the rules the design is held to and
              the order is the argument: assist before context, context before
              traceability, traceability before failure behaviour. */}
          <RevealGrid className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {n.principles.points.map((point, index) => (
              <div
                key={point.title}
                className="h-full rounded-2xl border border-white/12 bg-white/[0.035] p-5"
              >
                <span
                  aria-hidden="true"
                  className="text-signal font-mono text-[11px] font-bold tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 break-words text-base font-bold leading-tight">
                  {point.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-white/60">
                  {point.body}
                </p>
              </div>
            ))}
          </RevealGrid>
        </Section>
      )}

      {/* Value chain */}
      <Section eyebrow={n.valueChain.eyebrow} heading={n.valueChain.heading}>
        <p className="max-w-2xl text-sm leading-relaxed text-white/65">
          {n.valueChain.intro}
        </p>

        {/* Numbered because it is a chain: the order is the content. */}
        <RevealGrid
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          amount={0.1}
        >
          {n.valueChain.stages.map((stage, index) => (
            <div
              key={stage.name}
              className="h-full rounded-2xl border border-white/12 bg-white/[0.035] p-5"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="text-signal font-mono text-[11px] font-bold tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="min-w-0 break-words text-base font-bold leading-tight">
                  {stage.name}
                </h3>
              </div>
              <p className="mt-1.5 text-[13px] leading-snug text-white/55">
                {stage.sub}
              </p>
              {/* A stage is sometimes just a named step. An empty list would
                  still draw its rule and padding. */}
              {stage.items?.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] leading-snug text-white/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </RevealGrid>

        {/* The layer underneath every stage above. */}
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.05] p-5">
          <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
            {n.valueChain.platform.label}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {n.valueChain.platform.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13px] text-white/70"
              >
                <span
                  aria-hidden="true"
                  className="bg-signal h-1 w-1 shrink-0 rounded-full"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Architecture */}
      <Section
        eyebrow={n.architecture.eyebrow}
        heading={n.architecture.heading}
      >
        <p className="max-w-2xl text-sm leading-relaxed text-white/65">
          {n.architecture.intro}
        </p>

        {n.architecture.diagram && (
          /* Framed as a printed sheet laid on the page. The drawing is
             white-on-blue and the site is near-black; dropped in bare it
             reads as a hole punched in the section, so it gets its own light
             ground and behaves like an artefact rather than a background. */
          <figure className="mt-10">
            <a
              href={n.architecture.diagram.src}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:ring-offset-ink group ease-power mx-auto block max-w-[1160px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:p-3"
            >
              <Image
                src={n.architecture.diagram.src}
                alt={n.architecture.diagram.alt}
                width={n.architecture.diagram.width}
                height={n.architecture.diagram.height}
                sizes="(min-width: 1160px) 1160px, 100vw"
                className="h-auto w-full rounded-lg"
                priority={false}
              />
            </a>

            {/* At 390px the labels inside are about three pixels tall, so the
                caption offers the only thing that actually helps: the full
                image, where the browser's own zoom works. */}
            <figcaption className="mx-auto mt-4 flex max-w-[1160px] flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <span className="text-[13px] text-white/55">
                {n.architecture.diagram.caption}
              </span>
              <a
                href={n.architecture.diagram.src}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-offset-ink group/full ease-power inline-flex items-center gap-2 rounded-sm font-mono text-[10px] uppercase tracking-label text-white/55 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                Open full size
              </a>
            </figcaption>
          </figure>
        )}

        {/* The same architecture as text: this is the copy that reflows, that
            a screen reader can read, and that search can index. */}
        <p className="mt-14 font-mono text-[10px] uppercase tracking-label text-white/45">
          Layer by layer
        </p>

        {/* Read left to right on a wide screen, top to bottom on a phone —
            the same direction the data travels either way. */}
        {/* Sized to the number of columns. A six-column pipeline and a
            three-column one are both architectures; a fixed six-track grid
            left the three-column case half empty. */}
        <RevealGrid
          className={`mt-5 grid gap-3 sm:grid-cols-2 ${
            n.architecture.columns.length <= 3
              ? "lg:grid-cols-3"
              : n.architecture.columns.length === 4
                ? "lg:grid-cols-4"
                : "lg:grid-cols-3 xl:grid-cols-6"
          }`}
          amount={0.05}
        >
          {n.architecture.columns.map((column) => {
            const accent = ACCENTS[column.accent];
            return (
              <div
                key={column.head}
                style={{ "--accent": accent }}
                className="h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035]"
              >
                {/* A floor on the header, so a two-line title like
                    "Processing & transformation" does not push its column's
                    contents a line lower than its neighbours'. */}
                <div
                  className="border-b border-white/12 p-4 xl:min-h-[104px]"
                  style={{ borderTop: `2px solid ${accent}` }}
                >
                  <h3
                    className="text-[13px] font-bold uppercase tracking-label"
                    style={{ color: accent }}
                  >
                    {column.head}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-snug text-white/50">
                    {column.sub}
                  </p>
                </div>

                <div className="space-y-3 p-4">
                  {column.groups.map((group, groupIndex) => (
                    <div key={group.title ?? groupIndex}>
                      {group.title && (
                        <p className="mb-1.5 font-mono text-[9.5px] uppercase tracking-label text-white/45">
                          {group.title}
                        </p>
                      )}
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="break-words text-[12.5px] leading-snug text-white/70"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </RevealGrid>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {n.architecture.crossCutting.map((band) => (
            <div
              key={band.title}
              className="rounded-2xl border border-white/12 bg-white/[0.05] p-5"
            >
              {/* Wraps rather than refusing to shrink. `shrink-0` held this
                  label at full width beside the title, so a sub longer than
                  pharma's two words pushed the page 37px wide at 320. */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-mono text-[10px] uppercase tracking-label text-white/55">
                  {band.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-label text-white/35">
                  {band.sub}
                </p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {band.items.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] leading-snug text-white/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Capability sections */}
      {n.capabilities.map((block) => (
        <Section
          key={block.eyebrow}
          eyebrow={block.eyebrow}
          heading={block.heading}
        >
          <RevealGrid className="grid gap-3 lg:grid-cols-2">
            {block.blocks.map((entry) => {
              const accent = ACCENTS[entry.accent];
              return (
                <div
                  key={entry.title}
                  className="h-full rounded-2xl border border-white/12 bg-white/[0.035] p-6"
                >
                  <h3
                    className="text-[13px] font-bold uppercase tracking-label"
                    style={{ color: accent }}
                  >
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-white/55">{entry.sub}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {entry.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-snug text-white/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </RevealGrid>
        </Section>
      ))}

      {/* Implementation */}
      <Section
        eyebrow={n.implementation.eyebrow}
        heading={n.implementation.heading}
      >
        <RevealGrid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {n.implementation.layers.map((layer) => {
            const accent = ACCENTS[layer.accent];
            return (
              <div
                key={layer.title}
                className="h-full rounded-2xl border border-white/12 bg-white/[0.035] p-5"
              >
                <h3
                  className="flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-label"
                  style={{ color: accent }}
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ background: accent }}
                  />
                  {layer.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-label text-white/65"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </RevealGrid>
      </Section>

      {/* Outcomes */}
      <Section eyebrow={n.outcomes.eyebrow} heading={n.outcomes.heading}>
        <RevealGrid className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {n.outcomes.items.map((item) => (
            <div
              key={item}
              className="flex h-full items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.035] p-5"
            >
              <Check
                aria-hidden="true"
                className="text-signal mt-0.5 h-4 w-4 shrink-0"
              />
              <p className="text-sm font-semibold leading-snug">{item}</p>
            </div>
          ))}
        </RevealGrid>
      </Section>

      {/* Close */}
      <section className="bg-ink px-x-default pb-y-default border-t border-white/10 pt-14 text-white sm:pt-20">
        <h2 className="max-w-[20ch] break-words text-display-sm font-bold [font-stretch:96%]">
          {n.close.heading}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65">
          {n.close.body}
        </p>

        <div className="mt-10 border-t border-white/12 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-label text-white/50">
            {n.close.credit.label}
          </p>
          <p className="mt-2 text-base font-bold">{n.close.credit.name}</p>
          <p className="mt-1 text-[13px] text-white/60">
            {n.close.credit.role}
          </p>
        </div>
      </section>
    </>
  );
}

/** One band of the document: a label, a heading, and whatever it introduces. */
function Section({ eyebrow, heading, children }) {
  return (
    <section className="bg-ink px-x-default border-t border-white/10 py-14 text-white sm:py-20">
      <p className="text-signal font-mono text-[10px] uppercase tracking-label">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-[22ch] break-words text-display-sm font-bold [font-stretch:96%]">
        {heading}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}
