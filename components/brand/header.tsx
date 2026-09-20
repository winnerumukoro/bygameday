"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Events", href: "/events" },
  { label: "Sports", href: "/sports" },
  { label: "Vendors", href: "/vendors" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Gallery", href: "/gallery" },
];

const SECONDARY_LINKS = [
  { label: "Vendor Application", href: "/vendors/apply" },
  { label: "Free Agent Pool", href: "/sports/free-agents" },
  { label: "Mailing List", href: "/join" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Condense on scroll, and tuck away when the reader is heading down the page.
  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setIsHidden(y > 240 && y > lastY);
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile overlay
  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close the overlay on navigation
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close the overlay on Escape
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const isHome = pathname === "/";
  // Transparent over the home hero; solid ivory once scrolled or on any other page.
  const isLightMode = isScrolled || !isHome;
  // Home renders a 36px status ticker above the fold — clear it until we scroll.
  const topOffset = isHome && !isScrolled ? "top-9" : "top-0";

  return (
    <>
      <ScrollProgress />

      <header
        className={cn(
          "fixed left-0 right-0 z-50 transition-[top,background-color,padding,transform,box-shadow] duration-450 ease-out-expo",
          topOffset,
          isHidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0",
          isLightMode
            ? "bg-ivory/90 backdrop-blur-xl border-b border-ink/10 py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-stadium mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
          <Logo variant={isLightMode ? "dark" : "light"} />

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative py-1 text-[13px] font-headline uppercase tracking-[0.12em] transition-colors duration-300",
                    isActive
                      ? "text-gold"
                      : isLightMode
                      ? "text-ink/75 hover:text-ink"
                      : "text-ivory/85 hover:text-ivory"
                  )}
                >
                  {item.label}
                  {/* Active state is a solid rule; hover wipes one in from the left */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gold origin-left transition-transform duration-450 ease-out-expo",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="primary" size="default" className="group">
              <Link href="/join">
                <span>Join Now</span>
                <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-450 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </div>

          {/* Compact controls below lg */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button asChild variant="primary" size="sm" className="hidden xs:inline-flex">
              <Link href="/join">Join</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "inline-flex h-12 w-12 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                isLightMode ? "text-ink" : "text-ivory"
              )}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden bg-ink text-ivory grain flex flex-col transition-[opacity,visibility] duration-450 ease-out-expo",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-ivory/10">
          <Logo variant="light" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex h-12 w-12 items-center justify-center text-ivory transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close navigation menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <nav
          className="flex-grow overflow-y-auto px-4 sm:px-6 py-8 flex flex-col justify-center"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="border-b border-ivory/10 overflow-hidden">
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-baseline gap-4 py-4 sm:py-5 font-headline uppercase tracking-tight transition-colors duration-300",
                      "text-[2.25rem] xs:text-5xl sm:text-6xl leading-[0.95]",
                      isActive ? "text-gold" : "text-ivory hover:text-gold"
                    )}
                    style={
                      mobileMenuOpen
                        ? {
                            animation: `fade-up-in 550ms cubic-bezier(0.16, 1, 0.3, 1) ${
                              120 + index * 70
                            }ms both`,
                          }
                        : undefined
                    }
                  >
                    <span className="font-headline text-xs tracking-[0.2em] text-ivory/35 shrink-0">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {SECONDARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] font-headline uppercase tracking-[0.18em] text-ivory/55 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-4 sm:px-6 pb-8 pt-5 border-t border-ivory/10 flex flex-col gap-3">
          <Button asChild variant="primary" size="lg" fullWidthMobile>
            <Link href="/join">Join Now</Link>
          </Button>
          <p className="text-[10px] text-ivory/40 uppercase tracking-[0.2em] text-center">
            GAMEDAY Platform • All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
