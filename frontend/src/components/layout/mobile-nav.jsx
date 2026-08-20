"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

/**
 * Full-screen navigation for everything below xl.
 *
 * A side drawer on a 320px phone leaves a useless sliver of page behind it
 * and squeezes the menu into a column narrower than the content it replaces.
 * Taking the whole screen gives every destination a real touch target and
 * lets the type match the rest of the site.
 *
 * The panel arrives on a clip-path circle expanding from the top-right, where
 * the button that opened it sits, so the menu appears to come out of the
 * control the user just pressed. Lines then stagger in behind it.
 *
 * Scroll is locked on html and body — body alone is unreliable, since html is
 * usually the scroll container — and the scrollbar's width is added back as
 * padding so the page underneath does not shift sideways.
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

  const panel = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: DURATION.micro } },
        exit: { opacity: 0, transition: { duration: DURATION.micro } },
      }
    : {
        // Expanding from the corner the menu button occupies.
        hidden: { clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" },
        show: {
          clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
          transition: { duration: DURATION.cinematic, ease: EASE.entry },
        },
        exit: {
          clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
          transition: { duration: 0.45, ease: EASE.exit },
        },
      };

  const line = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.entrance, ease: EASE.power },
        },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="bg-ink fixed inset-0 z-50 flex flex-col text-white xl:hidden"
        >
          <div className="px-x-default flex h-[72px] shrink-0 items-center justify-between">
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
                className="h-auto w-[112px] sm:w-[140px]"
              />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <motion.nav
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : STAGGER.normal,
                  delayChildren: reduceMotion ? 0 : 0.18,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="px-x-default flex-1 overflow-y-auto overscroll-contain py-6"
          >
            <ul className="divide-y divide-white/10">
              {items.map((item) => {
                if (!item.menu) {
                  return (
                    <motion.li key={item.label} variants={line}>
                      <Link
                        href={item.href}
                        onClick={close}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex min-h-[64px] items-center break-words text-2xl font-bold tracking-[-0.02em] transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                }

                const isExpanded = expanded === item.label;
                return (
                  <motion.li key={item.label} variants={line}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isExpanded ? null : item.label)
                      }
                      aria-expanded={isExpanded}
                      className="flex min-h-[64px] w-full items-center justify-between gap-4 text-left text-2xl font-bold tracking-[-0.02em] transition-opacity duration-300 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span className="min-w-0 break-words">{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={`relative block h-3 w-3 shrink-0 transition-transform duration-[400ms] ease-power ${
                          isExpanded ? "rotate-45" : ""
                        }`}
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={
                            reduceMotion ? false : { height: 0, opacity: 0 }
                          }
                          animate={{ height: "auto", opacity: 1 }}
                          exit={
                            reduceMotion
                              ? { opacity: 0 }
                              : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: DURATION.interaction,
                            ease: EASE.power,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-6 pb-6">
                            {item.menu.groups.map((group) => (
                              <div key={group.label}>
                                <p className="mb-2 font-mono text-[10px] uppercase tracking-label text-white/35">
                                  {group.label}
                                </p>
                                <ul className="space-y-px border-l border-white/15 pl-4">
                                  {group.items.map((entry) => (
                                    <li key={entry.href}>
                                      <Link
                                        href={entry.href}
                                        onClick={close}
                                        aria-current={
                                          pathname === entry.href
                                            ? "page"
                                            : undefined
                                        }
                                        className="flex min-h-[44px] items-center text-[15px] text-white/70 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                      >
                                        {entry.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>

          <motion.div
            variants={line}
            initial="hidden"
            animate="show"
            className="px-x-default shrink-0 border-t border-white/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <Link
              href="/request-quote"
              onClick={close}
              className="flex min-h-[56px] w-full items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Request a quote
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-4 block text-center font-mono text-[10px] uppercase tracking-label text-white/40 transition-colors duration-300 hover:text-white"
            >
              {siteConfig.contact.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
