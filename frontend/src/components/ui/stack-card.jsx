"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * One card in a scroll-driven stack.
 *
 * Each card pins at its own offset and the next rides up over it, so the group
 * builds into a deck as you scroll rather than filing past. As a card is
 * covered it shrinks, tips back on its top edge and darkens — together those
 * read as it lying down into the stack rather than merely being overlapped.
 *
 * Offsets are staggered so a sliver of every card underneath stays visible.
 * That strip is the affordance: it shows how many are in the deck and how far
 * through it you are.
 *
 * A pinned card is stationary, so everything on it stays clickable the whole
 * time it is on screen.
 *
 * Four things about this pattern are easy to get wrong, and all four have
 * been got wrong here at least once:
 *
 *   The sticky element must be the direct child of the tall container. One
 *   wrapper deeper and it can only travel inside that wrapper's own box —
 *   exactly the card's height — so it never sticks to anything.
 *
 *   A pinned element cannot measure its own progress. Once stuck, its
 *   bounding box stops moving and any scroll value read from it freezes.
 *   Progress therefore comes from the container and is sliced by index.
 *
 *   The tree must not change shape. Swapping a plain element for a sticky one
 *   when a media query resolves remounts everything inside, and remounted
 *   children re-apply their hidden variant without ever seeing the parent's
 *   already-fired whileInView. Only the class and style change here.
 *
 *   Whether the deck stacks is decided once, by the container, and passed in
 *   as `enabled`. Letting each card measure itself made them disagree: cards
 *   that fit became sticky and took a z-index, cards that did not stayed in
 *   normal flow with neither — and slid underneath the pinned ones. Half a
 *   stack is worse than none.
 *
 * Under reduced motion, and whenever the container reports the deck will not
 * fit, stacking is dropped and the cards lay out as an ordinary column. A card
 * pinned taller than the screen cannot be read at all.
 */
export function StackCard({
  children,
  index,
  total,
  top,
  progress,
  range,
  enabled,
  as: Tag = "div",
  className = "",
}) {
  const reduceMotion = useReducedMotion();

  /* This card's slice of the container's travel: it starts receding when the
     next card begins to cover it and settles once that card has landed.

     The last card is never covered by anything, so it must not recede. Left
     on the shared formula it shrank and faded on its own at the bottom of the
     stack, which read as the section breaking rather than finishing. */
  /* The range comes from the container, measured, rather than from an even
     slice of the scroll. Cards are not covered at evenly spaced moments: the
     next card arrives when it has travelled its own height, which has nothing
     to do with 1/n of the section. Slicing evenly made card three finish
     receding some 290px before card four reached it, so it shrank and tipped
     in plain view with nothing on top of it — reading exactly like the card
     lifting itself out of the deck. */
  const isTop = index === total - 1;
  /* Falling back to an even slice keeps this renderable before the container
     has measured anything — and stops a missing prop taking the page down. */
  const [start, end] = range ?? [index / total, (index + 1) / total];

  /* Three things move together as a card is covered, and they have to move
     together or the effect falls apart:

       it shrinks, so it reads as further away;
       it tips back on X, so it reads as lying down under the next one;
       it darkens, so less light reaches it.

     Scale alone looks like a card being resized. Adding the tip is what makes
     it a physical deck — the bottom edge swings away from the viewer while
     the top stays pinned, which is exactly what happens to a card you slide
     something on top of.

     Nothing translates. Every transform here works from the top edge and
     leaves it exactly on its pin. A translate was tried and had to come out:
     it moved cards 14px while their pins are 10px apart, and because each
     card travels during its own slice of the scroll, the third one visibly
     slid upward past the second before settling. The strip along the top of
     each card is what makes the stagger readable, so that edge has to stay
     still. */
  const scale = useTransform(
    progress,
    [start, end],
    isTop ? [1, 1] : [1, 0.93],
  );
  /* Negative, so the far edge tips away from the viewer rather than toward
     it. With the origin on the top edge this is the card lying down under the
     next one, which is the motion being described. */
  const rotateX = useTransform(
    progress,
    [start, end],
    isTop ? [0, 0] : [0, -6],
  );
  /* Darkened, not faded. Reducing opacity to suggest depth makes the card
     translucent, so the page shows through the strip of it that stays
     visible — which reads as a rendering fault rather than distance.
     Brightness keeps the surface completely solid and still sends it back. */
  const brightness = useTransform(
    progress,
    [start, end],
    isTop ? [1, 1] : [1, 0.5],
  );
  const filter = useMotionTemplate`brightness(${brightness})`;

  /* One tree, always. An earlier version returned a plain element until the
     media query resolved and a sticky one afterwards — a different structure,
     so React remounted everything inside it. The remounted children re-applied
     their "hidden" variant and never saw the parent's whileInView, which had
     already fired with once:true. The whole section rendered at opacity 0 with
     its markup fully present. Only the class and the style change now. */
  const stacking = enabled && !reduceMotion;

  return (
    <Tag
      /* The pin comes from CSS; `enabled` only governs the transforms. If the
         script never runs the cards still stack, just without the recede. */
      className={`stack-pin ${className}`}
      style={{ top, zIndex: index + 1 }}
    >
      <motion.div
        style={
          stacking
            ? {
                scale,
                rotateX,
                filter,
                /* Perspective declared on the card itself rather than on the
                   list. Putting it on the container would give that container
                   a new containing block, and sticky offsets are resolved
                   against the containing block — the pinning would break. */
                transformPerspective: 1600,
                transformOrigin: "50% 0%",
              }
            : undefined
        }
      >
        {children}
      </motion.div>
    </Tag>
  );
}
