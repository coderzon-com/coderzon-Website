"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * A figure that counts up when it reaches the viewport.
 *
 * Worth doing only for numbers large enough that the climb reads as a climb —
 * counting 0,1,2,3 is fuss. Twenty years of trading is exactly the kind of
 * claim that benefits: the eye follows the movement to the evidence.
 *
 * The server and the first client render both output the true figure, so the
 * number is right without scripting and a crawler never sees a zero. The
 * reset to zero happens once after hydration, while the element is still
 * below the fold, so nothing visibly jumps.
 */
export function Counter({ to, className, duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  const [shown, setShown] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    setShown(0);
    setArmed(true);
  }, [reduceMotion]);

  /* Insurance against ever showing the wrong number.
     The count resets to zero and waits for the element to be seen. If that
     never happens — an observer that does not fire, a frame loop that never
     runs — the page would sit there claiming zero years of trading, which is
     worse than having no animation at all. This puts the true figure back if
     the animation has not started shortly after arming. */
  useEffect(() => {
    if (!armed || inView) return;
    const failsafe = setTimeout(() => setShown(to), 2500);
    return () => clearTimeout(failsafe);
  }, [armed, inView, to]);

  useEffect(() => {
    if (!armed || !inView) return;
    let frame;
    let start;
    const step = (now) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      // The house easing curve, evaluated directly: this animates text
      // content, so it cannot go through Motion.
      setShown(Math.round((1 - Math.pow(1 - progress, 3)) * to));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
