import { ACCENTS, interactiveProjects } from "./case-studies/interactive";
import { pharmaceuticalDataPlatform } from "./case-studies/pharmaceutical-data-platform";

/**
 * Case studies.
 *
 * Two kinds, and the difference is real rather than cosmetic:
 *
 * `interactive` — ported from the standalone HTML pages the engineers wrote.
 *   Each is an architecture board whose every node opens a write-up in two
 *   vocabularies, plain and technical. Those live in `case-studies/interactive.js`,
 *   which is GENERATED and rewritten wholesale when the sources are re-ported.
 *
 * `narrative` — ported from a layout document. A challenge, an architecture,
 *   the analytics it enables, the outcomes. No per-component write-ups, so it
 *   is not forced into a board whose nodes would open empty drawers.
 *
 * Hand-written case studies live in their own module beside the generated one
 * and are combined here, so regenerating cannot delete them.
 */
export { ACCENTS };

export const projects = [...interactiveProjects, pharmaceuticalDataPlatform];

/**
 * How an entry introduces itself.
 *
 * Two kinds live here and the difference is a claim about what was done:
 * a numbered project is a system we built and run; a case study illustrates
 * what we would build for a sector. Numbering the second alongside the first
 * would present it as delivered work.
 */
export function projectLabel(project) {
  if (project.kind === "case-study") {
    return `Case study \u00b7 ${project.sector ?? project.discipline}`;
  }
  return `Project ${project.number} \u00b7 ${project.discipline}`;
}

/**
 * The two collections, kept apart because they are different claims.
 *
 * `deliveredProjects` are systems we built and run — write-ups by the
 * engineers who built them. `caseStudies` illustrate what we would build for
 * a sector. They live at different URLs so a reader is never left guessing
 * which one they are looking at.
 */
export const deliveredProjects = projects.filter(
  (project) => project.kind !== "case-study",
);

export const caseStudies = projects.filter(
  (project) => project.kind === "case-study",
);

/** Where an entry lives. The collection decides, not the caller. */
export function projectHref(project) {
  return project.kind === "case-study"
    ? `/case-studies/${project.slug}`
    : `/work/${project.slug}`;
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsForService(serviceSlug) {
  return projects.filter((project) => project.serviceSlug === serviceSlug);
}

/**
 * Every node id in reading order — the board left to right, then the platform
 * row, then the runtime steps where a project has them.
 *
 * Empty for a narrative case study, which has no addressable components.
 */
export function allNodeIds(project) {
  return [
    ...(project.columns ?? []).flatMap((column) => column.nodes),
    ...(project.platform?.nodes ?? []),
    ...(project.workflow?.lanes ?? []).flatMap((lane) => lane.steps),
  ];
}

/**
 * The shape of a project's pipeline, for the listing cards.
 *
 * Both kinds answer "how does this flow" — one from its board columns, the
 * other from a summary it declares directly — so the card asks this rather
 * than reaching into a structure only one of them has.
 */
export function flowSummary(project) {
  if (project.flow) return project.flow;

  return (project.columns ?? []).map((column) => ({
    accent: column.accent,
    label: column.head.tech,
    count: column.nodes.length,
  }));
}
