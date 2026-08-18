"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icon";

/**
 * Navigation drawer for everything below xl.
 *
 * It uses the same dark surface as the desktop mega panel, so the catalogue
 * feels like one place at any width. Full-bleed at 320px, capped at 24rem
 * once there is room.
 */
export function MobileNav({ items, isOpen, onClose }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(null);

  const close = useCallback(() => {
    setExpanded(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* Lock html and body — body alone is unreliable, since html is usually the
     scroll container — and add the scrollbar's width back so nothing shifts. */
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { body } = document;
    const scrollbar = window.innerWidth - html.clientWidth;
    const previous = {
      html: html.style.overflow,
      body: body.style.overflow,
      padding: body.style.paddingRight,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      html.style.overflow = previous.html;
      body.style.overflow = previous.body;
      body.style.paddingRight = previous.padding;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 380, damping: 40 };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-console/70 backdrop-blur-sm xl:hidden"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={spring}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-console text-white xl:hidden"
          >
            {/* Matching glow so the drawer reads as the same surface as the panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative flex h-[72px] shrink-0 items-center justify-between border-b border-console-line px-5">
              <Link
                href="/"
                onClick={close}
                aria-label={`${siteConfig.name} — home`}
              >
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.legalName}
                  width={1920}
                  height={303}
                  className="h-auto w-[124px]"
                />
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.035, duration: 0.25 }}
                  >
                    {item.menu ? (
                      <MenuSection
                        item={item}
                        isExpanded={expanded === item.label}
                        onToggle={() =>
                          setExpanded((current) =>
                            current === item.label ? null : item.label,
                          )
                        }
                        pathname={pathname}
                        onNavigate={close}
                        reduceMotion={reduceMotion}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex min-h-[48px] items-center rounded-md px-3 font-mono text-xs font-medium uppercase tracking-label text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="relative shrink-0 border-t border-console-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/request-quote"
                onClick={close}
                className="group flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Request a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-3 block text-center font-mono text-[11px] uppercase tracking-label text-white/60 transition-colors hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** One collapsible catalogue section inside the drawer. */
function MenuSection({
  item,
  isExpanded,
  onToggle,
  pathname,
  onNavigate,
  reduceMotion,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-md px-3 text-left font-mono text-xs font-medium uppercase tracking-label text-white/85 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
      >
        <span className="min-w-0">{item.label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {/* Hidden at 320px, where the label and chevron already fill the row. */}
          <span className="hidden font-mono text-[10px] uppercase tracking-label text-white/70 min-[380px]:inline">
            {item.menu.eyebrow}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-5 px-3 pb-3 pt-3">
              {item.menu.groups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 border-l-2 border-brand pl-2 font-mono text-[11px] uppercase tracking-label text-white/70">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5 border-l border-console-line pl-3">
                    {group.items.map((entry) => {
                      const current = pathname === entry.href;
                      return (
                        <li key={entry.href}>
                          <Link
                            href={entry.href}
                            onClick={onNavigate}
                            aria-current={current ? "page" : undefined}
                            className={`flex min-h-[44px] items-center gap-2.5 rounded-lg px-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light ${
                              current
                                ? "bg-white/10 text-white"
                                : "text-white/85 hover:bg-white/[0.07] hover:text-white"
                            }`}
                          >
                            {entry.icon && (
                              <Icon
                                name={entry.icon}
                                className="h-4 w-4 shrink-0 text-brand-light"
                              />
                            )}
                            <span className="min-w-0 leading-snug">
                              {entry.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <Link
                href={item.menu.viewAll.href}
                onClick={onNavigate}
                className="group inline-flex items-center gap-1.5 px-2 text-sm font-medium text-brand-light transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
              >
                {item.menu.viewAll.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
