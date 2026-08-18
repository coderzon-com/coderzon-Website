"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

/** Slide-in navigation drawer for tablet and mobile. */
export function MobileNav({ items, isOpen, onClose }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(null);

  // Collapse any open submenu as the drawer closes, so it reopens clean.
  const close = useCallback(() => {
    setExpanded(null);
    onClose();
  }, [onClose]);

  // Close the drawer whenever the user lands on a new page.
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /*
   * Lock background scrolling while the drawer is open.
   *
   * Locking `body` alone is unreliable because the scroll container is
   * usually `html`, so both are locked. Removing the scrollbar also widens
   * the page and shifts content sideways, so its width is added back as
   * padding. Neither step changes scroll position, so nothing jumps.
   */
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { body } = document;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
    };
  }, [isOpen]);

  // Let Escape close the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-navy/50 transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(20rem,85vw)] flex-col bg-white shadow-xl transition-transform duration-300 xl:hidden ${
          isOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.legalName}
            width={1920}
            height={303}
            className="h-auto w-[140px]"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-navy transition-colors hover:bg-muted-surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* overscroll-contain stops scrolling the drawer from scrolling the page behind it. */}
        <nav className="flex-1 overflow-y-auto overscroll-contain p-5">
          <ul className="space-y-1">
            {items.map((item) => {
              if (!item.children) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={close}
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block rounded-lg px-3 py-2.5 font-medium text-navy transition-colors hover:bg-muted-surface hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const isExpanded = expanded === item.label;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left font-medium text-navy transition-colors hover:bg-muted-surface"
                  >
                    <span className="min-w-0">{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="mt-1 space-y-1 border-l-2 border-brand-100 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className="block rounded-lg px-3 py-2 text-sm text-body transition-colors hover:bg-muted-surface hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-100 p-5">
          <Button href="/request-quote" onClick={close} className="w-full">
            Get Quote
          </Button>
        </div>
      </div>
    </>
  );
}
