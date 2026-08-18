"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/** Sticky site header: logo, desktop nav, quote button and mobile menu trigger. */
export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${siteConfig.name} home`}
        >
          {/* Source is 1920x303; the original theme capped it at 165px wide. */}
          <Image
            src={siteConfig.logo}
            alt={siteConfig.legalName}
            width={1920}
            height={303}
            priority
            className="h-auto w-[140px] sm:w-[165px]"
          />
        </Link>

        <DesktopNav items={mainNav} />

        <div className="flex items-center gap-3">
          <Button href="/request-quote" className="hidden sm:inline-flex">
            Get Quote
          </Button>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open navigation menu"
            className="rounded-lg p-2 text-navy transition-colors hover:bg-muted-surface xl:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileNav
        items={mainNav}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
}
