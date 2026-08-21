"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Staggers its children in as they scroll into view.
 *
 * Lets a server component keep rendering on the server and hand only the
 * animation to the client, rather than marking a whole page as client-side.
 */
export function RevealGrid({ className, children, amount = 0.15 }) {
  const reduceMotion = useReducedMotion();

  const item = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      };

  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={className}
      initial="hidden"
      data-motion-reveal=""
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
      }}
    >
      {items.map((child, index) => (
        <motion.div key={child?.key ?? index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
