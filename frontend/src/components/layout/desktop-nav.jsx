"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { SPRING } from "@/lib/motion";
import { RollText } from "@/components/ui/roll-text";

/**
 * Primary navigation, from xl up.
 *
 * Each label rolls over on hover — the copy on screen leaves upward as a
 * fresh one arrives from below. It is a CSS transform on two stacked spans,
 * so it costs nothing at runtime and survives before hydration.
 *
 * A single underline travels between items rather than each item drawing its
 * own. Shared-layout animation means the rule appears to slide across the bar,
 * which reads as one control instead of six separate ones.
 *
 * Colour is inherited from the header, because the bar is transparent over
 * the dark hero and glass everywhere else.
 */
export function DesktopNav({
  items,
  openMenu,
  onDark,
  onOpen,
  onHoverLeave,
  onToggle,
}) {
  const pathname = usePathname();

  const isCurrent = (href) =>
    Boolean(href) &&
    (href === pathname || (href !== "/" && pathname.startsWith(`${href}/`)));

  /**
   * A catalogue trigger has no href of its own, so without this the nav shows
   * nothing active anywhere under /services or /platforms. It counts as
   * current when the route sits inside the section it opens.
   */
  const ownsRoute = (item) => {
    const root = item.menu?.viewAll?.href;
    return (
      Boolean(root) && (pathname === root || pathname.startsWith(`${root}/`))
    );
  };

  const currentLabel =
    items.find((item) => (item.menu ? ownsRoute(item) : isCurrent(item.href)))
      ?.label ?? null;
  const activeLabel = openMenu ?? currentLabel;

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const onPage = isCurrent(item.href);
          const menuOpen = Boolean(item.menu) && openMenu === item.label;
          const isActive = activeLabel === item.label;

          const shared =
            "group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm";
          const tone = onDark
            ? isActive
              ? "text-white"
              : "text-white/65 hover:text-white"
            : isActive
              ? "text-black"
              : "text-black/55 hover:text-black";

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.menu && onOpen(item.label)}
              onMouseLeave={item.menu ? onHoverLeave : undefined}
            >
              {item.menu ? (
                <button
                  type="button"
                  onClick={() => onToggle(item.label)}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  aria-current={ownsRoute(item) ? "page" : undefined}
                  className={`${shared} ${tone}`}
                >
                  <RollText>{item.label}</RollText>
                  {/* A plus that becomes a cross: the catalogue expands. */}
                  <span
                    aria-hidden="true"
                    className={`relative block h-2.5 w-2.5 transition-transform duration-[400ms] ease-power ${
                      menuOpen ? "rotate-45" : ""
                    }`}
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                  </span>
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
                  <RollText>{item.label}</RollText>
                </Link>
              )}

              {/* One rule for the whole bar, sliding between items. */}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  aria-hidden="true"
                  transition={SPRING.crisp}
                  className="absolute inset-x-4 -bottom-0.5 h-px bg-current"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
