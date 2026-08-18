"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { DesktopNav } from "./desktop-nav";
import { MegaPanel } from "./mega-panel";
import { MobileNav } from "./mobile-nav";

/**
 * Site header, built as an instrument console rather than a marketing bar.
 *
 * The strip is a dark precise surface pinned above a light page, and the
 * catalogue panel is the same surface expanding downward — one object, not a
 * bar plus a dropdown. Labels are monospace; the commercial action is the
 * only thing set in the body face, so it reads as warm against the chrome.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const headerRef = useRef(null);
  const closeTimer = useRef(null);

  const activeItem = mainNav.find(
    (item) => item.menu && item.label === openMenu,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      className="sticky top-0 z-50 text-white"
    >
      <div
        className={`relative z-10 bg-console/95 backdrop-blur-xl transition-shadow duration-300 ${
          isScrolled && !openMenu
            ? "shadow-[0_18px_40px_-28px_rgba(3,16,42,0.9)]"
            : ""
        }`}
      >
        <div className="container">
          <div
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
              isScrolled ? "h-[60px]" : "h-[68px] lg:h-[76px]"
            }`}
          >
            <div className="flex min-w-0 items-center">
              <Link
                href="/"
                aria-label={`${siteConfig.name} — home`}
                className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-4 focus-visible:ring-offset-console"
              >
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.legalName}
                  width={1920}
                  height={303}
                  priority
                  className="h-auto w-[122px] sm:w-[144px]"
                />
              </Link>

              {/* Console divider: the bar is split into chrome and controls. */}
              <span
                aria-hidden="true"
                className="mx-6 hidden h-7 w-px bg-console-line xl:block"
              />

              <DesktopNav
                items={mainNav}
                openMenu={openMenu}
                onOpen={(label) => {
                  cancelClose();
                  setOpenMenu(label);
                }}
                onHoverLeave={scheduleClose}
                onToggle={(label) =>
                  setOpenMenu((current) => (current === label ? null : label))
                }
              />
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="hidden h-7 w-px bg-console-line xl:block"
              />

              <Link
                href="/request-quote"
                className="group hidden items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-console sm:inline-flex"
              >
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMobileNavOpen}
                className="-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light xl:hidden"
              >
                <Menu className="h-[22px] w-[22px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Hairline foot of the bar, brightened where the console is live. */}
        <div
          aria-hidden="true"
          className={`h-px w-full transition-colors duration-300 ${
            openMenu ? "bg-brand/60" : "bg-console-line"
          }`}
        />
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="mega"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.96 }
            }
            animate={{ opacity: 1, scaleY: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden xl:block"
          >
            <MegaPanel
              menu={activeItem.menu}
              menuKey={activeItem.label}
              onNavigate={() => setOpenMenu(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
            className="fixed inset-x-0 bottom-0 top-0 -z-10 hidden bg-console/40 backdrop-blur-[2px] xl:block"
          />
        )}
      </AnimatePresence>

      <MobileNav
        items={mainNav}
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </header>
  );
}
