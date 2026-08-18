"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

/**
 * Horizontal navigation for large screens.
 *
 * Dropdowns are state-driven rather than CSS-only. A CSS `:focus-within`
 * dropdown stays stuck open after a click, because the trigger keeps focus
 * and nothing listens for a second click. Here the open menu is tracked in
 * state and closed on: a second click, mouse leave, outside click, Escape,
 * and route change.
 */
export function DesktopNav({ items }) {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState(null);
  const navRef = useRef(null);

  // Close whenever the user navigates to a new page.
  useEffect(() => {
    setOpenLabel(null);
  }, [pathname]);

  // Close on outside click or Escape while a menu is open.
  useEffect(() => {
    if (!openLabel) return;

    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenLabel(null);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenLabel(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openLabel]);

  return (
    <nav ref={navRef} aria-label="Main navigation" className="hidden xl:block">
      <ul className="flex items-center gap-7">
        {items.map((item) => {
          if (!item.children) {
            const isCurrent =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-brand ${
                    isCurrent ? "text-brand" : "text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openLabel === item.label;
          const hasCurrentChild = item.children.some(
            (child) => child.href === pathname,
          );

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenLabel(item.label)}
              onMouseLeave={() => setOpenLabel(null)}
            >
              <button
                type="button"
                onClick={() => setOpenLabel(isOpen ? null : item.label)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand ${
                  isOpen || hasCurrentChild ? "text-brand" : "text-navy"
                }`}
              >
                {item.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul
                className={`absolute left-0 top-full z-50 w-72 rounded-xl border border-gray-100 bg-white p-2 shadow-card transition-all duration-200 ${
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      tabIndex={isOpen ? undefined : -1}
                      onClick={() => setOpenLabel(null)}
                      aria-current={
                        pathname === child.href ? "page" : undefined
                      }
                      className={`block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-muted-surface hover:text-brand ${
                        pathname === child.href ? "text-brand" : "text-body"
                      }`}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
