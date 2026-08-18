"use client";

import CountUp from "react-countup";

/** Number that counts up once it scrolls into view. */
export function Counter({ to, className }) {
  return (
    <span className={className}>
      <CountUp end={to} enableScrollSpy scrollSpyOnce />
    </span>
  );
}
