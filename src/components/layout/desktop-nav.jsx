"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

/**
 * Console navigation.
 *
 * Labels are set in the monospace utility face, uppercase and widely
 * tracked — the register of an instrument, not a marketing bar. A single
 * cursor block snaps between items with a stiff spring, so the movement
 * reads mechanical rather than the soft glide every SaaS nav uses.
 *
 * The current page is marked with a small ring in the brand's accent
 * yellow, echoing the power mark in the logo.
 */
export function DesktopNav({
  items,
  openMenu,
  onOpen,
  onHoverLeave,
  onToggle,
}) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(null);

  const isCurrent = (href) =>
    Boolean(href) &&
    (href === pathname || (href !== "/" && pathname.startsWith(`${href}/`)));

  const currentLabel =
    items.find((item) => isCurrent(item.href))?.label ?? null;
  const cursorOn = hovered ?? openMenu ?? currentLabel;

  return (
    <nav
      aria-label="Main"
      onMouseLeave={() => setHovered(null)}
      className="hidden xl:block"
    >
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const onPage = isCurrent(item.href);
          const menuOpen = Boolean(item.menu) && openMenu === item.label;
          const lit = cursorOn === item.label;

          const shared =
            "relative flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs font-medium uppercase tracking-label transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light";
          const tone = lit || menuOpen ? "text-white" : "text-white/80";

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                setHovered(item.label);
                if (item.menu) onOpen(item.label);
              }}
              onMouseLeave={item.menu ? onHoverLeave : undefined}
            >
              {lit && (
                <motion.span
                  layoutId="nav-cursor"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 700, damping: 32 }}
                  className="absolute inset-0 rounded-md bg-white/[0.09]"
                />
              )}

              {item.menu ? (
                <button
                  type="button"
                  onClick={() => onToggle(item.label)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  className={`${shared} ${tone}`}
                >
                  {onPage && <ActiveRing />}
                  {item.label}
                  {/* A plus that becomes a minus: the console expands. */}
                  <Plus
                    className={`h-3 w-3 transition-transform duration-300 ${
                      menuOpen ? "rotate-45" : ""
                    } ${lit || menuOpen ? "text-brand-light" : "text-white/55"}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-current={onPage ? "page" : undefined}
                  className={`${shared} ${tone}`}
                >
                  {onPage && <ActiveRing />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** "You are here" marker — a ring, after the power symbol in the logo. */
function ActiveRing() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-accent"
    />
  );
}
