/**
 * The capability's vocabulary, as a readable strip.
 *
 * The same terms the field suspends in depth behind the title on a wide
 * screen. The hero's object slot does not exist below `md` — an object drawn
 * behind an H1 on a 375px screen sits under the words rather than beside
 * them — so rather than the terms simply vanishing on a phone, they change
 * job: decoration on a desktop, content on a mobile.
 *
 * Hidden from `md` up, where the field is doing this work already. Showing
 * both would say the same thing twice on one screen.
 */
export function ServiceTermsStrip({ terms }) {
  if (!terms || terms.length === 0) return null;

  return (
    <section className="bg-ink px-x-default border-b border-white/10 py-8 text-white md:hidden">
      <h2 className="font-mono text-[10px] uppercase tracking-label text-white/55">
        What this covers
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {terms.map((term) => (
          <li
            key={term}
            className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-label text-white/70"
          >
            {term}
          </li>
        ))}
      </ul>
    </section>
  );
}
