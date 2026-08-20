"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { DURATION, EASE } from "@/lib/motion";
import { Magnetic } from "@/components/ui/magnetic";
import { DesktopNav } from "./desktop-nav";
import { MegaPanel } from "./mega-panel";
import { MobileNav } from "./mobile-nav";

/** Below this, treat the page as "at the top" and stay transparent. */
const SCROLL_TOP_THRESHOLD = 12;
/** Ignore direction changes smaller than this, or the bar flickers. */
const SCROLL_DELTA = 6;
/** Never hide the bar before the user is properly into the page. */
const HIDE_AFTER = 140;

/**
 * Site header.
 *
 * Three behaviours, each solving a real problem rather than decorating:
 *
 *   1. It hides on the way down and returns on the way up. Reading gets the
 *      whole viewport; reaching for navigation brings it straight back.
 *   2. It is transparent over the hero and becomes glass once content is
 *      behind it, so the bar never sits on a colour it was not designed for.
 *   3. It condenses on scroll, which quietly signals "you have moved".
 *
 * Scroll state is read in a rAF-throttled passive listener and written to a
 * ref before it touches React, so a fast scroll cannot queue a render per
 * frame.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [isHidden, setHidden] = useState(false);

  const headerRef = useRef(null);
  const closeTimer = useRef(null);
  const lastScroll = useRef(0);
  const ticking = useRef(false);

  // The hero is dark, so over it the bar needs light type. Every other page
  // opens on paper.
  const isOverDarkHero = pathname === "/";

  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      const previous = lastScroll.current;

      if (Math.abs(y - previous) > SCROLL_DELTA) {
        // Never hide while a menu is open — the user is aiming at it.
        setHidden(y > previous && y > HIDE_AFTER);
        lastScroll.current = y;
      }
      setScrolled(y > SCROLL_TOP_THRESHOLD);
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating closes everything.
  useEffect(() => {
    setOpenMenu(null);
    setMobileNavOpen(false);
  }, [pathname]);

  // Escape and outside clicks close the panel.
  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event) => event.key === "Escape" && setOpenMenu(null);
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

  /* A grace period so the pointer can travel from a trigger into the panel
     without it closing underneath. */
  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const activeItem = mainNav.find(
    (item) => item.menu && item.label === openMenu,
  );

  // Light type only while transparent over the dark hero. The moment the bar
  // becomes glass it sits on page content and must switch to dark type.
  const onDark = isOverDarkHero && !isScrolled && !openMenu;

  return (
    <motion.header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      animate={{
        y: isHidden && !openMenu && !isMobileNavOpen ? "-100%" : "0%",
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: DURATION.interaction, ease: EASE.power }
      }
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled || openMenu
            ? "border-b border-black/10 bg-white/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="px-x-default">
          <div
            className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${
              isScrolled ? "h-16" : "h-[72px] lg:h-20"
            }`}
          >
            <div className="flex min-w-0 items-center">
              <Link
                href="/"
                aria-label={`${siteConfig.name} — home`}
                className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4"
              >
                {/* No invert over the dark hero. The mark is a blue-to-cyan
                    gradient with no dark wordmark in it — 97% of its pixels
                    clear 3:1 on near-black unaided — so flattening it to solid
                    white was throwing the brand away to solve a problem it
                    did not have. Its cyan also sits close to the palette's
                    signal, so it belongs there. */}
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.legalName}
                  width={1920}
                  height={303}
                  priority
                  className="h-auto w-[112px] transition-[width] duration-300 sm:w-[140px]"
                />
              </Link>

              <span
                aria-hidden="true"
                className={`mx-8 hidden h-6 w-px transition-colors duration-300 xl:block ${
                  onDark ? "bg-white/20" : "bg-black/10"
                }`}
              />

              <DesktopNav
                items={mainNav}
                openMenu={openMenu}
                onDark={onDark}
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

            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              <Magnetic className="hidden sm:block">
                <Link
                  href="/request-quote"
                  className={`ease-power inline-flex min-h-[44px] items-center rounded-full px-6 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
                    onDark
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/85"
                  }`}
                >
                  Request a quote
                </Link>
              </Magnetic>

              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMobileNavOpen}
                className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current xl:hidden ${
                  onDark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/5"
                }`}
              >
                <Menu className="h-[22px] w-[22px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* The catalogue panel, hinged from the bar's bottom edge. */}
      <AnimatePresence>
        {activeItem && (
          <MegaPanel
            key={activeItem.label}
            menu={activeItem.menu}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onNavigate={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.interaction }}
            aria-hidden="true"
            className="fixed inset-0 -z-10 hidden bg-black/25 backdrop-blur-[2px] xl:block"
          />
        )}
      </AnimatePresence>

      <MobileNav
        items={mainNav}
        isOpen={isMobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </motion.header>
  );
}
