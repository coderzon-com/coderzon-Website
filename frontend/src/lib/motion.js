/**
 * The motion system.
 *
 * One vocabulary for the whole product. Every animation picks a tier from
 * here rather than inventing its own numbers, which is what stops a site
 * feeling like a collection of unrelated effects.
 *
 * The tiers are separated by how much attention the movement deserves:
 *
 *   micro       150ms   state feedback — a colour, an icon nudge
 *   interaction 300ms   something the user did — hover, open, toggle
 *   entrance    600ms   content arriving — a section scrolling into view
 *   cinematic   900ms   a deliberate moment — a hero line, a full-screen menu
 *
 * A 200ms hover and a 1200ms entrance must not feel like the same system,
 * and the surest way to get that wrong is to hand-pick durations per file.
 */

/** Durations in seconds, for Motion. */
export const DURATION = {
  micro: 0.15,
  interaction: 0.3,
  entrance: 0.6,
  cinematic: 0.9,
};

/**
 * Easing curves.
 *
 * `power` is the house curve: a fast start that settles gently, which reads
 * as responsive without being abrupt. `entry` is for things arriving from
 * off-screen. `exit` accelerates away, because a leaving element should not
 * hold attention.
 */
export const EASE = {
  power: [0.16, 1, 0.3, 1],
  entry: [0.22, 1, 0.36, 1],
  exit: [0.4, 0, 1, 1],
};

/** Springs for anything that follows a pointer or carries weight. */
export const SPRING = {
  // Tracks the cursor closely: magnetic controls, card tilt.
  responsive: { type: "spring", stiffness: 260, damping: 20, mass: 0.4 },
  // Has a little body to it: panels, drawers.
  weighted: { type: "spring", stiffness: 180, damping: 24, mass: 0.8 },
  // Snaps decisively: indicators moving between positions.
  crisp: { type: "spring", stiffness: 520, damping: 32 },
};

/** Stagger steps. Longer lists need a shorter step or the tail drags. */
export const STAGGER = {
  tight: 0.04,
  normal: 0.07,
  loose: 0.11,
};

/**
 * Build a "rise into place" variant pair.
 * Pass reduceMotion and the whole thing collapses to a no-op.
 */
export function rise(
  reduceMotion,
  { y = 20, duration = DURATION.entrance } = {},
) {
  if (reduceMotion) {
    return { hidden: { opacity: 1 }, show: { opacity: 1 } };
  }
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE.power } },
  };
}

/** Build a container that staggers its children. */
export function stagger(
  reduceMotion,
  { each = STAGGER.normal, delay = 0 } = {},
) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : each,
        delayChildren: reduceMotion ? 0 : delay,
      },
    },
  };
}

/** A line of type sliding up from behind its own edge. Needs a clipped parent. */
export function wipeUp(reduceMotion, { duration = DURATION.cinematic } = {}) {
  if (reduceMotion) {
    return { hidden: { y: 0 }, show: { y: 0 } };
  }
  return {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration, ease: EASE.power } },
  };
}
